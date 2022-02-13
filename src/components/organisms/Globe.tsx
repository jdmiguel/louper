import { useRef, Suspense } from 'react';
import { AdditiveBlending, BackSide, Mesh, TextureLoader } from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { colors } from '../../utils/colors';
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
  '  float intensity = pow(0.65 - dot(vNormal, vec3(0.12, -0.02, 1.5)), 2.8);',
  '  gl_FragColor = vec4(0.4, 0.25, 1, 0.45) * intensity;',
  '}',
].join('\n');

const Sphere = () => {
  const sphereRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, map);

  return (
    <group>
      <hemisphereLight color={colors.darkBlue} groundColor={colors.lightPurple} intensity={0.25} />
      <pointLight color={colors.darkPink} intensity={0.45} position={[200, 200, 100]} />
      <spotLight color={colors.purple} intensity={0.3} position={[-400, -50, -100]} />
      <mesh ref={sphereRef} scale={[0.9, 0.9, 0.9]}>
        <sphereBufferGeometry attach="geometry" args={[1.5, 100, 100]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      <mesh ref={atmosphereRef} scale={[0.98, 0.98, 0.98]}>
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
