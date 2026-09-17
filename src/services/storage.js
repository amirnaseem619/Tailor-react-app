/**
 * LocalStorage Service for Rehman Tailors Atelier
 * Provides resilient, isolated persistence and JSON backup/restore capabilities
 */

import { INITIAL_CUSTOMERS, INITIAL_ORDERS } from '../utils/seedData';

const CUSTOMERS_KEY = 'rehman_atelier_customers_v1';
const ORDERS_KEY = 'rehman_atelier_orders_v1';
const ACTIVE_CUSTOMER_KEY = 'rehman_atelier_active_client_id_v1';
const LAST_SAVED_KEY = 'rehman_atelier_last_saved_v1';

export const storage = {
  init() {
    try {
      const customers = localStorage.getItem(CUSTOMERS_KEY);
      if (!customers) {
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
      }
      const orders = localStorage.getItem(ORDERS_KEY);
      if (!orders) {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      }
      if (!localStorage.getItem(ACTIVE_CUSTOMER_KEY)) {
        localStorage.setItem(ACTIVE_CUSTOMER_KEY, 'C-1085');
      }
      if (!localStorage.getItem(LAST_SAVED_KEY)) {
        localStorage.setItem(LAST_SAVED_KEY, new Date().toISOString());
      }
    } catch (e) {
      console.error('LocalStorage init error:', e);
    }
  },

  getCustomers() {
    try {
      const raw = localStorage.getItem(CUSTOMERS_KEY);
      return raw ? JSON.parse(raw) : INITIAL_CUSTOMERS;
    } catch (e) {
      console.error('Error reading customers:', e);
      return INITIAL_CUSTOMERS;
    }
  },

  saveCustomers(customers) {
    try {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
      this.updateLastSaved();
      window.dispatchEvent(new Event('rehman_storage_change'));
      return true;
    } catch (e) {
      console.error('Error saving customers:', e);
      return false;
    }
  },

  getOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      return raw ? JSON.parse(raw) : INITIAL_ORDERS;
    } catch (e) {
      console.error('Error reading orders:', e);
      return INITIAL_ORDERS;
    }
  },

  saveOrders(orders) {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      this.updateLastSaved();
      window.dispatchEvent(new Event('rehman_storage_change'));
      return true;
    } catch (e) {
      console.error('Error saving orders:', e);
      return false;
    }
  },

  getActiveCustomerId() {
    return localStorage.getItem(ACTIVE_CUSTOMER_KEY) || 'C-1085';
  },

  setActiveCustomerId(id) {
    localStorage.setItem(ACTIVE_CUSTOMER_KEY, id);
    window.dispatchEvent(new Event('rehman_storage_change'));
  },

  getLastSavedTime() {
    const raw = localStorage.getItem(LAST_SAVED_KEY);
    if (!raw) return '11:43 AM';
    try {
      const d = new Date(raw);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '11:43 AM';
    }
  },

  updateLastSaved() {
    localStorage.setItem(LAST_SAVED_KEY, new Date().toISOString());
  },

  resetPresets() {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
    localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(ACTIVE_CUSTOMER_KEY, 'C-1085');
    this.updateLastSaved();
    window.dispatchEvent(new Event('rehman_storage_change'));
  },

  exportBackup() {
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      shop: 'Rehman Tailors - Bespoke Atelier',
      customers: this.getCustomers(),
      orders: this.getOrders()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `rehman_tailors_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || !Array.isArray(parsed.customers) || !Array.isArray(parsed.orders)) {
        throw new Error('Invalid backup file structure. Customers or Orders missing.');
      }
      this.saveCustomers(parsed.customers);
      this.saveOrders(parsed.orders);
      if (parsed.customers.length > 0) {
        this.setActiveCustomerId(parsed.customers[0].id);
      }
      return { success: true, count: parsed.customers.length };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  clearAll() {
    localStorage.removeItem(CUSTOMERS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(ACTIVE_CUSTOMER_KEY);
    localStorage.removeItem(LAST_SAVED_KEY);
    window.dispatchEvent(new Event('rehman_storage_change'));
  }
};
