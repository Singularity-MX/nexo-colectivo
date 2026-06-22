import React, { useState } from "react";
import { Layout, Menu, Button, Grid, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const ACCENT = "#5ad1c9";

const Navbar = ({
  items = [],
  onNavigate = () => {},
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
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        background: "#04060e",
        borderBottom: "1px solid rgba(90,209,201,0.15)",
        padding: "0 16px",
        userSelect: "none",
        width: isMobile ? "101vw" : "auto",
      }}
    >

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

        <div style={{ display: "flex", alignItems: "center" }}>
          {logoText}
        </div>
      </div>

     
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

      
      {isMobile && (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: ACCENT, fontSize: 20 }} />}
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
                background: "rgba(4,6,14,0.92)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                position: "relative",
              },
              mask: {
                background: "rgba(0,0,0,0.6)",
              },
            }}
          >
          
            <div
              style={{
                position: "absolute",
                top: "-15%",
                right: "-20%",
                width: "70vw",
                height: "70vw",
                background:
                  "radial-gradient(circle, rgba(90,209,201,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

         
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 10,
                  letterSpacing: 1.5,
                }}
              >
                CERRAR
              </span>
              <Button
                type="text"
                onClick={() => setOpen(false)}
                icon={<CloseOutlined style={{ color: ACCENT, fontSize: 18 }} />}
              />
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
                zIndex: 1,
              }}
            >
              
              <div
                style={{
                  textAlign: "center",
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    color: ACCENT,
                    fontSize: 11,
                    letterSpacing: 2.5,
                    fontWeight: 600,
                  }}
                >
                  NAVEGACIÓN
                </span>
              </div>

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

          
            <style>
              {`
                .ant-menu-item {
                    font-family: 'JetBrains Mono', 'Courier New', monospace !important;
                    font-size: 19px !important;
                    padding: 16px 0 !important;
                    margin: 0 !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    position: relative;
                    border-radius: 4px;
                    letter-spacing: 0.5px;
                }

                .ant-menu-item:not(:last-child)::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 30%;
                    width: 40%;
                    height: 1px;
                    background: rgba(90,209,201,0.15);
                }

                .ant-menu-title-content {
                    width: 100%;
                    text-align: center;
                    color: rgba(255,255,255,0.75) !important;
                    font-weight: 500;
                    transition: color 0.2s ease;
                }

                .ant-menu-item:hover .ant-menu-title-content {
                    color: #fff !important;
                }

                .ant-menu-item-selected {
                    background: rgba(90,209,201,0.08) !important;
                }

                .ant-menu-item-selected .ant-menu-title-content {
                    color: ${ACCENT} !important;
                }

                .ant-menu-item-selected::before {
                    content: "›";
                    position: absolute;
                    left: 8px;
                    color: ${ACCENT};
                    font-weight: 700;
                }

                .ant-menu-horizontal .ant-menu-item-selected {
                    border-bottom: 2px solid ${ACCENT} !important;
                    color: ${ACCENT} !important;
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