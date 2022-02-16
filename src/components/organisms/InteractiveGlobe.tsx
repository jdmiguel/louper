import { useState, useRef, Suspense } from 'react';
import { AdditiveBlending, BackSide, Mesh, TextureLoader } from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import GlobeMarker from '../atoms/GlobeMarker';
import { colors } from '../../utils/colors';
import countries from '../../assets/countries.json';
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
  '  float intensity = pow(0.60 - dot(vNormal, vec3(0.06, -0.06, 1.4)), 5.2);',
  '  gl_FragColor = vec4(0.4, 0.5, 1, 0.48) * intensity;',
  '}',
].join('\n');

type GlobeProps = {
  onMarkerOver: ({ x, y }: any) => void;
  onMarkerOut: () => void;
};

const Globe = ({ onMarkerOver, onMarkerOut }: GlobeProps) => {
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
      {countries.map((country) => (
        <GlobeMarker
          key={country.id}
          name={country.name}
          initialPosX={country.posX}
          initialPosY={country.posY}
          total={country.total}
          onOver={onMarkerOver}
          onOut={onMarkerOut}
        />
      ))}
    </group>
  );
};

type Props = {
  onMarkerOver: ({ x, y }: any) => void;
  onMarkerOut: () => void;
};

const InteractiveGlobe = ({ onMarkerOver, onMarkerOut }: Props) => {
  const [isAutoRotationAllowed, setIsAutoRotationAllowed] = useState(false);

  return (
    <Canvas
      camera={{ position: [6, 1, 8], fov: 13, far: 10000 }}
      onPointerMissed={() => console.log('onPointerMissed')}
    >
      <Suspense fallback={null}>
        <Globe
          onMarkerOver={(pos: any) => {
            setIsAutoRotationAllowed(false);
            onMarkerOver(pos);
          }}
          onMarkerOut={() => {
            setIsAutoRotationAllowed(false);
            onMarkerOut();
          }}
        />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan
        autoRotate={isAutoRotationAllowed}
        autoRotateSpeed={0.75}
        rotateSpeed={0.18}
        maxPolarAngle={2.0}
        minPolarAngle={1.1}
      />
    </Canvas>
  );
};

export default InteractiveGlobe;
