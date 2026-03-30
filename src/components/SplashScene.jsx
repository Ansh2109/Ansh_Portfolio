import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Points, PointMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

// ── Dense star cluster ────────────────────────────────────────────────────
const StarCluster = ({ position = [0,0,-80], count = 3500, radius = 18 }) => {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.8) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);
  return (
    <group position={position}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#d8eeff" size={0.06} sizeAttenuation
          depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.75} />
      </Points>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#99ccff" size={0.18} sizeAttenuation
          depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.12} />
      </Points>
    </group>
  );
};

// ── Bright nearby star points ────────────────────────────────────────────
const BRIGHT_POS = [
  -26, 16, -28,   30, -10, -22,  -12, -20, -18,
   18,  26, -32,  -38,  4, -26,    8, -28, -20,
];
const BrightStars = () => {
  const positions = useMemo(() => new Float32Array(BRIGHT_POS), []);
  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.42} sizeAttenuation
        depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
    </Points>
  );
};

// ── Rushing warp particles (infinite loop fly-through) ───────────────────────
const WarpStream = ({ isHeld }) => {
  const ref = useRef();
  const COUNT = 2500;

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 1.5 + Math.random() * 9;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = -Math.random() * 300;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array;
    const speed = isHeld.current ? 180 * delta : 22 * delta;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 2] += speed;
      if (arr[i * 3 + 2] > 8) {
        // Reset to far back — infinite loop
        const r = 1.5 + Math.random() * 9;
        const angle = Math.random() * Math.PI * 2;
        arr[i * 3]     = Math.cos(angle) * r;
        arr[i * 3 + 1] = Math.sin(angle) * r;
        arr[i * 3 + 2] = -280 - Math.random() * 20;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent color="#99ddff"
        size={0.045} sizeAttenuation depthWrite={false}
        blending={THREE.AdditiveBlending} opacity={0.5}
      />
    </Points>
  );
};

// ── Streak lines that elongate when held (warp lines) ───────────────────────
const WarpLine = ({ isHeld, delay }) => {
  const ref = useRef();
  const r = useMemo(() => 2 + Math.random() * 8, []);
  const angle = useMemo(() => Math.random() * Math.PI * 2, []);
  const startZ = useMemo(() => -50 - Math.random() * 200, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const mesh = ref.current;
    const speed = isHeld.current ? 160 * delta : 18 * delta;
    mesh.position.z += speed;

    // Stretch the geometry when boosting
    const stretchFactor = isHeld.current ? 1 + speed * 0.15 : 1;
    mesh.scale.z = stretchFactor;
    mesh.material.opacity = isHeld.current ? 0.7 : 0.25;

    if (mesh.position.z > 5) {
      mesh.position.z = startZ - Math.random() * 50;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[Math.cos(angle) * r, Math.sin(angle) * r, startZ]}
      rotation={[0, 0, angle]}
    >
      <boxGeometry args={[0.03, 0.03, 1.5]} />
      <meshBasicMaterial color="#00e8ff" transparent opacity={0.25} />
    </mesh>
  );
};

