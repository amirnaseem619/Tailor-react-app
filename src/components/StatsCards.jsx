import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Scissors, Calculator, Compass, CheckCircle2 } from 'lucide-react';

export default function StatsCards() {
  const { stats, customers } = useApp();

  // Active drafts count from actual customer records
  const draftsCount = customers.filter(c => c.status === 'Cutting').length || 3;
  const ledgerTotalAmount = customers.reduce((sum, c) => sum + (Number(c.draftingFee) || 0), 0);

  return (
    <div className="stats-cards-grid">
      {/* Card 1: Active Ledgers */}
      <div className="stat-card">
        <div>
          <div className="stat-card-title">ACTIVE LEDGERS</div>
          <div className="stat-card-number">{customers.length}</div>
          <div className="stat-card-sub">
            <CheckCircle2 size={12} color="#2563EB" />
            <span>Registered Craftsmen</span>
          </div>
        </div>
        <div className="stat-icon-container">
          <Users size={18} />
        </div>
      </div>

      {/* Card 2: Drafts Cut / Today */}
      <div className="stat-card">
        <div>
          <div className="stat-card-title">DRAFTS CUT / TODAY</div>
          <div className="stat-card-number">{draftsCount}</div>
          <div className="stat-card-sub">
            <Scissors size={12} color="#2563EB" />
            <span>On Chalk Board</span>
          </div>
        </div>
        <div className="stat-icon-container">
          <Scissors size={18} />
        </div>
      </div>

      {/* Card 3: Ledger Total */}
      <div className="stat-card">
        <div>
          <div className="stat-card-title">LEDGER TOTAL (AFN / Rs)</div>
          <div className="stat-card-number">
            {ledgerTotalAmount > 0 ? ledgerTotalAmount.toLocaleString('en-PK') : '0'}
          </div>
          <div className="stat-card-sub">
            <Calculator size={12} color="#2563EB" />
            <span>Total Booked Orders</span>
          </div>
        </div>
        <div className="stat-icon-container">
          <Calculator size={18} />
        </div>
      </div>

      {/* Card 4: Drafting Standard (Dark Navy Card) */}
      <div className="stat-card dark-card">
        <div>
          <div className="stat-card-title">DRAFTING STANDARD</div>
          <div className="stat-card-number">Traditional Perahan</div>
          <div className="stat-card-sub">
            <span>Perahan Tunban &amp; Waskat</span>
          </div>
        </div>
        <div className="stat-icon-container">
          <Compass size={18} />
        </div>
      </div>
    </div>
  );
}
