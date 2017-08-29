--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-08-29 17:21:35 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16386)
-- Name: Member; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "Member";


--
-- TOC entry 1 (class 3079 OID 12425)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2205 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 2 (class 3079 OID 16416)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 2206 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET search_path = "Member", pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 188 (class 1259 OID 16389)
-- Name: Users; Type: TABLE; Schema: Member; Owner: -
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    name character varying(128),
    username character varying(1024) NOT NULL,
    password text NOT NULL
);


--
-- TOC entry 187 (class 1259 OID 16387)
-- Name: User_id_seq; Type: SEQUENCE; Schema: Member; Owner: -
--

CREATE SEQUENCE "User_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2207 (class 0 OID 0)
-- Dependencies: 187
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: Member; Owner: -
--

ALTER SEQUENCE "User_id_seq" OWNED BY "Users".id;


--
-- TOC entry 2076 (class 2604 OID 16392)
-- Name: Users id; Type: DEFAULT; Schema: Member; Owner: -
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"User_id_seq"'::regclass);


--
-- TOC entry 2078 (class 2606 OID 16459)
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: Member; Owner: -
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- TOC entry 2080 (class 2606 OID 16457)
-- Name: Users id; Type: CONSTRAINT; Schema: Member; Owner: -
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- TOC entry 2081 (class 1259 OID 16407)
-- Name: username; Type: INDEX; Schema: Member; Owner: -
--

CREATE UNIQUE INDEX username ON "Users" USING btree (username varchar_pattern_ops);


-- Completed on 2017-08-29 17:21:47 CST

--
-- PostgreSQL database dump complete
--

