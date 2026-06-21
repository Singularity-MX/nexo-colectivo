import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import MissionHero from "../components/ui/Cards/MissionHero";
import StationCard from "../components/ui/Cards/StationCard";
import Loader from "../components/layout/loader/Loader.jsx";
import { usePageLoader } from "../hooks/usePageLoader";
import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import SvgComponent from "../assets/textura.jsx";
import imjuLogo from "../assets/logos/imju.png";
import leonLogo from "../assets/logos/leon.png";
import leon450Logo from "../assets/logos/nexo.png";

const { Text } = Typography;

/* =========================
   HOOK: Detectar dispositivo móvil
========================= */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
};

const stationsData = [
  {
    name: "TRAPPIST-1e",
    organismo: "Hongos bioluminiscentes",
    habitabilidad: 80,
    accentColor: "#aa88ff",
  },
  {
    name: "PROXIMA CENTAURI b",
    organismo: "Criaturas reflectantes",
    habitabilidad: 65,
    accentColor: "#ff6666",
  },
  {
    name: "KEPLER-452b",
    organismo: "Gigantópodos",
    habitabilidad: 75,
    accentColor: "#ffaa66",
  },
  {
    name: "K2-18b",
    organismo: "Aeromedusas",
    habitabilidad: 70,
    accentColor: "#66ddaa",
  },
  {
    name: "TIERRA",
    organismo: "Humanos",
    habitabilidad: 100,
    accentColor: "#6699ff",
  },
];

/* =========================
   BACKGROUND OPTIMIZADO
========================= */
const Background = ({ isMobile }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
      background: "#04060e",
    }}
  >
    {/* Reducir complejidad del SVG en móvil */}
    <SvgComponent
      preserveAspectRatio="xMidYMid slice"
      style={{
        width: "100vw",
        height: "100dvh",
        opacity: isMobile ? 0.08 : 0.12, // Menos opacidad en móvil
        transform: isMobile ? 'scale(1.5)' : 'scale(1)', // Zoom out en móvil
      }}
    />
    <div
      style={{
        position: "absolute",
        top: isMobile ? "-5%" : "-10%",
        right: isMobile ? "-5%" : "-10%",
        width: isMobile ? "80vw" : "60vw",
        height: isMobile ? "80vw" : "60vw",
        background:
          "radial-gradient(circle, rgba(90,209,201,0.08) 0%, transparent 70%)", // Menos intenso
      }}
    />
  </div>
);

/* =========================
   FOOTER OPTIMIZADO
========================= */
const OrganizersFooter = ({ isMobile }) => (
  <div
    style={{
      width: "100%",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      padding: isMobile ? "20px 16px 24px 16px" : "28px 24px 36px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: isMobile ? 12 : 16,
    }}
  >
    <Text
      style={{
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: "rgba(255,255,255,0.35)",
        fontSize: isMobile ? 9.5 : 10.5,
        letterSpacing: 2,
      }}
    >
      ORGANIZAN
    </Text>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 20 : 32,
        flexWrap: "wrap",
        opacity: 0.85,
      }}
    >
      <img src={imjuLogo} alt="IMJU León" style={{ height: isMobile ? 24 : 32 }} />
      <img src={leonLogo} alt="León Ayuntamiento" style={{ height: isMobile ? 24 : 32 }} />
      <img src={leon450Logo} alt="León 450" style={{ height: isMobile ? 24 : 32 }} />
    </div>
  </div>
);

/* =========================
   HOME OPTIMIZADO
========================= */
const Home = () => {
  const navigate = useNavigate();
  const loading = usePageLoader([]);
  const isMobile = useIsMobile();

  const items = [
    { key: "", label: "Inicio" },
    { key: "information", label: isMobile ? "Info" : "¿Cómo funciona?" },
    { key: "scan", label: "Escáner" },
    { key: "about", label: isMobile ? "Nosotros" : "Sobre nosotros" },
  ];

  const handleNavigate = (key) => {
    navigate(`/${key}`);
  };

  return (
    <Layout
      style={{
        minHeight: "100dvh",
        background: "#04060e",
        // Prevenir scroll horizontal en móvil
        overflowX: "hidden",
      }}
    >
      <Background isMobile={isMobile} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <Navbar
          items={items}
          onNavigate={handleNavigate}
          initialSelectedKey=""
          logoIcon={
            <img 
              src={logo} 
              alt="logo" 
              style={{ 
                height: isMobile ? 32 : 40,
                transition: "height 0.3s ease"
              }} 
            />
          }
          logoText={
            <img 
              src={letras} 
              alt="text" 
              style={{ 
                height: isMobile ? 16 : 20,
                transition: "height 0.3s ease"
              }} 
            />
          }
        />

        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: isMobile ? "24px 16px 0 16px" : "48px 20px 0 20px",
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ margin: "auto", paddingTop: isMobile ? 80 : 120 }}
            >
              <Loader size={isMobile ? 48 : 60} color="#5ad1c9" />
            </motion.div>
          ) : (
            <>
              <MissionHero
                isMobile={isMobile}
                buttonText={isMobile ? "INICIAR" : "Comenzar"}
                onClick={() => navigate("/scan")}
                meta={{
                  "📅 Fecha": "28 junio 2026",
                  "⏰ Hora": "09:00 - 12:00",
                  "📍 Lugar": "Universidad CESEE",
                  "🧑‍🔬 Edad": "+12 años",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                style={{
                  width: "100%",
                  maxWidth: 1100,
                  margin: isMobile ? "48px auto 0 auto" : "72px auto 0 auto",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: isMobile ? 20 : 28 }}>
                  <Text
                    style={{
                      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                      color: "#5ad1c9",
                      fontSize: isMobile ? 10 : 11,
                      letterSpacing: 2.5,
                      fontWeight: 600,
                    }}
                  >
                    RUTA DE LA MISIÓN
                  </Text>
                  <Typography.Title
                    level={2}
                    style={{
                      color: "#fff",
                      margin: "8px 0 0 0",
                      fontSize: isMobile ? "clamp(18px, 5vw, 22px)" : "clamp(22px, 4vw, 30px)",
                    }}
                  >
                    5 estaciones, 5 mundos
                  </Typography.Title>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile 
                      ? "repeat(auto-fit, minmax(150px, 1fr))" 
                      : "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: isMobile ? 12 : 16,
                  }}
                >
                  {stationsData.map((station, i) => (
                    <StationCard
                      key={station.name}
                      index={i + 1}
                      name={station.name}
                      organismo={station.organismo}
                      habitabilidad={station.habitabilidad}
                      accentColor={station.accentColor}
                      onClick={() => navigate("/scan")}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </motion.div>

              <div style={{ width: "100%", marginTop: isMobile ? 48 : 64 }}>
                <OrganizersFooter isMobile={isMobile} />
              </div>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Home;