import React from "react";
import { View, StyleSHeet, Text , TextInput, Dimensions} from "react-native";

const FormInput1 =(props) =>{
  const {placeholder, title, error} =props
    return(
      <>
        <View style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          {error ? (<Text style={{color: 'red', fontSize: 13, textAlign: 'left', marginTop: -15, marginBottom: 0 }}>{error}</Text>) : null}
          <TextInput {...props} placeholder={placeholder} style={{borderBottomWidth: 2, borderBottomColor: 'rgba(24,119,242,0.4)', height: 30, width: Dimensions.get('window').width/2-40, fontSize: 13, marginBottom: 15,}}/>
        </View>

      </ >
    )
}


export default FormInput1;