import React, { useState, forwardRef, useImperativeHandle, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Modal, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { WorkersContext } from '../context/workersContext';
import WorkerCardAdd from './WorkerCardAdd';



const { width } = Dimensions.get('window');


const AddWorkerModal = forwardRef(({onWorkerAdded}, ref) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const { workers, setWorkers } = useContext(WorkersContext);


    useImperativeHandle(ref, () => ({
        openModal: () => {
            setIsModalVisible(true);
        }
    }));


    const handleCloseModal = () => {
        setIsModalVisible(false); 
    };

    const handleWorkerAdded = (id) => {
        onWorkerAdded(id)
        handleCloseModal();
    }

    const filteredWorkers = workers.filter(worker => worker.bought === true);

    return (
        <Modal visible={isModalVisible} transparent animationType="fade">
            <View style={styles.modal}>
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
            </View>
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
        width: '60%', 
        backgroundColor: '#1C1C1E',
        padding: 20,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
    },
    modalText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E5E5E7', 
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    closeButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#FF5733',
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
        elevation: 3,
    },
    closeButtonText: {
        color: '#FFF', 
        fontSize: 16,
        fontWeight: 'bold',
    },
});