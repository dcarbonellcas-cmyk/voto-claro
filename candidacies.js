// Solo denominaciones proclamadas al Congreso; sin datos personales.
const CANDIDACY_SOURCE="https://www.boe.es/buscar/doc.php?id=BOE-A-2026-23103";
const CANDIDACY_DATE="03/11/2026";
const CANDIDACY_TOTAL=534;
const CANDIDACY_EXCLUDED=21;
const CANDIDACIES=[
  {
    "name": "ADELANTE ANDALUCÍA (ADELANTE ANDALUCÍA)",
    "provinces": [
      "Almería",
      "Cádiz",
      "Córdoba",
      "Granada",
      "Huelva",
      "Jaén",
      "Málaga",
      "Sevilla"
    ]
  },
  {
    "name": "AGENDA VALENCIANA (AGENDA VALENCIANA)",
    "provinces": [
      "Valencia"
    ]
  },
  {
    "name": "ALHORA (ALHORA)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Lleida",
      "Tarragona"
    ]
  },
  {
    "name": "ALTERNATIVA MALAGUEÑA (29)",
    "provinces": [
      "Málaga"
    ]
  },
  {
    "name": "ARAMÉS-FRONT AMPLI (ARAMÉS-EU-MS)",
    "provinces": [
      "Illes Balears"
    ]
  },
  {
    "name": "BLOQUE NACIONALISTA GALEGO (B.N.G.)",
    "provinces": [
      "A Coruña"
    ]
  },
  {
    "name": "BLOQUE NACIONALISTA GALEGO (BNG)",
    "provinces": [
      "Lugo",
      "Ourense",
      "Pontevedra"
    ]
  },
  {
    "name": "CHUNTA ARAGONESISTA-FRENTE AMPLIO ARAGÓN (CHA-IU-MS-FRENTE AMPLIO)",
    "provinces": [
      "Huesca",
      "Zaragoza"
    ]
  },
  {
    "name": "Coalición Canaria-Municipalistas Primero Canarias (CCa-1.ºCAN)",
    "provinces": [
      "Santa Cruz De Tenerife"
    ]
  },
  {
    "name": "COMPROMÍS: FRONT VALENCIÀ (COMPROMIS-EUPV-PODEM-ERPV)",
    "provinces": [
      "Alicante",
      "Castellón",
      "Valencia"
    ]
  },
  {
    "name": "Comuns-Front Ampli (COMUNS-FRONT AMPLI)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Lleida",
      "Tarragona"
    ]
  },
  {
    "name": "CONVERGENTS (CNV)",
    "provinces": [
      "Tarragona"
    ]
  },
  {
    "name": "DEMOCRACIA para el siglo 21 (D21)",
    "provinces": [
      "Barcelona",
      "Madrid"
    ]
  },
  {
    "name": "EGUZKILORE (EGUZKILORE)",
    "provinces": [
      "Navarra"
    ]
  },
  {
    "name": "Escanos en Branco para deixar Escanos Baleiros (ESCAÑOS EN BLANCO)",
    "provinces": [
      "Pontevedra"
    ]
  },
  {
    "name": "ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACIOS (ESCAÑOS EN BLANCO)",
    "provinces": [
      "La Rioja"
    ]
  },
  {
    "name": "ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS (ESCAÑOS EN BLANCO)",
    "provinces": [
      "Almería",
      "Álava",
      "Córdoba",
      "Gipuzkoa",
      "León",
      "Murcia",
      "Palencia",
      "Las Palmas",
      "Soria",
      "Valladolid"
    ]
  },
  {
    "name": "ESQUERRA REPUBLICANA DE CATALUNYA (ERC)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Lleida",
      "Tarragona"
    ]
  },
  {
    "name": "EUSKADIKO LANGILEEN ALDERDI KOMUNISTA/PARTIDO COMUNISTA DE LOS TRABAJADORES DE EUSKADI (ELAK/PCTE)",
    "provinces": [
      "Gipuzkoa"
    ]
  },
  {
    "name": "EUSKAL HERRIA BILDU (EH BILDU)",
    "provinces": [
      "Álava",
      "Bizkaia",
      "Gipuzkoa"
    ]
  },
  {
    "name": "EUSKAL HERRIA BILDU-ESQUERRA REPUBLICANA DE CATALUNYA (EH BILDU-ERC)",
    "provinces": [
      "Navarra"
    ]
  },
  {
    "name": "EUZKO ALDERDI JELTZALEA-PARTIDO NACIONALISTA VASCO (EAJ-PNV)",
    "provinces": [
      "Álava",
      "Bizkaia",
      "Gipuzkoa"
    ]
  },
  {
    "name": "FALANGE ESPAÑOLA DE LAS J.O.N.S. (FE de las JONS)",
    "provinces": [
      "Guadalajara",
      "Madrid",
      "Palencia",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid"
    ]
  },
  {
    "name": "FALANGE ESPAÑOLA DE LAS JONS (FE de las JONS)",
    "provinces": [
      "Castellón",
      "Córdoba"
    ]
  },
  {
    "name": "FEDERACION DE LOS INDEPENDIENTES DE ARAGON (F.I.A.)",
    "provinces": [
      "Zaragoza"
    ]
  },
  {
    "name": "FEDERACION DE LOS INDEPENDIENTES DE ARAGON (FIA)",
    "provinces": [
      "Huesca"
    ]
  },
  {
    "name": "FEMINISTAS AL CONGRESO (PFAC)",
    "provinces": [
      "Álava"
    ]
  },
  {
    "name": "Frente Amplio (FA)",
    "provinces": [
      "Albacete",
      "Almería",
      "Ávila",
      "Badajoz",
      "Bizkaia",
      "Burgos",
      "Cáceres",
      "Cantabria",
      "Ciudad Real",
      "Cuenca",
      "Gipuzkoa",
      "Guadalajara",
      "Jaén",
      "León",
      "Madrid",
      "Málaga",
      "Murcia",
      "Palencia",
      "La Rioja",
      "Salamanca",
      "Segovia",
      "Soria",
      "Toledo",
      "Valladolid",
      "Zamora"
    ]
  },
  {
    "name": "Frente Amplio - Fronte Ampla (FRENTE AMPLIO - FRONTE AMPLA)",
    "provinces": [
      "Pontevedra"
    ]
  },
  {
    "name": "Frente Amplio Andaluz (FA)",
    "provinces": [
      "Cádiz",
      "Córdoba",
      "Granada",
      "Huelva",
      "Sevilla"
    ]
  },
  {
    "name": "Frente Amplio-Fronte Ampla (FRENTE AMPLIO-FRONTE AMPLA)",
    "provinces": [
      "A Coruña",
      "Lugo",
      "Ourense"
    ]
  },
  {
    "name": "FRENTE AMPLIO-FRONTE ZABALA (FRENTE AMPLIO-FRONTE ZABALA)",
    "provinces": [
      "Álava",
      "Navarra"
    ]
  },
  {
    "name": "FRENTE AMPLIU POR ASTURIES (FA)",
    "provinces": [
      "Asturias"
    ]
  },
  {
    "name": "FRENTE OBRERO",
    "provinces": [
      "Ceuta"
    ]
  },
  {
    "name": "FRENTE OBRERO (FO)",
    "provinces": [
      "Albacete",
      "Alicante",
      "Almería",
      "Álava",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Illes Balears",
      "Barcelona",
      "Bizkaia",
      "Burgos",
      "Cáceres",
      "Cádiz",
      "Cantabria",
      "Castellón",
      "Ciudad Real",
      "Córdoba",
      "A Coruña",
      "Cuenca",
      "Gipuzkoa",
      "Girona",
      "Granada",
      "Guadalajara",
      "Huelva",
      "Huesca",
      "Jaén",
      "León",
      "Lleida",
      "Lugo",
      "Madrid",
      "Málaga",
      "Murcia",
      "Navarra",
      "Ourense",
      "Palencia",
      "Las Palmas",
      "Pontevedra",
      "La Rioja",
      "Salamanca",
      "Santa Cruz De Tenerife",
      "Segovia",
      "Sevilla",
      "Soria",
      "Tarragona",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid",
      "Zamora",
      "Zaragoza",
      "Melilla"
    ]
  },
  {
    "name": "GEROA BAI (GBAI)",
    "provinces": [
      "Navarra"
    ]
  },
  {
    "name": "IUSTITIA EUROPA (IE)",
    "provinces": [
      "Madrid"
    ]
  },
  {
    "name": "JUNTS PER CATALUNYA (JxCat)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Lleida",
      "Tarragona"
    ]
  },
  {
    "name": "LIBERACIÓN CANARIA (LIB)",
    "provinces": [
      "Las Palmas",
      "Santa Cruz De Tenerife"
    ]
  },
  {
    "name": "MUNICIPALISTAS PRIMERO CANARIAS-COALICIÓN CANARIA (1.ºCAN-CCa)",
    "provinces": [
      "Las Palmas"
    ]
  },
  {
    "name": "NUEVO EXTREMEÑISMO - ADELANTE EXTREMADURA (NEX)",
    "provinces": [
      "Badajoz",
      "Cáceres"
    ]
  },
  {
    "name": "PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE (PACMA)",
    "provinces": [
      "Albacete",
      "Alicante",
      "Almería",
      "Álava",
      "Asturias",
      "Bizkaia",
      "Cádiz",
      "Castellón",
      "Córdoba",
      "Cuenca",
      "Gipuzkoa",
      "Girona",
      "Granada",
      "Huelva",
      "Huesca",
      "Jaén",
      "León",
      "Madrid",
      "Málaga",
      "Navarra",
      "Las Palmas",
      "La Rioja",
      "Santa Cruz De Tenerife",
      "Segovia",
      "Sevilla",
      "Tarragona",
      "Teruel",
      "Valencia",
      "Valladolid"
    ]
  },
  {
    "name": "PARTIDO AUTÓNOMOS (PARTIDO AUTÓNOMOS)",
    "provinces": [
      "Alicante",
      "Castellón",
      "Santa Cruz De Tenerife"
    ]
  },
  {
    "name": "PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA (PCTE)",
    "provinces": [
      "Alicante",
      "Almería",
      "Asturias",
      "Ávila",
      "Illes Balears",
      "Burgos",
      "Cáceres",
      "Cádiz",
      "Cantabria",
      "Castellón",
      "Córdoba",
      "Cuenca",
      "Granada",
      "Guadalajara",
      "Huelva",
      "Huesca",
      "Jaén",
      "León",
      "Madrid",
      "Málaga",
      "Murcia",
      "Navarra",
      "Palencia",
      "Las Palmas",
      "La Rioja",
      "Salamanca",
      "Santa Cruz De Tenerife",
      "Segovia",
      "Sevilla",
      "Soria",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid",
      "Zamora",
      "Zaragoza"
    ]
  },
  {
    "name": "PARTIDO COMUNISTA DE LOS TRABAJADORES DE EUSKADI/EUSKADIKO LANGILEEN ALDERDI KOMUNISTA (PCTE/ELAK)",
    "provinces": [
      "Álava",
      "Bizkaia"
    ]
  },
  {
    "name": "PARTIDO COMUNISTA DEL PUEBLO CANARIO (PCPC)",
    "provinces": [
      "Las Palmas"
    ]
  },
  {
    "name": "PARTIDO COMUNISTA DOS TRABALLADORES DA GALIZA (PCTG)",
    "provinces": [
      "A Coruña",
      "Ourense",
      "Pontevedra"
    ]
  },
  {
    "name": "PARTIDO DEMÓCRATA SOCIAL JUBILADOS EUROPEOS (P.D.S.J.E.)",
    "provinces": [
      "Ávila"
    ]
  },
  {
    "name": "Partido dos Socialistas de Galicia-PSOE (PSdeG-PSOE)",
    "provinces": [
      "A Coruña",
      "Lugo",
      "Ourense",
      "Pontevedra"
    ]
  },
  {
    "name": "PARTIDO DRAGO CANARIAS (D.R.G)",
    "provinces": [
      "Las Palmas",
      "Santa Cruz De Tenerife"
    ]
  },
  {
    "name": "PARTIDO HUMANISTA (PH)",
    "provinces": [
      "Madrid"
    ]
  },
  {
    "name": "PARTIDO NACIONALISTA DE CASTILLA Y LEÓN - UNION REFORMISTA CIUDADANA (PANCAL-URCI)",
    "provinces": [
      "Valladolid"
    ]
  },
  {
    "name": "PARTIDO POPULAR (PP)",
    "provinces": [
      "Albacete",
      "Alicante",
      "Almería",
      "Álava",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Illes Balears",
      "Bizkaia",
      "Burgos",
      "Cáceres",
      "Cádiz",
      "Cantabria",
      "Castellón",
      "Ciudad Real",
      "Córdoba",
      "A Coruña",
      "Cuenca",
      "Gipuzkoa",
      "Granada",
      "Guadalajara",
      "Huelva",
      "Huesca",
      "Jaén",
      "León",
      "Lleida",
      "Lugo",
      "Madrid",
      "Málaga",
      "Murcia",
      "Ourense",
      "Palencia",
      "Las Palmas",
      "Pontevedra",
      "La Rioja",
      "Salamanca",
      "Santa Cruz De Tenerife",
      "Segovia",
      "Sevilla",
      "Soria",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid",
      "Zamora",
      "Zaragoza",
      "Ceuta",
      "Melilla"
    ]
  },
  {
    "name": "PARTIDO REGIONALISTA DEL PAIS LEONES (PREPAL)",
    "provinces": [
      "León",
      "Salamanca",
      "Zamora"
    ]
  },
  {
    "name": "PARTIDO SOCIALISTA DE EUSKADI-EUSKADIKO EZKERRA (PSOE) PSE-EE (PSOE)",
    "provinces": [
      "Álava",
      "Bizkaia",
      "Gipuzkoa"
    ]
  },
  {
    "name": "PARTIDO SOCIALISTA DE HUELVA (PSOE)",
    "provinces": [
      "Huelva"
    ]
  },
  {
    "name": "PARTIDO SOCIALISTA DE LAS ISLAS BALEARES (PSIB-PSOE)",
    "provinces": [
      "Illes Balears"
    ]
  },
  {
    "name": "PARTIDO SOCIALISTA DE NAVARRA-PSOE (PSN-PSOE)",
    "provinces": [
      "Navarra"
    ]
  },
  {
    "name": "PARTIDO SOCIALISTA OBRERO ESPAÑOL (PSOE)",
    "provinces": [
      "Albacete",
      "Alicante",
      "Almería",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Burgos",
      "Cáceres",
      "Cádiz",
      "Cantabria",
      "Castellón",
      "Ciudad Real",
      "Córdoba",
      "Cuenca",
      "Granada",
      "Guadalajara",
      "Huesca",
      "Jaén",
      "León",
      "Madrid",
      "Málaga",
      "Murcia",
      "Palencia",
      "Las Palmas",
      "La Rioja",
      "Salamanca",
      "Santa Cruz De Tenerife",
      "Segovia",
      "Sevilla",
      "Soria",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid",
      "Zamora",
      "Zaragoza",
      "Ceuta",
      "Melilla"
    ]
  },
  {
    "name": "PARTIDO UNIONISTA ESTADO DE ESPAÑA (PUEDE)",
    "provinces": [
      "Asturias"
    ]
  },
  {
    "name": "PARTIT ANIMALISTA AMB EL MEDI AMBIENT (PACMA)",
    "provinces": [
      "Lleida"
    ]
  },
  {
    "name": "PARTIT COMUNISTA DELS TREBALLADORS DE CATALUNYA (PCTC)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Lleida",
      "Tarragona"
    ]
  },
  {
    "name": "PARTIT DELS SOCIALISTES DE CATALUNYA (PSC-PSOE) (PSC)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Lleida",
      "Tarragona"
    ]
  },
  {
    "name": "PARTIT POPULAR / PARTIDO POPULAR (PP)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Tarragona"
    ]
  },
  {
    "name": "PODEMOS",
    "provinces": [
      "La Rioja"
    ]
  },
  {
    "name": "PODEMOS (PAZ,CASA Y TRABAJO)",
    "provinces": [
      "Ceuta"
    ]
  },
  {
    "name": "PODEMOS (PODEMOS)",
    "provinces": [
      "Albacete",
      "Almería",
      "Álava",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Bizkaia",
      "Burgos",
      "Cáceres",
      "Cádiz",
      "Cantabria",
      "Ciudad Real",
      "Córdoba",
      "A Coruña",
      "Cuenca",
      "Gipuzkoa",
      "Granada",
      "Guadalajara",
      "Huelva",
      "Huesca",
      "Jaén",
      "León",
      "Lugo",
      "Madrid",
      "Málaga",
      "Murcia",
      "Navarra",
      "Ourense",
      "Palencia",
      "Pontevedra",
      "Salamanca",
      "Segovia",
      "Sevilla",
      "Soria",
      "Teruel",
      "Toledo",
      "Valladolid",
      "Zamora",
      "Zaragoza"
    ]
  },
  {
    "name": "POR UN MUNDO MAIS XUSTO (MUNDO+JUSTO)",
    "provinces": [
      "Ourense"
    ]
  },
  {
    "name": "POR UN MUNDO MAS JUSTO (MUNDO+JUSTO)",
    "provinces": [
      "Albacete",
      "Almería",
      "Álava",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Bizkaia",
      "Burgos",
      "Cádiz",
      "Cuenca",
      "Granada",
      "Guadalajara",
      "Huesca",
      "Jaén",
      "Madrid",
      "Navarra",
      "Palencia",
      "Segovia",
      "Sevilla",
      "Soria",
      "Tarragona",
      "Valencia",
      "Valladolid",
      "Zaragoza"
    ]
  },
  {
    "name": "POR UN MUNDO MÁS JUSTO (MUNDO+JUSTO)",
    "provinces": [
      "Las Palmas"
    ]
  },
  {
    "name": "PROYECTO ALANTRE (P. ALANTRE)",
    "provinces": [
      "León"
    ]
  },
  {
    "name": "RENACER RENAIXER (RRB)",
    "provinces": [
      "Valencia"
    ]
  },
  {
    "name": "SE ACABO LA FIESTA (SALF)",
    "provinces": [
      "La Rioja",
      "Ceuta"
    ]
  },
  {
    "name": "SE ACABÓ LA FIESTA (SALF)",
    "provinces": [
      "Albacete",
      "Alicante",
      "Almería",
      "Álava",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Illes Balears",
      "Barcelona",
      "Burgos",
      "Cáceres",
      "Cádiz",
      "Castellón",
      "Córdoba",
      "A Coruña",
      "Cuenca",
      "Granada",
      "Guadalajara",
      "Huelva",
      "Huesca",
      "Jaén",
      "León",
      "Lugo",
      "Madrid",
      "Málaga",
      "Murcia",
      "Navarra",
      "Ourense",
      "Palencia",
      "Las Palmas",
      "Pontevedra",
      "Salamanca",
      "Santa Cruz De Tenerife",
      "Segovia",
      "Sevilla",
      "Soria",
      "Tarragona",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid",
      "Zamora",
      "Zaragoza",
      "Melilla"
    ]
  },
  {
    "name": "SORIA ¡YA! (SY)",
    "provinces": [
      "Soria"
    ]
  },
  {
    "name": "TERCERA EDAD EN ACCIÓN (3e)",
    "provinces": [
      "Murcia"
    ]
  },
  {
    "name": "TERUEL EXISTE (TERUEL EXISTE)",
    "provinces": [
      "Teruel"
    ]
  },
  {
    "name": "UNIDAD DEL PUEBLO CANARIO UPC (NC-BC, PODEMOS, IU, SUMAR)",
    "provinces": [
      "Las Palmas",
      "Santa Cruz De Tenerife"
    ]
  },
  {
    "name": "UNIÓN DEL PUEBLO NAVARRO EN COALICIÓN CON EL PARTIDO POPULAR (UPN-PP)",
    "provinces": [
      "Navarra"
    ]
  },
  {
    "name": "VALENCIA UNIDA (VLC)",
    "provinces": [
      "Valencia"
    ]
  },
  {
    "name": "VOX",
    "provinces": [
      "La Rioja"
    ]
  },
  {
    "name": "VOX (VOX)",
    "provinces": [
      "Albacete",
      "Alicante",
      "Almería",
      "Álava",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Illes Balears",
      "Barcelona",
      "Bizkaia",
      "Burgos",
      "Cáceres",
      "Cádiz",
      "Cantabria",
      "Castellón",
      "Ciudad Real",
      "Córdoba",
      "A Coruña",
      "Cuenca",
      "Gipuzkoa",
      "Girona",
      "Granada",
      "Guadalajara",
      "Huelva",
      "Huesca",
      "Jaén",
      "León",
      "Lleida",
      "Lugo",
      "Madrid",
      "Málaga",
      "Murcia",
      "Navarra",
      "Ourense",
      "Palencia",
      "Las Palmas",
      "Pontevedra",
      "Salamanca",
      "Santa Cruz De Tenerife",
      "Segovia",
      "Sevilla",
      "Soria",
      "Tarragona",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid",
      "Zamora",
      "Zaragoza",
      "Ceuta",
      "Melilla"
    ]
  }
];
