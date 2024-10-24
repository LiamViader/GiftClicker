import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Gift from './Gift';

import Animated, {  LinearTransition, JumpingTransition } from 'react-native-reanimated';
import { getRandomObject } from '../data/giftObjects';

// Representa una linea de regals
const GiftLine = ({ color, numGifts, clicksToOpen, tier }) => {

  const [giftsData, setGiftsData] = useState([]);

  const initializeGifts = () => {
    const newGiftsData = Array.from({ length: numGifts }, () => ({
      id: uuidv4(), // Generar un id unic amb uuid perque react native pugui mantenir localitzat el objecte per temes de renderitzat
      color: color,
      giftObject: getRandomObject(tier),
    }));
    setGiftsData(newGiftsData);
  };

  useEffect(() => {
    initializeGifts();
  }, []);

  const handleDeleteGift = (id) =>{
    setGiftsData((prevGiftsData) => {
      const updatedGifts = prevGiftsData.filter(gift => gift.id !== id);
      newGift = {
        id: uuidv4(), 
        color: color,
        giftObject: getRandomObject(tier),
      }
      return [...updatedGifts, newGift];
    });
  }

  return (
    <Animated.FlatList 
      horizontal
      data={giftsData}
      renderItem={({ item }) => (
        <Gift 
          id={item.id}
          color={item.color} 
          initialClicksToOpen={clicksToOpen} 
          giftObject={item.giftObject}
          onDelete={handleDeleteGift}
        />
      )}
      keyExtractor={item => item.id}
      itemLayoutAnimation={JumpingTransition}
      contentContainerStyle={styles.contentContainer}
    />
  );
};


const styles = StyleSheet.create({
  contentContainer: {
    height: 80,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default GiftLine;