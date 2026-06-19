import React, { useState } from "react";
import { Card, Button, Typography, Grid } from "antd";
import { motion } from "framer-motion";
import { useEffect } from "react";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const HeroCard = ({
    image,
    title,
    description,
    meta = {},
    keywords = [],
    buttonText = "Comenzar",
    onClick,
}) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [imgLoaded, setImgLoaded] = useState(false);
    const [isTiny, setIsTiny] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsTiny(window.innerWidth < 365);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.12 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const Keywords = () =>
        keywords.length > 0 && (
            <motion.div variants={itemVariants}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginTop: 6,
                    }}
                >
                    {keywords.map((kw, index) => (
                        <span
                            key={index}
                            style={{
                                fontSize: 12,
                                padding: "4px 10px",
                                borderRadius: 999,
                                background: "rgba(0,0,0,0.05)",
                                border: "1px solid rgba(0,0,0,0.08)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {kw}
                        </span>
                    ))}
                </div>
            </motion.div>
        );

    return (
        <Card
            hoverable
            style={{
                width: "100%",
                maxWidth: 1050,
                height: isMobile ? "auto" : 560,
                margin: isMobile ? "16px auto" : "40px auto",
                borderRadius: 22,
                overflow: "hidden",
                border: "2px solid rgba(0,0,0,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                userSelect: "none",
            }}
            styles={{
                body: {
                    padding: 0,
                    height: "100%",
                },
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: isTiny ? "column" : isMobile ? "column" : "row",
                    height: "100%",
                }}
            >
                {/* IMAGE */}
                {!isTiny && (
                    <div
                        style={{
                            width: isMobile ? "100%" : "50%",
                            height: isMobile ? 180 : "100%",
                            overflow: "hidden",
                            position: "relative",
                            background: "#eee",
                        }}
                    >
                        <motion.img
                            src={image}
                            alt="hero"
                            onLoad={() => setImgLoaded(true)}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{
                                scale: imgLoaded ? 1 : 1.1,
                                opacity: imgLoaded ? 1 : 0,
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
                            }}
                        />
                    </div>
                )}
                {/* CONTENT */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        width: isTiny ? "100%" : isMobile ? "100%" : "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: isMobile ? "14px 16px" : 48,
                        background: "#fff",
                        gap: isMobile ? 14 : 26,
                    }}
                >
                    {/* ================= TITLE ================= */}
                    <motion.div variants={itemVariants}>
                        <Title
                            level={isMobile ? 4 : 2}
                            style={{
                                marginBottom: isMobile ? 6 : 10,
                            }}
                        >
                            {title}
                        </Title>
                    </motion.div>

                    {/* ================= DESCRIPTION ================= */}
                    <motion.div variants={itemVariants}>
                        <Paragraph
                            style={{
                                fontSize: isMobile ? 14 : 16,
                                color: "#555",
                                lineHeight: 1.6,
                                marginBottom: isMobile ? 10 : 14,
                            }}
                        >
                            {isTiny ? description.slice(0, 110) + "..." : description}
                        </Paragraph>
                    </motion.div>

                    {/* ================= KEYWORDS  ================= */}
                    {keywords.length > 0 && (
                        <motion.div variants={itemVariants}>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 8,
                                    marginBottom: isMobile ? 10 : 18,
                                }}
                            >
                                {keywords.map((kw, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontSize: 12,
                                            padding: "4px 10px",
                                            borderRadius: 999,
                                            background: "rgba(0,0,0,0.05)",
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {/* ================= META ================= */}
                    <motion.div variants={itemVariants}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: isMobile ? 6 : 10,
                                fontSize: isMobile ? 13 : 14,
                            }}
                        >
                            {Object.entries(meta).map(([key, value]) => (
                                <div
                                    key={key}
                                    style={{
                                        display: "flex",
                                        gap: 6,
                                    }}
                                >
                                    <span style={{ fontWeight: 600 }}>
                                        {key}:
                                    </span>
                                    <span style={{ color: "#555" }}>
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ================= CTA ================= */}
                    <motion.div variants={itemVariants}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={onClick}
                            style={{
                                borderRadius: 10,
                                height: 44,
                                width: "100%",
                                fontSize: 15,
                                marginTop: isMobile ? 10 : 18,
                            }}
                        >
                            {buttonText}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            <style>
                {`
                .ant-card:hover {
                    box-shadow: 0 18px 50px rgba(0,0,0,0.12);
                }
                `}
            </style>
        </Card>
    );
};

export default HeroCard;