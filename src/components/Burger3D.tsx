import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";
import burgerImg from "@/assets/burger-3d.png";

function BurgerBillboard() {
  const group = useRef<THREE.Group>(null);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const t = loader.load(burgerImg);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 16;
    return t;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.6;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
  });

  // Aspect of the source image (roughly 0.82 width/height) — tune plane size
  const w = 3.2;
  const h = 4.0;

  return (
    <group ref={group}>
      {/* Front face */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          side={THREE.FrontSide}
          roughness={0.6}
          metalness={0}
        />
      </mesh>
      {/* Back face (mirrored) */}
      <mesh rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          side={THREE.FrontSide}
          roughness={0.6}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

export function Burger3D({ className = "" }: { className?: string; autoRotate?: boolean }) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.2, 5.2], fov: 38 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={1.4}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#ffb88a" />
          <pointLight position={[0, 3, 2]} intensity={0.5} color="#fff1d6" />
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
            <BurgerBillboard />
          </Float>
          <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={6} blur={2.8} far={4} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
