/**
 * Customer Service for Rehman Tailors Atelier
 * Business logic layer abstracted away from direct LocalStorage calls.
 * All methods are asynchronous to enable direct future swap to REST API endpoints.
 */

import { storage } from './storage';
import { getNextCustomerId } from '../utils/idGenerator';

export const customerService = {
  async getCustomers() {
    return storage.getCustomers();
  },

  async getCustomerById(id) {
    const customers = storage.getCustomers();
    return customers.find(c => c.id === id) || null;
  },

  async checkPhoneDuplicate(phone, excludeId = null) {
    if (!phone || phone.trim().length < 5) return null;
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    const customers = storage.getCustomers();
    
    return customers.find(c => {
      if (excludeId && c.id === excludeId) return false;
      const otherPhone = (c.phone || '').replace(/[\s\-\+]/g, '');
      return otherPhone && (otherPhone === cleanPhone || otherPhone.endsWith(cleanPhone) || cleanPhone.endsWith(otherPhone));
    }) || null;
  },

  async createCustomer(data) {
    const customers = storage.getCustomers();
    const newId = data.id || getNextCustomerId(customers);
    
    const now = new Date().toISOString();
    const newCustomer = {
      id: newId,
      name: (data.name || 'New Client').trim(),
      phone: (data.phone || '').trim(),
      address: (data.address || '').trim(),
      city: (data.city || 'Islamabad').trim(),
      garmentType: data.garmentType || 'Traditional Perahan',
      status: data.status || 'Measuring',
      draftingFee: Number(data.draftingFee) || 0,
      advance: Number(data.advance) || 0,
      remaining: Math.max(0, (Number(data.draftingFee) || 0) - (Number(data.advance) || 0)),
      dueDate: data.dueDate || '',
      notes: data.notes || '',
      createdAt: now,
      updatedAt: now,
      measurements: data.measurements || {
        unit: 'IN',
        qad: '40.00',
        asteen: '24.00',
        shana: '18.00',
        yakhan: '16.00',
        baghal: '23.00',
        daman: '26.00',
        qadTanban: '38.00',
        pacha: '9.00',
        neck: '16.00',
        waist: '36.00',
        hip: '40.00',
        armHole: '9.50',
        bicep: '15.00',
        wrist: '8.50',
        ghera: '27.00',
        kameezLength: '40.00',
        shalwarLength: '38.00'
      },
      designs: data.designs || {
        collarStyle: 'Gol',
        cuffStyle: 'Kaf-dar',
        pocketStyle: 'Pocket',
        damanStyle: 'Round'
      }
    };

    const updatedList = [newCustomer, ...customers];
    storage.saveCustomers(updatedList);
    storage.setActiveCustomerId(newCustomer.id);
    return newCustomer;
  },

  async updateCustomer(id, data) {
    const customers = storage.getCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Customer with ID ${id} not found.`);
    }

    const current = customers[index];
    const draftingFee = data.draftingFee !== undefined ? Number(data.draftingFee) : current.draftingFee;
    const advance = data.advance !== undefined ? Number(data.advance) : current.advance;
    const remaining = Math.max(0, draftingFee - advance);

    const updatedCustomer = {
      ...current,
      ...data,
      id: current.id, // Strictly preserve original ID
      draftingFee,
      advance,
      remaining,
      updatedAt: new Date().toISOString()
    };

    customers[index] = updatedCustomer;
    storage.saveCustomers(customers);
    return updatedCustomer;
  },

  async deleteCustomer(id) {
    const customers = storage.getCustomers();
    const filtered = customers.filter(c => c.id !== id);
    storage.saveCustomers(filtered);

    // Also delete associated orders
    const orders = storage.getOrders();
    const filteredOrders = orders.filter(o => o.customerId !== id);
    storage.saveOrders(filteredOrders);

    if (storage.getActiveCustomerId() === id) {
      const nextActive = filtered.length > 0 ? filtered[0].id : '';
      storage.setActiveCustomerId(nextActive);
    }
    return true;
  },

  async searchCustomers(query) {
    const customers = storage.getCustomers();
    if (!query || !query.trim()) return customers;

    const q = query.trim().toLowerCase();
    const cleanNumQuery = q.replace(/[\s\-\+]/g, '');

    return customers.filter(c => {
      const idMatch = c.id.toLowerCase().includes(q);
      const nameMatch = (c.name || '').toLowerCase().includes(q);
      const phoneClean = (c.phone || '').replace(/[\s\-\+]/g, '').toLowerCase();
      const phoneMatch = phoneClean.includes(cleanNumQuery);
      return idMatch || nameMatch || phoneMatch;
    });
  }
};
