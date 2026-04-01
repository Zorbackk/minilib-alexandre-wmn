--% database/constraints.sql
--? Contraintes métiers de la base de données Minilib - PostgreSQL
-- Exécuter avec psql -U minilib_user -d minilib -f database/constraints.sql

-- =============================================================================
-- DOCUMENTATION GÉNÉRALE
-- =============================================================================
--
-- Ce fichier implémente des CONTRAINTES MÉTIERS via des TRIGGERS PostgreSQL.
-- Ces contraintes vont au-delà de ce que SQL peut exprimer nativement (NOT NULL,
-- UNIQUE, CHECK...) car elles impliquent de lire d'autres lignes ou tables.
--
-- -----------------------------------------------------------------------------
-- QU'EST-CE QU'UN TRIGGER ?
-- -----------------------------------------------------------------------------
-- Un trigger (déclencheur) est un mécanisme qui exécute automatiquement une
-- fonction en réponse à un événement sur une table (INSERT, UPDATE, DELETE).
--
-- Il se compose toujours de DEUX parties :
--   1. Une FONCTION TRIGGER  : contient la logique à exécuter (PL/pgSQL)
--   2. Un TRIGGER en lui-même: lie la fonction à une table + un événement
--
-- Syntaxe du trigger :
--   CREATE TRIGGER <nom>
--     BEFORE|AFTER  INSERT|UPDATE|DELETE  ON <table>
--     FOR EACH ROW                        -- s'exécute une fois par ligne affectée
--     EXECUTE FUNCTION <nom_fonction>();
--
-- Timing BEFORE vs AFTER :
--   BEFORE → s'exécute avant l'écriture en base. Peut bloquer l'opération
--            (via RAISE EXCEPTION) ou modifier la ligne (via RETURN NEW modifié).
--   AFTER  → s'exécute après l'écriture. Utile pour des actions secondaires,
--            mais ne peut plus annuler l'opération principale.
--
-- Ici on utilise BEFORE pour pouvoir soit bloquer l'INSERT (livre indispo,
-- limite atteinte), soit modifier des données liées avant validation.
--
-- -----------------------------------------------------------------------------
-- QU'EST-CE QUE NEW ?
-- -----------------------------------------------------------------------------
-- NEW est une variable spéciale disponible dans toute fonction trigger.
-- C'est un RECORD (ligne) qui représente la ligne en cours d'insertion/modification.
--
--   INSERT → NEW contient la ligne qui va être insérée
--   UPDATE → NEW contient la nouvelle version de la ligne (OLD contient l'ancienne)
--   DELETE → NEW est NULL (seul OLD existe)
--
-- On accède aux colonnes via NEW.<nom_colonne> :
--   NEW.adherent_id   → l'id de l'adhérent de la ligne en cours d'insertion
--   NEW.livre_id      → l'id du livre de la ligne en cours d'insertion
--
-- -----------------------------------------------------------------------------
-- QU'EST-CE QUE $$ ?
-- -----------------------------------------------------------------------------
-- $$ est un délimiteur de chaîne littérale en PostgreSQL (dollar quoting).
-- Il sert à encadrer le corps d'une fonction sans avoir à échapper les quotes.
--
-- Problème sans $$ :
--   CREATE FUNCTION ... AS 'IF x = ''valeur'' THEN ...'  -- quotes à doubler partout
--
-- Avec $$ :
--   CREATE FUNCTION ... AS $$
--     IF x = 'valeur' THEN ...   -- quotes normales, lisible
--   $$
--
-- On peut aussi nommer le délimiteur pour plus de clarté : $body$...$body$,
-- $func$...$func$, etc. Ici on utilise $$ par convention.
--
-- -----------------------------------------------------------------------------
-- CONTRAINTES IMPLÉMENTÉES
-- -----------------------------------------------------------------------------
--   1. Max 3 emprunts simultanés par adhérent    → trigger BEFORE INSERT emprunts
--   2. Livre indisponible bloqué + marqué indispo → trigger BEFORE INSERT emprunts
--   3. Livre redevient disponible au retour       → trigger BEFORE UPDATE emprunts
-- =============================================================================

--* Un adhérent ne peut pas emprunter plus de 3 livres simultanément
-- Fonction trigger : compte les emprunts actifs de l'adhérent.
-- Si la limite est atteinte, lève une exception et bloque l'INSERT.
CREATE or REPLACE FUNCTION fn_check_max_emprunts_par_adherent()
RETURNS TRIGGER AS $$
    DECLARE
      max_emprunts      CONSTANT INT := 3; -- limite métier configurable ici
      nb_emprunts_actifs INT;
    BEGIN
      -- Compte les emprunts non rendus (date_retour_effective NULL = en cours)
      -- pour l'adhérent de la ligne en cours d'insertion (NEW.adherent_id)
      SELECT COUNT(*) INTO nb_emprunts_actifs
      FROM emprunts
      WHERE adherent_id = NEW.adherent_id
        AND date_retour_effective IS NULL;

      -- Bloque l'INSERT si la limite est déjà atteinte
      IF (nb_emprunts_actifs >= max_emprunts)
      THEN
        RAISE EXCEPTION
          'Adhérent ID % : limite de % emprunts en cours atteinte',
          NEW.adherent_id,
          max_emprunts;
      END IF;

      -- RETURN NEW valide l'opération et transmet la ligne à PostgreSQL
      RETURN NEW;
    END;
$$
LANGUAGE plpgsql;

-- Trigger BEFORE INSERT : vérifie la limite avant chaque nouvel emprunt
DROP TRIGGER IF EXISTS trigger_limit_emprunts_par_adherent ON emprunts;
CREATE TRIGGER trigger_limit_emprunts_par_adherent
  BEFORE INSERT ON emprunts
  FOR EACH ROW
  EXECUTE FUNCTION fn_check_max_emprunts_par_adherent();

--* Un livre devient indisponible si emprunté
--* Un livre indisponible ne peut pas être emprunté
-- Fonction trigger : vérifie la disponibilité du livre avant l'INSERT.
-- Si indisponible → exception (bloque l'emprunt).
-- Si disponible   → le marque indisponible dans livres, puis laisse passer l'INSERT.
CREATE OR REPLACE FUNCTION fn_check_et_set_livre_indisponible()
RETURNS TRIGGER AS $$
    DECLARE
      livre_disponible BOOLEAN;
    BEGIN
      -- Récupère le flag disponible du livre ciblé par l'emprunt (NEW.livre_id)
      SELECT disponible INTO livre_disponible
      FROM livres
      WHERE id = NEW.livre_id;

      -- Livre déjà emprunté : on bloque
      IF (livre_disponible = false)
      THEN
        RAISE EXCEPTION
          'Livre ID % : indisponible',
          NEW.livre_id;
      END IF;

      -- Livre disponible : on le marque indisponible avant de valider l'emprunt
      -- (BEFORE INSERT → ce UPDATE s'exécute avant l'écriture de la ligne emprunts)
      IF (livre_disponible = true)
      THEN
        UPDATE livres
        SET disponible = false
        WHERE id = NEW.livre_id;
      END IF;

      RETURN NEW;
    END;
$$
LANGUAGE plpgsql;

-- Trigger BEFORE INSERT : vérifie dispo + marque indisponible en une passe
DROP TRIGGER IF EXISTS trigger_livre_indisponible_emprunt ON emprunts;
CREATE TRIGGER trigger_livre_indisponible_emprunt
  BEFORE INSERT ON emprunts
  FOR EACH ROW
  EXECUTE FUNCTION fn_check_et_set_livre_indisponible();

--* Un livre redevient disponible quand il est rendu
-- Fonction trigger : à l'UPDATE de date_retour_effective, remet le livre disponible.
-- Le trigger est déclaré sur UPDATE OF date_retour_effective : il ne se déclenche
-- que si cette colonne précise est modifiée, pas sur n'importe quel UPDATE d'emprunts.
CREATE OR REPLACE FUNCTION fn_set_livre_disponible_retour()
RETURNS TRIGGER AS $$
  BEGIN
    -- NEW.date_retour_effective est la valeur après modification (OLD contient l'ancienne)
    -- Si elle vient d'être renseignée → l'emprunt est clos → livre disponible
    IF NEW.date_retour_effective IS NOT NULL THEN
      UPDATE livres
      SET disponible = TRUE
      WHERE id = NEW.livre_id;
    END IF;

    RETURN NEW;
  END;
$$
LANGUAGE plpgsql;

-- Trigger BEFORE UPDATE : ne se déclenche que sur modification de date_retour_effective
DROP TRIGGER IF EXISTS trigger_livre_disponible_retour ON emprunts;
CREATE TRIGGER trigger_livre_disponible_retour
  BEFORE UPDATE OF date_retour_effective ON emprunts
  FOR EACH ROW
  EXECUTE FUNCTION fn_set_livre_disponible_retour();

