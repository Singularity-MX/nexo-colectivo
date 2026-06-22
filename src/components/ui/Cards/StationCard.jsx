import React from "react";
import { Typography } from "antd";
import { motion } from "framer-motion";

const { Text, Title } = Typography;

const StationCard = ({
  index,
  name,
  organismo,
  habitabilidad,
  accentColor = "#5ad1c9",
  onClick,
  isMobile,
}) => {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -4 }} 
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        background: "linear-gradient(160deg, rgba(10,14,28,0.9), rgba(4,6,14,0.95))",
        border: `1px solid ${accentColor}33`,
        borderRadius: 4,
        padding: isMobile ? "14px 16px" : "18px 20px",
        minHeight: isMobile ? 130 : 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        clipPath:
          "polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.02) inset, 0 8px 24px rgba(0,0,0,0.35)`,
        overflow: "hidden",
        // Mejorar interacción táctil
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 2,
          background: accentColor,
          opacity: 0.7,
        }}
      />

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Text
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            color: accentColor,
            fontSize: isMobile ? 10 : 11,
            letterSpacing: 1.5,
            fontWeight: 600,
          }}
        >
          ESTACIÓN {String(index).padStart(2, "0")}
        </Text>

        <div
          style={{
            width: isMobile ? 6 : 8,
            height: isMobile ? 6 : 8,
            borderRadius: "50%",
            background: accentColor,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />
      </div>

      <Title
        level={4}
        style={{
          color: "#fff",
          margin: isMobile ? "8px 0 4px 0" : "10px 0 4px 0",
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: isMobile ? 16 : 19,
          letterSpacing: 0.5,
        }}
      >
        {name}
      </Title>

      <Text
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: isMobile ? 11 : 12.5,
          lineHeight: 1.4,
        }}
      >
        Organismo dominante:{" "}
        <span style={{ color: "rgba(255,255,255,0.85)" }}>{organismo}</span>
      </Text>

      <div style={{ marginTop: isMobile ? 10 : 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: isMobile ? 9 : 10,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: 1,
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            }}
          >
            HABITABILIDAD
          </Text>
          <Text
            style={{
              fontSize: isMobile ? 10 : 11,
              color: accentColor,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            }}
          >
            {habitabilidad}%
          </Text>
        </div>
        <div
          style={{
            width: "100%",
            height: isMobile ? 3 : 4,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${habitabilidad}%`,
              height: "100%",
              background: accentColor,
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StationCard;