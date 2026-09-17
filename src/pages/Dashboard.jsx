import React from 'react';
import StatsCards from '../components/StatsCards';
import CustomerTicket from '../components/CustomerTicket';
import MeasurementLedger from '../components/MeasurementLedger';
import CutBlueprint from '../components/CutBlueprint';
import ActionButtons from '../components/ActionButtons';
import CustomerRegistry from '../components/CustomerRegistry';

export default function Dashboard() {
  return (
    <main className="atelier-dashboard-canvas">
      {/* 4 Dashboard Metric Cards */}
      <StatsCards />

      {/* Two Column Atelier Drafting Bench Layout */}
      <div className="atelier-workspace-layout">
        {/* Left Column: Customer Ticket, Measurements Ledger, Blueprint, Actions */}
        <section className="atelier-drafting-bench">
          <CustomerTicket />
          <MeasurementLedger />
          <CutBlueprint />
          <ActionButtons />
        </section>

        {/* Right Column: Master Customer Registry & LocalStorage Status */}
        <section>
          <CustomerRegistry />
        </section>
      </div>
    </main>
  );
}
