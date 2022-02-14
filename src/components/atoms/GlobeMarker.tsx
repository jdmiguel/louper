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
  name: string;
  posX: number;
  posY: number;
  total: number;
  onOver: () => void;
  onOut: () => void;
};

const GlobeMarkers = ({ posX, posY, onOver, onOut }: Props) => {
  const markerRef = useRef<Mesh>(null);
  const { x, y, z } = calculateGlobePositions(posX, posY);

  return (
    <mesh
      ref={markerRef}
      position={[x, y, z]}
      onPointerOver={() => {
        onOver();
      }}
      onPointerOut={() => onOut()}
    >
      <sphereBufferGeometry attach="geometry" args={[0.035, 10, 10]} />
      <meshBasicMaterial attach="material" color={colors.pink} />
    </mesh>
  );
};
export default GlobeMarkers;
