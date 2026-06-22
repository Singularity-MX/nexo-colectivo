import React, { useEffect, useRef } from "react";
import { Card, Typography, Grid } from "antd";
import { motion } from "framer-motion";
import katex from "katex";

// === IMÁGENES ===

import zonaHabitableIMG from "../../../assets/imgs/habitableZone.webp";
import transitoIMG from "../../../assets/imgs/transit.webp";
import espectroIMG from "../../../assets/imgs/espectro.webp";
import arbolVidaIMG from "../../../assets/imgs/extremofilos.webp";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const ACCENT = "#5ad1c9";
const MONO = "'JetBrains Mono', 'Courier New', monospace";

/* =========================
   KATEX BLOCK
========================= */
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
  return (
    <div
      ref={ref}
      style={{
        color: "#fff",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(90,209,201,0.2)",
        borderRadius: 4,
        padding: "18px 16px",
        overflowX: "auto",
      }}
    />
  );
};

/* =========================
   ANIMACIONES BASE
========================= */
const sectionVariant = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const stepContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const stepVariant = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* =========================
   PRIMITIVOS DE ESTILO 
========================= */

const Eyebrow = ({ children }) => (
  <Text
    style={{
      fontFamily: MONO,
      textTransform: "uppercase",
      letterSpacing: 2.5,
      color: ACCENT,
      fontSize: 11,
      fontWeight: 600,
      display: "block",
      textAlign: "center",
      marginBottom: 6,
    }}
  >
    {children}
  </Text>
);


const HudPanel = ({ children, style = {} }) => (
  <div
    style={{
      position: "relative",
      background: "linear-gradient(160deg, rgba(10,14,28,0.92), rgba(4,6,14,0.96))",
      border: "1px solid rgba(90,209,201,0.18)",
      borderRadius: 4,
      padding: "20px 22px",
      clipPath:
        "polygon(0 14px, 14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 2,
        background: "linear-gradient(90deg, #5ad1c9, transparent)",
      }}
    />
    {children}
  </div>
);

const HudLabel = ({ children }) => (
  <Text
    style={{
      fontFamily: MONO,
      color: ACCENT,
      fontSize: 11.5,
      letterSpacing: 1.5,
      fontWeight: 700,
      textTransform: "uppercase",
    }}
  >
    {children}
  </Text>
);

const BodyText = ({ children, style = {} }) => (
  <Paragraph
    style={{
      color: "rgba(255,255,255,0.65)",
      lineHeight: 1.75,
      fontSize: 14.5,
      textAlign: "left",
      marginTop: 10,
      marginBottom: 0,
      ...style,
    }}
  >
    {children}
  </Paragraph>
);

/* =========================
   SECTION WRAPPER
========================= */
const Section = ({ eyebrow, title, children }) => (
  <motion.div
    variants={sectionVariant}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    style={{ marginTop: 36 }}
  >
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <Title
      level={3}
      style={{
        textAlign: "center",
        marginBottom: 18,
        color: "#fff",
        fontSize: "clamp(19px, 3.5vw, 24px)",
      }}
    >
      {title}
    </Title>
    {children}
  </motion.div>
);

/* =========================
   MÉTODOS DE DETECCIÓN
========================= */
const detectionMethods = [
  {
    n: "01",
    title: "Tránsito",
    desc: "Se mide la luz de una estrella en el tiempo. Cuando un planeta pasa frente a ella, su brillo cae ligeramente y de forma periódica.",
  },
  {
    n: "02",
    title: "Velocidad radial",
    desc: "La gravedad del planeta hace que la estrella 'se tambalee'. Ese bamboleo se detecta como un corrimiento Doppler en su espectro de luz.",
  },
  {
    n: "03",
    title: "Imagen directa",
    desc: "En casos excepcionales, telescopios muy potentes bloquean la luz de la estrella y capturan el punto de luz del planeta directamente.",
  },
];

