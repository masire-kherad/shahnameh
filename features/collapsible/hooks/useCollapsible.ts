import { useState } from 'react';

export function useCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((value) => !value);

  return {
    isOpen,
    toggle,
  };
}
