import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import CustomPkgBtn from '../../components/CustomPkgBtn';
import NavigationStrings from '../../constants/NavigationStrings';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';
const Home = ({navigation}) => {
    const moveToScreen =(screen) =>{
        navigation.navigate(screen);
    }
  return (
    <View style={styles.container}>
        <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}> Land Income Tax</Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <CustomPkgBtn 
                btnText= 'Go to Schedule 1'
                textStyle={styles.textStyle}
                btnStyle={styles.btnStyle} 
                onPress={()=>moveToScreen(NavigationStrings.FIRST_SCHEDULE)}
                btnImage={imagePath.bgArrow}
            />
             <CustomPkgBtn 
                btnText= 'Go to Schedule 2'
                textStyle={styles.textStyle}
                btnStyle={styles.btnStyle} 
                onPress={()=>moveToScreen(NavigationStrings.SECOND_SCHEDULE)}
                btnImage={imagePath.bgArrow}
            />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    headerStyle :{
        height:55,
        justifyContent:'center',
    },
    headerTextStyle :{
        fontSize:28,
        textAlign:'center',
        color:'blue',
        fontFamily:fontFamily.italic
    },
    btnStyle :{
        justifyContent:'center',
        alignItems:'center',
        width:250,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    textStyle :{
        fontSize:18,
    }
})
export default Home;