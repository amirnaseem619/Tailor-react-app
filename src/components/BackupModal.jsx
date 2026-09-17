import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { storage } from '../services/storage';
import {
  Database,
  Download,
  Upload,
  RotateCcw,
  X,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function BackupModal() {
  const {
    isBackupModalOpen,
    setIsBackupModalOpen,
    refreshData,
    showToast,
    handleReloadPresets,
    customers,
    orders
  } = useApp();

  const [importStatus, setImportStatus] = useState(null);

  if (!isBackupModalOpen) return null;

  const handleExport = () => {
    storage.exportBackup();
    showToast('JSON backup exported successfully.');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const res = storage.importBackup(content);
      if (res.success) {
        setImportStatus({ success: true, count: res.count });
        refreshData();
        showToast(`Successfully imported ${res.count} customer records.`);
      } else {
        setImportStatus({ success: false, error: res.error });
        showToast(`Import failed: ${res.error}`, 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsBackupModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={18} color="#2563EB" />
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>
              Atelier Data Storage &amp; Backup
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsBackupModalOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Current Status Overview */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#F0F9FF',
              border: '1px solid #BAE6FD',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#0369A1'
            }}
          >
            <strong>LocalStorage Active:</strong> Currently storing{' '}
            <strong>{customers.length} customer records</strong> and{' '}
            <strong>{orders.length} orders</strong> on this workstation.
          </div>

          {/* Section 1: Export JSON Backup */}
          <div style={{ padding: '14px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
              1. Download JSON Backup
            </h4>
            <p style={{ fontSize: '11.5px', color: '#6B7280', marginBottom: '10px' }}>
              Save all client tickets, measurements, and pattern choices into an offline file.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleExport}
              style={{ gap: '6px', fontSize: '12px' }}
            >
              <Download size={14} color="#2563EB" />
              Download Backup File (.json)
            </button>
          </div>

          {/* Section 2: Import Backup File */}
          <div style={{ padding: '14px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
              2. Restore from JSON Backup
            </h4>
            <p style={{ fontSize: '11.5px', color: '#6B7280', marginBottom: '10px' }}>
              Select a previously saved <code>.json</code> file to restore customer records.
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{ fontSize: '12px' }}
            />
            {importStatus && (
              <div style={{ marginTop: '10px', fontSize: '11.5px' }}>
                {importStatus.success ? (
                  <span style={{ color: '#166534', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} /> Imported {importStatus.count} records successfully!
                  </span>
                ) : (
                  <span style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={14} /> {importStatus.error}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Section 3: Reset Presets */}
          <div style={{ padding: '14px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
              3. Reset Atelier Demo Presets
            </h4>
            <p style={{ fontSize: '11.5px', color: '#6B7280', marginBottom: '10px' }}>
              Restore the original benchmark client tickets (including Ahmad Tariq Walid #C-1085).
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                if (window.confirm('Reset local storage to original sample client records?')) {
                  handleReloadPresets();
                  setIsBackupModalOpen(false);
                }
              }}
              style={{ gap: '6px', fontSize: '12px' }}
            >
              <RotateCcw size={14} color="#D97706" />
              Reload Default Presets
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsBackupModalOpen(false)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
