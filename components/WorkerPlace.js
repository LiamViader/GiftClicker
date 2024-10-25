import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import AddWorkerModal from './AddWorkerModal';
import { WorkersContext } from '../context/workersContext';


const { width } = Dimensions.get('window');


const WorkerPlace = ({workingPlace}) => {

    //animacio
    const addWorkerScale = useSharedValue(1);
    const animatedAddWorkerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: addWorkerScale.value }],
        };
    });

    const workerTranslation = useSharedValue(0);
    const workerScale = useSharedValue(1);
    const animatedWorkerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: workerScale.value }],
        };
    });

    //logica
    const modalRef = useRef();

    const [currentWorker, setCurrentWorker] = useState(null);

    const { workers, setWorkers } = useContext(WorkersContext);

    useEffect(() => {
        if (workers){
            const worker = workers.find(worker => worker.workingPlace === workingPlace) || null;
            setCurrentWorker(worker);
            if (!worker){
                addWorkerScale.value = 1;
                workerScale.value=1;
            } 
        }

    }, [workers]);




    const handleClickAdd = () => {
        addWorkerScale.value = 1;
        addWorkerScale.value = withTiming(1.3, { duration: 100 }, () => {
            addWorkerScale.value = 1;
        });
        if(modalRef.current){
            modalRef.current.openModal();
        }
    };

    const handleWorkerAdded = (id) => {
        workerScale.value = 1;
        workerScale.value = withRepeat(
            withTiming(1.5, { duration: 350, easing: Easing.inOut(Easing.ease) }),
            -1,
            true 
        );

        setWorkers((prevWorkers) => {
            return prevWorkers.map(worker=>{
                if (worker.id === id) {
                    return { ...worker, workingPlace: workingPlace };
                }
                return worker;
            })
        });
    }


    return (
        <View style={styles.container}>
            {currentWorker ? (
                <Animated.View style={[animatedWorkerStyle, styles.worker]}>
                    <Image
                        source={currentWorker.img}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Animated.View>
            ) : (
                <Animated.View style={[animatedAddWorkerStyle, styles.pressable]}>
                    <Pressable onPress={handleClickAdd} style={styles.pressable}>
                        <Image
                            source={require('../assets/addCircleIcon.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </Pressable>
                </Animated.View>
            )}
            <AddWorkerModal ref={modalRef} onWorkerAdded={handleWorkerAdded}/>
        </View>
    );
};

export default WorkerPlace;

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    pressable: {
        flex: 1,
    },
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '50%', 
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
    worker: {
        flex: 1,
    },
});