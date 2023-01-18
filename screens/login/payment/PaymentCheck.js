import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import RandomText from "../../texts/RandomText";
const PaymentCheck =(props)=>{
  const {message, color} =props
    
 return(
            <>
             <View style={{flexDirection: 'row', marginRight: 0, marginBottom: -10, alignItems: 'center', padding: 10 }}>
                <View style={{ width: 30, height: 30, borderRadius: 100, borderColor: color, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/87/87932.png'}} style={{width: 21, height: 21, tintColor: color}}/>
                </View>
                <RandomText marginLeft={10} color={'black'} fontSize={13} marginRight={30} textAlign={'justify'} message={message} />
              </View>
            </>
 )
}
export default PaymentCheck