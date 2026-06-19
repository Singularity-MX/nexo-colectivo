import React from "react";
import { Card, Typography, Grid } from "antd";
import { motion } from "framer-motion";
import { BlockMath } from "react-katex";
import absorbancia from "../../../assets/imgs/absorbancia.jpg";
import arbol from "../../../assets/imgs/arbol.png";
import katex from "katex";
import { useEffect, useRef } from "react";

const MathBlock = ({ formula }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(formula, ref.current, {
        throwOnError: false,
        displayMode: true,
      });
    }
  }, [formula]);

  return <div ref={ref} />;
};

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

/* =========================
   ANIMACIONES BASE
========================= */
const sectionVariant = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stepContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const stepVariant = {
  hidden: { opacity: 0, x: -15 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* =========================
   STEPS (SIN CAMBIOS)
========================= */
const steps = [
  {
    n: 1,
    title: "Carga de imagen",
    desc: "El usuario captura o importa una imagen de una hoja vegetal mediante cámara o archivo local.",
  },
  {
    n: 2,
    title: "Selección de modo de análisis",
    desc: (
      <>
        Se define el tipo de muestreo:
        <div style={{ marginTop: 6 }}>
          • Punto único: análisis localizado de alta sensibilidad.<br />
          • Multipunto: estimación global mediante promedios espaciales.
        </div>
      </>
    ),
  },
  {
    n: 3,
    title: "Interacción sobre la imagen",
    desc: "El usuario selecciona regiones específicas de la hoja directamente en la interfaz visual.",
  },
  {
    n: 4,
    title: "Procesamiento de color",
    desc: "Se calcula el promedio de color en la región seleccionada, filtrando ruido por iluminación y valores extremos.",
  },
  {
    n: 5,
    title: "Generación del índice vegetal",
    desc: "Se computa un índice basado en la relación entre los canales RGB normalizados como proxy de vigor vegetal.",
  },
];

/* =========================
   STEP ITEM (ANIMADO)
========================= */
const StepItem = ({ step }) => {
  return (
    <motion.div
      variants={stepVariant}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#111",
          color: "#fff",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {step.n}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 6,
            textAlign: "left",
          }}
        >
          {step.title}
        </div>

        <div
          style={{
            textAlign: "justify",
            lineHeight: 1.65,
            color: "#333",
            fontSize: 14,
          }}
        >
          {step.desc}
        </div>
      </div>
    </motion.div>
  );
};

/* =========================
   SECTION WRAPPER
========================= */
const Section = ({ title, children }) => (
  <motion.div
    variants={sectionVariant}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    style={{ marginTop: 28 }}
  >
    <Title level={4} style={{ textAlign: "center", marginBottom: 16 }}>
      {title}
    </Title>
    {children}
  </motion.div>
);

