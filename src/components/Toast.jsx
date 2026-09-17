import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => {
        let Icon = CheckCircle;
        let className = 'toast';
        if (t.type === 'error') {
          Icon = AlertCircle;
          className = 'toast toast-error';
        } else if (t.type === 'warning') {
          Icon = AlertTriangle;
          className = 'toast toast-warning';
        }

        return (
          <div key={t.id} className={className}>
            <Icon size={16} />
            <span>{t.message}</span>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'currentColor',
                cursor: 'pointer',
                marginLeft: '8px',
                opacity: 0.8
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
