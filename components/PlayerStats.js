import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';


import { PlayerContext } from '../context/playerContext';




const PlayerStats = () =>{


    const { playerStats, setPlayerStats } = useContext(PlayerContext);


    return (
        <View style={styles.playerStats}>
          <View style={styles.damageStats}>
            <Image
                source={require('../assets/knife.png')}
                style={styles.image} 
                resizeMode="contain"
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {playerStats.clickDamage}
                </Text>
            </View>

          </View>
          <View style={styles.coinStats}>
            <Image
                source={require('../assets/goldCoin.png')}
                style={styles.image} 
                resizeMode="contain"
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {playerStats.coins}
                </Text>
            </View>
          </View>
        </View>
    );
}

export default PlayerStats;


const styles = StyleSheet.create({
    playerStats: {
        height: '7%',
        flexDirection: 'row',
    },
    damageStats: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center', // Centra verticalmente
    },
    coinStats: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center', // Centra verticalmente
    },
    textContainer: {
        color: 'black', 
        marginRight: 'auto'
        
    },
    text: {
        fontSize: 30,
        
    },
    image: {
        width: '50%',
        height: '50%',
    },
});