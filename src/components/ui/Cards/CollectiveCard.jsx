import React from "react";
import { Typography, Button, Grid, Space, Tag } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  GlobalOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const ACCENT = "#5ad1c9";
const MONO = "'JetBrains Mono', 'Courier New', monospace";

const iconMap = {
  Instagram: <InstagramOutlined />,
  Facebook: <FacebookOutlined />,
  LinkedIn: <LinkedinOutlined />,
  Website: <GlobalOutlined />,
};

/*
  Card de colectivo — versión "mission control":
  panel oscuro con esquinas cortadas (mismo lenguaje de StationCard),
  línea de acento turquesa superior, labels en monospace.
*/
const CollectiveCard = ({
  title,
  image,
  description,
  website,
  social = [],
  category,
  onSocialClick,
}) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <motion.div
      whileHover={{
        y: isMobile ? 0 : -6,
      }}
      transition={{ duration: 0.25 }}
      style={{
        width: "100%",
        maxWidth: 900,
        margin: isMobile ? "0 auto 18px auto" : "0 auto 36px auto",
        position: "relative",
        background: "linear-gradient(160deg, rgba(10,14,28,0.92), rgba(4,6,14,0.96))",
        border: "1px solid rgba(90,209,201,0.18)",
        borderRadius: 4,
        overflow: "hidden",
        clipPath: isMobile
          ? "polygon(0 14px, 14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)"
          : "polygon(0 18px, 18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      {/* Línea de acento superior, igual que StationCard */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 2,
          background: "linear-gradient(90deg, #5ad1c9, transparent)",
          zIndex: 2,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* HEADER MOBILE — fuera de la imagen, evita empalme con
            logos/texto que ya traen las fotos */}
        {isMobile && (
          <div
            style={{
              padding: "18px 18px 10px 18px",
            }}
          >
            {category && (
              <Tag
                style={{
                  borderRadius: 2,
                  padding: "2px 9px",
                  fontWeight: 500,
                  marginBottom: 8,
                  background: "rgba(90,209,201,0.1)",
                  border: `1px solid ${ACCENT}55`,
                  color: ACCENT,
                  fontFamily: MONO,
                  fontSize: 10,
                }}
              >
                {category}
              </Tag>
            )}
            <Text
              style={{
                fontFamily: MONO,
                textTransform: "uppercase",
                letterSpacing: 1.8,
                color: "rgba(255,255,255,0.4)",
                fontSize: 10.5,
                fontWeight: 600,
              }}
            >
              COLECTIVO
            </Text>
            <Title
              level={4}
              style={{
                margin: "3px 0 0 0",
                color: "#fff",
                lineHeight: 1.25,
              }}
            >
              {title}
            </Title>
          </div>
        )}

        {/* IMAGE SIDE */}
        <div
          style={{
            width: isMobile ? "100%" : "45%",
            height: isMobile ? 150 : "auto",
            minHeight: isMobile ? 150 : 420,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {image && (
            <motion.img
              src={image}
              alt={title}
              initial={{ opacity: 0, scale: 1.08 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.88) saturate(1.05)",
              }}
            />
          )}

          {/* Vignette oscuro consistente con el fondo espacial.
              En desktop además da espacio para el corte HUD del borde. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isMobile
                ? "linear-gradient(180deg, rgba(4,6,14,0.05) 0%, rgba(4,6,14,0.25) 100%)"
                : "linear-gradient(90deg, transparent 60%, rgba(4,6,14,0.4) 100%)",
            }}
          />
        </div>

        {/* CONTENT SIDE */}
        <div
          style={{
            width: isMobile ? "100%" : "55%",
            padding: isMobile ? "12px 18px 18px 18px" : "40px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {!isMobile && (
              <>
                {category && (
                  <Tag
                    style={{
                      borderRadius: 2,
                      padding: "3px 11px",
                      fontWeight: 500,
                      marginBottom: 16,
                      background: "rgba(90,209,201,0.1)",
                      border: `1px solid ${ACCENT}55`,
                      color: ACCENT,
                      fontFamily: MONO,
                      fontSize: 11,
                    }}
                  >
                    {category}
                  </Tag>
                )}

                <Text
                  style={{
                    fontFamily: MONO,
                    textTransform: "uppercase",
                    letterSpacing: 2.5,
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  COLECTIVO
                </Text>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Title
                    level={2}
                    style={{
                      marginTop: 8,
                      marginBottom: 0,
                      color: "#fff",
                    }}
                  >
                    {title}
                  </Title>

                  <div
                    style={{
                      width: 50,
                      height: 2,
                      background: ACCENT,
                      marginTop: 14,
                      marginBottom: 20,
                    }}
                  />
                </motion.div>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Paragraph
                style={{
                  fontSize: isMobile ? 13.5 : 15.5,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: isMobile ? 1.55 : 1.75,
                  textAlign: "left",
                  marginBottom: isMobile ? 14 : 26,
                  marginTop: 0,
                }}
              >
                {description}
              </Paragraph>
            </motion.div>

            {social.length > 0 && (
              <>
                {!isMobile && (
                  <Text
                    style={{
                      display: "block",
                      marginBottom: 12,
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Encuéntranos en:
                  </Text>
                )}

                <Space
                  wrap
                  size={[8, 8]}
                  style={{
                    marginBottom: isMobile ? 10 : 0,
                  }}
                >
                  {social.map((s, i) => (
                    <Button
                      key={i}
                      size={isMobile ? "small" : "middle"}
                      icon={iconMap[s.label] || null}
                      onClick={() => onSocialClick?.(s)}
                      style={{
                        borderRadius: 4,
                        height: isMobile ? 30 : 38,
                        padding: isMobile ? "0 12px" : "0 18px",
                        fontSize: isMobile ? 12.5 : 14,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.8)",
                        fontWeight: 500,
                      }}
                    >
                      {s.label}
                    </Button>
                  ))}
                </Space>
              </>
            )}
          </div>

          {website && website !== "#" && (
            <div
              style={{
                marginTop: isMobile ? 12 : 34,
              }}
            >
              <Button
                block
                size={isMobile ? "middle" : "large"}
                icon={<GlobalOutlined />}
                onClick={() => window.open(website, "_blank")}
                style={{
                  height: isMobile ? 40 : 48,
                  borderRadius: 4,
                  fontSize: isMobile ? 13.5 : 15,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  border: "none",
                  background: "linear-gradient(135deg, #5ad1c9, #2f9a92)",
                  color: "#04060e",
                  fontFamily: MONO,
                }}
              >
                SITIO WEB →
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CollectiveCard;