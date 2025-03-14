import { useState, useCallback } from 'react';

export function useLoading(initialState = false) {
  const [isLoading, setLoading] = useState(initialState);
  
  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoading
  };
}