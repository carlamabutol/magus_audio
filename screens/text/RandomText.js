import React from "react";
import { Text } from "react-native";

const RandomText =(props)=>{
    const {color, message, fontWeight, fontSize, marginTop, marginBottom, marginRight, marginLeft, textAlign} =props
    return (
        <Text style={{fontWeight: fontWeight, marginBottom: marginBottom,  marginRight: marginRight, fontSize: fontSize, color: color, textAlign: textAlign, marginTop: marginTop, marginLeft: marginLeft}} >{message}</Text>
    )
}
export default RandomText;