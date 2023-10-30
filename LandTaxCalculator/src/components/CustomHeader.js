/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import imagePath from '../constants/imagePath';
import { useNavigation } from '@react-navigation/native'
import Colors from '../styles/Colors';
import { scale, moderateVerticalScale, moderateScale, verticalScale } from 'react-native-size-matters';

// create a component
const CustomHeader = ({
    leftImg,
    rightImg,
    onPressBack,
    headerImgStyle,
    headerStyle = {},
    profileImg,
    onPress
}) => {
    const navigation = useNavigation();
    return (
        <View style={{ ...styles.headerStyle, ...headerStyle }}>
            {leftImg ?
                <TouchableOpacity
                    style={styles.squareBoxStyle}
                    onPress={!!onPressBack ? onPressBack : () => navigation.goBack()}
                >
                    <Image
                        source={leftImg}
                        resizeMode='contain'
                    />
                </TouchableOpacity> : null

            }
            <TouchableOpacity style={styles.squareBoxStyle} onPress={onPress}>
                {rightImg ?
                    <Image
                        source={rightImg}
                        style={styles.homeUserIcon}
                    />
                    : null
                }
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    headerStyle: {
        minHeight: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'#FEFEFE'
        paddingHorizontal: 15

    },
    headerTitleStyle: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.black
    },
    squareBoxStyle: {
        width: 40,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#fff',
        position: 'relative',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        // backgroundColor: 'red'
    },
    homeUserIcon: {
        width: 40,
        height: 40,
        position: 'absolute', // Position the icon absolutely within the box
        top: '50%', // Move the icon 50% from the top
        left: '50%', // Move the icon 50% from the left
        transform: [{ translateX: -20 }, { translateY: -15 }], // Adjust for half of the icon's size
    },
});

//make this component available to the app
export default CustomHeader;
