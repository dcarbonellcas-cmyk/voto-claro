// Denominaciones del Congreso; no se importan datos personales.
const CANDIDACY_SOURCE="https://www.boe.es/buscar/doc.php?id=BOE-A-2026-22607&lang=es";
const CANDIDACY_DATE="28/10/2026";
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
    "name": "BLOQUE NACIONALISTA GALEGO (BNG)",
    "provinces": [
      "A Coruña",
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
    "name": "COALICIÓN CANARIA-MUNICIPALISTAS PRIMERO CANARIAS (CCa-1.ºCAN)",
    "provinces": [
      "Santa Cruz De Tenerife"
    ]
  },
  {
    "name": "COMPROMÍS: FRONT VALENCIÀ (COMPROMIS-EUPV-PODEM-ERPV)",
    "provinces": [
      "Alicante",
      "Castellón"
    ]
  },
  {
    "name": "COMPROMÍS: FRONT VALENCIÀ (COMPROMÍS-EUPV-PODEM-ERPV)",
    "provinces": [
      "Valencia"
    ]
  },
  {
    "name": "COMUNS-FRONT AMPLI (COMUNS-FRONT AMPLI)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Lleida"
    ]
  },
  {
    "name": "CONVERGENTS (CNV)",
    "provinces": [
      "Tarragona"
    ]
  },
  {
    "name": "DEMOCRACIA PARA EL SIGLO 21 (D21)",
    "provinces": [
      "Barcelona",
      "Madrid"
    ]
  },
  {
    "name": "EGUZKILORE",
    "provinces": [
      "Navarra"
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
      "Pontevedra",
      "La Rioja",
      "Soria",
      "Valladolid",
      "Melilla"
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
    "name": "EUSKAL HERRIA BILDU (EH Bildu)",
    "provinces": [
      "Álava",
      "Bizkaia",
      "Gipuzkoa"
    ]
  },
  {
    "name": "EUSKAL HERRIA BILDU (EH-Bildu)",
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
    "name": "FALANGE ESPAÑOLA DE LAS JONS (FE de las JONS)",
    "provinces": [
      "Alicante",
      "Castellón",
      "Córdoba",
      "Guadalajara",
      "Madrid",
      "Palencia",
      "Sevilla",
      "Teruel",
      "Toledo",
      "Valencia",
      "Valladolid",
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
    "name": "FEDERACIÓN DE LOS INDEPENDIENTES DE ARAGÓN (FIA)",
    "provinces": [
      "Zaragoza"
    ]
  },
  {
    "name": "FEMINISM8 (F8)",
    "provinces": [
      "Santa Cruz De Tenerife"
    ]
  },
  {
    "name": "FEMINISTAS AL CONGRESO (PFAC)",
    "provinces": [
      "Álava",
      "Bizkaia"
    ]
  },
  {
    "name": "FRENTE AMPLIO (FA)",
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
      "Lugo",
      "Madrid",
      "Málaga",
      "Murcia",
      "Palencia",
      "La Rioja",
      "Salamanca",
      "Segovia",
      "Soria",
      "Tarragona",
      "Toledo",
      "Valladolid",
      "Zamora"
    ]
  },
  {
    "name": "FRENTE AMPLIO ANDALUZ (FA)",
    "provinces": [
      "Cádiz",
      "Córdoba",
      "Granada",
      "Huelva",
      "Sevilla"
    ]
  },
  {
    "name": "FRENTE AMPLIO – FRONTE ZABALA",
    "provinces": [
      "Navarra"
    ]
  },
  {
    "name": "FRENTE AMPLIO-FRONTE AMPLA (FRENTE AMPLIO-FRONTE AMPLA)",
    "provinces": [
      "A Coruña",
      "Ourense"
    ]
  },
  {
    "name": "FRENTE AMPLIO-FRONTE ZABALA (FRENTE AMPLIO-FRONTE ZABALA)",
    "provinces": [
      "Álava"
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
    "name": "FRONTE AMPLA (FA)",
    "provinces": [
      "Pontevedra"
    ]
  },
  {
    "name": "GEROA BAI",
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
    "name": "IZQUIERDA POR ALMERÍA (IPAL)",
    "provinces": [
      "Almería"
    ]
  },
  {
    "name": "JOSÉ MARÍA CALVO GUERRA",
    "provinces": [
      "Málaga"
    ]
  },
  {
    "name": "JUNTOS POR EXTREMADURA (J.U.E.X.)",
    "provinces": [
      "Badajoz",
      "Cáceres"
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
    "name": "JUSTICIA Y LEY (JL)",
    "provinces": [
      "Álava"
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
      "Illes Balears",
      "Barcelona",
      "Bizkaia",
      "Cádiz",
      "Castellón",
      "Córdoba",
      "A Coruña",
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
      "Murcia",
      "Navarra",
      "Ourense",
      "Las Palmas",
      "La Rioja",
      "Salamanca",
      "Santa Cruz De Tenerife",
      "Segovia",
      "Sevilla",
      "Tarragona",
      "Teruel",
      "Valencia",
      "Valladolid",
      "Zaragoza"
    ]
  },
  {
    "name": "PARTIDO AUTÓNOMOS (PARTIDO AUTÓNOMOS)",
    "provinces": [
      "Alicante",
      "Castellón",
      "Santa Cruz De Tenerife",
      "Valencia"
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
      "Gipuzkoa",
      "Granada",
      "Guadalajara",
      "Huelva",
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
    "name": "PARTIDO DEMÓCRATA SOCIAL JUBILADOS EUROPEOS (PDSJE)",
    "provinces": [
      "Ávila"
    ]
  },
  {
    "name": "PARTIDO DOS SOCIALISTAS DE GALICIA-PSOE (PSDEG-PSOE)",
    "provinces": [
      "A Coruña",
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
      "Zamora"
    ]
  },
  {
    "name": "PARTIDO REGIONALISTA DEL PAÍS LEONES (PREPAL)",
    "provinces": [
      "Salamanca"
    ]
  },
  {
    "name": "PARTIDO SOCIALISTA DE CÁCERES (PSOE)",
    "provinces": [
      "Cáceres"
    ]
  },
  {
    "name": "PARTIDO SOCIALISTA DE EUSKADI-EUSKADIKO EZKERRA (PSOE) [PSE-EE (PSOE)]",
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
    "name": "PARTIDO SOCIALISTA DE NAVARRA - PSOE (PSN-PSOE)",
    "provinces": [
      "Navarra"
    ]
  },
  {
    "name": "PARTIDO SOCIALISTA DE SANTA CRUZ DE TENERIFE (PSOE)",
    "provinces": [
      "Santa Cruz De Tenerife"
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
      "Lugo",
      "Madrid",
      "Málaga",
      "Murcia",
      "Palencia",
      "Las Palmas",
      "La Rioja",
      "Salamanca",
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
    "name": "PARTIT POPULAR/PARTIDO POPULAR (PP)",
    "provinces": [
      "Barcelona",
      "Girona",
      "Tarragona"
    ]
  },
  {
    "name": "PODEMOS",
    "provinces": [
      "Navarra",
      "La Rioja"
    ]
  },
  {
    "name": "PODEMOS (PAZ, CASA Y TRABAJO)",
    "provinces": [
      "Asturias"
    ]
  },
  {
    "name": "PODEMOS (PODEMOS)",
    "provinces": [
      "Albacete",
      "Almería",
      "Álava",
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
      "Zaragoza",
      "Ceuta"
    ]
  },
  {
    "name": "POR UN MUNDO MAIS XUSTO (PUM+J)",
    "provinces": [
      "Ourense"
    ]
  },
  {
    "name": "POR UN MUNDO MAS JUSTO (MUNDO+JUSTO)",
    "provinces": [
      "Albacete",
      "Álava",
      "Asturias",
      "Ávila",
      "Badajoz",
      "Barcelona",
      "Bizkaia",
      "Burgos",
      "Cádiz",
      "Cuenca",
      "Granada",
      "Guadalajara",
      "Huesca",
      "Jaén",
      "León",
      "Madrid",
      "Palencia",
      "Segovia",
      "Sevilla",
      "Tarragona",
      "Valladolid",
      "Zaragoza"
    ]
  },
  {
    "name": "POR UN MUNDO MÁS JUSTO (MUNDO+JUSTO)",
    "provinces": [
      "Almería",
      "Navarra",
      "Las Palmas",
      "Pontevedra",
      "Soria",
      "Valencia"
    ]
  },
  {
    "name": "PROYECTO ALANTRE (P ALANTRE)",
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
      "Ceuta",
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
    "name": "UNION CARTAGINENSE (UC)",
    "provinces": [
      "Murcia"
    ]
  },
  {
    "name": "UNIÓN DEL PUEBLO NAVARRO EN COALICIÓN CON PARTIDO POPULAR (UPN-PP)",
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
      "Navarra",
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
