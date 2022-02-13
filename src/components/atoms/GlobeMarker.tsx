import { useRef } from 'react';
import { Mesh } from 'three';
import { colors } from '../../utils/colors';

const calculateGlobePositions = (x: number, y: number) => {
  const phi = x * (Math.PI / 180);
  const theta = (y + 180) * (Math.PI / 180);

  return {
    x: -(Math.cos(phi) * Math.cos(theta)),
    y: Math.cos(phi) * Math.sin(theta),
    z: Math.sin(phi),
  };
};

type Props = {
  posX: number;
  posY: number;
};

const GlobeMarkers = ({ posX, posY }: Props) => {
  const markerRef = useRef<Mesh>(null);
  const { x, y, z } = calculateGlobePositions(posX, posY);

  return (
    <mesh ref={markerRef} position={[x, y, z]}>
      <sphereBufferGeometry attach="geometry" args={[0.015, 20, 20]} />
      <meshBasicMaterial attach="material" color={colors.pink} />
    </mesh>
  );
};
export default GlobeMarkers;
