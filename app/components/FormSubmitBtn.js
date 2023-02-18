import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";


const FormSubmitBtn =({title, submitting, onPress}) =>{
  const backgroundColor = submitting ? 'rgba(24,119,242,0.4)': '#4C89C6'
    return(
      <>
        <TouchableOpacity onPress={submitting? null :  onPress} style={[styles.sub, {backgroundColor}]}>
          <Text style={{fontSize: moderateScale(15), fontWeight: 'bold', color: '#fff'}}>{title}</Text>
        </TouchableOpacity>
      </>
    )
}
const styles = StyleSheet.create({
  sub: {height: moderateScale(45), borderRadius: moderateScale(25), marginTop: moderateScale(10),justifyContent: 'center', alignItems: 'center', marginHorizontal: moderateScale(20), elevation: 5, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8}
})

export default FormSubmitBtn;