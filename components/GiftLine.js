import React, { useState, useEffect,useContext } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import Gift from './Gift';

import Animated, {  LinearTransition } from 'react-native-reanimated';
import { getRandomObject } from '../data/giftObjects';
import WorkerPlace from './WorkerPlace';
import { WorkersContext } from '../context/workersContext';


// Representa una linea de regals
const GiftLine = ({ color, numGifts, clicksToOpen, tier, giftLine }) => {

  const [giftsData, setGiftsData] = useState([]);

  const initializeGifts = () => {
    const newGiftsData = Array.from({ length: numGifts }, () => ({
      id: uuid.v4(), // Generar un id unic amb uuid perque react native pugui mantenir localitzat el objecte per temes de renderitzat
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
        id: uuid.v4(), 
        color: color,
        giftObject: getRandomObject(tier),
      }
      return [...updatedGifts, newGift];
    });
  }

  const { workers } = useContext(WorkersContext); 
  const [currentWorker,setCurrentWorker] = useState(null);

  useEffect(() => {
    if (workers) {
        const worker = workers.find(worker => worker.workingPlace === giftLine) || null;
        setCurrentWorker(worker);
    }
}, [workers]);



  return (
    <View style={styles.fatherContainer}>
      <WorkerPlace workingPlace={giftLine}/>
      <Animated.FlatList 
        horizontal
        data={giftsData}
        renderItem={({ item, index }) => (
          <Gift 
            id={item.id}
            color={item.color} 
            initialClicksToOpen={clicksToOpen} 
            giftObject={item.giftObject}
            onDelete={handleDeleteGift}
            {...(index < currentWorker?.giftRange ? { worker: currentWorker } : {worker: null})}
          />
        )}
        keyExtractor={item => item.id}
        itemLayoutAnimation={LinearTransition}
        contentContainerStyle={styles.contentContainerFlatlist}
      />
    </View>
    
  );
};


const styles = StyleSheet.create({
  fatherContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    width: '95%',
    alignSelf: 'center',
    height: 80,
  },
  contentContainerFlatlist: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GiftLine;