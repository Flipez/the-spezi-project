import dynamic from "next/dynamic";
import { Drink } from "@/pages";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import { useState, useMemo } from "react";
import HeatLayer from "./HeatLayer";
import MapToggleControl from "./MapToggleControl";

/* cluster group only in browser */
import MarkerClusterGroup from "react-leaflet-markercluster";

const colour = (r: number) => (r >= 4 ? "green" : r >= 3 ? "orange" : "red");

interface Props {
  drinks: Drink[];
}

export default function DrinkMap({ drinks }: Props) {
  const [mode, setMode] = useState<"points" | "heat">("points");
  const toggle = () => setMode((m) => (m === "points" ? "heat" : "points"));

  const coords = drinks.filter((d) => d.lat && d.long);
  const heat   = useMemo(
    () => coords.map((d) => [d.lat!, d.long!, d.Rating] as [number, number, number]),
    [coords]
  );

  return (
    /* full-page map: viewport height minus 3.5 rem (header) */
    <div style={{ height: "calc(100vh - 3.5rem)" }}>
      <MapContainer
        center={[51, 10]}
        zoom={5}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors, &copy; CARTO"
        />

        <MapToggleControl mode={mode} onClick={toggle} />

        {mode === "heat" ? (
          <HeatLayer points={heat} radius={25} blur={15} max={5} />
        ) : (
          <MarkerClusterGroup chunkedLoading>
            {coords.map((d) => (
              <CircleMarker
                key={d.Name}
                center={[d.lat!, d.long!]}
                radius={8}
                pathOptions={{ color: colour(d.Rating) }}
              >
                <Tooltip>{`${d.Name} – ${d.Rating}/5`}</Tooltip>
              </CircleMarker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  );
}
