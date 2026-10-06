'use client';

import { useEffect, useRef } from 'react';
import type { Space } from '../lib/spaces';
import { brl } from '../lib/spaces';
import 'leaflet/dist/leaflet.css';

type Props = { spaces: Space[]; selectedId: string | null; onSelect: (id: string) => void };

export default function RealMap({ spaces, selectedId, onSelect }: Props) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    import('leaflet').then((leaflet) => {
      if (cancelled || !nodeRef.current || mapRef.current) return;
      const map = leaflet.map(nodeRef.current, { zoomControl: false, scrollWheelZoom: true }).setView([-15.80, -47.91], 10);
      leaflet.control.zoom({ position: 'topright' }).addTo(map);
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors', maxZoom: 19 }).addTo(map);
      mapRef.current = map;
      window.setTimeout(() => map.invalidateSize(), 100);
    });
    return () => { cancelled = true; if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    import('leaflet').then((leaflet) => {
      layersRef.current.forEach((layer) => layer.remove());
      layersRef.current = spaces.map((space) => {
        const selected = space.id === selectedId;
        const marker = leaflet.circleMarker([space.lat, space.lng], { radius: selected ? 11 : 8, color: '#ffffff', weight: 3, fillColor: selected ? '#071c14' : '#19c77a', fillOpacity: 1 }).addTo(mapRef.current);
        marker.bindPopup(`<div class="leaflet-card"><span>${space.format.toUpperCase()}</span><strong>${space.place}, ${space.city}</strong><small>${space.dimension} · ${space.days} dias</small><b>${brl(space.price)}</b></div>`);
        marker.on('click', () => onSelect(space.id));
        if (selected) marker.openPopup();
        return marker;
      });
      if (selectedId) {
        const selected = spaces.find((space) => space.id === selectedId);
        if (selected) mapRef.current.panTo([selected.lat, selected.lng], { animate: true, duration: 0.35 });
      } else if (spaces.length) {
        const bounds = leaflet.latLngBounds(spaces.map((space) => [space.lat, space.lng] as [number, number]));
        mapRef.current.fitBounds(bounds, { padding: [35, 35], maxZoom: 12 });
      }
    });
  }, [spaces, selectedId, onSelect]);

  return <div className="real-map" ref={nodeRef} aria-label="Mapa real com espaços publicitários" />;
}
