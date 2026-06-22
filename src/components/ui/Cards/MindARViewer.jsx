import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import Swal from "sweetalert2";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ACCENT = "#5ad1c9";
const BG_DARK = "#04060e";
const MONO = "'JetBrains Mono', 'Courier New', monospace";

const PLANETS = [
  {
    name: "TIERRA",
    texture: "/textures/earth.webp",
    clouds: null,
    atmColor: 0x6699ff,
    data: {
      sistema: "Sistema Solar",
      estrella: "Sol (tipo G2V)",
      distancia: "0 (planeta de origen)",
      radio: "6,371 km",
      gravedad: "1 g (9.8 m/s²)",
      temperatura: "15 °C (media global)",
      atmosfera: "Nitrógeno (78%), Oxígeno (21%)",
      agua: "Abundante (71% superficie)",
      diaDuracion: "24 horas",
      anioDuracion: "365.25 días",
    },
    organismo: {
      nombre: "Humanos",
      descripcion: "Especie dominante con inteligencia avanzada, tecnología y cooperación social global.",
      adaptaciones: ["Inteligencia abstracta", "Tecnología avanzada", "Cooperación social compleja"],
    },
    habitabilidad: 100,
  },
  {
    name: "K2-18b",
    texture: "/textures/k218.webp",
    clouds: null,
    atmColor: 0x66ddaa,
    data: {
      sistema: "K2-18",
      estrella: "Enana roja (tipo M2.5V)",
      distancia: "124 años luz",
      radio: "2.6x Tierra (sub-Neptuno)",
      gravedad: "~1.4 g (estimada)",
      temperatura: "0 a 40 °C (zona habitable)",
      atmosfera: "Rica en hidrógeno, vapor de agua detectado",
      agua: "Evidencias de vapor de agua (2019)",
      diaDuracion: "Desconocida (posible acoplamiento)",
      anioDuracion: "33 días terrestres",
    },
    organismo: {
      nombre: "Aeromedusas",
      descripcion: "Organismos flotantes similares a medusas que habitan la atmósfera rica en hidrógeno, aprovechando corrientes de convección.",
      adaptaciones: ["Cámaras de gas (hidrógeno)", "Membranas aerodinámicas", "Metabolismo de baja energía"],
    },
    habitabilidad: 70,
  },
  {
    name: "KEPLER-452b",
    texture: "/textures/kepler.webp",
    clouds: null,
    atmColor: 0xffaa66,
    data: {
      sistema: "Kepler-452",
      estrella: "Tipo G2V (similar al Sol)",
      distancia: "1,400 años luz",
      radio: "1.6x Tierra (supertierra)",
      gravedad: "~1.8 g (estimada)",
      temperatura: "~20 °C (equilibrio estimado)",
      atmosfera: "Probablemente densa (por tamaño)",
      agua: "Posible (en zona habitable)",
      diaDuracion: "Desconocida",
      anioDuracion: "385 días terrestres",
    },
    organismo: {
      nombre: "Gigantópodos",
      descripcion: "Animales robustos con extremidades musculosas adaptadas a la alta gravedad del planeta.",
      adaptaciones: ["Huesos reforzados", "Musculatura densa", "Metabolismo eficiente en alta gravedad"],
    },
    habitabilidad: 75,
  },
  {
    name: "PROXIMA CENTAURI b",
    texture: "/textures/proxima.webp",
    clouds: null,
    atmColor: 0xff6666,
    data: {
      sistema: "Próxima Centauri",
      estrella: "Enana roja (tipo M5.5V)",
      distancia: "4.24 años luz",
      radio: "~1.1x Tierra (rocoso)",
      gravedad: "~1.1 g (estimada)",
      temperatura: "-40 a 30 °C (variable)",
      atmosfera: "Desconocida (posible erosión estelar)",
      agua: "Posible (en zona habitable)",
      diaDuracion: "Posiblemente acoplado (11.2 días)",
      anioDuracion: "11.2 días terrestres",
    },
    organismo: {
      nombre: "Criaturas reflectantes",
      descripcion: "Seres con placas reflectantes que resisten las intensas llamaradas de su estrella anfitriona.",
      adaptaciones: ["Caparazón reflectante", "Piel抗辐射", "Alta resistencia celular a UV"],
    },
    habitabilidad: 65,
  },
  {
    name: "TRAPPIST-1e",
    texture: "/textures/trappist.webp",
    clouds: null,
    atmColor: 0xaa88ff,
    data: {
      sistema: "TRAPPIST-1",
      estrella: "Enana roja ultrafría (tipo M8V)",
      distancia: "40 años luz",
      radio: "~0.9x Tierra (similar)",
      gravedad: "~0.93 g (estimada)",
      temperatura: "-20 a 15 °C (equilibrio)",
      atmosfera: "Posiblemente densa (¿nitrógeno?)",
      agua: "Probable (océano subsuperficial?)",
      diaDuracion: "Acoplado por marea (6.1 días)",
      anioDuracion: "6.1 días terrestres",
    },
    organismo: {
      nombre: "Hongos bioluminiscentes",
      descripcion: "Hongos gigantes que usan bioluminiscencia para comunicarse en la zona de penumbra eterna del planeta.",
      adaptaciones: ["Bioluminiscencia química", "Sensores de luz infrarroja", "Comunicación por pulsos lumínicos"],
    },
    habitabilidad: 80,
  },
];

