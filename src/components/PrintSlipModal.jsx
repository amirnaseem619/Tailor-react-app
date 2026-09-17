import React from 'react';
import { useApp } from '../context/AppContext';
import { Printer, X, Scissors, CheckCircle, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/idGenerator';

export default function PrintSlipModal() {
  const { isPrintModalOpen, setIsPrintModalOpen, activeCustomer } = useApp();

  if (!isPrintModalOpen || !activeCustomer) return null;

  const measurements = activeCustomer.measurements || {};
  const designs = activeCustomer.designs || {};
  const unit = measurements.unit || 'IN';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPrintModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={18} color="#2563EB" />
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>
              Bespoke Fitting Slip &bull; #{activeCustomer.id}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsPrintModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6B7280'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Printable Ticket Area */}
        <div className="modal-body printable-slip-wrapper">
          {/* Slip Header Banner */}
          <div
            style={{
              textAlign: 'center',
              padding: '12px',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              borderRadius: '6px',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Scissors size={20} color="#EAB308" />
              <h1 style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.05em' }}>
                REHMAN TAILORS
              </h1>
            </div>
            <p style={{ fontSize: '10.5px', letterSpacing: '0.12em', color: '#9CA3AF', textTransform: 'uppercase' }}>
              BESPOKE PERSIAN &amp; AFGHAN SUIT &bull; MASTER ATELIER
            </p>
            <p style={{ fontSize: '9.5px', color: '#6B7280', marginTop: '2px' }}>
              Sector F-7 / Blue Area, Islamabad &bull; Tel: +92 51 227 8990
            </p>
          </div>

          {/* Client Identification Coordinates */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              padding: '12px',
              backgroundColor: '#F9F9F7',
              border: '1px solid #E7E5E0',
              borderRadius: '6px',
              fontSize: '12px',
              marginBottom: '16px'
            }}
          >
            <div>
              <div style={{ color: '#6B7280', fontSize: '10.5px' }}>CUSTOMER NUMBER / RECORD</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#2563EB' }}>
                # {activeCustomer.id}
              </div>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '10.5px' }}>FITTING / DUE DATE</div>
              <div style={{ fontWeight: 600 }}>{formatDate(activeCustomer.dueDate) || 'Standard 7 Days'}</div>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '10.5px' }}>CLIENT NAME (اسم مشتری)</div>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>{activeCustomer.name}</div>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '10.5px' }}>CONTACT / MOBILE (شماره تماس)</div>
              <div style={{ fontWeight: 600 }}>{activeCustomer.phone || 'N/A'}</div>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '10.5px' }}>GARMENT TYPE (لباس)</div>
              <div style={{ fontWeight: 600 }}>{activeCustomer.garmentType || 'Traditional Perahan'}</div>
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: '10.5px' }}>WORKFLOW STATUS</div>
              <div style={{ fontWeight: 700, color: '#D97706' }}>{activeCustomer.status} (برش)</div>
            </div>
          </div>

          {/* Anatomical Measurements Table */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '6px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>ANATOMICAL MEASUREMENT LEDGER</span>
              <span style={{ color: '#2563EB' }}>SCALE: 1/4 {unit} Precision</span>
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '11.5px',
                textAlign: 'left'
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #D1D5DB' }}>
                  <th style={{ padding: '6px 8px' }}>Measurement</th>
                  <th style={{ padding: '6px 8px' }}>Urdu (اردو)</th>
                  <th style={{ padding: '6px 8px', textAlign: 'right' }}>Value ({unit})</th>
                  <th style={{ padding: '6px 8px' }}>Measurement</th>
                  <th style={{ padding: '6px 8px' }}>Urdu (اردو)</th>
                  <th style={{ padding: '6px 8px', textAlign: 'right' }}>Value ({unit})</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Qad / Length</td>
                  <td style={{ padding: '6px 8px' }} className="urdu-text">قد</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.qad || '41.50'}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Baghal / Chest</td>
                  <td style={{ padding: '6px 8px' }} className="urdu-text">بغل</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.baghal || '23.50'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Asteen / Sleeve</td>
                  <td style={{ padding: '6px 8px' }} className="urdu-text">آستین</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.asteen || '24.25'}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Daman / Hem</td>
                  <td style={{ padding: '6px 8px' }} className="urdu-text">دامن</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.daman || '26.00'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Shana / Shoulder</td>
                  <td style={{ padding: '6px 8px' }} className="urdu-text">شانه</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.shana || '18.50'}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Qad Tanban</td>
                  <td style={{ padding: '6px 8px' }} className="urdu-text">قد تنبان</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.qadTanban || '38.50'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Yakhan / Collar</td>
                  <td style={{ padding: '6px 8px' }} className="urdu-text">یخن</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.yakhan || '16.00'}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Pacha / Leg Cuff</td>
                  <td style={{ padding: '6px 8px' }} className="urdu-text">پاچه</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.pacha || '9.00'}</td>
                </tr>
                {measurements.waist && (
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '6px 8px', fontWeight: 600 }}>Waist / Hip</td>
                    <td style={{ padding: '6px 8px' }} className="urdu-text">کمر/کولہا</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.waist} / {measurements.hip || '-'}</td>
                    <td style={{ padding: '6px 8px', fontWeight: 600 }}>Armhole / Bicep</td>
                    <td style={{ padding: '6px 8px' }} className="urdu-text">مونڈھا</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700 }}>{measurements.armHole || '-'} / {measurements.bicep || '-'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Architectural Cut Blueprint Summary */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              padding: '10px',
              backgroundColor: '#F3F4F6',
              borderRadius: '6px',
              fontSize: '11px',
              marginBottom: '16px'
            }}
          >
            <div>
              <span style={{ color: '#6B7280' }}>COLLAR (یخن):</span>
              <div style={{ fontWeight: 700, color: '#2563EB' }}>{designs.collarStyle || 'Gol'}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>CUFF (کف):</span>
              <div style={{ fontWeight: 700, color: '#2563EB' }}>{designs.cuffStyle || 'Kaf-dar'}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>POCKET (جیب):</span>
              <div style={{ fontWeight: 700, color: '#2563EB' }}>{designs.pocketStyle || 'Pocket'}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>DAMAN (دامن):</span>
              <div style={{ fontWeight: 700, color: '#2563EB' }}>{designs.damanStyle || 'Round'}</div>
            </div>
          </div>

          {/* Billing & Settlement Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              border: '1px dashed #9CA3AF',
              borderRadius: '6px',
              marginBottom: '14px',
              fontSize: '12px'
            }}
          >
            <div>
              <span style={{ color: '#6B7280' }}>Drafting Fee:</span>{' '}
              <strong>{formatCurrency(activeCustomer.draftingFee || 2400)}</strong>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Advance Paid:</span>{' '}
              <strong style={{ color: '#166534' }}>{formatCurrency(activeCustomer.advance || 1000)}</strong>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Balance Due:</span>{' '}
              <strong style={{ color: '#DC2626', fontSize: '13px' }}>
                {formatCurrency(activeCustomer.remaining || 1400)}
              </strong>
            </div>
          </div>

          {/* Tailor Shop Terms & Signature */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              fontSize: '10px',
              color: '#6B7280',
              paddingTop: '8px'
            }}
          >
            <div>
              <p>&bull; Please bring this original ticket for trial and collection.</p>
              <p>&bull; Master Chalk Cutter: Ustad Rehman / Darzi Master Atelier.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '130px', borderBottom: '1px solid #111827', marginBottom: '4px' }}></div>
              <span>Client / Tailor Signature</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsPrintModalOpen(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePrint}
            style={{ gap: '6px' }}
          >
            <Printer size={15} />
            Print Fitting Slip
          </button>
        </div>
      </div>
    </div>
  );
}
