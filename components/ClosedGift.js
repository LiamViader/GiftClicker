import { View, StyleSheet, Text, Pressable } from 'react-native';
import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { PlayerContext } from '../context/playerContext';
import Animated, {useAnimatedStyle, useSharedValue, withTiming, withSequence, FadeOut} from 'react-native-reanimated';




const ClosedGift = forwardRef(({initialClicksToOpen, color, onOpen},ref) =>{
    //animacio
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform: [{scale: scale.value}],
        };
    }, []);

    //logica
    const [clicksLeft, setClicksLeft] = useState(initialClicksToOpen);
    const [canPress, setCanPress] = useState(true);

    const { playerStats } = useContext(PlayerContext);

    const substractClicksLeft = (clicksToSubstract) =>{
        setClicksLeft((prevClicksLeft) => {
          if (prevClicksLeft - clicksToSubstract > 0) {
            return prevClicksLeft - clicksToSubstract;
          } else {
            setCanPress(false);
            onOpen();
            return 0;
          }
        });
    };


    const handlePress = () => {
        if (canPress){
            scale.value=1;
            scale.value = withSequence(
                withTiming(scale.value + 0.2, { duration: 200 }), //Es fa gran
                withTiming(1, { duration: 200 }) //torna al tamany original
            );
            substractClicksLeft(playerStats.clickDamage);
        }
    };
    return (
        <Pressable ref={ref} onPress={handlePress} style={styles.container}>
            <Animated.View style={[styles.gift, animatedStyle, { backgroundColor: color }]}>
            <Text style={styles.text}>{clicksLeft}</Text>
            </Animated.View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gift: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: '90%'
    },
});

export default ClosedGift;