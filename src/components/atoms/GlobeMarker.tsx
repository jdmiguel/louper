import { useRef } from 'react';
// import { ThreeEvent } from 'react-three-fiber';
import { Mesh } from 'three';
import { colors } from '../../utils/colors';
import { OverlayBoxData } from '../molecules/GlobeOverlayBox';

/*
interface IPointerEvent extends ThreeEvent<PointerEvent> {
  offsetX: number;
  offsetY: number;
}
*/

const getSpherePositions = (lat: number, lng: number) => {
  const phi = lat * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return {
    x: -(Math.cos(phi) * Math.cos(theta)),
    y: Math.cos(phi) * Math.sin(theta),
    z: Math.sin(phi),
  };
};

type MarkerData = {
  country: string;
  lat: number;
  lng: number;
  totalUsers: string;
};

type Props = {
  data: MarkerData;
  onOver: (overlayBoxData: OverlayBoxData) => void;
  onOut: () => void;
};

const GlobeMarkers = ({ data, onOver, onOut }: Props) => {
  const { country, lat, lng, totalUsers } = data;
  const markerRef = useRef<Mesh>(null);
  const { x, y, z } = getSpherePositions(lat, lng);

  return (
    <mesh
      ref={markerRef}
      position={[x, y, z]}
      onPointerOver={(event: any) =>
        onOver({
          country,
          x: Math.round(event.offsetX),
          y: Math.round(event.offsetY),
          totalUsers,
        })
      }
      onPointerOut={onOut}
    >
      <sphereBufferGeometry attach="geometry" args={[0.02, 10, 10]} />
      <meshBasicMaterial attach="material" color={colors.pink} />
    </mesh>
  );
};

export default GlobeMarkers;
