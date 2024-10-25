import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

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
                Price: ${worker.price}
            </Text>
            :
            <Text style={styles.price}>
                Price: ${worker.upgrades[worker.level].cost}
            </Text>
            }
            {buttonText === 'Buy' ?
                <Text style={styles.clicksPerSecond}>Clicks/s: {worker.clicksPerSecond}</Text>
            :
                <Text style={styles.clicksPerSecond}>Clicks/s: {worker.clicksPerSecond} {' -> '} {worker.upgrades[worker.level].multiplyingFactor*worker.clicksPerSecond}</Text>
            }
            <Text style={styles.level}>Level: {worker.level}</Text>
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
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        color: 'green',
    },
    clicksPerSecond: {
        fontSize: 16,
        color: 'blue',
    },
    level: {
        fontSize: 16,
        color: 'orange',
    },
    button: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonPressed: {
        backgroundColor: '#FF3300', 
        opacity: 0.7, 
    },
});

export default WorkerCardShop;