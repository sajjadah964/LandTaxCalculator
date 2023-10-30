import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import imagePath from '../../constants/imagePath';

const SecondRecord = () => {
    const [taxes, setTaxes] = useState([]);

    useEffect(() => {
        // Retrieve the array of calculated taxes from local storage
        AsyncStorage.getItem('calculatedTax')
            .then(data => {
                const parsedData = JSON.parse(data) || [];
                setTaxes(parsedData);
            })
            .catch(error => {
                console.error('Error retrieving data: ', error);
            });
    }, []);

    const handleDeleteData = (recordIndex) => {
        const updatedTaxes = taxes.filter((item, index) => index !== recordIndex);
        setTaxes(updatedTaxes);

        // Store the updated taxes array in AsyncStorage
        AsyncStorage.setItem('calculatedTax', JSON.stringify(updatedTaxes))
            .then(() => {
                console.log('Tax record removed successfully');
                ToastAndroid.show('Tax record removed successfully', ToastAndroid.SHORT);
            })
            .catch((error) => {
                console.error('Error removing tax record: ', error);
            });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Calculated Taxes:</Text>
            <FlatList
                data={taxes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    console.log(item, 'index')
                    return (
                        <View style={styles.mainView}>
                            <View style={styles.listStyle}>
                                <View style={styles.listHeadingView}>
                                    <Text style={styles.headingStyle}>Sr.</Text>
                                    <Text style={styles.headingStyle}>Acres</Text>
                                    {/* <Text style={styles.headingStyle}>Price</Text> */}
                                    <Text style={styles.headingStyle}>Tax</Text>
                                </View>
                                <View style={styles.listContentView}>
                                    <Text style={styles.contentStyle}>{index + 1}</Text>
                                    <Text style={styles.contentStyle}>{item.acres}</Text>
                                    {/* <Text style={styles.contentStyle}>{item.price}</Text> */}
                                    <Text style={styles.contentStyle}>{item.tax}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleDeleteData(index)}
                                style={{ paddingRight: 15 }}
                            >
                                <Image
                                    source={imagePath.bgDeleteIcon}
                                    resizeMode="contain"
                                    style={{ tintColor: 'red' }}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default SecondRecord;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        marginBottom: 30,
        paddingTop: 20,
    },
    listStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        padding: 10,
    },
    listHeadingView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listContentView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingStyle: {
        fontSize: 18,
        color: '#000',
        flex: 1,
    },
    contentStyle: {
        flex: 1,
        fontSize: 16
    }
})