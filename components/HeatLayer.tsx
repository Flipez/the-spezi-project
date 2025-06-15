import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet.heat";

interface Props {
  points: Array<[number, number, number]>; // [lat, lng, weight]
  radius?: number;
  blur?: number;
  max?: number;
}

export default function HeatLayer({
  points,
  radius = 25,
  blur = 15,
  max = 5,
}: Props) {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore – leaflet.heat adds L.heatLayer at runtime
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const layer = L.heatLayer(points, { radius, blur, max }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points, radius, blur, max]);

  return null;
}