// ── Comet — randomised direction ────────────────────────────────────────────
const Comet = ({ delay, dir = 0 }) => {
  const headRef = useRef();
  const tailRef = useRef();
  // dir: 0=left→right, 1=right→left, 2=bottom→top, 3=top→bottom, 4=diagonal NE, 5=diagonal SW
  const sz = useMemo(() => -20 - Math.random() * 55, []);
  const sx = useMemo(() => {
    if (dir === 0 || dir === 4) return -90 - Math.random() * 30;  // start left
    if (dir === 1 || dir === 5) return  90 + Math.random() * 30;  // start right
    return (Math.random() - 0.5) * 80;                            // top/bottom
  }, [dir]);
  const sy = useMemo(() => {
    if (dir === 2) return -50 - Math.random() * 20;  // start bottom
    if (dir === 3) return  50 + Math.random() * 20;  // start top
    return (Math.random() - 0.5) * 50;               // left/right
  }, [dir]);
  const dx = useMemo(() => {
    if (dir === 1 || dir === 5) return -1;  // going left
    if (dir === 2 || dir === 3) return (Math.random() - 0.5) * 0.3; // mostly vertical
    return 1;
  }, [dir]);
  const dy = useMemo(() => {
    if (dir === 2) return 1;   // going up
    if (dir === 3) return -1;  // going down
    if (dir === 4) return 0.6;
    if (dir === 5) return -0.5;
    return (Math.random() - 0.5) * 0.4; // mostly horizontal
  }, [dir]);
  const tiltAngle = useMemo(() => Math.atan2(dy, dx), [dx, dy]);

  useFrame((state) => {
    const t = ((state.clock.elapsedTime * 0.75 + delay) % 11) / 11;
    const x = sx + dx * t * 220;
    const y = sy + dy * t * 220;
    const fade = t < 0.06 ? t / 0.06 : t > 0.88 ? (1 - t) / 0.12 : 1;
    if (headRef.current) {
      headRef.current.position.set(x, y, sz);
      headRef.current.material.opacity = fade;
    }
    if (tailRef.current) {
      tailRef.current.position.set(x - dx * 7, y - dy * 7, sz);
      tailRef.current.rotation.z = tiltAngle;
      tailRef.current.material.opacity = fade * 0.5;
    }
  });

  return (
    <>
      <mesh ref={headRef} position={[sx, sy, sz]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
      <mesh ref={tailRef} position={[sx, sy, sz]} rotation={[0, 0, tiltAngle]}>
        <boxGeometry args={[14, 0.05, 0.05]} />
        <meshBasicMaterial color="#88ccff" transparent opacity={0} />
      </mesh>
    </>
  );
};

// ── Drifting asteroid ────────────────────────────────────────────────────────
const Asteroid = ({ pos, size, velX = 0.012, velY = 0.008 }) => {
  const ref = useRef();
  const vel = useRef([velX, velY, (Math.random() - 0.5) * 0.005]);
  const rot = useRef([
    Math.random() * 0.012,
    Math.random() * 0.009,
    Math.random() * 0.007,
  ]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x += vel.current[0];
    ref.current.position.y += vel.current[1];
    ref.current.position.z += vel.current[2];
    ref.current.rotation.x += rot.current[0];
    ref.current.rotation.y += rot.current[1];
    ref.current.rotation.z += rot.current[2];
    if (Math.abs(ref.current.position.x) > 65) vel.current[0] *= -1;
    if (Math.abs(ref.current.position.y) > 45) vel.current[1] *= -1;
    if (ref.current.position.z > 0 || ref.current.position.z < -90) vel.current[2] *= -1;
  });

  return (
    <mesh ref={ref} position={pos}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color="#1c1c30" metalness={0.75} roughness={0.7}
        emissive="#050510" emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// ── Nebula cloud ─────────────────────────────────────────────────────────────
const SplashNebula = ({ position, color, scale, count = 5000 }) => {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 55;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  return (
    <group position={position} scale={scale}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={color} size={0.18} sizeAttenuation
          depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.07} />
      </Points>
    </group>
  );
};

// ── Interactive wormhole portal ───────────────────────────────────────────────
const WormholePortal = ({ isHeld }) => {
  const { mouse } = useThree();
  const groupRef = useRef();
  const innerRef = useRef();
  const particleRef = useRef();

  const tunnelParticles = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = Math.random() * Math.PI * 2;
      const r = (2.5 + Math.random() * 3) * (1 + t * 0.7);
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = -t * 70;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Strong mouse follow when held
    const strength = isHeld.current ? 0.7 : 0.35;
    const tx = mouse.y * strength;
    const ty = mouse.x * strength;
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.07;
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.07;
    groupRef.current.rotation.z += isHeld.current ? 0.008 : 0.0018;

    if (innerRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * (isHeld.current ? 5 : 2.5)) * 0.07;
      innerRef.current.scale.setScalar(pulse);
      innerRef.current.rotation.z -= isHeld.current ? 0.025 : 0.009;
    }
    if (particleRef.current) {
      particleRef.current.rotation.z += isHeld.current ? 0.012 : 0.004;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -14]}>
      <Points ref={particleRef} positions={tunnelParticles} stride={3} frustumCulled={false}>
        <PointMaterial vertexColors={false} transparent size={0.085} sizeAttenuation
          depthWrite={false} blending={THREE.AdditiveBlending} color="#00e8ff" opacity={0.55} />
      </Points>

      {[7, 9, 12].map((r, i) => (
        <Torus key={i} args={[r, 0.055 - i * 0.01, 8, 128]} rotation={[Math.PI / 2, 0, i * 0.4]}>
          <meshBasicMaterial color={i === 1 ? '#bf00ff' : '#00f3ff'}
            transparent opacity={0.18 - i * 0.04} />
        </Torus>
      ))}

      <Torus ref={innerRef} args={[5, 0.13, 12, 128]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.75} />
      </Torus>
      <Torus args={[5.6, 0.065, 8, 128]} rotation={[Math.PI / 2, 0.3, 0]}>
        <meshBasicMaterial color="#bf00ff" transparent opacity={0.4} />
      </Torus>

      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[4.4, 64]} />
        <meshBasicMaterial color="#000820" transparent opacity={0.93} side={THREE.DoubleSide} />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 2.5, Math.sin(a) * 2.5, 0.1]}
            rotation={[0, 0, a]}>
            <boxGeometry args={[2.5, 0.015, 0.01]} />
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.22} />
          </mesh>
        );
      })}

      <pointLight color="#00f3ff" intensity={28} distance={45} position={[0, 0, 2]} />
      <pointLight color="#bf00ff" intensity={16} distance={32} position={[0, 0, -5]} />
    </group>
  );
};

