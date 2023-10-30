import React, { useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import CustomPkgBtn from '../../components/CustomPkgBtn';
import TextInputWithLabel from '../../components/TextinputWithLable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationStrings from '../../constants/NavigationStrings';
import fontFamily from '../../styles/fontFamily';

const SecondSchedule = ({ navigation }) => {
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
        const pricePerAcreValue = parseFloat(price);
        const income = acresValue * pricePerAcreValue;
        let calculatedTax = 0
        if (income <= 400000) {
            calculatedTax = 0;
        } else if (income <= 800000) {
            calculatedTax = 1000;
        } else if (income <= 1200000) {
            calculatedTax = 2000;
        } else if (income <= 2400000) {
            calculatedTax = (income - 1200000) * 0.05;
        } else if (income <= 4800000) {
            calculatedTax = 60000 + (income - 2400000) * 0.10;
        } else {
            calculatedTax = 300000 + (income - 4800000) * 0.15;
        }
        console.log(income, "total income");
        setTax(calculatedTax);
        // setAcres('');
        AsyncStorage.getItem('calculatedTaxes')
            .then(data => {
                let taxes = JSON.parse(data) || [];
                taxes.push({ acres: acresValue, price: pricePerAcreValue, tax: calculatedTax });

                // Save the updated array back to local storage
                AsyncStorage.setItem('calculatedTaxes', JSON.stringify(taxes));
            })
            .catch(error => {
                console.error('Error retrieving data: ', error);
            });
    }
    // const handleSecondResult =()=> {
    //     const acresValue = parseFloat(acres);
    //     const pricePerAcreValue = parseFloat(price2);
    //     const income = acresValue * pricePerAcreValue;
    //     let CalculatedTax2 = 0
    //     if (income <= 400000) {
    //         CalculatedTax2 = 0;
    //     } else if (income <= 800000) {
    //         CalculatedTax2 = 1000;
    //     } else if (income <= 1200000) {
    //         CalculatedTax2 = 2000;
    //     } else if (income <= 2400000) {
    //         CalculatedTax2 = (income - 1200000) * 0.05;
    //     } else if (income <= 4800000) {
    //         CalculatedTax2 = 60000 + (income - 2400000) * 0.10;
    //     } else {
    //         CalculatedTax2 = 300000 + (income - 4800000) * 0.15;
    //     }
    //     console.log(income, "total income");
    //     setSecondTax(CalculatedTax2);
    //     // setAcres('');
    //     // setPrice2('')

    // }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Second Schedule</Text>
            <View style={{ marginBottom: 30 }}>
                <Text style={styles.desc}>Rate of tax on total Agricultural Income</Text>
                <Text style={styles.heading}>Price per Acre will be set 80000</Text>
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
                    <Text style={styles.resultStyle}>Tax on Agricultural Income: <Text style={styles.taxtStyle}>Rs. {tax}</Text></Text>
                </View>
                {/* <CustomPkgBtn
                    onPress={() => { movetoScreen(NavigationStrings.RECORD) }}
                    btnText={"Go to record"}
                    btnStyle={styles.recordBtnStyle}
                /> */}
            </View>
            {/* <View>
                <Text style={styles.heading}>Price  per Acre set Default</Text>
                <View>
                    <TextInputWithLabel
                        label={"Enter land Acre"}
                        onChangeText={(acres) => setAcres(acres)}
                        value={price}
                        placeHolder="Enter acres"
                        inputStyle={styles.inputStyle}
                    />
                    <TextInputWithLabel
                        label={"Enter land Price"}
                        onChangeText={(price2) => setPrice2(price2)}
                        value={price2}
                        placeHolder="Enter price"
                        inputStyle={styles.inputStyle}
                    />
                    <CustomPkgBtn
                        onPress={handleSecondResult}
                        btnText={"Result"}
                    />
                    <Text style={styles.resultStyle}>Tax on Agricultural Income: <Text style={styles.taxStyle}>Rs. {secondTax}</Text></Text>
                </View>
            </View> */}
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
        fontFamily:fontFamily.rregular
    },
    desc:{
        fontSize:15,
        marginBottom:15,
        color:'#000',
        textTransform:'uppercase',
        fontFamily:fontFamily.bold
    },
    inputStyle: {
        marginBottom: 25,
    },
    taxtStyle: {
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
export default SecondSchedule;