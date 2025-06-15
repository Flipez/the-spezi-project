// components/MapToggleControl.tsx
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Control, DomUtil } from "leaflet";
import { useMap } from "react-leaflet";

interface Props {
  mode: "points" | "heat";
  onClick: () => void;
}

export default function MapToggleControl({ mode, onClick }: Props) {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // create a Leaflet control in the top-right corner
    const control = new Control({ position: "topright" });
    control.onAdd = () => {
      const div = DomUtil.create("div");
      containerRef.current = div;
      return div;
    };
    control.addTo(map);

    // mount React button into that <div>
    const root = createRoot(containerRef.current!);
    root.render(
      <button
        onClick={onClick}
        className="rounded bg-white/90 backdrop-blur px-3 py-1 text-sm shadow hover:bg-white"
      >
        {mode === "points" ? "Heat-map" : "Markers"}
      </button>
    );

    // clean up
    return () => {
      root.unmount();
      control.remove();
    };
  }, [map, mode, onClick]);

  return null;
}
