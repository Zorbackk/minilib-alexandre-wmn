import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/fr' 

dayjs.extend(utc);

// Fonction permettant de convertir les date venant de la BDD en date lisible pour le frontend
// .utc() évite le décalage de fuseau horaire (les dates SQL DATE arrivent sans heure, interprétées minuit UTC)
export function formatDate(date : string | null) : string {
  return dayjs.utc(date).locale('fr').format('dddd DD MMMM YYYY')
}

