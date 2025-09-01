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

  const increaseBalance = useCallback(async (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    try {
      await AsyncStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(newBalance));
    } catch (error) {
      console.error('Failed to save currency balance.', error);
    }
  }, [balance]);

  return { balance, increaseBalance, isLoading };
};
