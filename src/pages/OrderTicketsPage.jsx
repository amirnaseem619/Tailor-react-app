import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { orderService } from '../services/orderService';
import { Receipt, Plus, Scissors, CheckCircle, Clock, Truck } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/idGenerator';

export default function OrderTicketsPage() {
  const { orders, customers, refreshData, showToast } = useApp();
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isNewOrderModal, setIsNewOrderModal] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    customerId: customers[0]?.id || '',
    garmentType: 'Traditional Perahan',
    price: 2400,
    advance: 1000,
    status: 'Cutting',
    returnDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    notes: ''
  });

  const filteredOrders = orders.filter(o => {
    if (selectedStatus === 'ALL') return true;
    return (o.status || '').toUpperCase() === selectedStatus;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrder(orderId, { status: newStatus });
      showToast(`Order #${orderId} status updated to ${newStatus}`);
      refreshData();
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === newOrderData.customerId);
    try {
      const created = await orderService.createOrder({
        ...newOrderData,
        customerName: customer ? customer.name : 'Client'
      });
      showToast(`Order #${created.id} booked successfully!`);
      setIsNewOrderModal(false);
      refreshData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="atelier-dashboard-canvas">
      <div className="bench-card">
        <div className="bench-card-header">
          <div className="bench-header-left">
            <Receipt size={22} color="#2563EB" />
            <div className="card-title-group">
              <h2>Atelier Order Tickets (آرڈر ٹکٹ و سلپ)</h2>
              <p>Active workshop job cards, stitching workflow, and financial settlements</p>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setIsNewOrderModal(true)}
          >
            <Plus size={15} />
            <span>Create New Order Ticket</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="registry-tabs-row" style={{ marginBottom: '16px' }}>
          {['ALL', 'MEASURING', 'CUTTING', 'BASTING', 'FINISHED', 'DELIVERED'].map((st) => (
            <button
              key={st}
              type="button"
              className={`registry-tab-btn ${selectedStatus === st ? 'active' : ''}`}
              onClick={() => setSelectedStatus(st)}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
          {filteredOrders.map((order) => {
            const customer = customers.find(c => c.id === order.customerId);
            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#F9F9F7',
                  border: '1px solid #E7E5E0',
                  borderRadius: '8px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#2563EB' }}>
                    #{order.id}
                  </span>
                  <select
                    value={order.status || 'Cutting'}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 6px',
                      borderRadius: '4px',
                      border: '1px solid #D1D5DB'
                    }}
                  >
                    <option value="Measuring">Measuring</option>
                    <option value="Cutting">Cutting</option>
                    <option value="Basting">Basting</option>
                    <option value="Finished">Finished</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                  {order.customerName || customer?.name || 'Customer'}
                </div>

                <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                  Client ID: <strong>#{order.customerId}</strong> &bull; {order.garmentType}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    marginTop: '4px'
                  }}
                >
                  <div>
                    <span style={{ color: '#6B7280' }}>Total:</span>{' '}
                    <strong>{formatCurrency(order.price)}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#6B7280' }}>Adv:</span>{' '}
                    <span style={{ color: '#166534', fontWeight: 600 }}>{formatCurrency(order.advance)}</span>
                  </div>
                  <div>
                    <span style={{ color: '#6B7280' }}>Due:</span>{' '}
                    <span style={{ color: '#DC2626', fontWeight: 700 }}>{formatCurrency(order.remaining)}</span>
                  </div>
                </div>

                {order.returnDate && (
                  <div style={{ fontSize: '11px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> Return Date: {formatDate(order.returnDate)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* New Order Modal */}
      {isNewOrderModal && (
        <div className="modal-overlay" onClick={() => setIsNewOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Create New Order Ticket</h3>
              <button
                type="button"
                onClick={() => setIsNewOrderModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateOrder}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-field-group">
                  <label className="field-label-en">Select Customer</label>
                  <select
                    className="input-with-icon"
                    value={newOrderData.customerId}
                    onChange={(e) => setNewOrderData({ ...newOrderData, customerId: e.target.value })}
                    required
                  >
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        #{c.id} &bull; {c.name} ({c.phone || 'No phone'})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group">
                  <label className="field-label-en">Garment Type</label>
                  <select
                    className="input-with-icon"
                    value={newOrderData.garmentType}
                    onChange={(e) => setNewOrderData({ ...newOrderData, garmentType: e.target.value })}
                  >
                    <option value="Traditional Perahan">Traditional Perahan (پیراہن تنبان)</option>
                    <option value="Shalwar Kameez">Shalwar Kameez (شلوار قمیض)</option>
                    <option value="Kurta Shalwar">Kurta Shalwar (کرتہ شلوار)</option>
                    <option value="Waistcoat">Waistcoat / Waskat (واسکت)</option>
                    <option value="Bespoke Suit">Bespoke 2-Piece Suit (سوٹس)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-field-group">
                    <label className="field-label-en">Price (Rs.)</label>
                    <input
                      type="number"
                      className="input-with-icon"
                      value={newOrderData.price}
                      onChange={(e) => setNewOrderData({ ...newOrderData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="field-label-en">Advance (Rs.)</label>
                    <input
                      type="number"
                      className="input-with-icon"
                      value={newOrderData.advance}
                      onChange={(e) => setNewOrderData({ ...newOrderData, advance: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label-en">Return / Delivery Date</label>
                  <input
                    type="date"
                    className="input-with-icon"
                    value={newOrderData.returnDate}
                    onChange={(e) => setNewOrderData({ ...newOrderData, returnDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsNewOrderModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Book Order Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