// =====================================================================
//  CONFIGURACIÓN Y PARÁMETROS
// =====================================================================

const SMOOTHING_POSITION = 0.18;
const SMOOTHING_ROTATION = 0.18;
const POSITION_DEADZONE = 0.0008;
const ROTATION_DEADZONE = 0.0015;

const PLANET_RADIUS = 0.30;
const PLANET_Y_POS = 0.10;
const ATMOSPHERE_MULTIPLIER = 1.03;
const RIM_GLOW_MULTIPLIER = 1.015;
const CLOUDS_MULTIPLIER = 1.025;

// =====================================================================
//  SISTEMA DE PRECARGA DE TEXTURAS CON CACHÉ EN INDEXEDDB
// =====================================================================

const DB_NAME = 'nexo-textures-v1';
const STORE_NAME = 'textures';
let db = null;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };
  });
};

const getFromCache = async (key) => {
  if (!db) await initDB();
  
  return new Promise((resolve) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => {
      const result = request.result;
      if (result && (Date.now() - result.timestamp < 7 * 24 * 60 * 60 * 1000)) {
        resolve(result.blob);
      } else {
        if (result) {
          const delTxn = db.transaction([STORE_NAME], 'readwrite');
          delTxn.objectStore(STORE_NAME).delete(key);
        }
        resolve(null);
      }
    };
    request.onerror = () => resolve(null);
  });
};

const saveToCache = async (key, blob) => {
  if (!db) await initDB();
  
  return new Promise((resolve) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put({ blob, timestamp: Date.now() }, key);
    transaction.oncomplete = () => resolve();
  });
};

const clearTextureCache = async () => {
  if (!db) await initDB();
  return new Promise((resolve) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    transaction.objectStore(STORE_NAME).clear();
    transaction.oncomplete = () => resolve();
  });
};

const textureLoader = new THREE.TextureLoader();
const threeTextureCache = new Map();

