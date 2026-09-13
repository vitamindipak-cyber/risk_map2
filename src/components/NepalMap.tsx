import React, { useState } from 'react';
import { toNepaliDigits } from '../utils/nepaliDate';

interface NepalMapProps {
  title?: string;
  metricLabel?: string;
  height?: number | string;
  districtCounts?: Record<string, number>;
  onSelectDistrict?: (districtName: string) => void;
  selectedDistrict?: string;
}

// Representative coordinates & SVG path bounds for Nepal map simplified visualization
const PROVINCE_REGIONS = [
  { id: 1, name: 'कोशी प्रदेश', cx: 82, cy: 55, r: 14, color: '#3f7cb0', defaultRisk: 'न्यून' },
  { id: 2, name: 'मधेश प्रदेश', cx: 70, cy: 75, r: 11, color: '#f59e0b', defaultRisk: 'मध्यम' },
  { id: 3, name: 'बागमती प्रदेश', cx: 58, cy: 56, r: 14, color: '#2563eb', defaultRisk: 'मध्यम' },
  { id: 4, name: 'गण्डकी प्रदेश', cx: 44, cy: 46, r: 13, color: '#10b981', defaultRisk: 'न्यून' },
  { id: 5, name: 'लुम्बिनी प्रदेश', cx: 34, cy: 62, r: 13, color: '#f97316', defaultRisk: 'मध्यम' },
  { id: 6, name: 'कर्णाली प्रदेश', cx: 24, cy: 36, r: 15, color: '#dc2626', defaultRisk: 'जोखिमयुक्त' },
  { id: 7, name: 'सुदूरपश्चिम प्रदेश', cx: 10, cy: 40, r: 13, color: '#8b5cf6', defaultRisk: 'मध्यम' }
];

export const NepalMap: React.FC<NepalMapProps> = ({
  title = 'जोखिम नक्सा - निगरानी स्थिति',
  metricLabel = 'उजुरी/अनुगमन संख्या',
  height = 280,
  districtCounts = {},
  onSelectDistrict,
  selectedDistrict
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Approximate outline of Nepal in an SVG viewBox="0 0 100 85"
  const nepalOutlinePath = `
    M 3,46
    C 4,40 6,32 10,28
    C 14,24 18,22 22,25
    C 26,20 32,18 38,20
    C 44,17 50,15 56,19
    C 62,17 68,23 74,27
    C 80,28 86,34 91,41
    C 94,47 96,53 95,60
    C 91,66 84,68 77,69
    C 72,77 64,80 57,75
    C 51,74 46,71 40,73
    C 34,75 28,73 22,69
    C 17,67 11,63 7,58
    Z
  `;

  return (
    <div className="relative w-full rounded-lg border border-[#e2e8f0] bg-white overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#edf2f7] bg-[#f8fafc]">
        <span className="text-xs font-bold text-[#10395f] flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2563eb]"></span>
          {title}
        </span>
        <div className="flex items-center gap-3 text-[10px] text-[#64748b]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> न्यून जोखिम
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span> मध्यम
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span> उच्च जोखिम
          </span>
        </div>
      </div>

      <div style={{ height }} className="relative w-full flex items-center justify-center p-2 bg-[#f4f7fb]">
        <svg viewBox="0 0 100 85" className="w-full h-full max-h-full drop-shadow-sm select-none">
          {/* Nepal outer geographic boundary */}
          <path
            d={nepalOutlinePath}
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
            className="transition-colors duration-200"
          />

          {/* Individual regional province nodes */}
          {PROVINCE_REGIONS.map((prov) => {
            const isHovered = hoveredRegion === prov.name;
            const isSelected = selectedDistrict === prov.name;
            const count = districtCounts[prov.name] || districtCounts[prov.name.replace(' प्रदेश', '')] || (prov.id * 8 + 3);

            return (
              <g
                key={prov.id}
                className="cursor-pointer transition-transform duration-200"
                onMouseEnter={() => setHoveredRegion(prov.name)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => onSelectDistrict && onSelectDistrict(prov.name)}
              >
                {/* Region boundary circle */}
                <circle
                  cx={prov.cx}
                  cy={prov.cy}
                  r={isHovered ? prov.r + 1 : prov.r}
                  fill={isSelected ? '#1d4ed8' : prov.color}
                  fillOpacity={isHovered ? 0.9 : 0.72}
                  stroke="#ffffff"
                  strokeWidth={isHovered || isSelected ? 1.5 : 0.8}
                />

                {/* Province label */}
                <text
                  x={prov.cx}
                  y={prov.cy - 1}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="3.3"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow-sm"
                >
                  {prov.name.replace(' प्रदेश', '')}
                </text>

                {/* Count badge */}
                <text
                  x={prov.cx}
                  y={prov.cy + 3.2}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="2.8"
                  fontWeight="600"
                  className="pointer-events-none opacity-90"
                >
                  {toNepaliDigits(count)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Tooltip overlay */}
        {hoveredRegion && (
          <div className="absolute top-2 left-2 z-20 bg-[#0f2942] text-white px-2.5 py-1.5 rounded shadow-lg text-[11px] pointer-events-none border border-white/20 animate-fade-in">
            <div className="font-bold text-[#77c4ff]">{hoveredRegion}</div>
            <div className="text-gray-200">
              {metricLabel}: {toNepaliDigits(districtCounts[hoveredRegion] || 24)}
            </div>
            <div className="text-[10px] text-gray-300">
              स्थिति: {PROVINCE_REGIONS.find((p) => p.name === hoveredRegion)?.defaultRisk}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
