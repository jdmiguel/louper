import { useRef, Suspense } from 'react';
import { AdditiveBlending, BackSide, Mesh, TextureLoader } from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import map from '../../assets/map.png';

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
  '  float intensity = pow(0.55 - dot(vNormal, vec3(0.15, -0.05, 1.5)), 2.5);',
  '  gl_FragColor = vec4(0.1, 0.5, 0.8, 0.35) * intensity;',
  '}',
].join('\n');

const Sphere = () => {
  const sphereRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, map);

  return (
    <group>
      <ambientLight intensity={0.01} />
      <hemisphereLight color="#371d97" groundColor="#6b41dd" intensity={0.1} />
      <pointLight color="#711874" intensity={0.5} position={[200, 200, 100]} />
      <spotLight color="#293ad1" intensity={0.4} position={[-400, -50, -100]} />
      <mesh ref={sphereRef} scale={[0.9, 0.9, 0.9]}>
        <sphereBufferGeometry attach="geometry" args={[1.5, 100, 100]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      <mesh ref={atmosphereRef} scale={[1, 1, 1]}>
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

const Globe = () => (
  <Canvas camera={{ position: [7, 2, 1], fov: 25, far: 10000 }}>
    <Suspense fallback={null}>
      <Sphere />
    </Suspense>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} rotateSpeed={0.18} />
  </Canvas>
);

export default Globe;
