import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Scissors,
  ClipboardList,
  Users,
  Receipt,
  FileText,
  Layers,
  Settings,
  Lock,
  Compass
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { label: 'Measurement Ledger', path: '/', icon: ClipboardList },
    { label: 'Client Registry', path: '/clients', icon: Users },
    { label: 'Order Tickets', path: '/orders', icon: Receipt },
    { label: 'Cutting & Patterns', path: '/cutting', icon: Scissors },
    { label: 'Fabric Inventory', path: '/fabrics', icon: Layers },
    { label: 'Atelier Setup', path: '/setup', icon: Settings },
  ];

  return (
    <aside className="atelier-sidebar">
      {/* Brand Logo matching screenshot & Rehman Tailors banner */}
      <div className="sidebar-brand">
        <div className="brand-icon-box">
          <Scissors size={20} strokeWidth={2.2} />
        </div>
        <div>
          <h1 className="brand-title">Rehman Tailors</h1>
          <p className="brand-subtitle">ATELIER TAILORS</p>
        </div>
      </div>

      {/* Navigation Modules */}
      <div className="sidebar-nav-section">
        <div className="nav-section-label">WORKSPACE MODULES</div>
        <nav>
          <ul className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Metric Standard badge matching screenshot */}
      <div className="sidebar-metric-badge">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={16} color="#2563EB" />
          <div className="metric-label-group">
            <span className="metric-tag">Drafting Metric</span>
            <span className="metric-val">Imperial (Inches)</span>
          </div>
        </div>
        <Lock size={13} color="#9CA3AF" />
      </div>
    </aside>
  );
}
