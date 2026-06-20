import React from "react";
import { Card, Typography, Button, Grid, Space, Tag } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  GlobalOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const iconMap = {
  Instagram: <InstagramOutlined />,
  Facebook: <FacebookOutlined />,
  LinkedIn: <LinkedinOutlined />,
  Website: <GlobalOutlined />,
};

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
    >
      <Card
        hoverable
        style={{
          width: "100%",
          maxWidth: 900,
          margin: isMobile ? "0 auto 20px auto" : "0 auto 40px auto",
          borderRadius: isMobile ? 16 : 22,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: isMobile
            ? "0 6px 18px rgba(0,0,0,0.07)"
            : "0 12px 35px rgba(0,0,0,0.08)",
        }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {/* ===== MOBILE HEADER (fuera de la imagen) ===== */}
          {/*
            La imagen ya trae su propio logo/texto incrustado, así que
            superponer el título encima (con gradiente) se empalmaba con
            ese texto. Ahora el título vive en su propio bloque, ARRIBA
            de la imagen, como un header compacto tipo "ficha".
          */}
          {isMobile && (
            <div
              style={{
                padding: "16px 18px 12px 18px",
                background: "#fff",
              }}
            >
              {category && (
                <Tag
                  style={{
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                  color="blue"
                >
                  {category}
                </Tag>
              )}
              <Text
                style={{
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: "#999",
                  fontSize: 10.5,
                  fontWeight: 600,
                }}
              >
                Colectivo
              </Text>
              <Title
                level={4}
                style={{
                  margin: "2px 0 0 0",
                  color: "#111",
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
              // Imagen baja en móvil, ahora SIN overlay de texto encima:
              // solo es un acento visual, el logo propio de la imagen
              // queda limpio y visible.
              height: isMobile ? 150 : "auto",
              minHeight: isMobile ? 150 : 420,
              background: "#111",
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
                  filter: "brightness(0.96)",
                }}
              />
            )}

            {/* El gradiente oscuro solo se aplica en desktop, donde el
                título SÍ va superpuesto más abajo en el contenido (no
                sobre la imagen) — aquí solo da profundidad a la foto. */}
            {!isMobile && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                }}
              />
            )}
          </div>

          {/* CONTENT SIDE */}
          <div
            style={{
              width: isMobile ? "100%" : "55%",
              padding: isMobile ? "14px 18px 16px 18px" : "42px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "#fff",
            }}
          >
            <div>
              {/* Header completo solo en desktop (en móvil ya se mostró arriba) */}
              {!isMobile && (
                <>
                  {category && (
                    <Tag
                      style={{
                        borderRadius: 999,
                        padding: "4px 12px",
                        fontWeight: 500,
                        marginBottom: 16,
                      }}
                      color="blue"
                    >
                      {category}
                    </Tag>
                  )}

                  <Text
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      color: "#888",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Colectivo
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
                        color: "#111",
                      }}
                    >
                      {title}
                    </Title>

                    <div
                      style={{
                        width: 60,
                        height: 4,
                        borderRadius: 10,
                        background: "#111",
                        marginTop: 12,
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
                    fontSize: isMobile ? 13.5 : 16,
                    color: "#555",
                    lineHeight: isMobile ? 1.55 : 1.8,
                    textAlign: isMobile ? "left" : "justify",
                    marginBottom: isMobile ? 14 : 28,
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
                      strong
                      style={{
                        display: "block",
                        marginBottom: 12,
                        color: "#333",
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
                          borderRadius: 999,
                          height: isMobile ? 30 : 38,
                          padding: isMobile ? "0 12px" : "0 18px",
                          fontSize: isMobile ? 12.5 : 14,
                          background: "#fafafa",
                          border: "1px solid #e8e8e8",
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
                  marginTop: isMobile ? 12 : 36,
                }}
              >
                <Button
                  type="primary"
                  block
                  size={isMobile ? "middle" : "large"}
                  icon={<GlobalOutlined />}
                  onClick={() => window.open(website, "_blank")}
                  style={{
                    height: isMobile ? 40 : 50,
                    borderRadius: isMobile ? 10 : 14,
                    fontSize: isMobile ? 13.5 : 15,
                    fontWeight: 600,
                    letterSpacing: 0.3,
                    border: "none",
                    background: "linear-gradient(135deg,#111,#2b2b2b)",
                  }}
                >
                  Sitio web
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CollectiveCard;