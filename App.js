import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import GiftLine from './components/GiftLine';
import { v4 as uuidv4 } from 'uuid';

import { PlayerProvider } from './context/playerContext';
import { WorkersProvider } from './context/workersContext';

import Shop from './components/Shop';
import PlayerStats from './components/PlayerStats';

export default function App() {


  const createGiftLine = (color, clicksToOpen) => {
    return {
      id: uuidv4(), // Genera un ID único
      color,
      clicksToOpen,
    };
  };



  const giftLines = [
      createGiftLine('#FF5733',20),
      createGiftLine('#33FF57',500),
      createGiftLine('#3357FF',10000),
      createGiftLine('#3357FF',100000),
      createGiftLine('#3357FF',1000000),
  ]


  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#FFBD33'];

  return (
    <PlayerProvider>
      <View style={styles.container}>
        <PlayerStats/>
        <WorkersProvider>
          <FlatList
            data={giftLines}
            renderItem={({ item, index }) => (
              <GiftLine 
                color={item.color} 
                numGifts={4} 
                clicksToOpen={item.clicksToOpen} 
                tier={index}
                giftLine={index}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
            style={styles.flatListContainer}
          />
          <Shop/>
        </WorkersProvider>
      </View>
    </PlayerProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  flatListContent: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
    justifyContent: 'space-around',
  },
});