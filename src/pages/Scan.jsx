import React, { useState } from "react";
import { Layout } from "antd";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import SvgComponent from "../assets/textura.jsx";
import MindARViewer from "../components/ui/Cards/MindARViewer";

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
  const [arActive, setArActive] = useState(false);

    const items = [
    { key: "", label: "Inicio" },
    { key: "information", label: "Astrobiología" },
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

        <main>
          <MindARViewer onStateChange={setArActive} />
        </main>
      </div>
    </Layout>
  );
};

export default Scan;