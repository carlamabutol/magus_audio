import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ImageBackground, Image, Text, TouchableOpacity, ScrollView, View, Dimensions } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { scale, verticalScale } from "react-native-size-matters";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
const ThreeGuide =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const sizes=()=>{
    if(width*2<=height){
      return verticalScale(240);
    }else{
      return verticalScale(220);
    }
  }
  const sizes1=()=>{
    if(width*2<=height){
      return verticalScale(180);
    }else{
      return verticalScale(150);
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      space()
    });
    return unsubscribe;
  }, []);
  const space=()=>{
    if(width*2<=height){
      return verticalScale(330);
    }else if(width*2<=height+100){
      return verticalScale(370);
    }else{
      return verticalScale(410);
    }
  }
  const fontsize1=()=>{
    if(width*2<=height+100){
      return scale(13);
    }else{
      return scale(11);
    }
  }
  const fontsize2=()=>{
    if(width*2<=height+100){
      return scale(23);
    }else{
      return scale(18);
    }
  }
  return(
    <ImageBackground source={require('../../assets/me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
        <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> [navigation.goBack()]} style={{width: scale(38), height: scale(38)}} >
            <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
          </TouchableOpacity>
        </View>
          <View style={{flexDirection: 'row', marginHorizontal: scale(30), alignItems: 'center'}}>
            <Image source={{uri: global.items.cover}} style={{width: scale(90), height: scale(90), borderRadius: 20}} />
            <View>
              <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', textAlign: 'left', width: width-scale(150), paddingHorizontal: scale(10)}} >{global.items.title}</Text>
              <Text style={{ fontSize: scale(15), marginTop: 5, color: '#505050', fontWeight: '600', textAlign: 'left', width: width-scale(150), paddingHorizontal: scale(10)}} >{global.items.category.name}</Text>
            </View>
          </View>
          <Text style={{paddingLeft: scale(30), color: '#0D0D0D', fontWeight: 'bold', fontSize: scale(16), marginTop: 30 }}>Guide</Text>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: scale(30), marginTop: 10}}>
            <View>
              <Text style={{lineHeight: fontsize2(), textAlign: 'justify', fontSize: fontsize1()}}>{global.items.guide}</Text>
            </View>
            <View style={{height: space(), width: width/2}}>
            </View>   
          </ScrollView>
      </SafeAreaView> 
    </ImageBackground>
  )
}

export default ThreeGuide;