const preloadTextures = async (onProgress) => {
  await initDB();
  
  const allTextures = PLANETS.flatMap(p => [
    p.texture,
    ...(p.clouds ? [p.clouds] : [])
  ]);
  
  const uniqueTextures = [...new Set(allTextures)];
  let loaded = 0;
  const total = uniqueTextures.length;

  onProgress?.(0, "Verificando caché...");
  
  await Promise.all(
    uniqueTextures.map(async (url) => {
      try {
        const cachedBlob = await getFromCache(url);
        
        if (cachedBlob) {
          const blobUrl = URL.createObjectURL(cachedBlob);
          const texture = await new Promise((resolve) => {
            textureLoader.load(blobUrl, resolve);
          });
          threeTextureCache.set(url, texture);
          loaded++;
          onProgress?.(Math.round((loaded / total) * 100), `Caché: ${loaded}/${total}`);
          return;
        }
      } catch (err) {
        console.warn(`Error lectura caché: ${url}`);
      }
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        await saveToCache(url, blob);
        
        const blobUrl = URL.createObjectURL(blob);
        const texture = await new Promise((resolve) => {
          textureLoader.load(blobUrl, resolve);
        });
        threeTextureCache.set(url, texture);
        
        loaded++;
        onProgress?.(Math.round((loaded / total) * 100), `Descargando: ${loaded}/${total}`);
      } catch (error) {
        console.error(`Error: ${url}`, error);
        loaded++;
        onProgress?.(Math.round((loaded / total) * 100), `Error: ${loaded}/${total}`);
      }
    })
  );
};

