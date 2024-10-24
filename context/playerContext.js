import React, { createContext, useState } from 'react';

//per guardar estadístiques del jugador que vull que siguin compartides en molts components
export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerStats, setPlayerStats] = useState({
    clickDamage: 1,
    coins: 0,
  });

  return (
    <PlayerContext.Provider value={{ playerStats, setPlayerStats }}>
      {children}
    </PlayerContext.Provider>
  );
};