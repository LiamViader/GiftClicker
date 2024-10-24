import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal, Button } from 'react-native';

const Shop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

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
                        <Text>Welcome</Text>

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
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        justifyContent: 'flex-end',
    },
    modalContainer: {
        height: '50%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});


export default Shop;