// =====================================================================
//  PANEL DE FICHA TÉCNICA
// =====================================================================

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function cutCornerPanel(ctx, x, y, w, h, cut) {
  ctx.beginPath();
  ctx.moveTo(x, y + cut);
  ctx.lineTo(x + cut, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h - cut);
  ctx.lineTo(x + w - cut, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
}

const ICONS = {
  sistema: "🌌",
  estrella: "☀️",
  distancia: "🌍",
  radio: "📏",
  gravedad: "👤",
  temperatura: "🌡️",
  atmosfera: "☁️",
  agua: "💧",
  diaDuracion: "☀️",
  anioDuracion: "📅",
};

function createFichaTecnicaPanel(planetData, accentColorHex) {
  const W = 1100;
  const H = 1500;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const accent = `#${accentColorHex.toString(16).padStart(6, "0")}`;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "rgba(10,14,28,0.95)");
  bg.addColorStop(1, "rgba(4,6,14,0.97)");
  ctx.fillStyle = bg;
  cutCornerPanel(ctx, 0, 0, W, H, 40);
  ctx.fill();

  ctx.strokeStyle = `${accent}66`;
  ctx.lineWidth = 3;
  cutCornerPanel(ctx, 2, 2, W - 4, H - 4, 38);
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, W, 5);

  let y = 64;
  const padX = 56;
  const contentW = W - padX * 2;

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 52px 'JetBrains Mono', monospace";
  ctx.fillText(planetData.name, W / 2, y + 10);
  y += 40;

  ctx.font = "22px 'JetBrains Mono', monospace";
  ctx.fillStyle = accent;
  ctx.fillText("· FICHA CIENTÍFICA ·", W / 2, y + 26);
  y += 54;

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, y);
  ctx.lineTo(W - padX, y);
  ctx.stroke();
  y += 40;

  const dataEntries = [
    [ICONS.sistema, "Sistema estelar", planetData.data.sistema],
    [ICONS.estrella, "Tipo de estrella", planetData.data.estrella],
    [ICONS.distancia, "Distancia a la Tierra", planetData.data.distancia],
    [ICONS.radio, "Radio / Tamaño", planetData.data.radio],
    [ICONS.gravedad, "Gravedad", planetData.data.gravedad],
    [ICONS.temperatura, "Temperatura", planetData.data.temperatura],
    [ICONS.atmosfera, "Atmósfera", planetData.data.atmosfera],
    [ICONS.agua, "Presencia de agua", planetData.data.agua],
    [ICONS.diaDuracion, "Duración del día", planetData.data.diaDuracion],
    [ICONS.anioDuracion, "Duración del año", planetData.data.anioDuracion],
  ];

  const colW = contentW / 2 - 20;
  const rowH = 110;
  const col1X = padX;
  const col2X = padX + contentW / 2 + 20;
  const iconSize = 38;
  const iconPadding = 18;

  dataEntries.forEach(([iconStr, label, value], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? col1X : col2X;
    const rowY = y + row * rowH;

    ctx.fillStyle = "rgba(255,255,255,0.04)";
    cutCornerPanel(ctx, x, rowY, colW, rowH - 18, 10);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    cutCornerPanel(ctx, x, rowY, colW, rowH - 18, 10);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.font = `${iconSize}px Arial`;
    ctx.fillText(iconStr, x + iconPadding + iconSize / 2, rowY + rowH / 2 - 9);

    ctx.textAlign = "left";
    const textStartX = x + iconPadding * 2 + iconSize;
    const maxTextW = colW - iconPadding * 3 - iconSize;

    ctx.fillStyle = accent;
    ctx.font = "bold 19px 'JetBrains Mono', monospace";
    ctx.fillText(label.toUpperCase(), textStartX, rowY + 28);

    ctx.fillStyle = "white";
    ctx.font = "31px Arial";
    const lines = wrapText(ctx, value, maxTextW);
    lines.slice(0, 2).forEach((line, li) => {
      ctx.fillText(line, textStartX, rowY + 64 + li * 30);
    });
  });

  y += Math.ceil(dataEntries.length / 2) * rowH + 28;

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(padX, y);
  ctx.lineTo(W - padX, y);
  ctx.stroke();
  y += 48;

  ctx.textAlign = "left";
  ctx.fillStyle = accent;
  ctx.font = "bold 25px 'JetBrains Mono', monospace";
  ctx.fillText("ORGANISMO DOMINANTE", padX, y);
  y += 50;

  ctx.fillStyle = "white";
  ctx.font = "bold 36px Arial";
  ctx.fillText(planetData.organismo.nombre, padX, y);
  y += 44;

  ctx.font = "27px Arial";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  const descLines = wrapText(ctx, planetData.organismo.descripcion, contentW);
  descLines.forEach((line) => {
    ctx.fillText(line, padX, y);
    y += 34;
  });
  y += 20;

  ctx.font = "24px Arial";
  let chipX = padX;
  let chipY = y;
  const chipH = 54;
  planetData.organismo.adaptaciones.forEach((adapt) => {
    const textW = ctx.measureText(adapt).width;
    const chipW = textW + 48;
    if (chipX + chipW > W - padX) {
      chipX = padX;
      chipY += chipH + 14;
    }
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    cutCornerPanel(ctx, chipX, chipY, chipW, chipH, 12);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.5;
    cutCornerPanel(ctx, chipX, chipY, chipW, chipH, 12);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(adapt, chipX + chipW / 2, chipY + 34);
    ctx.textAlign = "left";
    chipX += chipW + 16;
  });
  y = chipY + chipH + 44;

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(padX, y);
  ctx.lineTo(W - padX, y);
  ctx.stroke();
  y += 48;

  ctx.fillStyle = accent;
  ctx.font = "bold 25px 'JetBrains Mono', monospace";
  ctx.fillText("HABITABILIDAD", padX, y);

  ctx.textAlign = "right";
  ctx.fillStyle = "white";
  ctx.font = "bold 34px 'JetBrains Mono', monospace";
  ctx.fillText(`${planetData.habitabilidad}/100`, W - padX, y);

  ctx.textAlign = "left";
  y += 34;

  const barH = 36;
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  roundRect(ctx, padX, y, contentW, barH, 4);
  ctx.fill();

  const fillW = (contentW * planetData.habitabilidad) / 100;
  const barGrad = ctx.createLinearGradient(padX, 0, padX + contentW, 0);
  barGrad.addColorStop(0, accent);
  barGrad.addColorStop(1, "#ffffff");
  ctx.fillStyle = barGrad;
  roundRect(ctx, padX, y, Math.max(fillW, barH), barH, 4);
  ctx.fill();

  y += barH + 54;

  const usedHeight = Math.min(y + 40, H);
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = W;
  finalCanvas.height = usedHeight;
  const finalCtx = finalCanvas.getContext("2d");
  finalCtx.drawImage(canvas, 0, 0, W, usedHeight, 0, 0, W, usedHeight);

  const texture = new THREE.CanvasTexture(finalCanvas);
  texture.anisotropy = 4;
  const aspect = W / usedHeight;
  const spriteHeight = 1.05;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true })
  );
  sprite.scale.set(spriteHeight * aspect, spriteHeight, 1);

  return sprite;
}

