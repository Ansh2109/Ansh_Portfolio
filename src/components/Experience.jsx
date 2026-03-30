import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Points, PointMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

// ── Star cluster (dense concentrated sphere) ─────────────────────────────
const StarCluster = ({ position = [0,0,-80], count = 3500, radius = 18 }) => {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Gaussian-like distribution: denser in center
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
      {/* Dense core */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent color="#d8eeff"
          size={0.06} sizeAttenuation depthWrite={false}
          blending={THREE.AdditiveBlending} opacity={0.75}
        />
      </Points>
      {/* Glow halo */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent color="#99ccff"
          size={0.18} sizeAttenuation depthWrite={false}
          blending={THREE.AdditiveBlending} opacity={0.12}
        />
      </Points>
    </group>
  );
};

// ── A few bright large-ish nearby stars ───────────────────────────────────
const BRIGHT_STARS = [
  { pos: [-28, 18, -30],  color: '#ffffff', size: 0.35 },
  { pos: [ 32, -12, -25], color: '#cce0ff', size: 0.28 },
  { pos: [-14, -22, -20], color: '#ffe8cc', size: 0.25 },
  { pos: [ 20,  28, -35], color: '#ffffff', size: 0.22 },
  { pos: [-40,  5, -28],  color: '#ddeeff', size: 0.20 },
  { pos: [ 10, -30, -22], color: '#ffeecc', size: 0.18 },
];
const BrightStars = () => {
  const positions = useMemo(() => {
    const pos = new Float32Array(BRIGHT_STARS.length * 3);
    BRIGHT_STARS.forEach((s, i) => {
      pos[i * 3] = s.pos[0]; pos[i * 3 + 1] = s.pos[1]; pos[i * 3 + 2] = s.pos[2];
    });
    return pos;
  }, []);
  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.4} sizeAttenuation
        depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
    </Points>
  );
};

// ── Rushing warp particles (infinite loop) ───────────────────────────────────
const WarpStream = ({ isHeld }) => {
  const ref = useRef();
  const COUNT = 1800;

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2 + Math.random() * 12;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = -Math.random() * 350;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array;
    const speed = isHeld.current ? 160 * delta : 16 * delta;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 2] += speed;
      if (arr[i * 3 + 2] > 8) {
        const r = 2 + Math.random() * 12;
        const angle = Math.random() * Math.PI * 2;
        arr[i * 3]     = Math.cos(angle) * r;
        arr[i * 3 + 1] = Math.sin(angle) * r;
        arr[i * 3 + 2] = -320 - Math.random() * 30;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent color="#88ccff"
        size={0.04} sizeAttenuation depthWrite={false}
        blending={THREE.AdditiveBlending} opacity={0.35}
      />
    </Points>
  );
};

// ── Comet with glowing head and long tail ────────────────────────────────────
const Comet = ({ delay, dir = 0 }) => {
  const headRef = useRef();
  const tailRef = useRef();
  const sz = useMemo(() => -30 - Math.random() * 100, []);
  const sx = useMemo(() => {
    if (dir === 0 || dir === 4) return -100 - Math.random() * 30;
    if (dir === 1 || dir === 5) return  100 + Math.random() * 30;
    return (Math.random() - 0.5) * 100;
  }, [dir]);
  const sy = useMemo(() => {
    if (dir === 2) return -55 - Math.random() * 20;
    if (dir === 3) return  55 + Math.random() * 20;
    return (Math.random() - 0.5) * 60;
  }, [dir]);
  const dx = useMemo(() => {
    if (dir === 1 || dir === 5) return -1;
    if (dir === 2 || dir === 3) return (Math.random() - 0.5) * 0.25;
    return 1;
  }, [dir]);
  const dy = useMemo(() => {
    if (dir === 2) return 1;
    if (dir === 3) return -1;
    if (dir === 4) return 0.55;
    if (dir === 5) return -0.45;
    return (Math.random() - 0.5) * 0.35;
  }, [dir]);
  const tiltAngle = useMemo(() => Math.atan2(dy, dx), [dx, dy]);

  const TRAVEL = 240;
  useFrame((state) => {
    const t = ((state.clock.elapsedTime * 0.35 + delay) % 13) / 13;
    const x = sx + dx * t * TRAVEL;
    const y = sy + dy * t * TRAVEL;
    const fade = t < 0.05 ? t / 0.05 : t > 0.9 ? (1 - t) / 0.1 : 1;
    if (headRef.current) {
      headRef.current.position.set(x, y, sz);
      headRef.current.material.opacity = fade * 0.95;
    }
    if (tailRef.current) {
      tailRef.current.position.set(x - dx * 8, y - dy * 8, sz);
      tailRef.current.rotation.z = tiltAngle;
      tailRef.current.material.opacity = fade * 0.45;
    }
  });

  return (
    <>
      <mesh ref={headRef} position={[sx, sy, sz]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
      <mesh ref={tailRef} position={[sx, sy, sz]} rotation={[0, 0, tiltAngle]}>
        <boxGeometry args={[16, 0.055, 0.055]} />
        <meshBasicMaterial color="#77bbff" transparent opacity={0} />
      </mesh>
    </>
  );
};

// ── Drifting dark asteroid ───────────────────────────────────────────────────
const Asteroid = ({ pos, size, velX = 0.012, velY = 0.008 }) => {
  const ref = useRef();
  const vel = useRef([velX, velY, (Math.random() - 0.5) * 0.005]);
  const rot = useRef([
    Math.random() * 0.011,
    Math.random() * 0.008,
    Math.random() * 0.006,
  ]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x += vel.current[0];
    ref.current.position.y += vel.current[1];
    ref.current.position.z += vel.current[2];
    ref.current.rotation.x += rot.current[0];
    ref.current.rotation.y += rot.current[1];
    ref.current.rotation.z += rot.current[2];
    if (Math.abs(ref.current.position.x) > 80) vel.current[0] *= -1;
    if (Math.abs(ref.current.position.y) > 60) vel.current[1] *= -1;
    if (ref.current.position.z > -5 || ref.current.position.z < -120) vel.current[2] *= -1;
  });

  return (
    <mesh ref={ref} position={pos}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color="#1a1a2e" metalness={0.75} roughness={0.7}
        emissive="#050510" emissiveIntensity={0.25}
      />
    </mesh>
  );
};

