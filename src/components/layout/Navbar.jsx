import React, { useState } from "react";
import { Layout, Menu, Button, Grid, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const Navbar = ({
    items = [],
    onNavigate = () => { },
    logoIcon,
    logoText,
    initialSelectedKey,
}) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [open, setOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(initialSelectedKey);

    const handleClick = ({ key }) => {
        setSelectedKey(key);
        onNavigate(key);
        setOpen(false);
    };

    return (
        <Header
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "space-between",
                background: "#000",
                padding: "0 16px",
                userSelect: "none",
            }}
        >
            {/* LOGO */}
            <div
                onClick={() => handleClick({ key: "home" })}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    marginLeft: isMobile ? 0 : 25,

                    position: isMobile ? "absolute" : "static",
                    left: isMobile ? "50%" : "auto",
                    transform: isMobile ? "translateX(-50%)" : "none",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    {logoIcon}
                </div>

                {/* puedes decidir si ocultarlo en mobile */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    {logoText}
                </div>
            </div>

            {/* DESKTOP MENU */}
            {!isMobile && (
                <Menu
                    mode="horizontal"
                    theme="dark"
                    onClick={handleClick}
                    className="navbar-menu"
                    style={{
                        background: "transparent",
                        border: "none",
                        flex: 1,
                        justifyContent: "flex-end",
                    }}
                    items={items}
                />
            )}

            {/* MOBILE HAMBURGER */}
            {isMobile && (
                <>
                    <Button
                        type="text"
                        icon={
                            <MenuOutlined
                                style={{ color: "#fff", fontSize: 20 }}
                            />
                        }
                        onClick={() => setOpen(true)}
                        style={{
                            position: "absolute",
                            right: 16,
                        }}
                    />

                    <Drawer
                        placement="right"
                        onClose={() => setOpen(false)}
                        open={open}
                        width="100vw"
                        closable={false}
                        styles={{
                            body: {
                                padding: 0,
                                background: "rgba(255, 255, 255, 0.9)",
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",
                                position: "relative", // 🔥 necesario
                            },
                        }}
                    >
                        {/* BOTÓN CERRAR */}
                        <div
                            style={{
                                position: "absolute",
                                top: 20,
                                right: 20,
                                zIndex: 10,
                            }}
                        >
                            <Button type="text" onClick={() => setOpen(false)} style={{fontSize:25}}>
                                ✕
                            </Button>
                        </div>

                        {/* CENTRADO REAL */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "100%",
                                maxWidth: 420,
                                padding: "0 24px",
                            }}
                        >
                            <Menu
                                mode="vertical"
                                selectedKeys={[selectedKey]}
                                onClick={handleClick}
                                items={items}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    width: "100%",
                                    textAlign: "center",
                                }}
                            />
                        </div>

                        {/* ESTILOS */}
                        <style>
                            {`
                                .ant-menu-item {
                                    font-size: 22px !important;
                                    padding: 18px 0 !important;
                                    margin: 0 !important;
                                    display: flex !important;
                                    justify-content: center !important;
                                    align-items: center !important;
                                    position: relative;
                                    border-radius: 10px;
                                }

                                .ant-menu-item:not(:last-child)::after {
                                    content: "";
                                    position: absolute;
                                    bottom: 0;
                                    left: 20%;
                                    width: 60%;
                                    height: 1px;
                                    background: rgba(0, 0, 0, 0.12);
                                }

                                .ant-menu-title-content {
                                    width: 100%;
                                    text-align: center;
                                    color: #111 !important;
                                    font-weight: 500;
                                }

                                .ant-menu-item-selected {
                                    background: transparent !important;
                                    color: #fff !important; 
                                }

                                .ant-menu-horizontal .ant-menu-item-selected {
                                    border-bottom: 2px solid #fff !important; 
                                    color: #fff !important;
                                }
                                .ant-menu-item:last-child {
                                    border-bottom: none; 
                                }
        `}
                        </style>
                    </Drawer>
                </>
            )}
        </Header>
    );
};

export default Navbar;