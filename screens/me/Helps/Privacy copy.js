import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, ImageBackground, Image, Text, TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { UserContext } from "../../UserContext";
import { LinearGradient } from "expo-linear-gradient";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const Privacy =({navigation})=>{
  
  const space=()=>{
    if(global.value!="MINIMIZE"){
      if(width*2<=height){
        return moderateScale(65);
      }else{
        return moderateScale(40);
      }
    }
    else{
      return moderateScale(134);
    }
  }
  return(
    <ImageBackground source={require('../../../assets/Me/me2/mebg.png')} style={styles.container}>
      <SafeAreaView>
        <View style={{marginTop: moderateScale(10), marginRight: moderateScale(5), marginLeft: moderateScale(10)}}>
          <LinearGradient
              colors={['#e9f0f7', '#bed3e7', '#93b5d7', '#6898c7', '#427AB3',]}
              style={{height: moderateScale(40), width: moderateScale(40), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(30), height: moderateScale(30)}} >
                <Image source={require('../../../assets/back.png')} style={{width: moderateScale(30), tintColor: 'white', height: moderateScale(30)}} />
              </TouchableOpacity>
            </LinearGradient>
        </View>
        <View style={styles.bottomView}>              
        </View>
        <View style={{width: width-moderateScale(20), height: height, marginTop: moderateScale(225), marginHorizontal: moderateScale(10)}}>
        </View>
        
      </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  text1: {fontSize: moderateScale(12), lineHeight: moderateScale(25), marginRight: moderateScale(15), marginLeft: moderateScale(15), textAlign: 'justify'},
  label1: {fontSize: moderateScale(13), lineHeight: moderateScale(25), marginRight: moderateScale(15), fontWeight: 'bold', marginTop: moderateScale(10)},
  label2: {fontSize: moderateScale(13), lineHeight: moderateScale(25), marginRight: moderateScale(15), marginLeft: moderateScale(15), fontWeight: 'bold', marginTop: moderateScale(10)},
  mysubs: {
    textAlign: 'left', color: 'black', fontSize: moderateScale(30), fontWeight: '700', marginTop: moderateScale(10)
  },
  bottomView: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute', 
    ...Platform.select({android: {top: height/2.8}, ios:{top: height/2.612}}), borderTopRightRadius: moderateScale(25), borderTopLeftRadius: moderateScale(25)
  },
});
export default Privacy;