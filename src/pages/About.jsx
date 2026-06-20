import React from "react";
import { Layout, Typography } from "antd";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageLoader } from "../hooks/usePageLoader";

// Assets
import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import SvgComponent from "../assets/textura.jsx";

// Componentes
import CollectiveCard from "../components/ui/Cards/CollectiveCard";
import Loader from "../components/layout/loader/Loader.jsx";

const { Title, Paragraph, Text } = Typography;

import almacaninaIMG from "../assets/cards/almacanina.webp";
import singularityIMG from "../assets/cards/singularity.webp";
import imjuIMG from "../assets/cards/imju.webp";
import acompañamenteIMG from "../assets/cards/acompañamente.webp";

/* =========================
   DATOS DE LOS COLECTIVOS
========================= */
const collectivesData = [
  {
    id: "singularity",
    title: "Singularity",
    image: singularityIMG,
    description:
      "Colectivo de ciencia abierta y software libre. Parte del movimiento global DIYbio y la DIYbiosphere. Creamos tecnología accesible para monitorear y entender nuestro entorno.",
    website: "https://singularitymx.org/",
    social: [
      { label: "Instagram", url: "https://instagram.com/singularity.open" },
      { label: "GitHub", url: "https://github.com/Singularity-MX" },
    ],
  },
  {
    id: "almacanina",
    title: "Alma Canina",
    image: almacaninaIMG,
    description:
      "Organización dedicada al bienestar de perros en situación de calle mediante campañas de adopción, recolección de donativos, esterilizaciones y actividades de apoyo en colaboración con albergues locales.",
    website: "https://www.instagram.com/almacanina.leon",
    social: [
      { label: "Instagram", url: "https://www.instagram.com/almacanina.leon" },
    ],
  },
  {
    id: "acompanamente",
    title: "Acompaña Mente",
    image: acompañamenteIMG,
    description:
      "Iniciativa enfocada en la promoción de la salud mental mediante talleres, pláticas y actividades formativas que fomentan el bienestar emocional, el autoconocimiento y el desarrollo personal.",
    website: "#",
    social: [],
  },
  {
    id: "imju",
    title: "IMJU León",
    image: imjuIMG,
    description:
      "Organismo que impulsa el desarrollo integral de las juventudes mediante programas, actividades y oportunidades de participación enfocadas en educación, liderazgo, emprendimiento y bienestar social.",
    website: "http://leonjoven.gob.mx/",
    social: [
      { label: "Facebook", url: "https://www.facebook.com/IMJULeon" },
      { label: "Instagram", url: "https://www.instagram.com/imjuleon/" },
    ],
  },
];

/* =========================
   BACKGROUND
========================= */
const Background = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
      background: "#fafafa",
    }}
  >
    <SvgComponent
      preserveAspectRatio="xMidYMid slice"
      style={{
        width: "100vw",
        height: "100dvh",
        opacity: 0.15,
      }}
    />
  </div>
);

/* =========================
   PAGE
========================= */
const About = () => {
  const navigate = useNavigate();
  const loading = usePageLoader([]);

  const items = [
    { key: "", label: "Inicio" },
    { key: "information", label: "¿Cómo funciona?" },
    { key: "scan", label: "Escáner" },
    { key: "about", label: "Sobre nosotros" },
  ];

  const handleNavigate = (key) => {
    navigate(`/${key === "home" ? "" : key}`);
  };

  return (
    <Layout
      style={{
        minHeight: "100dvh",
        background: "transparent",
      }}
    >
      <Background />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          margin: "0px -1px ",
          padding: 0,
        }}
      >
        <Navbar
          items={items}
          onNavigate={handleNavigate}
          initialSelectedKey="about"
          logoIcon={<img src={logo} alt="logo" style={{ height: 40 }} />}
          logoText={<img src={letras} alt="text" style={{ height: 20 }} />}
        />

        <main
          style={{
            height: "calc(100dvh - 64px)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 20px 64px 20px",
          }}
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ margin: "auto" }}
            >
              <Loader size={60} color="#000" />
            </motion.div>
          ) : (
            <div style={{ width: "100%", maxWidth: 900 }}>
              {/* --- SECCIÓN DE BIENVENIDA --- */}
              {/*
                Antes: un título grande seguido de un párrafo largo y formal,
                lo que se sentía como un golpe de información.
                Ahora: eyebrow corto -> título -> frase breve y cálida que
                agradece -> y solo después el contexto, en una línea aparte.
                Esto crea una jerarquía de lectura en 3 pasos en vez de 2 bloques.
              */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  textAlign: "center",
                  marginBottom: 40,
                  padding: "0 12px",
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: 2.5,
                    color: "#999",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Sobre nosotros
                </Text>

                <Title
                  level={1}
                  style={{
                    color: "#111",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    margin: "8px 0 14px 0",
                    fontSize: "clamp(28px, 6vw, 44px)",
                  }}
                >
                  Nexo Colectivo
                </Title>

                <Paragraph
                  style={{
                    fontSize: "1.05rem",
                    color: "#333",
                    maxWidth: 560,
                    margin: "0 auto 6px auto",
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  Gracias por ser parte de esta experiencia. 🚀
                </Paragraph>

                <Paragraph
                  style={{
                    fontSize: "0.95rem",
                    color: "#777",
                    maxWidth: 600,
                    margin: "0 auto",
                    lineHeight: 1.6,
                  }}
                >
                  Este Nexo nació de la colaboración con cuatro colectivos que
                  comparten algo en común: divulgar, acompañar y construir
                  comunidad. Conócelos un poco más abajo.
                </Paragraph>
              </motion.div>

              {/* --- RENDERIZADO DE CARDS --- */}
              {collectivesData.map((collective, index) => (
                <motion.div
                  key={collective.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <CollectiveCard
                    title={collective.title}
                    image={collective.image}
                    description={collective.description}
                    website={collective.website}
                    social={collective.social}
                    onSocialClick={(s) => window.open(s.url, "_blank")}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default About;