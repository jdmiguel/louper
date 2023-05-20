import { useState, useRef, Suspense, useEffect } from 'react';
import { AdditiveBlending, BackSide, TextureLoader } from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Marker from './Marker';
import OverlayBox from './OverlayBox';
import { colors } from '@/utils/colors';
import { GLOBE_ACTIVATE_ROTATION_TIMER } from '@/utils/literals';
import { Timer } from '@/utils/types';
import globeMarkers from '@/assets/globeMarkers.json';
import map from '@/assets/texture-map.png';
import { StyledRoot } from './styles';

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

const GlobeModel = () => {
  const texture = useLoader(TextureLoader, map);

  return (
    <group>
      <hemisphereLight color={colors.lightBlue} groundColor={colors.lightPurple} intensity={0.35} />
      <pointLight color={colors.lightPink} intensity={0.35} position={[200, 200, 100]} />
      <pointLight color={colors.pink} intensity={1.05} position={[-400, -50, -100]} />
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[1, 100, 100]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[1.075, 100, 100]} />
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

type OverlayBoxData = {
  country: string;
  x: number;
  y: number;
  totalUsers: string;
};

const Globe = () => {
  const [isAutoRotationAllowed, setIsAutoRotationAllowed] = useState(true);
  const [isMarkerHovered, setIsMarkerHovered] = useState(false);
  const [overlayBoxData, setOverlayBoxData] = useState<OverlayBoxData>({
    country: '',
    x: 0,
    y: 0,
    totalUsers: '',
  });

  const autoRotateTimer = useRef<Timer | null>(null);

  const clearTimer = () => {
    if (!autoRotateTimer.current) return;
    clearTimeout(autoRotateTimer.current);
    autoRotateTimer.current = null;
  };

  const handleMarkerOver = (currentOverlayBoxData: OverlayBoxData) => {
    setIsMarkerHovered(true);
    setIsAutoRotationAllowed(false);
    setOverlayBoxData(currentOverlayBoxData);
    clearTimer();
  };

  const handleMarkerOut = () => {
    setIsMarkerHovered(false);
    if (!autoRotateTimer.current) {
      autoRotateTimer.current = setTimeout(() => {
        setIsAutoRotationAllowed(true);
      }, GLOBE_ACTIVATE_ROTATION_TIMER);
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  return (
    <StyledRoot
      data-testid="globe"
      sx={{
        cursor: isMarkerHovered ? 'pointer' : 'default',
      }}
    >
      <Canvas
        camera={{ position: [6, 1, 8], fov: 13, far: 10000 }}
        onPointerMissed={handleMarkerOut}
      >
        <Suspense fallback={null}>
          <GlobeModel />
        </Suspense>
        {globeMarkers.map((marker) => (
          <Marker
            key={marker.id}
            data={{
              country: marker.country,
              lat: marker.lat,
              lng: marker.lng,
              totalUsers: marker.totalUsers,
            }}
            onOver={handleMarkerOver}
            onOut={handleMarkerOut}
          />
        ))}
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
      {isMarkerHovered && <OverlayBox data={overlayBoxData} />}
    </StyledRoot>
  );
};

export default Globe;