// =====================================================================
//  OBJETOS THREE.JS
// =====================================================================

const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 glowColor;
  uniform float intensity;
  varying vec3 vNormal;
  void main() {
    float fresnel = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    fresnel = clamp(fresnel, 0.0, 1.0);
    gl_FragColor = vec4(glowColor, fresnel * intensity);
  }
`;

function createAtmosphere(radius, color) {
  const geometry = new THREE.SphereGeometry(radius * ATMOSPHERE_MULTIPLIER, 64, 64);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: 0.9 },
    },
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Mesh(geometry, material);
}

function createRimGlow(radius, color) {
  const geometry = new THREE.SphereGeometry(radius * RIM_GLOW_MULTIPLIER, 64, 64);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: 1.1 },
    },
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    side: THREE.FrontSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Mesh(geometry, material);
}

function createPlanet(planetData) {
  const texture = threeTextureCache.get(planetData.texture) || 
    textureLoader.load(planetData.texture);
  const geometry = new THREE.SphereGeometry(PLANET_RADIUS, 64, 64);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);

  sphere.position.y = PLANET_Y_POS;

  const parts = { sphere, clouds: null };

  if (planetData.clouds) {
    const cloudsTexture = threeTextureCache.get(planetData.clouds) || 
      textureLoader.load(planetData.clouds);
    const cloudsGeometry = new THREE.SphereGeometry(PLANET_RADIUS * CLOUDS_MULTIPLIER, 64, 64);
    const cloudsMaterial = new THREE.MeshBasicMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    sphere.add(clouds);
    parts.clouds = clouds;
  }

  const rim = createRimGlow(PLANET_RADIUS, planetData.atmColor);
  sphere.add(rim);

  const atmosphere = createAtmosphere(PLANET_RADIUS, planetData.atmColor);
  sphere.add(atmosphere);

  return parts;
}

// =====================================================================
//  SISTEMA DE ESTABILIZACIÓN DE SEGUIMIENTO
// =====================================================================

function createStabilizedRig(anchorGroup) {
  const rig = new THREE.Group();
  rig.visible = false;

  const smoothedPos = new THREE.Vector3();
  const smoothedQuat = new THREE.Quaternion();
  let initialized = false;

  const targetPos = new THREE.Vector3();
  const targetQuat = new THREE.Quaternion();
  const targetScale = new THREE.Vector3();

  function update() {
    if (!anchorGroup.visible) {
      rig.visible = false;
      return;
    }
    rig.visible = true;

    anchorGroup.getWorldPosition(targetPos);
    anchorGroup.getWorldQuaternion(targetQuat);
    anchorGroup.getWorldScale(targetScale);

    if (!initialized) {
      smoothedPos.copy(targetPos);
      smoothedQuat.copy(targetQuat);
      initialized = true;
    } else {
      const posDelta = smoothedPos.distanceTo(targetPos);
      if (posDelta > POSITION_DEADZONE) {
        smoothedPos.lerp(targetPos, SMOOTHING_POSITION);
      }

      const angleDelta = smoothedQuat.angleTo(targetQuat);
      if (angleDelta > ROTATION_DEADZONE) {
        smoothedQuat.slerp(targetQuat, SMOOTHING_ROTATION);
      }
    }

    const parent = anchorGroup.parent;
    rig.position.copy(smoothedPos);
    rig.quaternion.copy(smoothedQuat);
    rig.scale.copy(targetScale);

    if (parent) {
      parent.worldToLocal(rig.position);
    }
  }

  function reset() {
    initialized = false;
    rig.visible = false;
  }

  return { rig, update, reset };
}

// =====================================================================
//  PANTALLA PREVIA CON BARRA DE PROGRESO
// =====================================================================

const PreScanScreen = ({ onStart, status, progress, message, onClearCache, cacheCount }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 5,
      background: BG_DARK,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "-10%",
        right: "-15%",
        width: "70vw",
        height: "70vw",
        background: "radial-gradient(circle, rgba(90,209,201,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />

    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          color: ACCENT,
          fontSize: 11,
          letterSpacing: 3,
          fontWeight: 600,
        }}
      >
        ESCÁNER AR · NEXO
      </span>

      <h1
        style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: "clamp(26px, 6vw, 34px)",
          margin: "10px 0 18px 0",
          letterSpacing: "-0.5px",
          textShadow: "0 0 30px rgba(90,209,201,0.25)",
        }}
      >
        ACTIVAR ESCÁNER
      </h1>

      <div
        style={{
          position: "relative",
          background: "linear-gradient(160deg, rgba(10,14,28,0.92), rgba(4,6,14,0.96))",
          border: `1px solid ${ACCENT}40`,
          borderRadius: 4,
          padding: "26px 24px",
          clipPath:
            "polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          textAlign: "left",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 2,
            background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
          }}
        />

        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 14,
            lineHeight: 1.6,
            margin: "0 0 18px 0",
          }}
        >
          Apunta tu cámara a cada estación del rally para desbloquear la
          ficha científica de su exoplaneta.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 22,
          }}
        >
          {[
            "Requiere acceso a la cámara",
            "Mejor con buena iluminación",
            "Mantén el marcador centrado",
          ].map((req) => (
            <div key={req} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: ACCENT,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11.5,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: 0.3,
                }}
              >
                {req}
              </span>
            </div>
          ))}
        </div>

        
        <button
          onClick={status === "loading" ? undefined : onStart}
          disabled={status === "loading"}
          style={{
            width: "100%",
            height: 52,
            border: "none",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            background:
              status === "loading"
                ? "rgba(90,209,201,0.15)"
                : `linear-gradient(135deg, ${ACCENT}, #2f9a92)`,
            border: status === "loading" ? `1px solid ${ACCENT}55` : "none",
            color: status === "loading" ? ACCENT : BG_DARK,
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 0.5,
            cursor: status === "loading" ? "default" : "pointer",
            fontFamily: MONO,
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {status === "loading" ? (
            <>
            
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "100%",
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${ACCENT}22, ${ACCENT}44)`,
                  transition: "width 0.4s ease-out",
                }}
              />
              
              <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1, position: "relative" }}>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    border: `2px solid ${ACCENT}33`,
                    borderTopColor: ACCENT,
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin-loader 0.7s linear infinite",
                  }}
                />
                <span>{message || "INICIALIZANDO…"}</span>
              </div>
              
              {/* Porcentaje */}
              <span style={{ fontSize: 11, opacity: 0.7, zIndex: 1, position: "relative", fontFamily: MONO }}>
                {progress}%
              </span>
            </>
          ) : (
            "INICIAR AR →"
          )}
        </button>

        {/* Info de caché */}
        {cacheCount !== null && (
          <div style={{ 
            marginTop: 14, 
            fontSize: 11, 
            color: 'rgba(255,255,255,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8 
          }}>
            <span>💾 {cacheCount} texturas en caché</span>
            {cacheCount > 0 && (
              <button
                onClick={onClearCache}
                style={{
                  background: 'none',
                  border: `1px solid ${ACCENT}33`,
                  color: ACCENT,
                  cursor: 'pointer',
                  padding: '2px 8px',
                  fontSize: 10,
                  borderRadius: 4,
                  fontFamily: MONO,
                }}
              >
                LIMPIAR
              </button>
            )}
          </div>
        )}
      </div>
    </div>

    <style>{`
      @keyframes spin-loader {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// =====================================================================
//  HUD DURANTE EL ESCANEO
// =====================================================================

const ScanningHUD = ({ onStop }) => (
  <>
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, rgba(4,6,14,0.85), transparent)",
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#ff5c5c",
            boxShadow: "0 0 8px #ff5c5c",
            animation: "pulse-rec 1.4s infinite",
          }}
        />
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: 1.5,
          }}
        >
          ESCANEANDO
        </span>
      </div>

      <span
        style={{
          fontFamily: MONO,
          fontSize: 10.5,
          color: ACCENT,
          letterSpacing: 1,
          border: `1px solid ${ACCENT}55`,
          padding: "3px 9px",
          borderRadius: 999,
        }}
      >
        NEXO · AR
      </span>
    </div>

    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(64vw, 280px)",
        height: "min(64vw, 280px)",
        zIndex: 9997,
        pointerEvents: "none",
      }}
    >
      {[
        { top: 0, left: 0, borderTop: 2, borderLeft: 2 },
        { top: 0, right: 0, borderTop: 2, borderRight: 2 },
        { bottom: 0, left: 0, borderBottom: 2, borderLeft: 2 },
        { bottom: 0, right: 0, borderBottom: 2, borderRight: 2 },
      ].map((corner, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            borderColor: `${ACCENT}aa`,
            borderStyle: "solid",
            borderWidth: 0,
            ...corner,
            [`border${corner.borderTop ? "Top" : "Bottom"}Width`]: 2,
            [`border${corner.borderLeft ? "Left" : "Right"}Width`]: 2,
          }}
        />
      ))}
    </div>

    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    >
      <button
        onClick={onStop}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 48,
          padding: "0 22px",
          border: `1px solid rgba(255,92,92,0.5)`,
          borderRadius: 4,
          background: "rgba(10,14,28,0.85)",
          color: "#ff8080",
          fontWeight: 600,
          fontSize: 13.5,
          letterSpacing: 0.5,
          cursor: "pointer",
          fontFamily: MONO,
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            background: "#ff5c5c",
            borderRadius: 2,
          }}
        />
        DETENER AR
      </button>
    </div>

    <style>{`
      @keyframes pulse-rec {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
    `}</style>
  </>
);

