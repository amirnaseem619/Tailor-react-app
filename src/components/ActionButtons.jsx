import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, Printer, Save, Check } from 'lucide-react';

export default function ActionButtons() {
  const {
    activeCustomer,
    saveActiveCustomer,
    startNewClient,
    setIsPrintModalOpen
  } = useApp();

  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = async () => {
    if (!activeCustomer) return;
    setIsSaving(true);
    const success = await saveActiveCustomer(activeCustomer);
    setIsSaving(false);
    if (success) {
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    }
  };

  const handleClear = () => {
    if (activeCustomer?.name && activeCustomer.name.trim()) {
      if (window.confirm('Start a new client ticket? Unsaved changes on current slip will be reset.')) {
        startNewClient();
      }
    } else {
      startNewClient();
    }
  };

  return (
    <div className="action-buttons-row">
      {/* Clear / New Record */}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleClear}
        title="Start fresh client record"
      >
        <PlusCircle size={15} color="#4B5563" />
        <span>Clear / New Record</span>
      </button>

      {/* Print Slip */}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setIsPrintModalOpen(true)}
        title="Generate and print bespoke measurement slip"
      >
        <Printer size={15} color="#2563EB" />
        <span>Print Slip</span>
      </button>

      {/* Save Measurement & Record */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSave}
        disabled={isSaving}
        style={{
          minWidth: '220px',
          backgroundColor: justSaved ? '#166534' : 'var(--text-primary)'
        }}
        title="Save customer data, measurements and patterns"
      >
        {justSaved ? (
          <>
            <Check size={16} color="#FFFFFF" />
            <span>Record Saved Locally</span>
          </>
        ) : (
          <>
            <Save size={16} color="#FFFFFF" />
            <span>{isSaving ? 'Preserving Record...' : 'Save Measurement & Record'}</span>
          </>
        )}
      </button>
    </div>
  );
}
