import React from "react";
import { Layout, Typography } from "antd";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageLoader } from "../hooks/usePageLoader";

// Assets
import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import hoja from "../assets/cardSingularity.webp";
import SvgComponent from "../assets/textura.jsx";

// Componentes
import CollectiveCard from "../components/ui/Cards/CollectiveCard"; // <--- Tu nueva ruta
import Loader from "../components/layout/loader/Loader.jsx";

const { Title, Paragraph } = Typography;

/* =========================
   DATOS DE LOS COLECTIVOS
========================= */
const collectivesData = [
    {
        id: "singularity",
        title: "Singularity",
        image: hoja, 
        description: "Colectivo de ciencia abierta y software libre. Parte del movimiento global DIYbio y la DIYbiosphere. Creamos tecnología accesible para monitorear y entender nuestro entorno.",
        website: "https://singularitymx.org/",
        social: [
            { label: "Instagram", url: "https://instagram.com/singularity.open" },
            { label: "GitHub", url: "https://github.com/Singularity-MX" },
            { label: "Facebook", url: "https://www.facebook.com/Singularity.py" },
        ]
    },
    {
        id: "imju",
        title: "IMJU León",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", // Imagen espacial de unsplash
        description: "Comunidad de entusiastas del espacio, desarrolladores e investigadores que participan y organizan anualmente retos tecnológicos globales inspirados por la NASA.",
        website: "https://spaceappschallenge.org/",
        social: [
            { label: "Discord", url: "#" },
            { label: "Instagram", url: "#" },
        ]
    },
    {
        id: "biolab",
        title: "León BioLab",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop", // Imagen de lab/tech
        description: "Proyecto dedicado a la creación de observatorios ambientales urbanos, integrando microcontroladores, sensores de bajo costo y análisis de datos satelitales.",
        website: "#",
        social: [
            { label: "GitHub", url: "#" },
        ]
    },
    {
        id: "stellarium",
        title: "Stellarium Devs",
        image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1000&auto=format&fit=crop", // Imagen de planetas/estrellas
        description: "Equipo de desarrollo enfocado en la construcción de plataformas interactivas y visualización 3D en la web para el mapeo de cuerpos celestes y asteroides.",
        website: "#",
        social: [
            { label: "Repositorio", url: "#" },
        ]
    }
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
            background: "#fafafa", // Fondo base claro para mantener minimalismo
        }}
    >
        <SvgComponent
            preserveAspectRatio="xMidYMid slice"
            style={{
                width: "100vw",
                height: "100dvh",
                opacity: 0.15, // Un poco más visible para dar textura
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
                        // Cambiamos a auto para permitir scroll con las 4 cards
                        height: "calc(100dvh - 64px)",
                        overflowY: "auto", 
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "40px 24px 80px 24px",
                    }}
                >
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{ margin: "auto" }} // Centra el loader verticalmente
                        >
                            <Loader size={60} color="#000" />
                        </motion.div>
                    ) : (
                        <div style={{ width: "100%", maxWidth: 900 }}>
                            {/* --- SECCIÓN DE BIENVENIDA / AGRADECIMIENTO --- */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    textAlign: "center",
                                    marginBottom: 60,
                                    padding: "0 16px"
                                }}
                            >
                                <Title level={1} style={{ color: "#111", fontWeight: 800, letterSpacing: "-1px" }}>
                                    Nexo Colectivo
                                </Title>
                                <Paragraph style={{ fontSize: "1.1rem", color: "#666", maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
                                    Gracias por asistir y ser parte de esta experiencia. Este Nexo fue organizado en estrecha colaboración con los siguientes 4 colectivos, unidos por la divulgación tecnológica, el espacio y la ciencia abierta.
                                </Paragraph>
                            </motion.div>

                            {/* --- RENDERIZADO DE CARDS --- */}
                            {collectivesData.map((collective, index) => (
                                <motion.div
                                    key={collective.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
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