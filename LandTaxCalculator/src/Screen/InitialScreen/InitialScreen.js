/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';
import NavigationStrings from '../../constants/NavigationStrings';
import Loader from '../../components/Loader';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SplashScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(NavigationStrings.HOME);
            setisLoading(false);
        }, 1000);
    }, []);
    return (
        <View style={styles.container}>
            <Loader isLoading={isLoading} />
            <ImageBackground
                source={imagePath.bgSplahs2}
                resizeMode="contain"
                style={styles.imageStyle}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center',paddingHorizontal:15 }}>
                    <Text style={styles.textStyle}>Land Income Tax Calculator</Text>
                </View>
                {/* <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                    <Text style={styles.bottomStyle}>Develpoed by SA</Text>
                </View> */}
            </ImageBackground>
        </View>
    )
}

export default SplashScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 24,
        color: '#fff',
        fontFamily:fontFamily.italic,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:15
    },
    imageStyle: {
        width: windowHeight,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomStyle: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        fontSize: 17,
        color: '#fff'
    }
})