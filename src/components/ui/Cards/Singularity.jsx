import React from "react";
import { Card, Typography, Button, Grid, Space } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;
import { useNavigate } from "react-router-dom";
const SingularityCard = ({
    image,
    description,
    social = [],
    onSocialClick,
}) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const navigate = useNavigate();

    return (
        <Card
            hoverable
            style={{
                width: "100%",
                maxWidth: 900,
                margin: isMobile ? "16px auto" : "40px auto",
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
                        height: isMobile ? 180 : 420,
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
                            alt="Singularity"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.4))",
                            }}
                        />
                    )}

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                        }}
                    />
                </div>

                {/* CONTENT */}
                <div
                    style={{
                        width: isMobile ? "100%" : "55%",
                        padding: isMobile ? "16px 18px" : 48,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: "#fff",
                    }}
                >
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Title level={isMobile ? 3 : 2}>
                                Singularity
                            </Title>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Paragraph
                                style={{
                                    fontSize: isMobile ? 14 : 16,
                                    color: "#555",
                                    lineHeight: 1.7,
                                    marginBottom: 20,
                                }}
                            >
                                {description ||
                                    "Somos un equipo enfocado en inteligencia artificial, ingeniería de software y sistemas interactivos. Construimos experiencias tecnológicas que conectan datos, ciencia y percepción."}
                            </Paragraph>
                        </motion.div>

                        <Text strong style={{ display: "block", marginBottom: 10 }}>
                            Encuéntranos en:
                        </Text>

                        <Space
                            wrap
                            size={[10, 10]}
                            style={{ marginBottom: isMobile ? 14 : 0 }}
                        >
                            {social.map((s, i) => (
                                <Button
                                    key={i}
                                    type="default"
                                    onClick={() => onSocialClick?.(s)}
                                    style={{
                                        borderRadius: 999,
                                        padding: "4px 14px",
                                        height: 36,
                                    }}
                                >
                                    {s.label}
                                </Button>
                            ))}
                        </Space>
                    </div>

                    {/* FOOTER CTA */}
                    <div style={{ marginTop: isMobile ? 16 : 24 }}>
                        <Button
                            type="primary"
                            block
                            onClick={() => { window.open("https://singularitymx.org/") }}
                            style={{
                                height: 44,
                                borderRadius: 10,
                                fontSize: 15,
                            }}
                        >
                            Sitio web
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SingularityCard;