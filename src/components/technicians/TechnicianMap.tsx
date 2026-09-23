import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Technician } from '../../types';
import { formatCurrency } from '../../utils/formatters';

export interface TechnicianMapProps {
  technicians: Technician[];
  onViewProfile: (techId: string) => void;
  onQuickBook: (tech: Technician) => void;
}

// Hà Nội center (Cầu Giấy / Đống Đa area) and the customer's own location, as specified.
const MAP_CENTER: [number, number] = [21.028511, 105.804817];
const MAP_ZOOM = 13;
const CUSTOMER_LOCATION: [number, number] = [21.0333, 105.7944];

const buildTechIcon = (tech: Technician, isActive: boolean): L.DivIcon =>
  L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:44px;height:44px;">
        <div style="width:44px;height:44px;border-radius:9999px;overflow:hidden;border:3px solid ${isActive ? '#2563eb' : '#ffffff'};box-shadow:0 4px 10px rgba(0,0,0,0.25);background:#e2e8f0;">
          <img src="${tech.avatar}" alt="${tech.name}" style="width:100%;height:100%;object-fit:cover;" />
        </div>
        <div style="position:absolute;bottom:-4px;right:-4px;background:#f59e0b;color:#1e293b;font-size:10px;font-weight:800;border-radius:9999px;padding:1px 5px;border:2px solid white;display:flex;align-items:center;gap:2px;">
          ★ ${tech.rating}
        </div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -44],
  });

const buildCustomerIcon = (): L.DivIcon =>
  L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:26px;height:26px;">
        <div style="position:absolute;inset:-14px;border-radius:9999px;background:rgba(37,99,235,0.25);animation:fixnear-radar-ping 1.8s ease-out infinite;"></div>
        <div style="width:26px;height:26px;border-radius:9999px;background:#2563eb;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>
      </div>
      <style>
        @keyframes fixnear-radar-ping {
          0% { transform: scale(0.4); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      </style>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });

const buildPopupContent = (
  tech: Technician,
  onViewProfile: (id: string) => void,
  onQuickBook: (tech: Technician) => void
): HTMLElement => {
  const container = document.createElement('div');
  container.style.width = '208px';
  container.style.fontSize = '12px';

  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <img src="${tech.avatar}" alt="${tech.name}" style="width:40px;height:40px;border-radius:9999px;object-fit:cover;border:2px solid #e2e8f0;" />
      <div style="min-width:0;">
        <p style="font-weight:800;color:#0f172a;font-size:13px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tech.name}</p>
        <p style="color:#64748b;font-size:10px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tech.title}</p>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <span style="color:#d97706;font-weight:700;">★ ${tech.rating}</span>
      <span style="color:#64748b;">~${tech.distanceKm}km</span>
      <span style="color:#2563eb;font-weight:800;">${formatCurrency(tech.basePrice)}</span>
    </div>
    <div style="display:flex;gap:6px;">
      <button data-action="profile" style="flex:1;padding:6px 0;border-radius:8px;border:1px solid #cbd5e1;background:white;color:#334155;font-weight:700;font-size:11px;cursor:pointer;">Xem hồ sơ</button>
      <button data-action="book" style="flex:1;padding:6px 0;border-radius:8px;border:none;background:#2563eb;color:white;font-weight:700;font-size:11px;cursor:pointer;">Đặt lịch</button>
    </div>
  `;

  container.querySelector('[data-action="profile"]')?.addEventListener('click', () => onViewProfile(tech.id));
  container.querySelector('[data-action="book"]')?.addEventListener('click', () => onQuickBook(tech));

  return container;
};

// Real Leaflet + OpenStreetMap map (replacing the earlier CSS mockup) so technician
// pins and the customer's own location render on an actual map of Hà Nội.
export const TechnicianMap: React.FC<TechnicianMapProps> = ({ technicians, onViewProfile, onQuickBook }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Mount the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.marker(CUSTOMER_LOCATION, { icon: buildCustomerIcon(), zIndexOffset: 1000 })
      .addTo(map)
      .bindTooltip('Vị trí của bạn', { permanent: true, direction: 'top', offset: [0, -14], className: 'fixnear-map-tooltip' });

    mapRef.current = map;

    // The container may not have its final size yet on first paint (e.g. right
    // after switching tabs), so re-measure shortly after mount.
    const resizeTimer = setTimeout(() => map.invalidateSize(), 150);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Rebuild technician markers whenever the filtered list changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    technicians
      .filter(t => typeof t.lat === 'number' && typeof t.lng === 'number')
      .forEach(tech => {
        const marker = L.marker([tech.lat as number, tech.lng as number], { icon: buildTechIcon(tech, false) });
        marker.bindPopup(buildPopupContent(tech, onViewProfile, onQuickBook), { closeButton: true, minWidth: 208 });
        marker.on('click', () => {
          marker.setIcon(buildTechIcon(tech, true));
        });
        marker.on('popupclose', () => {
          marker.setIcon(buildTechIcon(tech, false));
        });
        marker.addTo(map);
        markersRef.current.push(marker);
      });
  }, [technicians, onViewProfile, onQuickBook]);

  return <div ref={containerRef} className="h-[600px] w-full rounded-2xl" />;
};
