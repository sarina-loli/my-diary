import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
const PAPER = "#fff8f2";
const PAPER_EDGE = "#e9cfc9";
const ROSE = "#a94f62";
const ROSE_DARK = "#733343";
const GOLD = "#d7a961";
function PageLines({ side }) {
  const lines = useMemo(() => Array.from({ length: 7 }, (_, index) => index), []);
  return (
    <group position={[side * 1.62, 0.145, 0.03]} rotation-x={-Math.PI / 2}>
      {lines.map((line) => (
        <mesh key={line} position={[0, 0.05 - line * 0.23, 0]}>
          <planeGeometry args={[2.28, 0.018]} />
          <meshBasicMaterial color={PAPER_EDGE} transparent opacity={0.64} />
        </mesh>
      ))}
      <mesh position={[side * -0.55, -0.87, 0.01]}>
        <circleGeometry args={[0.11, 24]} />
        <meshStandardMaterial color={ROSE} roughness={0.7} />
      </mesh>
    </group>
  );
}
function PageStack({ side }) {
  return (
    <group position={[side * 1.58, 0, 0]} rotation-z={side * -0.035}>
      {[0, 1, 2, 3].map((layer) => (
        <RoundedBox
          key={layer}
          args={[3.02, 0.055, 2.25]}
          radius={0.05}
          smoothness={3}
          position={[0, 0.06 + layer * 0.028, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={layer === 3 ? PAPER : PAPER_EDGE} roughness={0.88} />
        </RoundedBox>
      ))}
    </group>
  );
}
function TurningPage({ progress }) {
  const pageRef = useRef(null);
  useFrame((_, rawDelta) => {
    const page = pageRef.current;
    if (!page) return;
    const delta = Math.min(rawDelta, 0.05);
    const turn = THREE.MathUtils.smoothstep(progress, 0.2, 0.52);
    const target = Math.PI * turn;
    page.rotation.z = THREE.MathUtils.damp(page.rotation.z, target, 5, delta);
    page.rotation.y = Math.sin(turn * Math.PI) * 0.16;
    page.position.y = THREE.MathUtils.damp(
      page.position.y,
      0.25 + Math.sin(turn * Math.PI) * 0.34,
      5,
      delta,
    );
  });
  return (
    <group ref={pageRef} position={[0.02, 0.25, 0]}>
      <mesh position={[1.5, 0, 0]} castShadow>
        <boxGeometry args={[2.98, 0.018, 2.18]} />
        <meshStandardMaterial color={PAPER} side={THREE.DoubleSide} roughness={0.9} />
      </mesh>
    </group>
  );
}
function Heart({ position, scale = 1 }) {
  const shape = useMemo(() => {
    const path = new THREE.Shape();
    path.moveTo(0, 0.25);
    path.bezierCurveTo(0, 0.05, -0.34, -0.1, -0.34, 0.2);
    path.bezierCurveTo(-0.34, 0.52, 0, 0.58, 0, 0.82);
    path.bezierCurveTo(0, 0.58, 0.34, 0.52, 0.34, 0.2);
    path.bezierCurveTo(0.34, -0.1, 0, 0.05, 0, 0.25);
    return path;
  }, []);
  return (
    <Float speed={1.2} rotationIntensity={0.45} floatIntensity={0.55}>
      <mesh position={position} rotation={[-0.3, 0.2, Math.PI]} scale={scale} castShadow>
        <extrudeGeometry
          args={[
            shape,
            { depth: 0.06, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025 },
          ]}
        />
        <meshStandardMaterial
          color={ROSE}
          emissive={ROSE}
          emissiveIntensity={0.12}
          roughness={0.45}
        />
      </mesh>
    </Float>
  );
}
function Flower({ position, scale = 1 }) {
  return (
    <Float speed={0.9} rotationIntensity={0.7} floatIntensity={0.45}>
      <group position={position} scale={scale} rotation={[-0.45, 0.1, 0.2]}>
        {Array.from({ length: 6 }, (_, index) => (
          <mesh
            key={index}
            rotation-z={(index / 6) * Math.PI * 2}
            position={[
              Math.cos((index / 6) * Math.PI * 2) * 0.24,
              Math.sin((index / 6) * Math.PI * 2) * 0.24,
              0,
            ]}
          >
            <sphereGeometry args={[0.17, 16, 12]} />
            <meshStandardMaterial color={index % 2 ? "#f4b8c4" : "#f8d4db"} roughness={0.7} />
          </mesh>
        ))}
        <mesh position-z={0.05}>
          <sphereGeometry args={[0.13, 16, 12]} />
          <meshStandardMaterial color={GOLD} roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}
function Dust() {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const points = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i += 1) {
      points[i * 3] = ((i * 37) % 100) / 10 - 5;
      points[i * 3 + 1] = ((i * 61) % 80) / 10 - 2;
      points[i * 3 + 2] = ((i * 47) % 60) / 10 - 3;
    }
    return points;
  }, []);
  useFrame((state, rawDelta) => {
    if (!ref.current) return;
    const delta = Math.min(rawDelta, 0.05);
    ref.current.rotation.y += delta * 0.025;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fff1d1" size={0.035} transparent opacity={0.62} depthWrite={false} />
    </points>
  );
}
function Diary({ progress, pointer }) {
  const diaryRef = useRef(null);
  useFrame((_, rawDelta) => {
    const diary = diaryRef.current;
    if (!diary) return;
    const delta = Math.min(rawDelta, 0.05);
    const zoom = 1 + THREE.MathUtils.smoothstep(progress, 0.05, 0.78) * 0.12;
    diary.scale.setScalar(THREE.MathUtils.damp(diary.scale.x, zoom, 4, delta));
    diary.rotation.y = THREE.MathUtils.damp(diary.rotation.y, pointer.x * 0.07, 4, delta);
    diary.rotation.x = THREE.MathUtils.damp(diary.rotation.x, -0.08 + pointer.y * 0.035, 4, delta);
    diary.position.y = THREE.MathUtils.damp(diary.position.y, -0.08 + progress * 0.2, 4, delta);
  });
  return (
    <group ref={diaryRef} rotation={[-0.08, 0, 0]}>
      <RoundedBox
        args={[6.65, 0.16, 2.55]}
        radius={0.12}
        smoothness={4}
        position={[0, -0.08, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={ROSE_DARK} roughness={0.55} metalness={0.05} />
      </RoundedBox>
      <PageStack side={-1} />
      <PageStack side={1} />
      <PageLines side={-1} />
      <PageLines side={1} />
      <TurningPage progress={progress} />
      <RoundedBox
        args={[0.12, 0.25, 2.34]}
        radius={0.04}
        smoothness={3}
        position={[0, 0.14, 0]}
        castShadow
      >
        <meshStandardMaterial color={ROSE_DARK} roughness={0.55} />
      </RoundedBox>
      <mesh position={[2.42, 0.27, -0.42]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.28} />
      </mesh>
    </group>
  );
}
function Scene(props) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[-4, 7, 5]}
        intensity={2.4}
        color="#fff0db"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[3.5, 2.2, 1]} intensity={6} distance={8} color="#f7b5c3" />
      <Environment>
        <Lightformer intensity={2.4} color="#fff3e7" position={[0, 5, 2]} scale={[8, 4, 1]} />
        <Lightformer
          intensity={1.2}
          color="#e9a8b8"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[8, 2, 1]}
        />
      </Environment>
      <Diary {...props} />
      <Heart position={[-3.5, 1.25, 0.4]} scale={0.48} />
      <Heart position={[3.7, 1.6, -0.2]} scale={0.32} />
      <Flower position={[-4, -0.15, 0.4]} scale={0.75} />
      <Flower position={[4.1, 0.2, -0.35]} scale={0.55} />
      <Dust />
      <ContactShadows
        position={[0, -0.36, 0]}
        opacity={0.38}
        scale={10}
        blur={2.8}
        far={4}
        color="#6d3141"
      />
    </>
  );
}
export function HomeDiaryScene(props) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 4.6, 7.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
