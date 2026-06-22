import React from "react";
import { Typography } from "antd";
import { motion } from "framer-motion";
import logo from "../../../assets/logos/logoNexo.png";
import MissionCountdown from "./MissionCountdown";

const { Title, Text } = Typography;
const ACCENT = "#5ad1c9";
const MONO = "'JetBrains Mono', 'Courier New', monospace";

const MissionHero = ({ meta = {}, buttonText = "Comenzar", onClick, isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100%",
        maxWidth: 760,
        margin: "0 auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Logo optimizado */}
      <motion.img
        src={logo}
        alt="Nexo Colectivo"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          height: isMobile ? 120 : 184,
          marginBottom: isMobile ? 12 : 18,
          filter: "drop-shadow(0 0 18px rgba(90,209,201,0.35))",
          transition: "height 0.3s ease",
        }}
      />

      <Text
        style={{
          fontFamily: MONO,
          color: ACCENT,
          fontSize: isMobile ? 10 : 12,
          letterSpacing: 3,
          fontWeight: 600,
        }}
      >
        ENCUENTRO NEXO · COLECTIVO
      </Text>

      <Title
        level={1}
        style={{
          color: "#fff",
          fontWeight: 800,
          letterSpacing: "-1px",
          margin: isMobile ? "8px 0 12px 0" : "10px 0 18px 0",
          fontSize: isMobile ? "clamp(26px, 8vw, 40px)" : "clamp(32px, 7vw, 56px)",
          textShadow: "0 0 30px rgba(90,209,201,0.25)",
          lineHeight: 1.2,
        }}
      >
        RALLY ASTROBIOLÓGICO
      </Title>

      <Text
        style={{
          display: "block",
          color: "rgba(255,255,255,0.65)",
          fontSize: isMobile ? 13 : 15,
          lineHeight: 1.6,
          maxWidth: isMobile ? "100%" : 560,
          margin: isMobile ? "0 auto 20px auto" : "0 auto 28px auto",
          padding: isMobile ? "0 8px" : "0",
        }}
      >
        Cinco estaciones, cinco mundos. Recorre el rally,
        descubre cada exoplaneta y desbloquea su ficha científica con el
        escáner de realidad aumentada.
      </Text>
      <MissionCountdown isMobile={isMobile} />
      <div
        style={{
          position: "relative",
          width: "100%",
          background: "linear-gradient(160deg, rgba(10,14,28,0.92), rgba(4,6,14,0.96))",
          border: `1px solid ${ACCENT}40`,
          borderRadius: 4,
          padding: isMobile ? "18px 16px" : "26px 28px",
          clipPath:
            "polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          textAlign: "left",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 2,
            background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile 
              ? "repeat(2, 1fr)" 
              : "repeat(auto-fit, minmax(140px, 1fr))",
            gap: isMobile ? "12px 16px" : "14px 20px",
            marginBottom: isMobile ? 18 : 24,
          }}
        >
          {Object.entries(meta).map(([label, value]) => (
            <div key={label}>
              <Text
                style={{
                  display: "block",
                  fontFamily: MONO,
                  color: "rgba(255,255,255,0.4)",
                  fontSize: isMobile ? 9.5 : 10.5,
                  letterSpacing: 1,
                  marginBottom: 4,
                }}
              >
                {label.toUpperCase()}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: isMobile ? 13 : 14.5,
                  fontWeight: 600,
                }}
              >
                {value}
              </Text>
            </div>
          ))}
        </div>

        <button
          onClick={onClick}
          style={{
            width: "100%",
            height: isMobile ? 44 : 50,
            border: "none",
            borderRadius: 4,
            background: `linear-gradient(135deg, ${ACCENT}, #2f9a92)`,
            color: "#04060e",
            fontWeight: 700,
            fontSize: isMobile ? 13 : 15,
            letterSpacing: 0.5,
            cursor: "pointer",
            fontFamily: MONO,
            // Mejorar touch target en móvil
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {buttonText.toUpperCase()} →
        </button>
      </div>
    </motion.div>
  );
};

export default MissionHero;