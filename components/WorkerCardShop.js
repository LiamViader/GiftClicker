import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import formatNumber from '../utils/formatNumbers';

const WorkerCardShop = ({ worker, onPressed, buttonText }) => {
    const [pressed, setPressed] = useState(false); 
    const handlePressIn = () => {
        setPressed(true); 
    };

    const handlePressOut = () => {
        setPressed(false); 
    };

    const handlePress = () => {
        if (buttonText === 'Buy') onPressed(worker.id,worker.price); 
        else onPressed(worker.id,worker.upgrades[worker.level].cost); 
    };

    return (
        <View style={styles.card}>
            <Image source={worker.img} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{worker.name}</Text>
            {buttonText === 'Buy' ?
            <Text style={styles.price}>
                Price: ${formatNumber(worker.price)}
            </Text>
            :
            <Text style={styles.price}>
                Price: ${formatNumber(worker.upgrades[worker.level].cost)}
            </Text>
            }
            {buttonText === 'Buy' ?
                <Text style={styles.clicksPerSecond}>Clicks/s: {formatNumber(worker.clicksPerSecond)}</Text>
            :
                <Text style={styles.clicksPerSecond}>Clicks/s: {formatNumber(worker.clicksPerSecond)} {' -> '} {formatNumber(worker.upgrades[worker.level].multiplyingFactor*worker.clicksPerSecond)}</Text>
            }
            {buttonText === 'Buy' ?
                <Text style={styles.level}>Level: {worker.level} </Text>
            :
                <Text style={styles.level}>Level: {worker.level} {' -> '} {worker.level+1} </Text>
            }
            <Pressable 
                style={[styles.button, pressed && styles.buttonPressed]} 
                onPressIn={handlePressIn} 
                onPressOut={handlePressOut} 
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#2C2C2E',
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center', 
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E5E5E7', 
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#4CAF50', 
        marginBottom: 3,
    },
    clicksPerSecond: {
        fontSize: 16,
        color: '#61DAFB', 
        marginBottom: 3,
    },
    level: {
        fontSize: 16,
        color: '#FF9F1C',
    },
    button: {
        backgroundColor: '#2196f3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonPressed: {
        backgroundColor: '#64b5f6', 
        opacity: 0.85,
    },
});

export default WorkerCardShop;