// ── Nebula cloud ─────────────────────────────────────────────────────────────
const Nebula = ({ position, color = '#00f3ff', scale = 1, count = 5000 }) => {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 60;
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
        <PointMaterial
          transparent vertexColors={false}
          size={0.14} sizeAttenuation depthWrite={false}
          blending={THREE.AdditiveBlending} color={color} opacity={0.06}
        />
      </Points>
    </group>
  );
};

// ── Distant wormhole (deep background) ───────────────────────────────────────
const WormholeRing = ({ scrollProgress = 0 }) => {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.0018;
    ref.current.rotation.y += 0.0009;
    const s = 1 + scrollProgress * 0.6;
    ref.current.scale.setScalar(s);
  });
  return (
    <group ref={ref} position={[0, 0, -220]}>
      {[0, 1, 2, 3].map((i) => (
        <Torus key={i} args={[22 + i * 7, 0.05, 8, 120]}
          rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
          <meshBasicMaterial color={i % 2 === 0 ? '#00f3ff' : '#bf00ff'}
            transparent opacity={Math.max(0.015, 0.07 - i * 0.012)} />
        </Torus>
      ))}
    </group>
  );
};

// ── Main Experience ───────────────────────────────────────────────────────────
const Experience = ({ scrollProgress = 0 }) => {
  const { mouse } = useThree();
  const groupRef = useRef();
  const isHeld = useRef(false);
  const warpRef = useRef();

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
    Array.from({ length: 12 }, (_, i) => ({ id: i, delay: i * 1.1, dir: i % 6 })), []);

  const asteroids = useMemo(() => {
    const dirs = [
      [1, 0], [-1, 0], [0, 1], [0, -1], [1, 0.7], [-1, 0.5],
      [0.6, -1], [-0.6, -1], [1, -0.4], [-0.8, 0.6], [0.4, 1], [-0.3, -0.9],
    ];
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      pos: [(Math.random() - 0.5) * 120, (Math.random() - 0.5) * 90, -20 - Math.random() * 140],
      size: 0.15 + Math.random() * 0.7,
      velX: dirs[i % dirs.length][0] * (0.004 + Math.random() * 0.01),
      velY: dirs[i % dirs.length][1] * (0.003 + Math.random() * 0.008),
    }));
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Mouse parallax — stronger on hold (feel like flying toward cursor)
    const strength = isHeld.current ? 0.12 : 0.035;
    const tx = mouse.y * Math.PI * strength;
    const ty = mouse.x * Math.PI * strength;
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.05;

    // Scroll: move forward + upward through scene
    const targetY = scrollProgress * 170;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.07;
    const targetZ = -scrollProgress * 18;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <color attach="background" args={['#000004']} />

      <ambientLight intensity={0.25} />
      <pointLight position={[30, 30, 10]} intensity={2.5} color="#00f3ff" distance={300} />
      <pointLight position={[-30, -20, 10]} intensity={1.8} color="#bf00ff" distance={250} />

      {/* ── Warp stream (infinite fly-through, holds speed up) ── */}
      <WarpStream isHeld={isHeld} />


      {/* Far: dense milky-way micro-dots */}
      <Stars radius={600} depth={200} count={40000} factor={4.0} saturation={0.05} fade speed={0.2} />
      {/* Mid: scattered visible stars */}
      <Stars radius={200} depth={80}  count={12000} factor={6.0} saturation={0.2}  fade speed={0.55} />
      {/* Near: sparse close bright stars */}
      <Stars radius={55}  depth={18}  count={1200}  factor={8.5} saturation={0.5}  fade speed={1.0} />

      {/* Bright nearby stars */}
      <BrightStars />

      {/* ── Comets ── */}
      {comets.map((c) => <Comet key={c.id} delay={c.delay} dir={c.dir} />)}

      {/* ── Asteroids ── */}
      {asteroids.map((a) => (
        <Asteroid key={a.id} pos={a.pos} size={a.size} velX={a.velX} velY={a.velY} />
      ))}

      {/* ── Faint nebulae ── */}
      <Nebula position={[80,  40, -200]} color="#00f3ff" scale={5}   count={8000} />
      <Nebula position={[-90, -50, -280]} color="#bf00ff" scale={7}   count={12000} />
      <Nebula position={[30, -80, -180]} color="#3300cc" scale={3.5} count={5000} />
      <Nebula position={[-50, 90, -240]} color="#00f3ff" scale={3}   count={4000} />
      <Nebula position={[120, 10, -260]} color="#cc0066" scale={4}   count={6000} />

      {/* ── Distant wormhole ── */}
      <WormholeRing scrollProgress={scrollProgress} />

      <fog attach="fog" args={['#000004', 22, 480]} />
    </group>
  );
};

export default Experience;
