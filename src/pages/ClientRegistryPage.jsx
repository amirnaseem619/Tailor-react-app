import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Search, Trash2, ArrowRight, Phone, Calendar } from 'lucide-react';
import { formatDate, formatCurrency } from '../utils/idGenerator';

export default function ClientRegistryPage() {
  const { customers, selectCustomer, startNewClient, deleteCustomer } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    return (
      c.id.toLowerCase().includes(q) ||
      (c.name || '').toLowerCase().includes(q) ||
      (c.phone || '').includes(q)
    );
  });

  const handleOpenBench = (id) => {
    selectCustomer(id);
    navigate('/');
  };

  return (
    <div className="atelier-dashboard-canvas">
      <div className="bench-card">
        <div className="bench-card-header">
          <div className="bench-header-left">
            <Users size={22} color="#2563EB" />
            <div className="card-title-group">
              <h2>Master Client Registry (تمام رجسٹرڈ گاہک)</h2>
              <p>Complete directory of atelier customers, contact records, and measurement logs</p>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              startNewClient();
              navigate('/');
            }}
          >
            <Plus size={15} />
            <span>New Customer Ticket</span>
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '16px', maxWidth: '400px' }} className="header-search-box">
          <Search size={15} color="#9CA3AF" />
          <input
            type="text"
            className="header-search-input"
            placeholder="Search by name, ID or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Clients Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9F9F7', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Customer ID</th>
                <th style={{ padding: '10px 12px' }}>Client Name</th>
                <th style={{ padding: '10px 12px' }}>Phone Number</th>
                <th style={{ padding: '10px 12px' }}>Garment Style</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px' }}>Fee (Rs.)</th>
                <th style={{ padding: '10px 12px' }}>Created</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#2563EB' }}>
                    # {c.id}
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                    {c.name}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#4B5563' }}>
                    {c.phone || '—'}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#4B5563' }}>
                    {c.garmentType || 'Traditional'}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: c.status === 'Cutting' ? '#FEF3C7' : '#F3F4F6',
                        color: c.status === 'Cutting' ? '#92400E' : '#374151'
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                    {formatCurrency(c.draftingFee || 2400)}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#6B7280', fontSize: '11.5px' }}>
                    {formatDate(c.createdAt)}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '11.5px', marginRight: '6px' }}
                      onClick={() => handleOpenBench(c.id)}
                    >
                      <span>Drafting Bench</span>
                      <ArrowRight size={12} />
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#DC2626',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      onClick={() => {
                        if (window.confirm(`Delete client #${c.id} permanently?`)) {
                          deleteCustomer(c.id);
                        }
                      }}
                      title="Delete client"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
