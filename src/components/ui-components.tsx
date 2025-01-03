import React from 'react';
import { Loader2 } from 'lucide-react';

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800', 
    warning: 'bg-yellow-100 text-yellow-800',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-200 text-gray-600',
    error: 'bg-red-100 text-red-800'
  };

  return (
    <span 
      role="status"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Card({ children, className = '', isLoading = false, error = null }) {
  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-4 ${className}`}>
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 rounded-lg border border-red-200 shadow-sm p-4 ${className}`}>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div 
      role="article"
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function Progress({ value = 0, className = '', label }) {
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div 
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
        className={`w-full bg-gray-200 rounded-full h-2 ${className}`}
      >
        <div
          className="bg-blue-600 rounded-full h-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export function Toast({ message, type = 'info', onClose }) {
  const types = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };

  return (
    <div 
      role="alert"
      className={`fixed bottom-4 right-4 p-4 rounded-lg border shadow-lg ${types[type]}`}
    >
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button 
          onClick={onClose}
          className="ml-4 hover:opacity-75"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function EmptyState({ message, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
      {Icon && <Icon className="w-12 h-12 mb-4" />}
      <p>{message}</p>
    </div>
  );
}