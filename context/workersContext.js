import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const WorkersContext = createContext();

export const WorkersProvider = ({ children }) => {

    const upgrades = [
        {
            cost: 1,
            multiplyingFactor: 5
        },
        {
            cost: 5000,
            multiplyingFactor: 5
        },
        {
            cost: 25000,
            multiplyingFactor: 8
        },
        {
            cost: 750,
            multiplyingFactor: 2
        },
        {
            cost: 750,
            multiplyingFactor: 2
        },
        {
            cost: 750,
            multiplyingFactor: 2
        },
        {
            cost: 750,
            multiplyingFactor: 2
        },
        {
            cost: 750,
            multiplyingFactor: 2
        },
        {
            cost: 750,
            multiplyingFactor: 2
        }
    ]

    const createWorker = (price,name,image) =>{
        return {
            price: price,
            bought: false,
            working: false,
            id: uuidv4(),
            level: 0,
            workingPlace: null, // id d'on esta treballant
            clicksPerSecond: 2,
            upgrades: upgrades,
            name: name,
            img: image
        }
    }

    const initialWorkers = [
        createWorker(1,'Antonio',require('../assets/worker1.png')),
        createWorker(3000,'Manolito',require('../assets/worker1.png')),
        createWorker(50000,'Jesus',require('../assets/worker1.png')),
        createWorker(10000000,'Eustaquio',require('../assets/worker1.png'))
    ];

    const [workers, setWorkers] = useState(initialWorkers);

    return (
        <WorkersContext.Provider value={{ workers, setWorkers }}>
        {children}
        </WorkersContext.Provider>
    );
};