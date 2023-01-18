import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import RandomText from "../../texts/RandomText";
const PaymentCard =(props)=>{
  const {color, message, title} =props
    
 return(
            <>
              <View style={{ backgroundColor: color, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <RandomText fontSize={21} fontWeight={'700'} color={'white'} textAlign={'center'} message={title} />
              </View>
              
            </>
 )
}
export default PaymentCard