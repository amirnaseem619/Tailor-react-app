import React, { useState } from 'react';
import { Layers, Plus, Package } from 'lucide-react';
import { formatCurrency } from '../utils/idGenerator';

export default function FabricInventoryPage() {
  const [fabrics, setFabrics] = useState([
    {
      id: 'FAB-101',
      name: 'Egyptian Giza 88 Cotton',
      color: 'Off-White / Cream',
      type: '100% Long Staple Cotton',
      meters: 42.5,
      pricePerMeter: 1800,
      origin: 'Cairo, Egypt'
    },
    {
      id: 'FAB-102',
      name: 'Pure Boski Silk (6-Pound)',
      color: 'Natural Ivory',
      type: '100% Spun Chinese Silk',
      meters: 18.0,
      pricePerMeter: 4500,
      origin: 'Shanghai'
    },
    {
      id: 'FAB-103',
      name: 'Handspun Kamalia Khaddar',
      color: 'Charcoal Grey',
      type: 'Handloom Pure Cotton',
      meters: 35.0,
      pricePerMeter: 1200,
      origin: 'Kamalia, Punjab'
    },
    {
      id: 'FAB-104',
      name: 'Superfine Karandi',
      color: 'Beige Sand',
      type: 'Textured Winter Weave',
      meters: 28.0,
      pricePerMeter: 2200,
      origin: 'Charsadda'
    },
    {
      id: 'FAB-105',
      name: 'Italian Super 120s Tropical Wool',
      color: 'Midnight Navy',
      type: 'Suiting & Waistcoat Wool',
      meters: 22.0,
      pricePerMeter: 6800,
      origin: 'Biella, Italy'
    }
  ]);

  return (
    <div className="atelier-dashboard-canvas">
      <div className="bench-card">
        <div className="bench-card-header">
          <div className="bench-header-left">
            <Layers size={22} color="#2563EB" />
            <div className="card-title-group">
              <h2>Atelier Fabric Inventory (کپڑے کا ذخیرہ)</h2>
              <p>Premium suitings, pure cottons, boski rolls, and client provided cloths</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {fabrics.map((f) => (
            <div
              key={f.id}
              style={{
                backgroundColor: '#F9F9F7',
                border: '1px solid #E7E5E0',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB' }}>
                  #{f.id}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: '#DCFCE7',
                    color: '#166534',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  {f.meters} Meters In Stock
                </span>
              </div>

              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827' }}>
                {f.name}
              </h3>

              <div style={{ fontSize: '11.5px', color: '#4B5563' }}>
                Color: <strong>{f.color}</strong> &bull; {f.type}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #E5E7EB',
                  paddingTop: '8px',
                  marginTop: '6px',
                  fontSize: '11.5px'
                }}
              >
                <span style={{ color: '#6B7280' }}>Rate / Meter:</span>
                <strong style={{ color: '#111827' }}>{formatCurrency(f.pricePerMeter)}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
