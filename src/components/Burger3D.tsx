import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, Float } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

function Bun({ y, top = false, color }: { y: number; top?: boolean; color: string }) {
  // Use a lathe geometry for a more realistic dome/bun profile
  const geom = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = Math.sin(t * Math.PI * 0.5) * 1.18;
      const y = top
        ? Math.cos(t * Math.PI * 0.5) * 0.65
        : -Math.cos(t * Math.PI * 0.5) * 0.45 + 0.45;
      points.push(new THREE.Vector2(x, y));
    }
    if (!top) {
      // flat bottom for the lower bun
      points.push(new THREE.Vector2(0, 0));
    } else {
      points.push(new THREE.Vector2(0, 0.65));
    }
    return new THREE.LatheGeometry(points, 64);
  }, [top]);

  return (
    <mesh geometry={geom} position={[0, y, 0]} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={color}
        roughness={0.75}
        clearcoat={0.15}
        clearcoatRoughness={0.6}
        sheen={0.3}
        sheenColor={"#f4c98a"}
      />
    </mesh>
  );
}

function Patty({ y }: { y: number }) {
  // Slightly irregular cylinder with bevel illusion via two stacked shapes
  return (
    <group position={[0, y, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.12, 1.18, 0.32, 64]} />
        <meshStandardMaterial color="#3a1d10" roughness={0.95} metalness={0.0} />
      </mesh>
      {/* charred bumps */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const r = 0.95 + (i % 4) * 0.05;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, 0.16, Math.sin(a) * r]}
            castShadow
          >
            <sphereGeometry args={[0.06 + (i % 3) * 0.02, 10, 10]} />
            <meshStandardMaterial color="#2a140a" roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
}

function Cheese({ y }: { y: number }) {
  // Square cheese with drooping corners using a rounded plane
  return (
    <group position={[0, y, 0]}>
      <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[2.05, 0.07, 2.05]} />
        <meshPhysicalMaterial
          color="#f5b13a"
          roughness={0.3}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          emissive="#3a2300"
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* drooping corners */}
      {[
        [1.0, -0.05, 0],
        [-1.0, -0.05, 0],
        [0, -0.05, 1.0],
        [0, -0.05, -1.0],
      ].map(([x, yy, z], i) => (
        <mesh key={i} position={[x, yy, z]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.07, 0.5]} />
          <meshPhysicalMaterial color="#f5b13a" roughness={0.3} clearcoat={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Lettuce({ y }: { y: number }) {
  // ruffled torus with multiple frilly layers
  return (
    <group position={[0, y, 0]}>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 1.0;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, Math.sin(i) * 0.04, Math.sin(a) * r]}
            rotation={[Math.random() * 0.4, a, Math.random() * 0.4]}
            castShadow
          >
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color={i % 2 ? "#5aa83a" : "#4a8f30"} roughness={0.85} />
          </mesh>
        );
      })}
    </group>
  );
}

function Tomato({ y }: { y: number }) {
  return (
    <mesh position={[0, y, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[1.0, 1.0, 0.14, 48]} />
      <meshPhysicalMaterial
        color="#d8392a"
        roughness={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        transmission={0.05}
      />
    </mesh>
  );
}

function Bacon({ y, rotZ, offset }: { y: number; rotZ: number; offset: [number, number] }) {
  return (
    <mesh
      position={[offset[0], y, offset[1]]}
      rotation={[0, rotZ, 0.04]}
      castShadow
    >
      <boxGeometry args={[2.1, 0.08, 0.36]} />
      <meshStandardMaterial color="#7a2818" roughness={0.7} />
    </mesh>
  );
}

function SesameSeeds() {
  const seeds = useMemo(() => {
    const arr: { p: [number, number, number]; r: [number, number, number]; s: number }[] = [];
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.2 + Math.random() * 0.85;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      // y on the dome surface
      const dist = Math.sqrt(x * x + z * z);
      const y = 1.05 + Math.cos((dist / 1.18) * Math.PI * 0.5) * 0.18;
      arr.push({
        p: [x, y, z],
        r: [Math.random(), Math.random() * Math.PI, Math.random()],
        s: 0.045 + Math.random() * 0.02,
      });
    }
    return arr;
  }, []);

  return (
    <>
      {seeds.map((sd, i) => (
        <mesh key={i} position={sd.p} rotation={sd.r} castShadow>
          <sphereGeometry args={[sd.s, 12, 12]} />
          <meshPhysicalMaterial
            color="#f5e0a8"
            roughness={0.45}
            clearcoat={0.4}
          />
        </mesh>
      ))}
    </>
  );
}

function BurgerStack() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.06;
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      <Bun y={-0.95} color="#d99a55" />
      {/* sauce */}
      <mesh position={[0, -0.55, 0]} castShadow>
        <cylinderGeometry args={[1.04, 1.04, 0.07, 48]} />
        <meshPhysicalMaterial color="#b82a1f" roughness={0.35} clearcoat={0.7} />
      </mesh>
      <Patty y={-0.32} />
      <Cheese y={-0.05} />
      <Bacon y={0.02} rotZ={0.25} offset={[0.15, 0.25]} />
      <Bacon y={0.06} rotZ={-0.35} offset={[-0.1, -0.22]} />
      <Tomato y={0.22} />
      <Lettuce y={0.36} />
      <Bun y={0.78} color="#e4a868" top />
      <SesameSeeds />
    </group>
  );
}

export function Burger3D({ className = "" }: { className?: string; autoRotate?: boolean }) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.0, 4.6], fov: 38 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[4, 6, 3]}
            intensity={1.6}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#ffb88a" />
          <pointLight position={[0, 3, 2]} intensity={0.4} color="#fff1d6" />
          <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
            <BurgerStack />
          </Float>
          <ContactShadows position={[0, -1.55, 0]} opacity={0.6} scale={7} blur={2.6} far={4} />
          <Environment preset="studio" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.2}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
