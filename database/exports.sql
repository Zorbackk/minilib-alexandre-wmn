--
-- PostgreSQL database dump
--

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

INSERT INTO public.adherents VALUES (1, 'ADH-001', 'Martin', 'Alice', 'alice.martin@email.com', true, '2026-03-26 16:03:09.979474');
INSERT INTO public.adherents VALUES (2, 'ADH-002', 'Dupont', 'Bob', 'bob.dupont@email.com', true, '2026-03-26 16:03:09.979474');
INSERT INTO public.adherents VALUES (5, 'ADH-004', 'El', 'Panda', 'elPanda@mail.fr', true, '2026-03-30 13:22:35.283666');
INSERT INTO public.adherents VALUES (3, 'ADH-003', 'Bernard', 'Claire', 'claire.bernard@email.com', false, '2026-03-26 16:03:09.979474');
INSERT INTO public.adherents VALUES (6, 'ADH-005', 'Eljefe', 'Lou', 'lou@mail.fr', true, '2026-04-01 13:48:40.798289');


--
-- Data for Name: livres; Type: TABLE DATA; Schema: public; Owner: minilib_user
--

INSERT INTO public.livres VALUES (5, '9780596517748', 'JavaScript: Good Parts', 'D. Crockford', 2008, 'Informatique', true);
INSERT INTO public.livres VALUES (8, '9788448938659', 'LEs trois mousquetaires', 'Alexandre Dumas', 1844, 'Roman d''aventures', false);
INSERT INTO public.livres VALUES (3, '9782070612758', 'Le Petit Prince', 'Saint-Exupéry', 1943, 'Roman', true);
INSERT INTO public.livres VALUES (1, '9780132350884', 'Clean Code', 'Robert C. Martin', 2008, 'Informatique', false);
INSERT INTO public.livres VALUES (2, '9780201633610', 'Design Patterns', 'Gang of Four', 1994, 'Informatique', false);
INSERT INTO public.livres VALUES (4, '9782070360024', '1984', 'George Orwell', 1949, 'Roman', true);


--
-- Data for Name: emprunts; Type: TABLE DATA; Schema: public; Owner: minilib_user
--

INSERT INTO public.emprunts VALUES (2, 3, 1, '2026-03-26', '2026-04-09', '2026-03-30');
INSERT INTO public.emprunts VALUES (3, 4, 2, '2026-03-30', '2026-04-13', '2026-04-01');
INSERT INTO public.emprunts VALUES (4, 3, 1, '2026-03-30', '2026-03-30', '2026-04-01');
INSERT INTO public.emprunts VALUES (5, 4, 6, '2026-04-01', '2026-04-15', '2026-04-01');
INSERT INTO public.emprunts VALUES (10, 1, 5, '2026-04-01', '2026-04-15', NULL);
INSERT INTO public.emprunts VALUES (11, 2, 5, '2026-04-01', '2026-04-15', NULL);
INSERT INTO public.emprunts VALUES (9, 4, 5, '2026-04-01', '2026-04-15', '2026-04-01');


--
-- Name: adherents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minilib_user
--

SELECT pg_catalog.setval('public.adherents_id_seq', 6, true);


--
-- Name: emprunts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minilib_user
--

SELECT pg_catalog.setval('public.emprunts_id_seq', 13, true);


--
-- Name: livres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minilib_user
--

SELECT pg_catalog.setval('public.livres_id_seq', 8, true);


--
-- PostgreSQL database dump complete
--


