import { useEffect, useState } from 'react';

interface UseUserInfoModalProps {
  initialName?: string;
  initialGender?: 'male' | 'female';
}

export function useUserInfoModal({ 
  initialName = '', 
  initialGender = 'male' 
}: UseUserInfoModalProps = {}) {
  const [name, setName] = useState(initialName);
  const [gender, setGender] = useState<'male' | 'female'>(initialGender);

  useEffect(() => {
    setName(initialName);
    setGender(initialGender);
  }, [initialName, initialGender]);

  const handleClose = (onClose: (name: string, gender: 'male' | 'female') => void) => {
    if (name.trim() && gender) {
      onClose(name.trim(), gender);
    }
  };

  return {
    name,
    setName,
    gender,
    setGender,
    handleClose,
  };
}
