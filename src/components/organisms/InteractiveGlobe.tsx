import { useState, useRef, Suspense } from 'react';
import { AdditiveBlending, BackSide, Mesh, TextureLoader } from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { styled } from '@mui/material/styles';
import GlobeMarker from '../atoms/GlobeMarker';
import GlobeOverlayBox from '../molecules/GlobeOverlayBox';
import { colors } from '../../utils/colors';
import globeMarkers from '../../assets/globeMarkers.json';
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

const DEFAULT_OVERLAY_BOX_DATA = {
  country: '',
  x: 0,
  y: 0,
  totalUsers: '',
};

const Root = styled('div')({
  height: 320,
  position: 'relative',
  width: 320,
  '@media (min-width: 375px)': {
    height: 350,
    width: 350,
  },
  '@media (min-width: 768px)': {
    height: 450,
    width: 450,
  },
  '@media (min-width: 1200px)': {
    height: 510,
    width: 510,
  },
  '@media (min-width: 1440px)': {
    height: 580,
    width: 580,
  },
});

const Globe = () => {
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
    </group>
  );
};

const InteractiveGlobe = () => {
  const [isAutoRotationAllowed, setIsAutoRotationAllowed] = useState(false);
  const [isMarkerHovered, setIsMarkerHovered] = useState(false);
  const [overlayBoxData, setOverlayBoxData] = useState(DEFAULT_OVERLAY_BOX_DATA);

  return (
    <Root
      sx={{
        cursor: isMarkerHovered ? 'pointer' : 'default',
      }}
    >
      <Canvas
        camera={{ position: [6, 1, 8], fov: 13, far: 10000 }}
        onPointerMissed={() => console.log('onPointerMissed')}
      >
        <Suspense fallback={null}>
          <Globe />
          {globeMarkers.map((marker) => (
            <GlobeMarker
              key={marker.id}
              data={{
                country: marker.country,
                lat: marker.lat,
                lng: marker.lng,
                totalUsers: marker.totalUsers,
              }}
              onOver={(currentOverlayBoxData) => {
                setIsMarkerHovered(true);
                setIsAutoRotationAllowed(false);
                setOverlayBoxData(currentOverlayBoxData);
              }}
              onOut={() => {
                setIsMarkerHovered(false);
                setIsAutoRotationAllowed(false);
              }}
            />
          ))}
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
      {isMarkerHovered && <GlobeOverlayBox data={overlayBoxData} />}
    </Root>
  );
};

export default InteractiveGlobe;