/* =========================
   MAIN
========================= */
const WikiModel = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const textStyle = {
    textAlign: "justify",
    lineHeight: 1.7,
    color: "#333",
    marginTop: 30,
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 950,
        margin: "0 auto",
        borderRadius: 18,
        border: "1px solid rgba(0,0,0,0.08)",
      }}
      styles={{
        body: { padding: isMobile ? 18 : 40 },
      }}
    >
      {/* ================= INTRO ================= */}
      <Section title="Monitoreo vegetal y teledetección">
        <Paragraph style={textStyle}>
          El monitoreo fisiológico de vegetación mediante análisis espectral permite estimar el estado de salud de una planta sin contacto físico, utilizando la interacción entre radiación electromagnética y pigmentos fotosintéticos.
        </Paragraph>

        <Card style={{ marginTop: 18, borderRadius: 12, background: "#fafafa" }}>
          <Text strong>Idea clave</Text>
          <Paragraph style={{ marginTop: 6, marginBottom: 0 }}>
            La salud vegetal puede inferirse a partir de patrones de absorción y reflectancia de luz en distintas longitudes de onda.
          </Paragraph>
        </Card>


      </Section>

      {/* ================= CLOROFILA ================= */}
      <Section title="Clorofila y espectro de absorción">
        <Paragraph style={textStyle}>
          La clorofila regula la absorción de energía lumínica necesaria para la fotosíntesis, con comportamiento espectral diferenciado.
        </Paragraph>

        <Card style={{ marginTop: 16, borderRadius: 12 }}>

          <Text strong>Espectro funcional</Text>
          <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ marginTop: 24 }}>
              <img src={absorbancia} alt="Absorción de luz por clorofila" style={{ width: "100%", borderRadius: 12 }} />
            </div>
          </motion.div>
          <div style={{ marginTop: 10 }}>
            <Text>• Clorofila A → máxima eficiencia en azul y rojo</Text><br />
            <Text>• Clorofila B → amplía absorción en región azul-verde</Text>
          </div>
        </Card>

        <Card style={{ marginTop: 14, borderRadius: 12, background: "#f7f7f7" }}>
          <Text>
            La reflectancia en verde se incrementa debido a la menor absorción en esa banda, generando la percepción visual característica de las hojas.
          </Text>
        </Card>
      </Section>

      {/* ================= NDVI ================= */}
      <Section title="NDVI: índice de vegetación">
        <Paragraph style={textStyle}>
          El NDVI es un índice espectral utilizado en teledetección para estimar biomasa y vigor vegetal a partir de bandas roja e infrarroja cercana.
        </Paragraph>

        <div style={{ marginTop: 30 }}>
         <MathBlock formula={"NDVI = \\frac{NIR - RED}{NIR + RED}"} />
        </div>

        <Card style={{ marginTop: 18, borderRadius: 12 }}>
          <Text strong>Interpretación física</Text>
          <div style={{ marginTop: 10 }}>
            <Text>• Valores altos → vegetación sana y activa</Text><br />
            <Text>• Valores bajos → estrés hídrico o degradación</Text>
          </div>
        </Card>

        <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div style={{ marginTop: 24 }}>
            <img src={arbol} alt="NDVI conceptual" style={{ width: "100%", borderRadius: 12 }} />
          </div>
        </motion.div>
      </Section>

      {/* ================= MODEL ================= */}
      <Section title="Modelo basado en RGB">
        <Paragraph style={textStyle}>
          Debido a la ausencia de sensores multiespectrales, se emplea una aproximación basada en espacio RGB como estimador indirecto de actividad fotosintética.
        </Paragraph>

        <div style={{ marginTop: 30 }}>
          <MathBlock formula={"ICV \\; \\approx \\; ExG = \\frac{2G - R - B}{R + G + B}"} />
        </div>

        <Card style={{ marginTop: 18, borderRadius: 12 }}>
          <Text strong>Significado del modelo</Text>
          <div style={{ marginTop: 10 }}>
            <Text>• R, G, B → componentes del color digital</Text><br />
            <Text>• ExG → énfasis del canal verde normalizado</Text>
          </div>
        </Card>
      </Section>

      {/* ================= STEPPER ANIMADO ================= */}
      <Section title="Uso del sistema de análisis">
        <Paragraph style={textStyle}>
          El sistema opera como un flujo interactivo de adquisición y análisis de color sobre imágenes de vegetación.
        </Paragraph>

        <motion.div
          variants={stepContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 34,
          }}
        >
          {steps.map((step) => (
            <StepItem key={step.n} step={step} />
          ))}
        </motion.div>
      </Section>

      {/* ================= Nota tecnica ================= */}
      <Section title="Consideraciones">

        <Card style={{ marginTop: 18, borderRadius: 12 }}>
          <Text strong>Nota técnica</Text>
          <Paragraph style={{ ...textStyle, marginTop: 8 }}>
            El modo multipunto reduce la varianza espacial del color, estabilizando la estimación del estado general de la hoja.
            El modo de punto único es más sensible a variaciones locales.
          </Paragraph>
        </Card>
        <Card style={{ marginTop: 18, borderRadius: 12 }}>
          <div style={{ marginTop: 14 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Este sistema representa una estimación visual basada en RGB. No sustituye análisis espectrales ni diagnóstico agronómico profesional.
            </Text>
          </div>
        </Card>
      </Section>
    </Card>
  );
};

export default WikiModel;