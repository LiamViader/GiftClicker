import React, { createContext, useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WorkersContext = createContext();

export const WorkersProvider = ({ children }) => {

    const upgrades = [
        {
            cost: 20,
            multiplyingFactor: 5
        },
        {
            cost: 50,
            multiplyingFactor: 5
        },
        {
            cost: 300,
            multiplyingFactor: 8,
            evolution: true,
            evolutionImage: require('../assets/worker2.png')
        },
        {
            cost: 1000,
            multiplyingFactor: 2
        },
        {
            cost: 2000,
            multiplyingFactor: 5,
            evolution: true,
            evolutionImage: require('../assets/worker3.png')
        },
        {
            cost: 1000,
            multiplyingFactor: 6
        },
        {
            cost: 5000,
            multiplyingFactor: 7
        },
        {
            cost: 20000,
            multiplyingFactor: 3
        },
        {
            cost: 50000,
            multiplyingFactor: 10
        }
    ]

    const createWorker = (price,initialClicksPerSecond,name,image) =>{
        return {
            price: price,
            bought: false,
            id: uuid.v4(),
            level: 0,
            workingPlace: null, // id d'on esta treballant
            clicksPerSecond: initialClicksPerSecond,
            upgrades: upgrades,
            name: name,
            img: image,
            giftRange: 1 // quants regals pot obrir al mateix temps
        }
    }

    const initialWorkers = [
        createWorker(10,2,'Antonio',require('../assets/worker1.png')),
        createWorker(200,10,'Manolito',require('../assets/worker1.png')),
        createWorker(1000,100,'Jesus',require('../assets/worker1.png')),
        createWorker(10000,500,'Eustaquio',require('../assets/worker1.png'))
    ];

    const [workers, setWorkers] = useState(initialWorkers);

    //Al iniciar carrego dades guardades locals en cas que n'hi hagin
    useEffect(() => {
        const loadWorkers = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@workers');
            if (jsonValue != null) {
                const savedWorkers = JSON.parse(jsonValue);

                const updatedWorkers = savedWorkers.map(worker => ({
                    ...worker,
                    workingPlace: null, //per a que no apareguin treballant ja que sino l'animacio no va
                }));
                setWorkers(updatedWorkers);
            }
        } catch (e) {
            console.error("Error loading workers from AsyncStorage:", e);
        }
        };
        loadWorkers();
    }, []);

    useEffect(() => { // guardo les dades en local cada cop que s'actualitza workers
        const saveWorkers = async () => {
          try {
            const jsonValue = JSON.stringify(workers);
            await AsyncStorage.setItem('@workers', jsonValue);
          } catch (e) {
            console.error("Error saving workers to AsyncStorage:", e);
          }
        };
    
        saveWorkers();
    }, [workers]);

    return (
        <WorkersContext.Provider value={{ workers, setWorkers }}>
        {children}
        </WorkersContext.Provider>
    );
};