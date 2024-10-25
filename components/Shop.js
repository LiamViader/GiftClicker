import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Modal, Button, SectionList } from 'react-native';
import { WorkersContext } from '../context/workersContext';
import WorkerCardShop from './WorkerCardShop';
import { PlayerContext } from '../context/playerContext';

const Shop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };


    const { workers, setWorkers } = useContext(WorkersContext);
    const { playerStats, setPlayerStats } = useContext(PlayerContext);

    const [items,setItems] = useState([{title:'', data: ''}]);

    //s'executa quan workers canvia
    useEffect(() => {
        if (workers){
            upgrades=workers.filter(worker => worker.bought === true);
            buyWorkers=workers.filter(worker => worker.bought === false);
            shopItems=[
                {
                    title: 'Upgrade Workers',
                    data: upgrades
                },
                {
                    title: 'Buy Workers',
                    data: buyWorkers
                }
            ];
            setItems(shopItems);
        }

    }, [workers]);

    const handleBuyWorker = (id,price) =>{
        if (playerStats.coins>=price){
            setWorkers((prevWorkers) => {
                return prevWorkers.map(worker=>{
                    if (worker.id === id) {
                        return { ...worker, bought: true };
                    }
                    return worker;
                })
            });
            setPlayerStats((prevPlayerStats) =>{
                return {...prevPlayerStats, coins:prevPlayerStats.coins-price};
            });
        }
    }

    const handleUpgradeWorker = (id,price) =>{
        if (playerStats.coins>=price){
            setWorkers((prevWorkers) => {
                return prevWorkers.map(worker=>{
                    if (worker.id === id) {
                        return { ...worker, clicksPerSecond:worker.upgrades[worker.level].multiplyingFactor*worker.clicksPerSecond, level: worker.level+1 };
                    }
                    return worker;
                })
            });
            setPlayerStats((prevPlayerStats) =>{
                return {...prevPlayerStats, coins:prevPlayerStats.coins-price};
            });
        }

    }


    return (
        <>
            <View style={styles.container}>
                <Pressable style={styles.shopButton} onPress={toggleModal}>
                    <Text style={styles.buttonText}>Store</Text>
                </Pressable>
            </View>

            <Modal
                transparent={true}
                visible={isVisible}
                animationType="slide"
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Store</Text>
                        <SectionList
                            sections={items}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item, section }) => (
                                <WorkerCardShop 
                                    worker={item}
                                    onPressed={section.title === 'Upgrade Workers' ? handleUpgradeWorker : handleBuyWorker}
                                    buttonText={section.title === 'Upgrade Workers' ? 'Upgrade' : 'Buy'}
                                />
                            )}
                            renderSectionHeader={({ section: { title } }) => (
                                <View style={styles.header}>
                                <Text style={styles.headerText}>{title}</Text>
                                </View>
                            )}
                        />
                        <Button title="Close" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    shopButton: {
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        height: '70%',
        backgroundColor: 'white',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    header: {
        padding: 8,
        backgroundColor: '#f4f4f4',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24
    },
    item: {
        padding: 10,
    },
    itemText: {
        fontSize: 16,
    },
});


export default Shop;