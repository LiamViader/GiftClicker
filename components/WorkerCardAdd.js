import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const WorkerCardAdd = ({ worker, onPressed,}) => {
    const handleAdded = () =>{
        onPressed(worker.id);
    }
    return (
        <Pressable style={styles.card} onPress={handleAdded}>
            <Image source={worker.img} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{worker.name}</Text>
            <Text style={styles.clicksPerSecond}>Clicks/s: {worker.clicksPerSecond}</Text>
            <Text style={styles.level}>Level: {worker.level}</Text>
        </Pressable>
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
    clicksPerSecond: {
        fontSize: 16,
        color: 'blue',
    },
    level: {
        fontSize: 16,
        color: 'orange',
    },
});

export default WorkerCardAdd;