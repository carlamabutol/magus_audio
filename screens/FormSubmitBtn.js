import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";


const FormSubmitBtn =({title, submitting, onPress}) =>{
  const backgroundColor = submitting ? 'rgba(24,119,242,0.4)': '#4C89C6'
    return(
      <>
        <TouchableOpacity onPress={submitting? null :  onPress} style={[styles.sub, {backgroundColor}]}>
          <Text style={{fontSize: scale(15), fontWeight: 'bold', color: '#fff'}}>{title}</Text>
        </TouchableOpacity>
      </>
    )
}
const styles = StyleSheet.create({
  sub: {height: scale(40), borderRadius: 10, marginTop: scale(20),justifyContent: 'center',  alignItems: 'center', marginHorizontal: 20, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8}
})

export default FormSubmitBtn;