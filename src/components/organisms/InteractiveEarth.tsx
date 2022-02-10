import { useRef, Suspense } from 'react';
import { AdditiveBlending, BackSide, Mesh, TextureLoader } from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

const atmosphereVertexShader = [
  'varying vec3 vNormal;',
  'void main(){',
  ' vNormal = normalize( normalMatrix * normal );',
  ' gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
  '}',
].join('\n');

const atmosphereFragmentShader = [
  'varying vec3 vNormal;',
  'void main(){',
  '  float intensity = pow(0.3 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);',
  '  gl_FragColor = vec4(0.7, 0.3, 1.5, 1.0) * intensity;',
  '}',
].join('\n');

const Earth = () => {
  const earthRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, './earth.png');

  return (
    <group>
      <ambientLight intensity={0.01} />
      <pointLight color="#661874" intensity={0.7} position={[200, 200, 100]} />
      <pointLight color="#2331ad" intensity={0.4} position={[-50, -50, -100]} />
      <mesh ref={earthRef} scale={[0.9, 0.9, 0.9]}>
        <sphereBufferGeometry attach="geometry" args={[1.5, 100, 100]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      <mesh ref={atmosphereRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1.5, 200, 200]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={AdditiveBlending}
          side={BackSide}
        />
      </mesh>
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
