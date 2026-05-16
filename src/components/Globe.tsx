"use client";

import { useRef, useMemo, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Country data ─────────────────────────────────────────────────────────────

const SOURCE_COUNTRIES = [
  { name: "Nepal",       flag: "🇳🇵", lat: 27.7,  lon: 85.3  },
  { name: "India",       flag: "🇮🇳", lat: 20.6,  lon: 78.9  },
  { name: "Philippines", flag: "🇵🇭", lat: 12.9,  lon: 121.8 },
  { name: "Bhutan",      flag: "🇧🇹", lat: 27.5,  lon: 90.4  },
  { name: "Kenya",       flag: "🇰🇪", lat: -1.3,  lon: 36.8  },
  { name: "Sri Lanka",   flag: "🇱🇰", lat: 7.9,   lon: 80.7  },
];

const DEST_COUNTRIES = [
  { name: "Kuwait",  flag: "🇰🇼", lat: 29.4, lon: 47.9 },
  { name: "Croatia", flag: "🇭🇷", lat: 45.1, lon: 15.2 },
  { name: "Albania", flag: "🇦🇱", lat: 41.3, lon: 20.0 },
];

const CYAN = "#00e5ff";
const GOLD = "#D88004";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function makeFlagTexture(flag: string, name: string, accent: string): THREE.CanvasTexture {
  const W = 100, H = 70;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Dark background
  ctx.fillStyle = "rgba(6, 15, 36, 0.93)";
  roundRect(ctx, 0, 0, W, H, 7);
  ctx.fill();

  // Accent border
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  roundRect(ctx, 1, 1, W - 2, H - 2, 6);
  ctx.stroke();

  // Flag emoji
  ctx.font = "30px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(flag, W / 2, 46);

  // Country name
  ctx.font = "bold 9.5px Arial, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(name.toUpperCase(), W / 2, H - 8);

  return new THREE.CanvasTexture(canvas);
}

// ─── Drag state ───────────────────────────────────────────────────────────────

const drag = {
  active: false,
  lastX: 0,
  lastY: 0,
  vx: 0,
  vy: 0,
  rx: 0,
  ry: Math.PI,   // start facing Middle East / Asia
};

// ─── Country pin ─────────────────────────────────────────────────────────────

interface PinProps {
  lat: number;
  lon: number;
  flag: string;
  name: string;
  accent: string;
  pulse?: boolean;
}

function CountryPin({ lat, lon, flag, name, accent, pulse = false }: PinProps) {
  const p1 = useRef<THREE.Mesh>(null);
  const p2 = useRef<THREE.Mesh>(null);

  // Positions
  const surfacePos = useMemo(() => latLonToVec3(lat, lon, 1.02), [lat, lon]);
  const tipPos     = useMemo(() => latLonToVec3(lat, lon, 1.26), [lat, lon]);

  // Flag sprite texture
  const texture = useMemo(() => makeFlagTexture(flag, name, accent), [flag, name, accent]);

  // Pin stem line
  const stemLine = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([surfacePos, tipPos]);
    const mat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.75 });
    return new THREE.Line(geo, mat);
  }, [surfacePos, tipPos, accent]);

  // Pulse animation for destination pins
  const pulseTime = useRef(0);
  useFrame((_, delta) => {
    if (!pulse) return;
    pulseTime.current += delta;
    const t = pulseTime.current * 0.55;
    const t1 = t % 1, t2 = (t + 0.5) % 1;
    if (p1.current) {
      p1.current.scale.setScalar(1 + t1 * 3.5);
      (p1.current.material as THREE.MeshBasicMaterial).opacity = (1 - t1) * 0.45;
    }
    if (p2.current) {
      p2.current.scale.setScalar(1 + t2 * 3.5);
      (p2.current.material as THREE.MeshBasicMaterial).opacity = (1 - t2) * 0.45;
    }
  });

  return (
    <group>
      {/* Dot at surface */}
      {pulse ? (
        <>
          <mesh position={surfacePos}>
            <sphereGeometry args={[0.026, 12, 12]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          <mesh ref={p1} position={surfacePos}>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshBasicMaterial color={accent} transparent opacity={0.4} />
          </mesh>
          <mesh ref={p2} position={surfacePos}>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshBasicMaterial color={accent} transparent opacity={0.4} />
          </mesh>
        </>
      ) : (
        <group position={surfacePos}>
          <mesh>
            <sphereGeometry args={[0.026, 10, 10]} />
            <meshBasicMaterial color={accent} transparent opacity={0.2} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.016, 10, 10]} />
            <meshBasicMaterial color={accent} />
          </mesh>
        </group>
      )}

      {/* Pin stem */}
      <primitive object={stemLine} />

      {/* Flag sprite at tip */}
      <sprite position={tipPos} scale={[0.22, 0.155, 1]}>
        <spriteMaterial map={texture} transparent sizeAttenuation />
      </sprite>
    </group>
  );
}

// ─── Arc lines ────────────────────────────────────────────────────────────────

const CORE_SEGS = 12;
const GLOW_SEGS = 22;

