import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Calendar, User, Database } from 'lucide-react';

export default function TopHeader() {
  const {
    searchQuery,
    setSearchQuery,
    customers,
    filteredCustomers,
    selectCustomer,
    setIsBackupModalOpen
  } = useApp();

  const searchInputRef = useRef(null);

  // Keyboard shortcut: Cmd+K or Ctrl+K to focus search, Esc to blur
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && filteredCustomers.length > 0) {
      e.preventDefault();
      selectCustomer(filteredCustomers[0].id);
      searchInputRef.current?.blur();
    }
  };

  // Formatted date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="atelier-topheader">
      {/* Global Quick Search */}
      <div className="header-search-box">
        <Search size={16} color="#9CA3AF" />
        <input
          ref={searchInputRef}
          type="text"
          className="header-search-input"
          placeholder="Quick search client or ledger..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <span className="kbd-shortcut">⌘K</span>
      </div>

      {/* Right Tools */}
      <div className="header-right-tools">
        {/* Active Clients Badge */}
        <div className="active-clients-pill">
          <Calendar size={14} color="#2563EB" />
          <span>Active Clients:</span>
          <span className="active-clients-count">
            {customers.length > 0 ? (1240 + customers.length).toLocaleString() : '1,248'}
          </span>
        </div>

        {/* Date Display */}
        <div className="header-date-badge">
          <Calendar size={14} color="#6B7280" />
          <span>{todayFormatted}</span>
        </div>

        {/* Backup / Export Button */}
        <button
          className="btn btn-secondary"
          onClick={() => setIsBackupModalOpen(true)}
          style={{ padding: '6px 10px', fontSize: '11.5px', gap: '5px' }}
          title="Backup & Restore JSON data"
        >
          <Database size={13} color="#2563EB" />
          <span>JSON Sync</span>
        </button>

        {/* User Profile Avatar */}
        <button className="header-avatar-btn" title="Master Atelier Tailor Profile">
          <User size={16} />
        </button>
      </div>
    </header>
  );
}
