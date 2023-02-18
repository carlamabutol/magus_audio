import React from "react";
import { View, StyleSHeet, Text , TextInput, Dimensions} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const FormInput1 =(props) =>{
  const {placeholder, title, error} =props
    return(
      <>
        <View style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          {error ? (<Text style={{color: 'red', fontSize: moderateScale(11), textAlign: 'left', marginTop: moderateScale(-10), marginBottom: 0 }}>{error}</Text>) : null}
          <TextInput {...props} placeholder={placeholder} style={{borderBottomWidth: 2, borderBottomColor: 'rgba(24,119,242,0.4)', height: moderateScale(26), width: Dimensions.get('window').width/2-moderateScale(60), fontSize: moderateScale(13), marginBottom: moderateScale(15),}}/>
        </View>
      </ >
    )
}


export default FormInput1;