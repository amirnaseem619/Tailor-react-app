import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Ruler, ChevronDown, ChevronUp, Sliders } from 'lucide-react';

export default function MeasurementLedger() {
  const { activeCustomer, setActiveCustomer } = useApp();
  const [showAdditional, setShowAdditional] = useState(false);

  if (!activeCustomer) return null;

  const measurements = activeCustomer.measurements || {};
  const currentUnit = measurements.unit || 'IN';

  const handleMeasureChange = (field, val) => {
    setActiveCustomer(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [field]: val
      }
    }));
  };

  const toggleUnit = () => {
    const nextUnit = currentUnit === 'IN' ? 'CM' : 'IN';
    setActiveCustomer(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        unit: nextUnit
      }
    }));
  };

  // Primary 8 measurements displayed prominently matching reference screenshot
  const primaryFields = [
    { key: 'qad', labelEn: 'Qad / Length', labelUr: 'قد', defaultVal: '41.50' },
    { key: 'asteen', labelEn: 'Asteen / Sleeve', labelUr: 'آستین', defaultVal: '24.25' },
    { key: 'shana', labelEn: 'Shana / Shoulder', labelUr: 'شانه', defaultVal: '18.50' },
    { key: 'yakhan', labelEn: 'Yakhan / Collar', labelUr: 'یخن', defaultVal: '16.00' },
    { key: 'baghal', labelEn: 'Baghal / Chest', labelUr: 'بغل', defaultVal: '23.50' },
    { key: 'daman', labelEn: 'Daman / Hem', labelUr: 'دامن', defaultVal: '26.00' },
    { key: 'qadTanban', labelEn: 'Qad Tanban', labelUr: 'قد تنبان', defaultVal: '38.50' },
    { key: 'pacha', labelEn: 'Pacha / Leg Cuff', labelUr: 'پاچه', defaultVal: '9.00' },
  ];

  // Secondary tailored measurements
  const additionalFields = [
    { key: 'neck', labelEn: 'Neck', labelUr: 'گردن', defaultVal: '16.00' },
    { key: 'waist', labelEn: 'Waist', labelUr: 'کمر', defaultVal: '38.00' },
    { key: 'hip', labelEn: 'Hip', labelUr: 'کولہا', defaultVal: '42.00' },
    { key: 'armHole', labelEn: 'Arm Hole', labelUr: 'مونڈھا', defaultVal: '9.50' },
    { key: 'bicep', labelEn: 'Bicep', labelUr: 'ڈولہ', defaultVal: '15.00' },
    { key: 'wrist', labelEn: 'Wrist', labelUr: 'کلائی', defaultVal: '8.50' },
    { key: 'kameezLength', labelEn: 'Kameez Length', labelUr: 'لمبائی قمیض', defaultVal: '41.50' },
    { key: 'shalwarLength', labelEn: 'Shalwar Length', labelUr: 'لمبائی شلوار', defaultVal: '38.50' },
    { key: 'ghera', labelEn: 'Ghera / Flare', labelUr: 'گھیرا', defaultVal: '27.00' },
  ];

  return (
    <div className="bench-card">
      {/* Header */}
      <div className="bench-card-header">
        <div className="bench-header-left">
          <div style={{ color: '#2563EB', display: 'flex', alignItems: 'center' }}>
            <Ruler size={22} />
          </div>
          <div className="card-title-group">
            <h2>Anatomical Measurement Ledger ({currentUnit === 'IN' ? 'Inches' : 'Centimeters'})</h2>
            <p>Bespoke Pattern Cut &amp; Body Proportions</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggleUnit}
            style={{ fontSize: '11px', padding: '4px 9px' }}
            title="Toggle between Inches and Centimeters"
          >
            Unit: <strong>{currentUnit}</strong>
          </button>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#4B5563',
              backgroundColor: '#F3F4F6',
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid #E5E7EB'
            }}
          >
            SCALE: 1/4 Inch Precision
          </span>
        </div>
      </div>

      {/* Primary 8-grid matching screenshot */}
      <div className="measurement-grid">
        {primaryFields.map((field) => (
          <div key={field.key} className="measure-box">
            <div className="measure-header">
              <span className="measure-title-en">{field.labelEn}</span>
              <span className="measure-title-ur">{field.labelUr}</span>
            </div>
            <div className="measure-input-row">
              <input
                type="number"
                step="0.25"
                className="measure-input"
                value={measurements[field.key] ?? field.defaultVal}
                onChange={(e) => handleMeasureChange(field.key, e.target.value)}
              />
              <span className="measure-unit-tag">{currentUnit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Bespoke Measurements Accordion */}
      <div style={{ marginTop: '14px' }}>
        <button
          type="button"
          onClick={() => setShowAdditional(!showAdditional)}
          className="btn btn-secondary"
          style={{
            width: '100%',
            justifyContent: 'space-between',
            fontSize: '12px',
            backgroundColor: '#F9F9F7',
            borderColor: '#E7E5E0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={14} color="#2563EB" />
            <span>Additional Tailoring Coordinates (Neck, Waist, Armhole, Flare)</span>
          </div>
          {showAdditional ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {showAdditional && (
          <div className="measurement-grid" style={{ marginTop: '10px' }}>
            {additionalFields.map((field) => (
              <div key={field.key} className="measure-box">
                <div className="measure-header">
                  <span className="measure-title-en">{field.labelEn}</span>
                  <span className="measure-title-ur">{field.labelUr}</span>
                </div>
                <div className="measure-input-row">
                  <input
                    type="number"
                    step="0.25"
                    className="measure-input"
                    value={measurements[field.key] ?? field.defaultVal}
                    onChange={(e) => handleMeasureChange(field.key, e.target.value)}
                  />
                  <span className="measure-unit-tag">{currentUnit}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