function ArcLine({
  start, end, delay,
}: { start: THREE.Vector3; end: THREE.Vector3; delay: number }) {
  const { staticLine, allPoints, coreGeo, glowGeo, coreMat, glowMat, coreLineObj, glowLineObj } =
    useMemo(() => {
      const mid = new THREE.Vector3().addVectors(start, end).normalize().multiplyScalar(1.65);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const allPoints = curve.getPoints(100);

      const staticGeo = new THREE.BufferGeometry().setFromPoints(allPoints);
      const staticMat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.2 });
      const staticLine = new THREE.Line(staticGeo, staticMat);

      const coreGeo = new THREE.BufferGeometry();
      coreGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(CORE_SEGS * 3), 3));
      const coreMat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 1.0 });
      const coreLineObj = new THREE.Line(coreGeo, coreMat);

      const glowGeo = new THREE.BufferGeometry();
      glowGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(GLOW_SEGS * 3), 3));
      const glowMat = new THREE.LineBasicMaterial({ color: "#ffb830", transparent: true, opacity: 0.35 });
      const glowLineObj = new THREE.Line(glowGeo, glowMat);

      return { staticLine, allPoints, coreGeo, glowGeo, coreMat, glowMat, coreLineObj, glowLineObj };
    }, [start, end]);

  const arcTime = useRef(delay);
  useFrame((_, delta) => {
    arcTime.current += delta * 0.18;
    const t = arcTime.current % 1;
    const n = allPoints.length;
    const center = Math.floor(t * n);
    const alpha  = t < 0.08 ? t / 0.08 : t > 0.92 ? (1 - t) / 0.08 : 1;

    const coreArr = coreGeo.attributes.position.array as Float32Array;
    const half    = Math.floor(CORE_SEGS / 2);
    for (let i = 0; i < CORE_SEGS; i++) {
      const p = allPoints[Math.max(0, Math.min(n - 1, center - half + i))];
      coreArr[i * 3] = p.x; coreArr[i * 3 + 1] = p.y; coreArr[i * 3 + 2] = p.z;
    }
    (coreGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    coreMat.opacity = alpha;

    const glowArr  = glowGeo.attributes.position.array as Float32Array;
    const glowHalf = Math.floor(GLOW_SEGS / 2);
    for (let i = 0; i < GLOW_SEGS; i++) {
      const p = allPoints[Math.max(0, Math.min(n - 1, center - glowHalf + i))];
      glowArr[i * 3] = p.x; glowArr[i * 3 + 1] = p.y; glowArr[i * 3 + 2] = p.z;
    }
    (glowGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    glowMat.opacity = alpha * 0.35;
  });

  return (
    <group>
      <primitive object={staticLine} />
      <primitive object={glowLineObj} />
      <primitive object={coreLineObj} />
    </group>
  );
}

// ─── Globe mesh ───────────────────────────────────────────────────────────────

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!drag.active) {
      drag.vx *= 0.92;
      drag.vy *= 0.92;
      drag.ry += drag.vy + delta * 0.07;
      drag.rx += drag.vx;
    }
    drag.rx = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, drag.rx));
    groupRef.current.rotation.x = drag.rx;
    groupRef.current.rotation.y = drag.ry;
  });

  const arcs = useMemo(() => {
    const total = SOURCE_COUNTRIES.length * DEST_COUNTRIES.length;
    let idx = 0;
    const list: { start: THREE.Vector3; end: THREE.Vector3; delay: number; key: string }[] = [];
    SOURCE_COUNTRIES.forEach((src) => {
      DEST_COUNTRIES.forEach((dst) => {
        list.push({
          start: latLonToVec3(src.lat, src.lon, 1.02),
          end:   latLonToVec3(dst.lat, dst.lon, 1.02),
          delay: idx++ / total,
          key:   `${src.name}-${dst.name}`,
        });
      });
    });
    return list;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.22, 32, 32]} />
        <meshBasicMaterial color="#1a6aff" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshBasicMaterial color="#0a4aaa" transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>

      {/* Globe surface */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial color="#060f24" shininess={12} specular={new THREE.Color("#1a3a6b")} />
      </mesh>

      {/* Grid */}
      <mesh>
        <sphereGeometry args={[1.003, 36, 18]} />
        <meshBasicMaterial color="#1a4a8a" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Source country pins */}
      {SOURCE_COUNTRIES.map((c) => (
        <CountryPin key={c.name} lat={c.lat} lon={c.lon} flag={c.flag} name={c.name} accent={CYAN} />
      ))}

      {/* Destination country pins (with pulse) */}
      {DEST_COUNTRIES.map((c) => (
        <CountryPin key={c.name} lat={c.lat} lon={c.lon} flag={c.flag} name={c.name} accent={GOLD} pulse />
      ))}

      {/* Arcs */}
      {arcs.map((a) => (
        <ArcLine key={a.key} start={a.start} end={a.end} delay={a.delay} />
      ))}
    </group>
  );
}

// ─── Scene + export ───────────────────────────────────────────────────────────

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 4]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={0.5} color="#2255cc" />
      <pointLight position={[0, -4, 2]} intensity={0.3} color="#D88004" />
      <GlobeMesh />
    </>
  );
}

export function Globe() {
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    drag.active = true;
    drag.lastX  = e.clientX;
    drag.lastY  = e.clientY;
    drag.vx = 0;
    drag.vy = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.active) return;
    const dx = e.clientX - drag.lastX;
    const dy = e.clientY - drag.lastY;
    drag.vy = dx * 0.006;
    drag.vx = dy * 0.006;
    drag.ry += dx * 0.006;
    drag.rx += dy * 0.006;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => { drag.active = false; }, []);

  return (
    <div
      className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <Canvas
        camera={{ position: [0, 0.4, 4.1], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
