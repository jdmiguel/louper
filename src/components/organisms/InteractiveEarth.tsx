import { useRef, Suspense } from 'react';
import { Mesh, TextureLoader } from 'three';
// import { AdditiveBlending, BackSide, Mesh, TextureLoader } from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

const Earth = () => {
  const earthRef = useRef<Mesh>(null);
  // const atmosphereRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, './earth.png');

  return (
    <group>
      <ambientLight intensity={0.01} />
      <pointLight color="#52115e" intensity={0.8} position={[200, 200, 100]} />
      <pointLight color="#1a258a" intensity={0.5} position={[-50, -50, -100]} />
      <mesh ref={earthRef} scale={[0.9, 0.9, 0.9]}>
        <sphereBufferGeometry attach="geometry" args={[1.5, 100, 100]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      {/* <mesh ref={atmosphereRef} scale={[1, 1, 1]}>
        <sphereGeometry args={[1.5, 200, 200]} />
       <shaderMaterial
          vertexShader="atmosphereVertexShader"
          fragmentShader="atmosphereFragmentShader"
          blending={AdditiveBlending}
          side={BackSide}
        />
      </mesh> */}
    </group>
  );
};

const InteractiveEarth = () => (
  <Canvas camera={{ position: [7, 2, 1], fov: 25, far: 10000 }}>
    <Suspense fallback={null}>
      <Earth />
    </Suspense>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} rotateSpeed={0.18} />
  </Canvas>
);

export default InteractiveEarth;
