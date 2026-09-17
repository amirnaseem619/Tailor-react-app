import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { storage } from '../services/storage';
import { customerService } from '../services/customerService';
import { orderService } from '../services/orderService';
import { getNextCustomerId } from '../utils/idGenerator';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeCustomerId, setActiveCustomerId] = useState('');
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterTab, setSelectedFilterTab] = useState('ALL');
  const [lastSavedTime, setLastSavedTime] = useState('11:43 AM');
  const [toasts, setToasts] = useState([]);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [stats, setStats] = useState({
    activeClientsCount: 0,
    activeLedgersCount: 0,
    draftsCutToday: 3,
    ledgerTotal: 0,
    totalOrdersCount: 0
  });

  // Toast dispatch
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Reload data from storage
  const refreshData = useCallback(async () => {
    storage.init();
    const custs = await customerService.getCustomers();
    const ords = await orderService.getOrders();
    const currentActiveId = storage.getActiveCustomerId();

    setCustomers(custs);
    setOrders(ords);
    setLastSavedTime(storage.getLastSavedTime());

    let target = custs.find(c => c.id === currentActiveId);
    if (!target && custs.length > 0) {
      target = custs[0];
      storage.setActiveCustomerId(target.id);
    }
    setActiveCustomerId(target ? target.id : '');
    setActiveCustomer(target ? JSON.parse(JSON.stringify(target)) : null);

    const calculatedStats = await orderService.getAtelierStats();
    setStats(calculatedStats);
  }, []);

  useEffect(() => {
    refreshData();

    const handleStorageChange = () => {
      refreshData();
    };

    window.addEventListener('rehman_storage_change', handleStorageChange);
    return () => {
      window.removeEventListener('rehman_storage_change', handleStorageChange);
    };
  }, [refreshData]);

  // Select customer into active bench
  const selectCustomer = useCallback((customerOrId) => {
    const id = typeof customerOrId === 'string' ? customerOrId : customerOrId?.id;
    if (!id) return;
    const target = customers.find(c => c.id === id);
    if (target) {
      setActiveCustomerId(target.id);
      setActiveCustomer(JSON.parse(JSON.stringify(target)));
      storage.setActiveCustomerId(target.id);
      showToast(`Loaded ${target.name} (#${target.id}) to drafting bench`);
    }
  }, [customers, showToast]);

  // Initiate New Client
  const startNewClient = useCallback(() => {
    const nextId = getNextCustomerId(customers);
    const newRecord = {
      id: nextId,
      name: '',
      phone: '',
      address: '',
      city: 'Islamabad',
      garmentType: 'Traditional Perahan',
      status: 'Measuring',
      draftingFee: 2400,
      advance: 1000,
      remaining: 1400,
      dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      notes: '',
      isNew: true,
      measurements: {
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
      designs: {
        collarStyle: 'Gol',
        cuffStyle: 'Kaf-dar',
        pocketStyle: 'Pocket',
        damanStyle: 'Round'
      }
    };

    setActiveCustomer(newRecord);
    setActiveCustomerId(newRecord.id);
    showToast(`Draft ticket #${nextId} generated. Ready for client measurements.`);
  }, [customers, showToast]);

  // Save active customer and measurement ledger
  const saveActiveCustomer = useCallback(async (updatedRecord) => {
    if (!updatedRecord) return false;

    if (!updatedRecord.name || !updatedRecord.name.trim()) {
      showToast('Please enter client full name.', 'error');
      return false;
    }

    try {
      const exists = customers.some(c => c.id === updatedRecord.id);
      let saved;
      if (exists && !updatedRecord.isNew) {
        saved = await customerService.updateCustomer(updatedRecord.id, updatedRecord);
        showToast(`✓ Client #${saved.id} record & measurements updated successfully`);
      } else {
        const { isNew, ...rest } = updatedRecord;
        saved = await customerService.createCustomer(rest);
        showToast(`✓ New Client #${saved.id} (${saved.name}) saved successfully`);
      }

      await refreshData();
      return true;
    } catch (err) {
      console.error(err);
      showToast('Error saving record: ' + err.message, 'error');
      return false;
    }
  }, [customers, refreshData, showToast]);

  // Delete customer
  const deleteCustomer = useCallback(async (id) => {
    try {
      await customerService.deleteCustomer(id);
      showToast(`Customer #${id} permanently deleted.`);
      await refreshData();
      return true;
    } catch (err) {
      showToast('Failed to delete customer: ' + err.message, 'error');
      return false;
    }
  }, [refreshData, showToast]);

  // Reset Presets
  const handleReloadPresets = useCallback(() => {
    storage.resetPresets();
    refreshData();
    showToast('Atelier presets reloaded to original specifications.');
  }, [refreshData, showToast]);

  // Filtered customers for search & tabs
  const filteredCustomers = useMemo(() => {
    let list = customers;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const cleanNumQuery = q.replace(/[\s\-\+]/g, '');

      list = list.filter(c => {
        const idMatch = (c.id || '').toLowerCase().includes(q);
        const nameMatch = (c.name || '').toLowerCase().includes(q);
        const phoneClean = (c.phone || '').replace(/[\s\-\+]/g, '').toLowerCase();
        const phoneMatch = phoneClean.includes(cleanNumQuery);
        return idMatch || nameMatch || phoneMatch;
      });
    }

    // Status Tab filter
    if (selectedFilterTab !== 'ALL') {
      list = list.filter(c => (c.status || '').toUpperCase() === selectedFilterTab);
    }

    return list;
  }, [customers, searchQuery, selectedFilterTab]);

  return (
    <AppContext.Provider
      value={{
        customers,
        orders,
        activeCustomerId,
        activeCustomer,
        setActiveCustomer,
        selectCustomer,
        startNewClient,
        saveActiveCustomer,
        deleteCustomer,
        searchQuery,
        setSearchQuery,
        selectedFilterTab,
        setSelectedFilterTab,
        filteredCustomers,
        lastSavedTime,
        stats,
        refreshData,
        handleReloadPresets,
        toasts,
        showToast,
        removeToast,
        isPrintModalOpen,
        setIsPrintModalOpen,
        isBackupModalOpen,
        setIsBackupModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
