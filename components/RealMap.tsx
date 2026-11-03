'use client';

import { useEffect, useRef, useState } from 'react';
import type { Space } from '../lib/spaces';
import { brl } from '../lib/spaces';
import 'leaflet/dist/leaflet.css';

type Props = { spaces: Space[]; selectedId: string | null; onSelect: (id: string) => void };

export default function RealMap({ spaces, selectedId, onSelect }: Props) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<any[]>([]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import('leaflet').then((leaflet) => {
      if (cancelled || !nodeRef.current || mapRef.current) return;
      const map = leaflet.map(nodeRef.current, { zoomControl: false, scrollWheelZoom: true }).setView([-15.80, -47.91], 7);
      leaflet.control.zoom({ position: 'topright' }).addTo(map);
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);
      mapRef.current = map;
      setMapReady(true);
      window.requestAnimationFrame(() => map.invalidateSize());
    });
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    let cancelled = false;
    import('leaflet').then((leaflet) => {
      if (cancelled || !mapRef.current) return;
      layersRef.current.forEach((layer) => layer.remove());
      layersRef.current = spaces.map((space) => {
        const selected = space.id === selectedId;
        const marker = leaflet.circleMarker([space.lat, space.lng], {
          radius: selected ? 11 : 8,
          color: '#ffffff',
          weight: 3,
          fillColor: selected ? '#071c14' : '#19c77a',
          fillOpacity: 1
        }).addTo(mapRef.current);
        const price = space.price === null ? 'Preço sob consulta' : `Preço publicado: ${brl(space.price)} / mês`;
        marker.bindPopup(
          `<div class="leaflet-card"><span>${space.format.toUpperCase()}</span><strong>${space.place}, ${space.city}</strong><small>${space.dimension}</small><b>${price}</b><a href="${space.sourceUrl}" target="_blank" rel="noopener noreferrer">Ver ficha do operador ↗</a></div>`
        );
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
    return () => { cancelled = true; };
  }, [mapReady, spaces, selectedId, onSelect]);

  return <div className="real-map" ref={nodeRef} aria-label="Mapa de pontos de mídia publicados por operadores" />;
}
