import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { PlayerContext } from '../context/playerContext';
import Animated, {useAnimatedStyle, useSharedValue, withTiming, withSequence, FadeOut} from 'react-native-reanimated';




const OpenGift = forwardRef(({onTookObject, giftObject},ref) =>{
    //animacio
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform: [{scale: scale.value}],
        };
    }, []);

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
    image: {
        width: '100%',
        height: '100%', 
    },
});

export default OpenGift;