/* =========================
   PILARES DE LA ASTROBIOLOGÍA
========================= */
const pillars = [
  {
    n: 1,
    title: "Origen de la vida",
    desc: "Estudia cómo la química pudo organizarse en sistemas capaces de replicarse, usando la Tierra primitiva como caso de estudio.",
  },
  {
    n: 2,
    title: "Límites de la vida (extremófilos)",
    desc: "Organismos terrestres que sobreviven en condiciones extremas — calor, frío, radiación, ausencia de luz — amplían lo que consideramos 'habitable'.",
  },
  {
    n: 3,
    title: "Detección de exoplanetas",
    desc: "Identifica mundos fuera del sistema solar y caracteriza sus condiciones físicas: tamaño, órbita, temperatura, composición atmosférica.",
  },
  {
    n: 4,
    title: "Búsqueda de biofirmas",
    desc: "Analiza la luz que atraviesa o se refleja en una atmósfera exoplanetaria buscando huellas químicas asociadas a procesos biológicos.",
  },
];

/* =========================
   STEP ITEM 
========================= */
const StepItem = ({ n, title, desc }) => (
  <motion.div
    variants={stepVariant}
    style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
  >
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "rgba(90,209,201,0.1)",
        border: `1px solid ${ACCENT}`,
        color: ACCENT,
        fontSize: 12,
        fontFamily: MONO,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      {n}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 5, color: "#fff" }}>
        {title}
      </div>
      <div style={{ lineHeight: 1.65, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
        {desc}
      </div>
    </div>
  </motion.div>
);

/* =========================
   MAIN
========================= */
const HowItWorks = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 950,
        margin: "0 auto",
        borderRadius: 4,
        background: "linear-gradient(160deg, rgba(8,11,24,0.85), rgba(4,6,14,0.92))",
        border: "1px solid rgba(90,209,201,0.15)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      }}
      styles={{
        body: { padding: isMobile ? 20 : 44 },
      }}
    >
      {/* ================= INTRO: ¿QUÉ ES LA ASTROBIOLOGÍA? ================= */}
      <Section eyebrow="Marco teórico" title="¿Qué es la astrobiología?">
        <BodyText>
          La astrobiología es el campo científico que estudia el origen, la
          evolución, la distribución y el futuro de la vida — tanto en la
          Tierra como en el resto del universo. Combina biología, química,
          geología, física y astronomía para responder una pregunta central:
          <Text strong style={{ color: "#fff" }}> ¿estamos solos?</Text>
        </BodyText>

        <HudPanel style={{ marginTop: 18 }}>
          <HudLabel>Idea clave</HudLabel>
          <BodyText style={{ color: "rgba(255,255,255,0.75)" }}>
            No buscamos vida idéntica a la terrestre, sino las condiciones
            físicas y químicas que la hacen posible: agua líquida, una fuente
            de energía estable y los elementos básicos de la química
            orgánica (carbono, hidrógeno, oxígeno, nitrógeno, fósforo y azufre).
          </BodyText>
        </HudPanel>
      </Section>

      {/* ================= 4 PILARES ================= */}
      <Section title="Los cuatro pilares de la disciplina">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 14,
          }}
        >
          {pillars.map((p) => (
            <HudPanel key={p.n}>
              <Text
                style={{
                  fontFamily: MONO,
                  color: ACCENT,
                  fontSize: 11,
                  letterSpacing: 1,
                }}
              >
                PILAR {String(p.n).padStart(2, "0")}
              </Text>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, margin: "6px 0" }}>
                {p.title}
              </div>
              <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, lineHeight: 1.6 }}>
                {p.desc}
              </Text>
            </HudPanel>
          ))}
        </div>
      </Section>

      {/* ================= EXTREMÓFILOS ================= */}
      <Section eyebrow="Vida en los límites" title="Extremófilos: redefiniendo lo habitable">
        <BodyText>
          En la Tierra existen organismos que prosperan en condiciones que
          alguna vez se creyeron incompatibles con la vida: fuentes
          hidrotermales a más de 100 °C, lagos hipersalinos, hielo antártico
          o ambientes con radiación intensa. Estos extremófilos son la
          principal evidencia de que la "zona habitable" puede ser mucho
          más amplia de lo que imaginamos.
        </BodyText>

        <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div style={{ marginTop: 18 }}>
            <img
              src={arbolVidaIMG}
              alt="Diversidad de extremófilos en distintos ambientes terrestres"
              style={{ width: "100%", borderRadius: 4, border: "1px solid rgba(90,209,201,0.15)" }}
            />
            <Text
              style={{
                display: "block",
                marginTop: 8,
                fontSize: 11.5,
                color: "rgba(255,255,255,0.4)",
                fontFamily: MONO,
                textAlign: "center",
              }}
            >
              FIG. 01 — Organismos extremófilos: termófilos, halófilos y psicrófilos
            </Text>
          </div>
        </motion.div>
      </Section>

      {/* ================= DETECCIÓN DE EXOPLANETAS ================= */}
      <Section eyebrow="Caza de mundos" title="¿Cómo se detecta un exoplaneta?">
        <BodyText>
          Los exoplanetas están demasiado lejos y son demasiado tenues para
          fotografiarse directamente en la mayoría de los casos. En su lugar,
          se infieren observando cómo afectan a su estrella anfitriona.
        </BodyText>

        <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div style={{ marginTop: 18 }}>
            <img
              src={transitoIMG}
              alt="Diagrama del método de tránsito: curva de luz de la estrella"
              style={{ width: "100%", borderRadius: 4, border: "1px solid rgba(90,209,201,0.15)" }}
            />
            <Text
              style={{
                display: "block",
                marginTop: 8,
                fontSize: 11.5,
                color: "rgba(255,255,255,0.4)",
                fontFamily: MONO,
                textAlign: "center",
              }}
            >
              FIG. 02 — Método de tránsito: la caída de brillo revela tamaño y periodo orbital
            </Text>
          </div>
        </motion.div>

        <motion.div
          variants={stepContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 24 }}
        >
          {detectionMethods.map((m) => (
            <StepItem key={m.n} n={m.n} title={m.title} desc={m.desc} />
          ))}
        </motion.div>
      </Section>

      {/* ================= ZONA HABITABLE ================= */}
      <Section eyebrow="La región Goldilocks" title="Zona habitable">
        <BodyText>
          Es el rango de distancias orbitales alrededor de una estrella donde
          la temperatura de equilibrio permite que el agua exista en estado
          líquido sobre la superficie de un planeta rocoso — ni tan cerca que
          se evapore, ni tan lejos que se congele.
        </BodyText>

        <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div style={{ marginTop: 18 }}>
            <img
              src={zonaHabitableIMG}
              alt="Diagrama de la zona habitable alrededor de distintos tipos de estrella"
              style={{ width: "100%", borderRadius: 4, border: "1px solid rgba(90,209,201,0.15)" }}
            />
            <Text
              style={{
                display: "block",
                marginTop: 8,
                fontSize: 11.5,
                color: "rgba(255,255,255,0.4)",
                fontFamily: MONO,
                textAlign: "center",
              }}
            >
              FIG. 03 — La zona habitable se desplaza según el tipo y brillo de la estrella
            </Text>
          </div>
        </motion.div>

        <HudPanel style={{ marginTop: 18 }}>
          <HudLabel>Dato relevante para el rally</HudLabel>
          <BodyText style={{ color: "rgba(255,255,255,0.75)" }}>
            Las estrellas enana roja (como TRAPPIST-1 y Proxima Centauri) son
            más frías que el Sol, así que su zona habitable está mucho más
            cerca de la estrella — por eso esos exoplanetas tienen años tan
            cortos, de pocos días terrestres.
          </BodyText>
        </HudPanel>
      </Section>

      {/* ================= BIOFIRMAS ================= */}
      <Section eyebrow="Buscando huellas de vida" title="¿Qué es una biofirma?">
        <BodyText>
          Una biofirma es cualquier sustancia, patrón o señal que pueda
          interpretarse como evidencia de actividad biológica pasada o
          presente. En exoplanetas, se buscan principalmente en la
          composición de su atmósfera.
        </BodyText>

        <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div style={{ marginTop: 18 }}>
            <img
              src={espectroIMG}
              alt="Espectro de absorción atmosférica mostrando líneas de gases biofirma"
              style={{ width: "100%", borderRadius: 4, border: "1px solid rgba(90,209,201,0.15)" }}
            />
            <Text
              style={{
                display: "block",
                marginTop: 8,
                fontSize: 11.5,
                color: "rgba(255,255,255,0.4)",
                fontFamily: MONO,
                textAlign: "center",
              }}
            >
              FIG. 04 — Espectroscopía atmosférica: cada gas deja una "huella digital" en la luz
            </Text>
          </div>
        </motion.div>

        <div style={{ marginTop: 22 }}>
          <MathBlock formula={"T_{eq} \\approx T_{\\star}\\sqrt{\\dfrac{R_{\\star}}{2a}}\\,(1-A)^{1/4}"} />
        </div>
        <Text
          style={{
            display: "block",
            marginTop: 8,
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
          }}
        >
          Temperatura de equilibrio: relaciona la temperatura estelar (T★), el radio
          estelar (R★), la distancia orbital (a) y el albedo del planeta (A).
        </Text>

        <HudPanel style={{ marginTop: 18 }}>
          <HudLabel>Gases biofirma comunes</HudLabel>
          <BodyText style={{ color: "rgba(255,255,255,0.75)" }}>
            Oxígeno (O₂) y ozono (O₃) en combinación con metano (CH₄) son
            interesantes porque, en la Tierra, su coexistencia depende de
            que algo los esté regenerando constantemente — en nuestro caso,
            la fotosíntesis.
          </BodyText>
        </HudPanel>
      </Section>

      {/* ================= CONEXIÓN CON EL RALLY ================= */}
      <Section eyebrow="De la teoría a la misión" title="Los 5 mundos del rally">
        <BodyText>
          Cada estación del Nexo representa un exoplaneta real o un análogo
          basado en datos científicos actuales. La "habitabilidad" que verás
          en cada ficha es una estimación didáctica que combina los
          conceptos anteriores: distancia a su estrella, tipo estelar,
          temperatura y evidencia (o ausencia) de agua.
        </BodyText>

        <HudPanel style={{ marginTop: 18 }}>
          <HudLabel>Cómo leer cada ficha</HudLabel>
          <BodyText style={{ color: "rgba(255,255,255,0.75)" }}>
            Al escanear cada estación con el AR, vincula lo que acabas de leer
            aquí con datos concretos: tipo de estrella, zona habitable,
            temperatura estimada y la posible química de su atmósfera.
          </BodyText>
        </HudPanel>
      </Section>

      {/* ================= CONSIDERACIONES ================= */}
      <Section eyebrow="Límites del modelo" title="Consideraciones finales">
        <HudPanel>
          <HudLabel>Nota técnica</HudLabel>
          <BodyText style={{ color: "rgba(255,255,255,0.75)" }}>
            La existencia de condiciones favorables no garantiza la presencia
            de vida — solo indica que, según lo que sabemos hoy, no la
            descarta. La astrobiología trabaja con probabilidades e
            inferencias, no con certezas.
          </BodyText>
        </HudPanel>

        <HudPanel style={{ marginTop: 14 }}>
          <Text
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
            }}
          >
            Los datos de los exoplanetas presentados están basados en
            observaciones reales (NASA Exoplanet Archive, ESA), aunque los
            organismos dominantes de cada estación son representaciones
            didácticas y especulativas con fines educativos.
          </Text>
        </HudPanel>
      </Section>
    </Card>
  );
};

export default HowItWorks;