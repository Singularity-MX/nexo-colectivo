import React from "react";
import { Card, Typography, Button, Grid, Space } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const CollectiveCard = ({
    title,
    image,
    description,
    website,
    social = [],
    onSocialClick,
}) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <Card
            hoverable
            style={{
                width: "100%",
                maxWidth: 900,
                margin: "0 auto 40px auto", // Margen inferior para separar las tarjetas
                borderRadius: 22,
                overflow: "hidden",
                border: "2px solid rgba(0,0,0,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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
                {/* IMAGE / BRAND SIDE */}
                <div
                    style={{
                        width: isMobile ? "100%" : "45%",
                        height: isMobile ? 180 : "auto", // Auto para que empate con el contenido
                        minHeight: isMobile ? 180 : 380,
                        background: "#0f0f0f",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {image && (
                        <motion.img
                            src={image}
                            alt={title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.4)) opacity(0.85)", // Opacidad para el toque espacial/oscuro
                            }}
                        />
                    )}

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(8, 12, 28, 0.6), transparent)", // Gradiente con un toque azul medianoche
                        }}
                    />
                </div>

                {/* CONTENT */}
                <div
                    style={{
                        width: isMobile ? "100%" : "55%",
                        padding: isMobile ? "24px 20px" : "40px 48px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: "#fff",
                    }}
                >
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Title level={isMobile ? 3 : 2} style={{ margin: 0, color: "#111" }}>
                                {title}
                            </Title>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <Paragraph
                                style={{
                                    fontSize: isMobile ? 14 : 16,
                                    color: "#555",
                                    lineHeight: 1.7,
                                    marginTop: 16,
                                    marginBottom: 24,
                                }}
                            >
                                {description}
                            </Paragraph>
                        </motion.div>

                        {social.length > 0 && (
                            <>
                                <Text strong style={{ display: "block", marginBottom: 12, color: "#333" }}>
                                    Encuéntranos en:
                                </Text>

                                <Space
                                    wrap
                                    size={[10, 10]}
                                    style={{ marginBottom: isMobile ? 20 : 0 }}
                                >
                                    {social.map((s, i) => (
                                        <Button
                                            key={i}
                                            type="default"
                                            onClick={() => onSocialClick?.(s)}
                                            style={{
                                                borderRadius: 999,
                                                padding: "4px 16px",
                                                height: 36,
                                                background: "#fafafa",
                                                borderColor: "#e0e0e0",
                                                color: "#333"
                                            }}
                                        >
                                            {s.label}
                                        </Button>
                                    ))}
                                </Space>
                            </>
                        )}
                    </div>

                    {/* FOOTER CTA */}
                    {website && (
                        <div style={{ marginTop: isMobile ? 16 : 32 }}>
                            <Button
                                type="primary"
                                block
                                onClick={() => window.open(website, "_blank")}
                                style={{
                                    height: 46,
                                    borderRadius: 12,
                                    fontSize: 15,
                                    background: "#111", // Botón negro minimalista
                                    borderColor: "#111",
                                }}
                            >
                                Visitar Sitio Web
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default CollectiveCard;