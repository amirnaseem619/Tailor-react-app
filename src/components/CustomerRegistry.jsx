import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Phone,
  Scissors,
  Trash2
} from 'lucide-react';

export default function CustomerRegistry() {
  const {
    customers,
    activeCustomerId,
    selectCustomer,
    deleteCustomer,
    selectedFilterTab,
    setSelectedFilterTab,
    filteredCustomers,
    lastSavedTime,
    handleReloadPresets,
    searchQuery,
    setSearchQuery
  } = useApp();

  const tabs = ['ALL', 'MEASURING', 'CUTTING', 'BASTING', 'FINISHED'];

  const getStatusBadgeStyle = (status) => {
    switch ((status || '').toUpperCase()) {
      case 'MEASURING':
        return { backgroundColor: '#F3F4F6', color: '#374151' };
      case 'CUTTING':
        return { backgroundColor: '#FEF3C7', color: '#92400E' };
      case 'BASTING':
        return { backgroundColor: '#E0E7FF', color: '#3730A3' };
      case 'FINISHED':
        return { backgroundColor: '#DCFCE7', color: '#166534' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#4B5563' };
    }
  };

  const handleDelete = (e, customer) => {
    e.stopPropagation();
    if (window.confirm(`Delete customer #${customer.id} (${customer.name})? Associated local records and orders will be removed.`)) {
      deleteCustomer(customer.id);
    }
  };

  return (
    <aside className="registry-panel">
      {/* Master Customer Registry Card */}
      <div className="registry-card">
        {/* Header */}
        <div className="registry-header">
          <div className="registry-title-box">
            <BookOpen size={18} color="#2563EB" />
            <div>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827' }}>
                Master Customer Registry
              </h3>
              <p style={{ fontSize: '10px', color: '#6B7280' }}>
                Tap any card to populate atelier drafting bench
              </p>
            </div>
          </div>
          <span className="registry-records-badge">
            {filteredCustomers.length} Records
          </span>
        </div>

        {/* Quick Filter Search Input */}
        <div className="registry-search-box">
          <Search size={14} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Filter by #C-ID, Name, or Mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="registry-tabs-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`registry-tab-btn ${selectedFilterTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedFilterTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Customer Cards List */}
        <div className="customer-cards-list">
          {filteredCustomers.length === 0 ? (
            <div
              style={{
                padding: '30px 10px',
                textAlign: 'center',
                color: '#6B7280',
                fontSize: '12px'
              }}
            >
              No customer records found matching filter.
            </div>
          ) : (
            filteredCustomers.map((c) => {
              const isActive = activeCustomerId === c.id;
              const badgeStyle = getStatusBadgeStyle(c.status);

              return (
                <div
                  key={c.id}
                  className={`customer-item-card ${isActive ? 'active-client' : ''}`}
                  onClick={() => selectCustomer(c.id)}
                >
                  <div className="item-top-row">
                    <span className="item-id"># {c.id}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="item-status-badge" style={badgeStyle}>
                        {c.status || 'Measuring'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, c)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#9CA3AF',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Delete client record"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="item-name">{c.name || 'Unnamed Client'}</div>

                  <div className="item-details-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={11} />
                      {c.phone || 'No phone'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Scissors size={11} />
                      {c.garmentType || 'Traditional'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* LocalStorage Synced Card matching reference screenshot */}
      <div className="sync-status-card">
        <div className="sync-info">
          <div style={{ color: '#16A34A', display: 'flex', alignItems: 'center' }}>
            <CheckCircle2 size={18} />
          </div>
          <div className="sync-texts">
            <h4>LocalStorage Synced</h4>
            <p>Changes immediately preserved locally &bull; {lastSavedTime}</p>
          </div>
        </div>
        <button
          type="button"
          className="reload-presets-link"
          onClick={handleReloadPresets}
          title="Restore screenshot sample client data"
        >
          Reload Presets
        </button>
      </div>
    </aside>
  );
}
