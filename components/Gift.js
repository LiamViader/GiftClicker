import { View, StyleSheet, Text, Pressable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { PlayerContext } from '../context/playerContext';
import Animated, {useAnimatedStyle, useSharedValue, withTiming, withSequence, closedGiftFadeOut} from 'react-native-reanimated';

import ClosedGift from './ClosedGift';
import OpenGift from './OpenGift';

const Gift = ({ id, color, initialClicksToOpen, onDelete, giftObject }) => {

  //animacio
  const closedGiftScale = useSharedValue(1);
  const closedGiftFadeOut = useSharedValue(1);

  const openGiftFadeOut = useSharedValue(1);

  const openGiftScale = useSharedValue(0);
  const openGiftTranslateY = useSharedValue(0);

  const animatedClosedGiftStyle = useAnimatedStyle(()=>{
    return {
      transform: [{scale: closedGiftScale.value}],
      opacity: closedGiftFadeOut.value,
    };
  }, []);


  const animatedOpenGiftStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: openGiftScale.value},
        {translateY: openGiftTranslateY.value }
      ],
      opacity: openGiftFadeOut.value,
    };
  });

  const AnimatedClosedGift = Animated.createAnimatedComponent(ClosedGift);
  const AnimatedOpenGift = Animated.createAnimatedComponent(OpenGift);

  //logica
  const [opened, setOpened] = useState(false);

  const { playerStats, setPlayerStats } = useContext(PlayerContext);

  const handleOpen = () => {
    closedGiftScale.value = withTiming(closedGiftScale.value + 1, { duration: 500 });
    closedGiftFadeOut.value = withTiming(0, { duration: 500 }, () => {
      setOpened(true);
      openGiftScale.value = withTiming(1, { duration: 500 });
    });
  }

  const handleTookObject = () =>{
    console.log(playerStats);
    const updatedStats = giftObject.onOpen(playerStats);
    console.log(giftObject);
    console.log(updatedStats);
    setPlayerStats(updatedStats);
    openGiftFadeOut.value = withTiming(0, { duration: 100 });
    openGiftTranslateY.value = withTiming(-100, { duration: 250 }, () => {
      onDelete(id);
    });
  }

  return (
    <View style={styles.container}>
      {opened 
        ? 
        <AnimatedOpenGift style={[animatedOpenGiftStyle]} onTookObject={handleTookObject} giftObject={giftObject}/>
        :
        <AnimatedClosedGift style={[animatedClosedGiftStyle]} color={color} initialClicksToOpen={initialClicksToOpen} onOpen={handleOpen}/>
      }
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: 'center',
  },
});

export default Gift;