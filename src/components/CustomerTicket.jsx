import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { customerService } from '../services/customerService';
import {
  IdCard,
  User,
  Phone,
  Calendar,
  DollarSign,
  PlusCircle,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export default function CustomerTicket() {
  const {
    activeCustomer,
    setActiveCustomer,
    startNewClient,
    selectCustomer
  } = useApp();

  const [duplicateWarning, setDuplicateWarning] = useState(null);

  // Check for duplicate phone number
  useEffect(() => {
    let isMounted = true;
    async function checkDuplicate() {
      if (!activeCustomer || !activeCustomer.phone) {
        setDuplicateWarning(null);
        return;
      }
      const existing = await customerService.checkPhoneDuplicate(
        activeCustomer.phone,
        activeCustomer.isNew ? null : activeCustomer.id
      );
      if (isMounted) {
        if (existing && existing.id !== activeCustomer.id) {
          setDuplicateWarning(existing);
        } else {
          setDuplicateWarning(null);
        }
      }
    }
    const timeout = setTimeout(checkDuplicate, 400);
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [activeCustomer?.phone, activeCustomer?.id, activeCustomer?.isNew]);

  if (!activeCustomer) return null;

  const handleChange = (field, value) => {
    setActiveCustomer(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bench-card">
      {/* Header Row */}
      <div className="bench-card-header">
        <div className="bench-header-left">
          <div style={{ color: '#2563EB', display: 'flex', alignItems: 'center' }}>
            <IdCard size={22} />
          </div>
          <div className="card-title-group">
            <h2>Customer Identification Ticket</h2>
            <p>Bespoke Fitting Slip &amp; Contact Coordinates</p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-blue-pill"
          onClick={startNewClient}
          title="Create a new client ticket"
        >
          <PlusCircle size={13} style={{ marginRight: 4 }} />
          NEW CLIENT
        </button>
      </div>

      {/* Duplicate Phone Alert if detected */}
      {duplicateWarning && (
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FCD34D',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            fontSize: '12px',
            color: '#92400E'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={16} color="#D97706" />
            <span>
              <strong>Customer may already exist:</strong> #{duplicateWarning.id} {duplicateWarning.name} has the same phone number.
            </span>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              selectCustomer(duplicateWarning.id);
              setDuplicateWarning(null);
            }}
            style={{ fontSize: '11px', padding: '4px 8px', gap: '4px' }}
          >
            <ExternalLink size={12} />
            Open Existing Client
          </button>
        </div>
      )}

      {/* 2-Row Form Grid matching reference screenshot */}
      <div className="ticket-form-grid">
        {/* Record No. */}
        <div className="form-field-group">
          <div className="field-label-row">
            <span className="field-label-en">Record No.</span>
            <span style={{ fontSize: '10.5px', color: '#2563EB', fontWeight: 700 }}>#C-ID</span>
          </div>
          <div className="input-with-icon" style={{ backgroundColor: '#F0F4F8' }}>
            <span style={{ fontWeight: 700, color: '#111827', fontSize: '13px' }}>#</span>
            <input
              type="text"
              readOnly
              value={activeCustomer.id || 'C-1001'}
              style={{ fontWeight: 700, color: '#111827', cursor: 'default' }}
            />
          </div>
        </div>

        {/* Client Full Name */}
        <div className="form-field-group">
          <div className="field-label-row">
            <span className="field-label-en">Client Full Name</span>
            <span className="field-label-ur">اسم مشتری</span>
          </div>
          <div className="input-with-icon">
            <User size={15} color="#6B7280" />
            <input
              type="text"
              placeholder="e.g. Ahmad Tariq Walid"
              value={activeCustomer.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
        </div>

        {/* Phone / Mobile */}
        <div className="form-field-group">
          <div className="field-label-row">
            <span className="field-label-en">Phone / Mobile</span>
            <span className="field-label-ur">شماره تماس</span>
          </div>
          <div className="input-with-icon">
            <Phone size={15} color="#6B7280" />
            <input
              type="tel"
              placeholder="+92 300 1234567"
              value={activeCustomer.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        {/* Order / Fitting Date */}
        <div className="form-field-group">
          <div className="field-label-row">
            <span className="field-label-en">Order / Fitting Date</span>
            <span className="field-label-ur">تاریخ ثبت</span>
          </div>
          <div className="input-with-icon">
            <Calendar size={15} color="#6B7280" />
            <input
              type="date"
              value={activeCustomer.dueDate || new Date().toISOString().slice(0, 10)}
              onChange={(e) => handleChange('dueDate', e.target.value)}
            />
          </div>
        </div>

        {/* Drafting Fee (AFN / Rs) */}
        <div className="form-field-group">
          <div className="field-label-row">
            <span className="field-label-en">Drafting Fee (AFN / Rs)</span>
            <span className="field-label-ur">قیمت دوخت</span>
          </div>
          <div className="input-with-icon">
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>Rs</span>
            <input
              type="number"
              placeholder="2400"
              value={activeCustomer.draftingFee ?? 2400}
              onChange={(e) => handleChange('draftingFee', e.target.value)}
            />
          </div>
        </div>

        {/* Workflow Status */}
        <div className="form-field-group">
          <div className="field-label-row">
            <span className="field-label-en">Workflow Status</span>
          </div>
          <div className="input-with-icon">
            <select
              value={activeCustomer.status || 'Cutting'}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="Measuring">Measuring (پیمائش)</option>
              <option value="Cutting">Cutting (برش)</option>
              <option value="Basting">Basting (کوک)</option>
              <option value="Finished">Finished (تکمیل)</option>
              <option value="Delivered">Delivered (حوالہ)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
