import React, { useState, forwardRef, useImperativeHandle, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Modal, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { WorkersContext } from '../context/workersContext';
import WorkerCardAdd from './WorkerCardAdd';



const { width } = Dimensions.get('window');


const AddWorkerModal = forwardRef(({onWorkerAdded}, ref) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const { workers, setWorkers } = useContext(WorkersContext);

    const translateX = useSharedValue(-width); 
    const animatedModalStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });


    useImperativeHandle(ref, () => ({
        openModal: () => {
            setIsModalVisible(true);
            translateX.value = withTiming(0, { duration: 500 });
        }
    }));


    const handleCloseModal = () => {
        translateX.value = withTiming(-width, { duration: 500 }, () => {
            setIsModalVisible(false); 
        });
    };

    const handleWorkerAdded = (id) => {
        onWorkerAdded(id)
        handleCloseModal();
    }

    const filteredWorkers = workers.filter(worker => worker.bought === true);

    return (
        <Modal visible={isModalVisible} transparent animationType="none">
            <Animated.View style={[styles.modal, animatedModalStyle]}>
                <Text style={styles.modalText}>Add Worker</Text>
                <FlatList
                    data={filteredWorkers}
                    renderItem={({ item }) => (
                        <WorkerCardAdd onPressed={handleWorkerAdded} worker={item}/>
                    )}
                    keyExtractor={item => item.id}
                />
                <Pressable onPress={handleCloseModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
            </Animated.View>
        </Modal>
    );
});

export default AddWorkerModal;

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '50%', // Ocupa el 50% del ancho de la pantalla
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    closeButton: {
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'black',
        fontSize: 16,
    },
});