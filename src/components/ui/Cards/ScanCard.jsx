import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  Button,
  Typography,
  Grid,
  Space,
  Segmented,
  Modal,
} from "antd";

import {
  UploadOutlined,
  CameraOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useImageAnalysis } from "../../../hooks/useImageAnalysis";
import { computeIndex } from "../../../utils/imageAnalysis";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ScanCard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [open, setOpen] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const {
    canvasRef,
    imgRef,
    imageSrc,
    rgb,
    points,
    mode,
    setMode,
    handleFile,
    handleClick,
    reset,
  } = useImageAnalysis();

const handleLoad = (file, inputRef) => {
  if (!file) return;

  handleFile(file);

  if (inputRef?.current) {
    inputRef.current.value = "";
  }


  requestAnimationFrame(() => {
    setOpen(true);
  });
};

const handleImageLoad = () => {
  const canvas = canvasRef.current;
  const img = imgRef.current;

  if (!canvas || !img) return;

  const ctx = canvas.getContext("2d");

  if (!img.naturalWidth) return; 

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);
};

  return (
    <>
      {/* ================= CARD ================= */}
      <motion.div
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
      <Card
        style={{
          width: "100%",
          maxWidth: 480,
          margin: isMobile ? "12px auto" : "40px auto",
          borderRadius: 20,
          border: "1px solid rgba(0, 0, 0, 0.21)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/*  TÍTULO */}
        <Title level={4} style={{ marginBottom: 12 }}>
          Escáner RGB
        </Title>

        {/*  ACCIONES PRINCIPALES */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <Button
            block
            icon={<UploadOutlined />}
            onClick={() => fileInputRef.current.click()}
          >
            Subir imagen
          </Button>
<motion.div whileTap={{ scale: 0.9 }}>
          <Button
            type="primary"
            style={{ width: 60}}
            icon={<CameraOutlined />}
            onClick={() => cameraInputRef.current.click()}
          />
          </motion.div>
        </div>

        {/*  MODO */}
        <div style={{ marginBottom: 12 }}>
          <Text strong>Modo de muestreo</Text>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
  <Segmented
    value={mode}
    onChange={setMode}
    options={[
      { label: "Punto", value: "single" },
      { label: "Múltiple", value: "multi" },
    ]}
    style={{
      marginBottom: 16,
      padding: 4,
      background: "#f0f0f0",
    }}
  />
</div>

        {/*  ACCIÓN PRINCIPAL */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <motion.div whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
          <Button
            type="default"
            block
            disabled={!imageSrc}
            onClick={() => setOpen(true)}
            style={{
              background: "#000",
              color: "#fff",
              borderColor: "#000",
            }}
          >
            Muestrear
          </Button>
          </motion.div>
<motion.div whileTap={{ rotate: 90 }}>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={reset}
            style={{ width: 60}}
          />
          </motion.div>
        </div>

        {/*  INPUTS */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            handleLoad(e.target.files?.[0], fileInputRef)
          }
        />

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={(e) =>
            handleLoad(e.target.files?.[0], cameraInputRef)
          }
        />

        {/*  RESULTADOS */}
  <motion.div layout
  style={{
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    background: "#f7f7f7",
    border: "1px solid rgba(0,0,0,0.06)",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      alignItems: "center",
    }}
  >
    {/*  PREVIEW */}
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 8,
  }}
>
  {/*  IMAGEN */}
  <div
    style={{
      width: "100%",
      height: 110,
      borderRadius: 10,
      overflow: "hidden",
      background: "#ddd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {imageSrc ? (
      <img
        src={imageSrc}
        alt="preview"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    ) : (
      <Text type="secondary">Sin imagen</Text>
    )}
  </div>

  {/*  COLOR RESULTANTE */}
  <div
    style={{
      width: "100%",
      height: 36,
      borderRadius: 8,
      border: "1px solid rgba(0,0,0,0.1)",
      background:
        rgb.r === "-" ? "#ccc" : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      color: rgb.r === "-" ? "#666" : "#fff",
      fontWeight: 500,
    }}
  >
    {rgb.r === "-"
      ? "Sin muestra"
      : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
  </div>
</div>

    {/*  DATOS */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {[
        { label: "R", value: rgb.r },
        { label: "G", value: rgb.g },
        { label: "B", value: rgb.b },
        { label: "ICV", value: computeIndex(rgb) },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 10px",
            borderRadius: 8,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.05)",
            fontSize: 13,
          }}
        >
          <Text strong>{item.label}</Text>
          <Text>{item.value}</Text>
        </div>
      ))}
    </div>
  </div>
</motion.div>
      </Card>
</motion.div>
      {/* ================= MODAL ================= */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={isMobile ? "100%" : 800}
        centered
        styles={{
          body: {
            padding: 0,
            background: "#000",
          },
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "70vh" : 500,
          }}
        >
          {imageSrc && (
            <>
              <img
                ref={imgRef}
                src={imageSrc}
                onLoad={handleImageLoad}
                onClick={handleClick}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  cursor: "crosshair",
                }}
              />

              {points.map((p, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: p.x - 5,
                    top: p.y - 5,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "2px solid #000",
                    pointerEvents: "none",
                  }}
                />
              ))}

              <canvas ref={canvasRef} style={{ display: "none" }} />
            </>
          )}
        </div>

        <div
          style={{
            padding: 12,
            textAlign: "center",
            background: "#111",
          }}
        >
          <Button type="primary" onClick={() => setOpen(false)}>
            Confirmar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ScanCard;