--
-- PostgreSQL database dump
--

\restrict ghCdPCCZ2aOjgJsA3Fbxy8m3ni6kXEtvzH2KoNUg0lrhZrDU67oFD91IakCKfA2

-- Dumped from database version 18.3 (Ubuntu 18.3-1.pgdg24.04+1)
-- Dumped by pg_dump version 18.3 (Ubuntu 18.3-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: adherents; Type: TABLE DATA; Schema: public; Owner: minilib_user
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public.adherents DISABLE TRIGGER ALL;

INSERT INTO public.adherents VALUES (3, 'ADH-003', 'Bernard', 'Claire', 'claire.bernard@email.com', false, '2026-03-26 16:03:09.979474');
INSERT INTO public.adherents VALUES (6, 'ADH-005', 'Eljefe', 'Lou', 'lou@mail.fr', true, '2026-04-01 13:48:40.798289');
INSERT INTO public.adherents VALUES (7, 'ADH-006', 'Menvus', 'Gérad', 'gegemenv@mail.fr', false, '2026-04-21 14:34:13.616124');
INSERT INTO public.adherents VALUES (8, 'ADH-007', 'Menvus', 'Gérard', 'gegemenvu@mail.fr', true, '2026-04-21 14:35:01.306153');
INSERT INTO public.adherents VALUES (2, 'ADH-002', 'Dupont', 'Bob', 'bob.dupont@email.com', false, '2026-03-26 16:03:09.979474');
INSERT INTO public.adherents VALUES (5, 'ADH-004', 'El', 'Panda', 'elPanda@mail.fr', false, '2026-03-30 13:22:35.283666');
INSERT INTO public.adherents VALUES (1, 'ADH-001', 'Martin', 'Alice', 'alice.martin@email.com', false, '2026-03-26 16:03:09.979474');
INSERT INTO public.adherents VALUES (9, 'ADH-008', 'Kelfé', 'Ignace', 'kelféignace@mail.fr', false, '2026-04-22 13:05:25.9462');
INSERT INTO public.adherents VALUES (10, 'ADH-009', 'Ignace', 'Kelfé', 'kelfeignace@mail.fr', true, '2026-04-22 23:06:23.786234');


ALTER TABLE public.adherents ENABLE TRIGGER ALL;

--
-- Data for Name: livres; Type: TABLE DATA; Schema: public; Owner: minilib_user
--

ALTER TABLE public.livres DISABLE TRIGGER ALL;

INSERT INTO public.livres VALUES (1, '9780132350884', 'Clean Code', 'Robert C. Martin', 2008, 'Informatique', false);
INSERT INTO public.livres VALUES (4, '9782070360024', 'La ferme des animaux', 'George Orwell', 1949, 'Roman', false);
INSERT INTO public.livres VALUES (2, '9780201633610', 'Design Patterns', 'Gang of Four', 1994, 'Informatique', true);
INSERT INTO public.livres VALUES (3, '9782070612758', 'Le Petit Prince', 'Saint-Exupéry', 1943, 'Roman', false);
INSERT INTO public.livres VALUES (13, '8459632157489', 'Les deux tours', 'J.R.R. Tolkien', 1955, 'Fantasy', true);


ALTER TABLE public.livres ENABLE TRIGGER ALL;

--
-- Data for Name: emprunts; Type: TABLE DATA; Schema: public; Owner: minilib_user
--

ALTER TABLE public.emprunts DISABLE TRIGGER ALL;

INSERT INTO public.emprunts VALUES (3, 4, 2, '2026-03-30', '2026-04-13', '2026-04-01');
INSERT INTO public.emprunts VALUES (4, 3, 1, '2026-03-30', '2026-03-30', '2026-04-01');
INSERT INTO public.emprunts VALUES (5, 4, 6, '2026-04-01', '2026-04-15', '2026-04-01');
INSERT INTO public.emprunts VALUES (10, 1, 5, '2026-04-01', '2026-04-15', NULL);
INSERT INTO public.emprunts VALUES (9, 4, 5, '2026-04-01', '2026-04-15', '2026-04-01');
INSERT INTO public.emprunts VALUES (14, 4, 2, '2026-04-18', '2026-05-02', NULL);
INSERT INTO public.emprunts VALUES (11, 2, 5, '2026-04-01', '2026-04-15', '2026-04-22');
INSERT INTO public.emprunts VALUES (2, 3, 1, '2026-03-26', '2026-04-09', '2026-04-22');
INSERT INTO public.emprunts VALUES (19, 3, 10, '2026-04-22', '2026-05-06', NULL);
INSERT INTO public.emprunts VALUES (15, 13, 9, '2026-04-22', '2026-05-06', '2026-04-28');


ALTER TABLE public.emprunts ENABLE TRIGGER ALL;

--
-- Name: adherents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minilib_user
--

SELECT pg_catalog.setval('public.adherents_id_seq', 10, true);


--
-- Name: emprunts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minilib_user
--

SELECT pg_catalog.setval('public.emprunts_id_seq', 19, true);


--
-- Name: livres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minilib_user
--

SELECT pg_catalog.setval('public.livres_id_seq', 13, true);


--
-- PostgreSQL database dump complete
--

\unrestrict ghCdPCCZ2aOjgJsA3Fbxy8m3ni6kXEtvzH2KoNUg0lrhZrDU67oFD91IakCKfA2

