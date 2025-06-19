// components/MapToggleControl.tsx
import { useEffect, useRef } from 'react';
import { Control, DomUtil } from 'leaflet';
import { useMap } from 'react-leaflet';

interface Props {
  mode: 'points' | 'heat';
  onClick: () => void;
}

export default function MapToggleControl({ mode, onClick }: Props) {
  const map = useMap();
  const controlRef = useRef<Control | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!map) return;

    const container = DomUtil.create('div');
    controlRef.current = new Control({ position: 'topright' });
    controlRef.current.onAdd = () => container;
    controlRef.current.addTo(map);

    // Create button
    const button = document.createElement('button');
    button.className =
      'rounded bg-white/90 backdrop-blur-sm px-3 py-1 text-sm shadow-sm hover:bg-white';
    button.onclick = onClick;
    button.innerText = mode === 'points' ? 'Heat-map' : 'Markers';
    container.appendChild(button);
    buttonRef.current = button;

    // Cleanup
    return () => {
      controlRef.current?.remove();
      buttonRef.current = null;
    };
  }, [map]);

  // Update button text and handler on mode/onClick change
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.innerText = mode === 'points' ? 'Heat-map' : 'Markers';
      buttonRef.current.onclick = onClick;
    }
  }, [mode, onClick]);

  return null;
}
