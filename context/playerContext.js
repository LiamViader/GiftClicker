import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//per guardar estadístiques del jugador que vull que siguin compartides en molts components
export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerStats, setPlayerStats] = useState({
    clickDamage: 1,
    coins: 0,
  });

  //Al iniciar carrego dades guardades locals en cas que n'hi hagin
  useEffect(() => {
    const loadPlayerStats = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@playerStats');
        if (jsonValue != null) {
          setPlayerStats(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Error loading player stats from AsyncStorage:", e);
      }
    };
    loadPlayerStats();
  }, []);

  useEffect(() => { // guardo les dades en local cada cop que s'actualitza
    const savePlayerStats = async () => {
      try {
        const jsonValue = JSON.stringify(playerStats);
        await AsyncStorage.setItem('@playerStats', jsonValue);
      } catch (e) {
        console.error("Error saving player stats to AsyncStorage:", e);
      }
    };

    savePlayerStats();
  }, [playerStats]);

  return (
    <PlayerContext.Provider value={{ playerStats, setPlayerStats }}>
      {children}
    </PlayerContext.Provider>
  );
};