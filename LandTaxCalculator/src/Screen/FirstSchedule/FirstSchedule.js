import React, { useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import CustomPkgBtn from '../../components/CustomPkgBtn';
import TextInputWithLabel from '../../components/TextinputWithLable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationStrings from '../../constants/NavigationStrings';
import fontFamily from '../../styles/fontFamily';

const Calculator = ({ navigation }) => {
    const [acres, setAcres] = useState('');
    const [price, setPrice] = useState(80000);
    const [price2, setPrice2] = useState('');
    const [tax, setTax] = useState(0);
    const [secondTax, setSecondTax] = useState(0);

    const movetoScreen = (screen) => {
        navigation.navigate(screen)
    }

    const handleResult = () => {
        const acresValue = parseFloat(acres);
        // const pricePerAcreValue = parseFloat(price);
        // const income = acresValue * pricePerAcreValue;
        let calculatedTax = 0;
        if (acresValue <= 12.5) {
            calculatedTax = 0; // Not exceeding 12½ acres Nil
        } else if (acresValue <= 25) {
            calculatedTax = acresValue * 300
            // Exceeding 12½ acres but not exceeding 25 acres Rs. 300/-
        } else if (acresValue <= 50) {
            calculatedTax = acresValue * 400 // Exceeding 25 acres but not exceeding 50 acres Rs. 400/-
        } else {
            calculatedTax = acresValue * 500 // Exceeding 50 acres Rs. 500/-
        }
        setTax(calculatedTax);
        // setAcres('');
        AsyncStorage.getItem('calculatedTax')
            .then(data => {
                let taxes = JSON.parse(data) || [];
                taxes.push({ acres: acresValue, tax: calculatedTax });

                // Save the updated array back to local storage
                AsyncStorage.setItem('calculatedTax', JSON.stringify(taxes));
            })
            .catch(error => {
                console.error('Error retrieving data: ', error);
            });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>First Schedule</Text>
            <View style={{ marginBottom: 30 }}>
                {/* <Text style={styles.heading}>Price per Acre will be set by Default</Text> */}
                <View style={{ marginBottom: 30 }}>
                    <TextInputWithLabel
                        label={"Enter land Acre"}
                        onChangeText={(acres) => setAcres(acres)}
                        value={acres}
                        placeHolder="Enter acres"
                        inputStyle={styles.inputStyle}
                    />
                    <CustomPkgBtn
                        onPress={() => {
                            if (acres != "") {
                                handleResult()
                            } else {
                                ToastAndroid.show('Please Enter Data', ToastAndroid.SHORT);
                            }
                        }}
                        btnText={"Result"}
                    />
                    <Text style={styles.resultStyle}>Tax on Agricultural Income: <Text style={styles.taxStyle}>Rs. {tax}</Text></Text>
                </View>
                {/* <CustomPkgBtn
                    onPress={() => { movetoScreen(NavigationStrings.SECOND_RECORD) }}
                    btnText={"Go to record"}
                    btnStyle={styles.recordBtnStyle}
                /> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        paddingTop: 20,
        color: '#000',
        marginBottom: 40,
        fontFamily:fontFamily.medium
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    inputStyle: {
        marginBottom: 25,
    },
    taxStyle: {
        fontSize: 16,
        color: '#000',
        fontFamily:fontFamily.bbold
    },
    resultStyle: {
        fontSize: 15,
        fontFamily:fontFamily.regular
    },
    recordBtnStyle: {
        width: 120
    }
})
export default Calculator;