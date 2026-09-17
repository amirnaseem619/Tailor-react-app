import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Database, Server, ShieldCheck, Download, RotateCcw } from 'lucide-react';
import { storage } from '../services/storage';

export default function AtelierSetupPage() {
  const { customers, orders, handleReloadPresets, showToast } = useApp();

  return (
    <div className="atelier-dashboard-canvas">
      <div className="bench-card">
        <div className="bench-card-header">
          <div className="bench-header-left">
            <Settings size={22} color="#2563EB" />
            <div className="card-title-group">
              <h2>Atelier Tailor Setup &amp; Storage Architecture</h2>
              <p>Workstation configurations, backup archives, and backend roadmap</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Atelier Profile Coordinates */}
          <div style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#F9F9F7' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
              Atelier Coordinates
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
              <div><strong>Atelier Name:</strong> Rehman Tailors (Darzi Master Atelier)</div>
              <div><strong>Specialization:</strong> Bespoke Persian &amp; Afghan Suits, Perahan Tunban &amp; Waskat</div>
              <div><strong>Default Currency:</strong> Pakistani Rupee (Rs. / AFN)</div>
              <div><strong>Pattern Metric:</strong> Imperial (Inches) with 1/4" scale</div>
              <div><strong>Station Address:</strong> Sector F-7 / Blue Area, Islamabad</div>
            </div>
          </div>

          {/* LocalStorage Data Status */}
          <div style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#F9F9F7' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={16} color="#2563EB" />
              <span>LocalStorage Engine (Version 1)</span>
            </h3>
            <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: '1.5', marginBottom: '12px' }}>
              Current workstation holds <strong>{customers.length} client files</strong> and <strong>{orders.length} order tickets</strong> stored directly in the browser's persistent key-value storage.
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  storage.exportBackup();
                  showToast('Backup JSON downloaded successfully.');
                }}
                style={{ fontSize: '11.5px', gap: '4px' }}
              >
                <Download size={13} />
                Export JSON Archive
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  if (window.confirm('Reset local storage to original sample client records?')) {
                    handleReloadPresets();
                  }
                }}
                style={{ fontSize: '11.5px', gap: '4px' }}
              >
                <RotateCcw size={13} color="#D97706" />
                Reload Presets
              </button>
            </div>
          </div>

          {/* Backend Migration Architecture Card */}
          <div style={{ gridColumn: '1 / -1', padding: '16px', border: '1px solid #BAE6FD', borderRadius: '8px', backgroundColor: '#F0F9FF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Server size={18} color="#0284C7" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0369A1' }}>
                Future Backend &amp; Multi-Device Roadmap (Version 2)
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: '#0369A1', lineHeight: '1.5', marginBottom: '10px' }}>
              This frontend has been built with an isolated asynchronous service layer (<code>customerService</code>, <code>orderService</code>). When you are ready to transition to a shared multi-device cloud database, the service layer can be switched from LocalStorage to a Node.js / Express REST API and PostgreSQL database without changing any UI components.
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '11.5px', color: '#0284C7' }}>
              <span>&bull; Cloud PostgreSQL Database</span>
              <span>&bull; Real-time Multi-screen Sync</span>
              <span>&bull; Automated WhatsApp Notifications</span>
              <span>&bull; Staff Role-Based Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
