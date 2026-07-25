import { useCallback, useState } from 'react';

export function useRulesAgreement(onAgree: () => void) {
  const [accepted, setAccepted] = useState(false);

  const toggleAccepted = useCallback(() => {
    setAccepted(prev => !prev);
  }, []);

  const handleAgree = useCallback(() => {
    if (accepted) {
      onAgree();
    }
  }, [accepted, onAgree]);

  return {
    accepted,
    toggleAccepted,
    handleAgree,
  };
}