// ── Main splash scene ─────────────────────────────────────────────────────────
const SplashScene = () => {
  const { mouse } = useThree();
  const starGroupRef = useRef();
  const isHeld = useRef(false);

  // Track click-and-hold globally
  useEffect(() => {
    const down = () => { isHeld.current = true; };
    const up   = () => { isHeld.current = false; };
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  const comets = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({ id: i, delay: i * 0.85, dir: i % 6 })), []);

  const asteroids = useMemo(() => {
    const dirs = [
      [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1], [0.7, -0.7], [-0.5, 0.8],
    ];
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      pos: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 50, -12 - Math.random() * 80],
      size: 0.12 + Math.random() * 0.55,
      velX: dirs[i % dirs.length][0] * (0.004 + Math.random() * 0.01),
      velY: dirs[i % dirs.length][1] * (0.003 + Math.random() * 0.008),
    }));
  }, []);

  const warpLines = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({ id: i, delay: i * 0.05 })), []);

  // Star group gently rotates/drifts with mouse
  useFrame(() => {
    if (!starGroupRef.current) return;
    const tx = mouse.y * 0.04;
    const ty = mouse.x * 0.04;
    starGroupRef.current.rotation.x += (tx - starGroupRef.current.rotation.x) * 0.025;
    starGroupRef.current.rotation.y += (ty - starGroupRef.current.rotation.y) * 0.025;
    starGroupRef.current.rotation.y += 0.00012; // very slow auto-drift
  });

  return (
    <>
      <color attach="background" args={['#000004']} />
      <ambientLight intensity={0.15} />

      {/* ── Warp stream & lines — camera-space, not in star group ── */}
      <WarpStream isHeld={isHeld} />
      {warpLines.map((w) => (
        <WarpLine key={w.id} isHeld={isHeld} delay={w.delay} />
      ))}

      {/* ── Wormhole portal ── */}
      <WormholePortal isHeld={isHeld} />

      {/* ── Comets ── */}
      {comets.map((c) => <Comet key={c.id} delay={c.delay} dir={c.dir} />)}

      {/* ── Asteroids ── */}
      {asteroids.map((a) => (
        <Asteroid key={a.id} pos={a.pos} size={a.size} velX={a.velX} velY={a.velY} />
      ))}

      {/* ── Star field rotates with mouse (parallax feel) ── */}
      <group ref={starGroupRef}>
        {/* Far: dense milky-way micro-dots */}
        <Stars radius={600} depth={200} count={40000} factor={4.0} saturation={0.05} fade speed={0.2} />
        {/* Mid: scattered visible stars */}
        <Stars radius={200} depth={80}  count={12000} factor={6.0} saturation={0.2}  fade speed={0.55} />
        {/* Near: sparse close bright stars */}
        <Stars radius={55}  depth={18}  count={1200}  factor={8.5} saturation={0.5}  fade speed={1.0} />
      </group>

      {/* Bright nearby stars */}
      <BrightStars />

      {/* Faint nebulae */}
      <SplashNebula position={[65,  30, -180]} color="#00f3ff" scale={5}   count={9000} />
      <SplashNebula position={[-75, -40, -220]} color="#bf00ff" scale={6}   count={10000} />
      <SplashNebula position={[0,   60, -160]} color="#3300ff" scale={3.5} count={5000} />

      <fog attach="fog" args={['#000004', 30, 380]} />
    </>
  );
};

export default SplashScene;
