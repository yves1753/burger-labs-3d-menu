import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";
import burgerImg from "@/assets/burger-3d.png";

function BurgerBillboard({ autoRotate }: { autoRotate: boolean }) {
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
    if (autoRotate) {
      group.current.rotation.y += delta * 0.5;
    }
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
  });

  const w = 3.2;
  const h = 4.0;

  return (
    <group ref={group}>
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
  const autoRotateRef = useRef(true);

  return (
    <div className={className} style={{ touchAction: "none", cursor: "grab" }}>
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
          <BurgerBillboard autoRotate={autoRotateRef.current} />
          <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={6} blur={2.8} far={4} />
          <Environment preset="studio" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.2}
            minPolarAngle={Math.PI / 2.6}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