// =====================================================================
//  COMPONENTE PRINCIPAL
// =====================================================================

export default function MindARViewer({ onStateChange } = {}) {
  const containerRef = useRef(null);
  const mindarRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [cacheCount, setCacheCount] = useState(null);

  useEffect(() => {
    onStateChange?.(started);
  }, [started, onStateChange]);

  // Obtener info de caché al montar
  useEffect(() => {
    const getCacheStats = async () => {
      try {
        await initDB();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const countRequest = store.count();
        countRequest.onsuccess = () => setCacheCount(countRequest.result);
      } catch (err) {
        console.log("IndexedDB no disponible");
      }
    };
    getCacheStats();
  }, []);

  const handleClearCache = async () => {
    const result = await Swal.fire({
      title: '¿Limpiar caché?',
      text: 'Las texturas se descargarán nuevamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: ACCENT,
      cancelButtonColor: '#666',
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar',
      background: BG_DARK,
      color: '#fff',
    });

    if (result.isConfirmed) {
      await clearTextureCache();
      threeTextureCache.clear();
      setCacheCount(0);
      Swal.fire({
        title: 'Caché limpiada',
        icon: 'success',
        timer: 1500,
        background: BG_DARK,
        color: '#fff',
      });
    }
  };

  const showError = (title, error) => {
    console.error(error);
    Swal.fire({
      icon: "error",
      title,
      width: 900,
      background: BG_DARK,
      color: '#fff',
      html: `<pre style="text-align:left;white-space:pre-wrap;word-break:break-word;">${error?.message || JSON.stringify(error, null, 2)}</pre>`,
    });
  };

  const startAR = async () => {
    try {
      setStatus("loading");
      setLoadingProgress(0);
      setLoadingMessage("Verificando cámara...");

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("getUserMedia no disponible");
      }
      
      setLoadingProgress(5);
      setLoadingMessage("Solicitando permisos...");
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((t) => t.stop());

      // PRECARGAR TEXTURAS CON PROGRESO Y CACHÉ
      setLoadingProgress(10);
      await preloadTextures((progress, message) => {
        setLoadingProgress(10 + Math.round(progress * 0.8)); // 10-90%
        setLoadingMessage(message);
      });

      setLoadingProgress(90);
      setLoadingMessage("Inicializando motor AR...");

      const mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "/targets/nexo.mind",
        uiScanning: false,
        uiLoading: false,
        uiError: false,
        filterMinCF: 0.0001,
        filterBeta: 0.001,
        missTolerance: 5,
        warmupTolerance: 2,
      });
      mindarRef.current = mindarThree;

      const { renderer, scene, camera } = mindarThree;

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const planetParts = [];
      const rigControllers = [];

      PLANETS.forEach((planetData, index) => {
        const anchor = mindarThree.addAnchor(index);
        const parts = createPlanet(planetData);
        const ficha = createFichaTecnicaPanel(planetData, planetData.atmColor);

        const atmRadius = PLANET_RADIUS * ATMOSPHERE_MULTIPLIER;
        const panelPlanetSpacing = 0.05;

        ficha.position.y = PLANET_Y_POS - atmRadius - (ficha.scale.y / 2) - panelPlanetSpacing;

        const { rig, update, reset } = createStabilizedRig(anchor.group);

        rig.add(parts.sphere);
        rig.add(ficha);
        scene.add(rig);

        rigControllers.push(update);
        planetParts.push(parts);

        anchor.onTargetFound = () => console.log("Detectado:", planetData.name);
        anchor.onTargetLost = () => {
          console.log("Perdido:", planetData.name);
          reset();
        };
      });

      setLoadingProgress(95);
      setLoadingMessage("Iniciando cámara...");

      await mindarThree.start();

      setLoadingProgress(100);

      // Actualizar contador de caché
      try {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const countRequest = store.count();
        countRequest.onsuccess = () => setCacheCount(countRequest.result);
      } catch (err) {}

      renderer.setAnimationLoop(() => {
        rigControllers.forEach((update) => update());
        planetParts.forEach((parts) => {
          parts.sphere.rotation.y += 0.01;
          if (parts.clouds) parts.clouds.rotation.y += 0.0035;
        });
        renderer.render(scene, camera);
      });

      setStarted(true);
      setStatus("running");
    } catch (err) {
      setStatus("idle");
      showError("Error iniciando AR", err);
    }
  };

  const stopAR = async () => {
  try {
    if (mindarRef.current) {
      const mindarThree = mindarRef.current;
      
      // mostrar mensaje de limpieza
      Swal.fire({
        title: 'Deteniendo AR...',
        text: 'Limpiando recursos',
        timer: 1000,
        showConfirmButton: false,
        background: BG_DARK,
        color: '#fff',
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      
      mindarThree.renderer.setAnimationLoop(null);
      const { scene, renderer } = mindarThree;
      while (scene.children.length > 0) {
        const child = scene.children[0];
        scene.remove(child);
        if (child.traverse) {
          child.traverse((node) => {
            if (node.geometry) node.geometry.dispose();
            if (node.material) {
              if (Array.isArray(node.material)) {
                node.material.forEach(m => m.dispose());
              } else {
                node.material.dispose();
              }
            }
          });
        }
      }
      await mindarThree.stop();
      renderer.dispose();
      renderer.forceContextLoss();
      const container = containerRef.current;
      if (container) {
        container.innerHTML = '';
        container.style.background = BG_DARK;
      }
      mindarRef.current = null;
      if (window.gc) {
        window.gc();
      }
    }
    
    setStarted(false);
    setStatus("idle");
  } catch (err) {
    console.error("Error:", err);
    setStarted(false);
    setStatus("idle");
  }
};

  return (
    <>
      {!started && (
        <PreScanScreen 
          onStart={startAR} 
          status={status}
          progress={loadingProgress}
          message={loadingMessage}
          onClearCache={handleClearCache}
          cacheCount={cacheCount}
        />
      )}
      {started && <ScanningHUD onStop={stopAR} />}

      <div
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflow: "hidden",
          background: BG_DARK,
          zIndex: started ? 1 : -1,
        }}
      />
    </>
  );
}