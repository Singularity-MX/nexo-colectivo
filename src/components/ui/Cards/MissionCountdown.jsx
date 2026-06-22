import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const { Text } = Typography;
const ACCENT = "#5ad1c9";
const MONO = "'JetBrains Mono', 'Courier New', monospace";

// ============================================================
// FECHA OBJETIVO: 28 de junio 2026, 9:00 AM (hora local)
// ============================================================
const TARGET_DATE = new Date("2026-06-28T09:00:00");

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => target.getTime() - Date.now());

  useEffect(() => {
    const tick = () => {
      const remaining = target.getTime() - Date.now();
      setTimeLeft(remaining);
    };

    tick();

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const clamped = Math.max(timeLeft, 0);
  const totalSeconds = Math.floor(clamped / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isOver: timeLeft <= 0,
  };
}

/* =========================
   DÍGITO ANIMADO 
========================= */
const FlipDigit = ({ value }) => {
  const padded = String(value).padStart(2, "0");
  return (
    <div
      style={{
        position: "relative",
        width: 44,
        height: 52,
        overflow: "hidden",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${ACCENT}33`,
        borderRadius: 4,
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={padded}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 26,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {padded}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/* =========================
   BLOQUE: número y etiqueta
========================= */
const TimeBlock = ({ value, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    <FlipDigit value={value} />
    <Text
      style={{
        fontFamily: MONO,
        color: "rgba(255,255,255,0.4)",
        fontSize: 9.5,
        letterSpacing: 1.5,
        textTransform: "uppercase",
      }}
    >
      {label}
    </Text>
  </div>
);

const Separator = () => (
  <Text
    style={{
      fontFamily: MONO,
      color: `${ACCENT}66`,
      fontSize: 22,
      fontWeight: 700,
      marginTop: -16,
    }}
  >
    :
  </Text>
);

/* =========================
   cuenta regresiva completa
========================= */
const MissionCountdown = ({ isMobile }) => {
  const { days, hours, minutes, seconds, isOver } = useCountdown(TARGET_DATE);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "linear-gradient(160deg, rgba(10,14,28,0.92), rgba(4,6,14,0.96))",
        border: `1px solid ${ACCENT}40`,
        borderRadius: 4,
        padding: isMobile ? "16px 12px" : "20px 22px",
        marginBottom: isMobile ? 18 : 24,
        clipPath:
          "polygon(0 14px, 14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
        boxShadow: `0 0 30px rgba(90,209,201,0.08)`,
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginBottom: isMobile ? 12 : 16,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: isOver ? "#ff5c5c" : ACCENT,
            boxShadow: `0 0 8px ${isOver ? "#ff5c5c" : ACCENT}`,
            animation: isOver ? "none" : "pulse-countdown 1.5s infinite",
          }}
        />
        <Text
          style={{
            fontFamily: MONO,
            color: isOver ? "#ff5c5c" : "rgba(255,255,255,0.5)",
            fontSize: isMobile ? 10 : 11,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {isOver ? "¡MISIÓN EN CURSO!" : "CUENTA REGRESIVA"}
        </Text>
      </div>

      {isOver ? (
        <div style={{ textAlign: "center" }}>
          <Text
            style={{
              display: "block",
              color: ACCENT,
              fontFamily: MONO,
              fontSize: isMobile ? 13 : 15,
              fontWeight: 700,
              letterSpacing: 1,
              marginBottom: 6,
            }}
          >
            🚀 EL RALLY HA COMENZADO
          </Text>
          <Text
            style={{
              display: "block",
              color: "rgba(255,255,255,0.4)",
              fontSize: isMobile ? 10 : 11,
              fontFamily: MONO,
            }}
          >
            28 DE JUNIO 2026 · 9:00 AM
          </Text>
        </div>
      ) : (
        <>
          {/* Contador */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: isMobile ? 4 : 8,
              flexWrap: "nowrap",
              marginBottom: isMobile ? 10 : 14,
            }}
          >
            <TimeBlock value={days} label="Días" />
            <Separator />
            <TimeBlock value={hours} label="Horas" />
            <Separator />
            <TimeBlock value={minutes} label="Min" />
            <Separator />
            <TimeBlock value={seconds} label="Seg" />
          </div>

          
          <Text
            style={{
              display: "block",
              textAlign: "center",
              color: "rgba(255,255,255,0.3)",
              fontSize: isMobile ? 9 : 10,
              fontFamily: MONO,
              letterSpacing: 1,
            }}
          >
            28 JUN 2026 · 09:00 AM
          </Text>
        </>
      )}
    </div>
  );
};

export default MissionCountdown;