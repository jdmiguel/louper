import { useRef, Suspense } from 'react';
import { AdditiveBlending, BackSide, Mesh, TextureLoader } from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import GlobeMarker from '../atoms/GlobeMarker';
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
  '  float intensity = pow(0.58 - dot(vNormal, vec3(0.09, -0.06, 1.4)), 4.4);',
  '  gl_FragColor = vec4(0.4, 0.25, 1, 0.48) * intensity;',
  '}',
].join('\n');

const Sphere = () => {
  const sphereRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, map);

  return (
    <group>
      <hemisphereLight color={colors.lightBlue} groundColor={colors.lightPurple} intensity={0.35} />
      <pointLight color={colors.lightPink} intensity={0.35} position={[200, 200, 100]} />
      <pointLight color={colors.pink} intensity={1.05} position={[-400, -50, -100]} />
      <mesh ref={sphereRef}>
        <sphereBufferGeometry attach="geometry" args={[1, 100, 100]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      <mesh ref={atmosphereRef} scale={[1.075, 1.075, 1.075]}>
        <sphereBufferGeometry attach="geometry" args={[1, 100, 100]} />
        <shaderMaterial
          attach="material"
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={AdditiveBlending}
          side={BackSide}
        />
      </mesh>
      <GlobeMarker posX={15} posY={-14} />
      <GlobeMarker posX={-3} posY={-15} />
      <GlobeMarker posX={8} posY={-21} />
    </group>
  );
};

const Globe = () => (
  <Canvas camera={{ position: [6, 1, 8], fov: 13, far: 10000 }}>
    <Suspense fallback={null}>
      <Sphere />
    </Suspense>
    <OrbitControls
      enableZoom={false}
      autoRotate={true}
      autoRotateSpeed={1}
      rotateSpeed={0.18}
      maxPolarAngle={1.8}
      minPolarAngle={1.1}
    />
  </Canvas>
);

export default Globe;
