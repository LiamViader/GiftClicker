import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import formatNumber from '../utils/formatNumbers';

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
                    {formatNumber(playerStats.clickDamage)}
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
                    {formatNumber(playerStats.coins)}
                </Text>
            </View>
          </View>
        </View>
    );
}

export default PlayerStats;


const styles = StyleSheet.create({
    playerStats: {
        height: 60,
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: '5%', 
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#1C1C1E', 
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000', 
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 6, 
        marginBottom: 25,
    },
    damageStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 8,
    },
    text: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: '600',
    },
    image: {
        width: 25,
        height: 25,
    },
});