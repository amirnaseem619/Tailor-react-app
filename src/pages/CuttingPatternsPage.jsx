import React from 'react';
import { Scissors, Sparkles } from 'lucide-react';

export default function CuttingPatternsPage() {
  const patterns = [
    {
      title: 'Traditional Gol Collar (گول یخن)',
      category: 'Collar Cut',
      image: '/patterns/collar_gol.png',
      description: 'Curved Chinese mandarin band cut at 1.5 inch height with soft buckram canvas.',
      measure: 'Standard 16.0" with 0.5" breathing margin'
    },
    {
      title: 'Qasimi Collar (قاسمی یخن)',
      category: 'Collar Cut',
      image: '/patterns/collar_qasimi.png',
      description: 'Afghan and Peshawar heritage angular band cut with sharp geometric corners.',
      measure: 'Height 1.75" angled at 45 degrees'
    },
    {
      title: 'Hindi Collar Placket (ہندی یخن و پٹی)',
      category: 'Collar Cut',
      image: '/patterns/collar_hindi.png',
      description: 'Front tailored placket with 4 visible bespoke buttons and curved neckband.',
      measure: 'Standard 4-button placket strip with 1/2" collar band'
    },
    {
      title: 'Sada Collar (سادہ یخن)',
      category: 'Collar Cut',
      image: '/patterns/collar_sada.png',
      description: 'Classic open neckline band cut with natural drape and minimal canvas support.',
      measure: 'Standard neckline slope with 1.25" band'
    },
    {
      title: 'Kaf-dar Sleeve (کف‌دار آستین)',
      category: 'Cuff Style',
      image: '/patterns/collar_sada.png',
      description: 'Double fold formal cuff with single button placket and fused interfacing.',
      measure: '2.5" cuff width, 9.0" circumference'
    },
    {
      title: 'Round Daman / Hem (گول دامن)',
      category: 'Hemming Architecture',
      image: '/patterns/collar_qasimi.png',
      description: 'Graceful semi-circular curve on Kameez side slits, stitched with delicate 1/8" hem.',
      measure: 'Curve begins 6.0" above bottom hem'
    },
    {
      title: 'Square Daman (چورس / راست دامن)',
      category: 'Hemming Architecture',
      image: null,
      description: 'Crisp 90-degree right angle hemline suited for executive cotton kameez & kurtas.',
      measure: 'Right angle corner with reinforced bar-tack'
    }
  ];

  return (
    <div className="atelier-dashboard-canvas">
      <div className="bench-card">
        <div className="bench-card-header">
          <div className="bench-header-left">
            <Scissors size={22} color="#2563EB" />
            <div className="card-title-group">
              <h2>Architectural Cutting &amp; Pattern Blueprints (طرز و تراش)</h2>
              <p>Standard atelier technical drafts for Persian, Afghan, and Pakistani cuts</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {patterns.map((p, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#F9F9F7',
                border: '1px solid #E7E5E0',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#2563EB',
                    backgroundColor: '#EFF6FF',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  {p.category}
                </span>
                <Sparkles size={14} color="#D97706" />
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                {p.title}
              </h3>

              <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: '1.4' }}>
                {p.description}
              </p>

              <div
                style={{
                  fontSize: '11px',
                  color: '#6B7280',
                  borderTop: '1px dashed #D1D5DB',
                  paddingTop: '8px',
                  marginTop: 'auto'
                }}
              >
                <strong>Atelier Spec:</strong> {p.measure}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
