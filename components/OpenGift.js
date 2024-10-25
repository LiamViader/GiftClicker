import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { PlayerContext } from '../context/playerContext';
import Animated, {useAnimatedStyle, useSharedValue, withTiming, withSequence, FadeOut} from 'react-native-reanimated';




const OpenGift = forwardRef(({onTookObject, giftObject},ref) =>{


    //logica

    const { playerStats } = useContext(PlayerContext);


    const handlePress = () => {
        onTookObject();
    };



    return (
        <Pressable ref={ref} onPress={handlePress} style={styles.container}>
            <Image
                source={giftObject.img}
                style={styles.image} 
                resizeMode="contain"
            />
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%', 
    },
});

export default OpenGift;