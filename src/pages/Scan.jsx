import React, { useState } from "react";
import { Layout } from "antd";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import SvgComponent from "../assets/textura.jsx";
import MindARViewer from "../components/ui/Cards/MindARViewer";

/* =========================
   BACKGROUND — mismo sistema que Home/About/Information
========================= */
const Background = () => (
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
    <SvgComponent
      preserveAspectRatio="xMidYMid slice"
      style={{
        width: "100vw",
        height: "100dvh",
        opacity: 0.1,
      }}
    />
  </div>
);

const Scan = () => {
  const navigate = useNavigate();

  // Mientras el visor AR esté activo (cámara + escena 3D ocupando toda
  // la pantalla), ocultamos el Navbar y el Background propios de la
  // página: el MindARViewer ya tiene su propio fondo y su propio HUD.
  const [arActive, setArActive] = useState(false);

  const items = [
    { key: "home", label: "Inicio" },
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
        background: "#04060e",
        overflow: "hidden",
      }}
    >
      {!arActive && <Background />}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!arActive && (
          <Navbar
            items={items}
            onNavigate={handleNavigate}
            initialSelectedKey="scan"
            logoIcon={<img src={logo} alt="logo" style={{ height: 40 }} />}
            logoText={<img src={letras} alt="text" style={{ height: 20 }} />}
          />
        )}

        {/*
          MindARViewer maneja su propia capa fixed/fullscreen
          internamente (tanto la pantalla de briefing como la cámara
          en vivo), con z-index propios calibrados para quedar SIEMPRE
          por debajo del Navbar (z-index 50) pero por encima del fondo.
          Por eso este <main> ya no necesita altura ni padding
          especiales: solo actúa como punto de montaje.
        */}
        <main>
          <MindARViewer onStateChange={setArActive} />
        </main>
      </div>
    </Layout>
  );
};

export default Scan;