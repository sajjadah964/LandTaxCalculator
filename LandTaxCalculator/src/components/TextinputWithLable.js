/* eslint-disable prettier/prettier */

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Colors from '../styles/Colors';
import fontFamily from '../styles/fontFamily';

// create a component
const TextInputWithLabel = ({
    label,
    inlineInputStyle,
    labelTextStyle,
    placeHolder,
    onChangeText = () => { },
    inputStyle = {},
    rightIcon,
    onPressRight,
    searchIcon,
    ...props
}) => {
    return (
        <View>
            {/* <Text style={{ ...styles.labelTextStyle, ...labelTextStyle }}>{label}</Text> */}
            {label ?
                <Text style={{ ...styles.labelTextStyle, ...labelTextStyle }}>{label}</Text>
                : null
            }
            <View style={{ ...styles.inputStyle, ...inputStyle }}>
                <TextInput
                    placeholderTextColor='#AAACAE'
                    placeholder={placeHolder}
                    style={{ ...styles.inlineInputStyle, ...inlineInputStyle }}
                    {...props}
                    onChangeText={onChangeText}
                    keyboardType="numeric"
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        height: moderateScale(50),
        borderWidth: 1,
        // borderColor: Colors.inputBorderColor,
        borderRadius: moderateScale(15),
        borderColor:'blue'
        // backgroundColor:'red'
    },
    inlineInputStyle: {
        paddingHorizontal: moderateScale(15),
        fontSize: scale(14),
        flex: 1,
        color: Colors.inputTextColor
    },
    labelTextStyle: {
        fontSize: scale(15),
        color: Colors.labelColor,
        fontWeight: '400',
        marginBottom: moderateScale(10),
        fontFamily:fontFamily.regular
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    visibleStyle: {
        tintColor: Colors.primaryColor,
        width: moderateScale(19),
        height: moderateScale(13)
    },
});

export default TextInputWithLabel;
