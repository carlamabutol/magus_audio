import React from "react";
import { View, StyleSHeet, Text , TextInput} from "react-native";
import { scale } from "react-native-size-matters";

const FormInput =(props) =>{
  const {placeholder, title, error} =props
    return(
      <>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: scale(5), marginHorizontal: 20}}>
        {error ? (<Text style={{color: 'red', fontSize: scale(11), justifyContent: 'flex-start', marginBottom: scale(-20), marginTop: scale(-4)}}>{error}</Text>) : null}
        </View>
        <TextInput {...props} placeholder={placeholder} style={{borderBottomWidth: 2, borderBottomColor: 'rgba(24,119,242,0.4)', height: scale(26), fontSize: scale(13), marginBottom: scale(15), marginHorizontal:20}}/>
      </ >
    )
}
export default FormInput;
