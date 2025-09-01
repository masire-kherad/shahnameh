import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENCY_STORAGE_KEY = '@currency_balance';

export const useCurrency = () => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem(CURRENCY_STORAGE_KEY);
        if (storedBalance !== null) {
          setBalance(JSON.parse(storedBalance));
        }
      } catch (error) {
        console.error('Failed to load currency balance.', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBalance();
  }, []);

  const increaseBalance = useCallback((amount: number) => {
    setBalance(prevBalance => {
      const newBalance = prevBalance + amount;
      AsyncStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(newBalance)).catch(error => {
        console.error('Failed to save currency balance.', error);
      });
      return newBalance;
    });
  }, []);

  return { balance, increaseBalance, isLoading };
};
