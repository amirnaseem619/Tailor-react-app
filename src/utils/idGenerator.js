/**
 * ID Generator utilities for Rehman Tailors Atelier
 * Ensures continuous, unique customer and order IDs
 */

export function getNextCustomerId(existingCustomers = []) {
  if (!existingCustomers || existingCustomers.length === 0) {
    return 'C-1001';
  }

  let maxNum = 1000;
  for (const c of existingCustomers) {
    if (c && c.id && typeof c.id === 'string') {
      const match = c.id.match(/^C-(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    }
  }

  const nextNum = maxNum + 1;
  return `C-${nextNum}`;
}

export function getNextOrderId(existingOrders = []) {
  if (!existingOrders || existingOrders.length === 0) {
    return 'ORD-1001';
  }

  let maxNum = 1000;
  for (const o of existingOrders) {
    if (o && o.id && typeof o.id === 'string') {
      const match = o.id.match(/^ORD-(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    }
  }

  const nextNum = maxNum + 1;
  return `ORD-${nextNum}`;
}

export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-PK')}`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}
