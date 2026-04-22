import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function BurgerStack({ autoRotate = true }: { autoRotate?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += delta * 0.4;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
  });

  // Soft, round bun-like shape using a squashed sphere
  const Bun = ({ y, color, top = false }: { y: number; color: string; top?: boolean }) => (
    <mesh position={[0, y, 0]} scale={[1, top ? 0.55 : 0.4, 1]} castShadow receiveShadow>
      <sphereGeometry args={[1.15, 64, 64]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
    </mesh>
  );

  const Disc = ({ y, color, radius = 1.05, height = 0.18, rough = 0.8 }: {
    y: number; color: string; radius?: number; height?: number; rough?: number;
  }) => (
    <mesh position={[0, y, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 48]} />
      <meshStandardMaterial color={color} roughness={rough} metalness={0.02} />
    </mesh>
  );

  // Wavy lettuce ring
  const Lettuce = ({ y }: { y: number }) => (
    <mesh position={[0, y, 0]} castShadow>
      <torusGeometry args={[1.0, 0.12, 12, 48]} />
      <meshStandardMaterial color="#4a8f35" roughness={0.85} />
    </mesh>
  );

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* bottom bun */}
      <Bun y={-0.9} color="#d99a55" />
      {/* sauce */}
      <Disc y={-0.55} color="#c8382a" radius={1.02} height={0.08} />
      {/* patty */}
      <Disc y={-0.35} color="#4a2a18" radius={1.08} height={0.28} rough={0.95} />
      {/* cheese (square-ish drape) */}
      <mesh position={[0, -0.15, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[1.9, 0.06, 1.9]} />
        <meshStandardMaterial color="#f5b642" roughness={0.4} />
      </mesh>
      {/* bacon strips */}
      <mesh position={[0.2, -0.02, 0.3]} rotation={[0, 0.3, 0.05]} castShadow>
        <boxGeometry args={[2.0, 0.08, 0.35]} />
        <meshStandardMaterial color="#8a2e1a" roughness={0.7} />
      </mesh>
      <mesh position={[-0.15, 0.04, -0.25]} rotation={[0, -0.4, -0.04]} castShadow>
        <boxGeometry args={[2.0, 0.08, 0.35]} />
        <meshStandardMaterial color="#8a2e1a" roughness={0.7} />
      </mesh>
      {/* tomato */}
      <Disc y={0.18} color="#d33b2c" radius={0.98} height={0.12} rough={0.7} />
      {/* lettuce */}
      <Lettuce y={0.32} />
      {/* top bun */}
      <Bun y={0.75} color="#e0a260" top />
      {/* sesame seeds */}
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = 0.55 + (i % 3) * 0.12;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 1.05, Math.sin(a) * r]} castShadow>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#f3dba0" roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Burger3D({ className = "", autoRotate = true }: { className?: string; autoRotate?: boolean }) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.8, 4.2], fov: 42 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[4, 6, 3]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#ffb88a" />
          <BurgerStack autoRotate={autoRotate} />
          <ContactShadows position={[0, -1.45, 0]} opacity={0.55} scale={6} blur={2.5} far={3} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
