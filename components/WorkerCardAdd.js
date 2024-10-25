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
    clicksPerSecond: {
        fontSize: 16,
        color: '#61DAFB', 
        marginBottom: 3,
    },
    level: {
        fontSize: 16,
        color: '#FF9F1C', 
    },
});

export default WorkerCardAdd;