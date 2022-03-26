import { useState, useRef, Suspense } from 'react';
import { AdditiveBlending, BackSide, Mesh, TextureLoader } from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import { styled } from '@mui/material/styles';
import Marker from './Marker';
import OverlayBox from './OverlayBox';
import { colors } from 'src/utils/colors';
import globeMarkers from 'src/assets/globeMarkers.json';
import map from 'src/assets/map.png';

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

const Root = styled('div')({
  height: 510,
  position: 'relative',
  userSelect: 'none',
  width: 510,
  '@media (min-width: 1440px)': {
    height: 580,
    width: 580,
  },
});

const FallbackGlobe = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: '50%',
  height: 300,
  right: 'calc(50% - 150px)',
  position: 'absolute',
  top: 'calc(50% - 150px)',
  width: 300,
}));

const Globe = () => {
  const sphereRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);

  const texture = useLoader(TextureLoader, map);

  const { scale } = useSpring({
    to: {
      scale: 1,
    },
    from: { scale: 0.5 },
  });

  return (
    <animated.group scale={scale}>
      <hemisphereLight color={colors.lightBlue} groundColor={colors.lightPurple} intensity={0.35} />
      <pointLight color={colors.lightPink} intensity={0.35} position={[200, 200, 100]} />
      <pointLight color={colors.pink} intensity={1.05} position={[-400, -50, -100]} />
      <mesh ref={sphereRef}>
        <sphereBufferGeometry attach="geometry" args={[1, 100, 100]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      <mesh ref={atmosphereRef}>
        <sphereBufferGeometry attach="geometry" args={[1.075, 100, 100]} />
        <shaderMaterial
          attach="material"
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={AdditiveBlending}
          side={BackSide}
        />
      </mesh>
    </animated.group>
  );
};

const InteractiveGlobe = () => {
  const [isAutoRotationAllowed, setIsAutoRotationAllowed] = useState(true);
  const [isMarkerHovered, setIsMarkerHovered] = useState(false);
  const [overlayBoxData, setOverlayBoxData] = useState({
    country: '',
    x: 0,
    y: 0,
    totalUsers: '',
  });

  const { scale } = useSpring({
    to: {
      scale: 1,
    },
    from: { scale: 0.5 },
  });

  const onMarkerOut = () => {
    setIsMarkerHovered(false);
    setIsAutoRotationAllowed(true);
  };

  return (
    <Root
      data-testid="globe"
      sx={{
        cursor: isMarkerHovered ? 'pointer' : 'default',
      }}
    >
      <FallbackGlobe />
      <Canvas camera={{ position: [6, 1, 8], fov: 13, far: 10000 }} onPointerMissed={onMarkerOut}>
        <Suspense fallback={null}>
          <Globe />
          <animated.group scale={scale}>
            {globeMarkers.map((marker) => (
              <Marker
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
                onOut={onMarkerOut}
              />
            ))}
          </animated.group>
          <OrbitControls
            enableZoom={false}
            enablePan
            autoRotate={isAutoRotationAllowed}
            autoRotateSpeed={0.75}
            rotateSpeed={0.18}
            maxPolarAngle={2.0}
            minPolarAngle={1.1}
          />
        </Suspense>
      </Canvas>
      {isMarkerHovered && <OverlayBox data={overlayBoxData} />}
    </Root>
  );
};

export default InteractiveGlobe;
