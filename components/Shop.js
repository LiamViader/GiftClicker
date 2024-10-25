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

    const handleUpgradeWorker = (id, price) => {
        if (playerStats.coins >= price) {
            setWorkers((prevWorkers) => {
                return prevWorkers.map(worker => {
                    if (worker.id === id) {
                        const currentLevel = worker.level;
                        const upgradeData = worker.upgrades[currentLevel];
    
                        if (upgradeData) {
                            return {
                                ...worker,
                                clicksPerSecond: upgradeData.multiplyingFactor * worker.clicksPerSecond,
                                level: currentLevel + 1,
                                img: upgradeData.evolution ? upgradeData.evolutionImage : worker.img, 
                                giftRange: upgradeData.evolution ? worker.giftRange + 1 : worker.giftRange, 
                            };
                        }
                    }
                    return worker;
                });
            });
            setPlayerStats((prevPlayerStats) => {
                return { ...prevPlayerStats, coins: prevPlayerStats.coins - price };
            });
        }
    };


    return (
        <>
            <View style={styles.buttonShopContainer}>
                <Pressable style={styles.shopButton} onPress={toggleModal}>
                    <Text style={styles.buttonText}>Shop</Text>
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
                        <Pressable style={styles.buttonClose}  onPress={toggleModal}>
                            <Text style={styles.buttonCloseText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    buttonShopContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    shopButton: {
        backgroundColor: '#FF5733',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '80%', 
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonClose: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#FF5733',
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
        elevation: 3,
    },
    buttonCloseText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'flex-end',
    },
    modalContainer: {
        height: '75%',
        backgroundColor: '#1C1C1E', 
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#E5E5E7', 
        marginBottom: 20,
    },
    header: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#2C2C2E', 
        width: '100%',
        borderRadius: 5,
        marginVertical: 5,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#F7F7F7', 
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#3A3A3C',
    },
    itemText: {
        fontSize: 16,
        color: '#E5E5E7', 
    },
    closeButton: {
        backgroundColor: '#FF5733',
        marginTop: 15,
        borderRadius: 5,
    },
});


export default Shop;