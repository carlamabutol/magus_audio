import React from "react";
import { View, StyleSHeet, Text, Image, TextInput, Dimensions} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const FormInput =(props) =>{
  const {placeholder, title, error, image} =props
    return(
      <>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: moderateScale(3), marginHorizontal: 20}}>
        {error ? (<Text style={{color: 'red', fontSize: moderateScale(11), justifyContent: 'flex-start', marginRight: moderateScale(10), marginBottom: moderateScale(-20), marginTop: moderateScale(-4)}}>{error}</Text>) : null}
        </View>
        <View style={{backgroundColor: 'white', elevation: 5, shadowColor: 'gray', shadowOpacity: 0.4, shadowOffset: {width: 1, height:1}, alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(10), marginTop: moderateScale(10), marginBottom: moderateScale(10), marginHorizontal:moderateScale(20), height: moderateScale(45), borderWidth: 0.4, borderColor: 'gray', flexDirection: 'row'}}>
          <TextInput {...props} placeholder={placeholder} style={{fontSize: moderateScale(13), marginLeft: moderateScale(5), width: Dimensions.get('window').width-moderateScale(110)}}/>
          <Image source={image} style={{height: moderateScale(25), width: moderateScale(25), marginLeft: moderateScale(5)}}/> 
        </View>
      </ >
    )
}
export default FormInput;

/*
<View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: moderateScale(3), marginHorizontal: 20}}>
        {error ? (<Text style={{color: 'red', fontSize: moderateScale(11), justifyContent: 'flex-start', marginBottom: moderateScale(-20), marginTop: moderateScale(-4)}}>{error}</Text>) : null}
        </View> */
