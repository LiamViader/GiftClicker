import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import GiftLine from './components/GiftLine';
import uuid from 'react-native-uuid';

import { PlayerProvider } from './context/playerContext';
import { WorkersProvider } from './context/workersContext';

import Shop from './components/Shop';
import PlayerStats from './components/PlayerStats';




export default function App() {


  const createGiftLine = (color, clicksToOpen) => {
    return {
      id: uuid.v4(), // Genera un ID único
      color,
      clicksToOpen,
    };
  };



  const giftLines = [
      createGiftLine('#FF5733',20),
      createGiftLine('#33FF57',500),
      createGiftLine('#3357FF',10000),
      createGiftLine('#33A1FF',100000),
      createGiftLine('#FFD133',1000000),
  ]


  return (
    <PlayerProvider>


      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            GiftClicker
          </Text>
        </View>
        <PlayerStats/>
        <WorkersProvider>
          <FlatList
            data={giftLines}
            renderItem={({ item, index }) => (
              <GiftLine 
                color={item.color} 
                numGifts={15} 
                clicksToOpen={item.clicksToOpen} 
                tier={index}
                giftLine={index}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
            style={styles.flatListContainer}
          />
          <View style={styles.spacing}></View>
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
    flexGrow: 1,
    backgroundColor: 'rgb(240,240,240)',
    justifyContent: 'center',
    marginBottom: 20,
    paddingBottom: 20
  },
  title: {
    fontSize: 50,
    textAlign: 'center'
  },
  titleContainer: {
    display: 'flex',
    padding: 20,
  },
  spacing: {
    height: 50,
  }
});