import React, { useEffect, useState } from "react";
import { ImageBackground, Linking, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
import FormSubmitBtn from "../FormSubmitBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment1 =({navigation}) =>{
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [color, setColor] = useState('rgba(4,157,217,0)');
    const [font, setFont] = useState(13);
    const [color1, setColor1] = useState('rgba(4,157,217,0)');
    const [font1, setFont1] = useState(13);
    const [color2, setColor2] = useState('rgba(4,157,217,0)');
    const [font2, setFont2] = useState(13);
    const [color3, setColor3] = useState('rgba(4,157,217,0)');
    const [font3, setFont3] = useState(13);
    const [color4, setColor4] = useState('rgba(4,157,217,0)');
    const [font4, setFont4] = useState(13);
    const [text, setText] = useState("Skip");
    const [subs, setSubs] = useState(1);
    const [amount, setAmount] = useState(0);

    const click =(val)=>{
      if(val==1){
        setSubs(2)
        setAmount(10000)
        setText("Proceed to Payment")
        setColor('rgba(4,157,217,1)')
        setFont(14)
        setColor1('rgba(4,157,217,0)')
        setFont1(13)
        setColor2('rgba(4,157,217,0)')
        setFont2(13)
        setColor3('rgba(4,157,217,0)')
        setFont3(13)
        setColor4('rgba(4,157,217,0)')
        setFont4(13)
      }else if(val==2){
        setSubs(3)
        setAmount(20000)
        setText("Proceed to Payment")
        setColor1('rgba(4,157,217,1)')
        setFont1(14)
        setColor('rgba(4,157,217,0)')
        setFont(13)
        setColor2('rgba(4,157,217,0)')
        setFont2(13)
        setColor3('rgba(4,157,217,0)')
        setFont3(13)
        setColor4('rgba(4,157,217,0)')
        setFont4(13)
      }else if(val==3){
        setSubs(4)
        setAmount(35000)
        setText("Proceed to Payment")
        setColor2('rgba(4,157,217,1)')
        setFont2(14)
        setColor('rgba(4,157,217,0)')
        setFont(13)
        setColor1('rgba(4,157,217,0)')
        setFont1(13)
        setColor3('rgba(4,157,217,0)')
        setFont3(13)
        setColor4('rgba(4,157,217,0)')
        setFont4(13)
      }else if(val==4){
        setSubs(5)
        setAmount(95000)
        setText("Proceed to Payment")
        setColor3('rgba(4,157,217,1)')
        setFont3(14)
        setColor('rgba(4,157,217,0)')
        setFont(13)
        setColor1('rgba(4,157,217,0)')
        setFont1(13)
        setColor2('rgba(4,157,217,0)')
        setFont2(13)
        setColor4('rgba(4,157,217,0)')
        setFont4(13)
      }else if(val==5){
        setSubs(6)
        setAmount(245000)
        setText("Proceed to Payment")
        setColor4('rgba(4,157,217,1)')
        setFont4(14)
        setColor('rgba(4,157,217,0)')
        setFont(13)
        setColor1('rgba(4,157,217,0)')
        setFont1(13)
        setColor2('rgba(4,157,217,0)')
        setFont2(13)
        setColor3('rgba(4,157,217,0)')
        setFont3(13)
      }
    }
    const buttons= async()=>{
      console.log(subs)
      if(text=="Skip"){
        navigation.navigate("Home")
        global.standard=true
      }else if(text=="Proceed to Payment"){
        global.standard=false
        
        await fetch(`https://dev.node.magusaudio.com/api/v1/payment/create`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({amount: amount, description: 'Payment from ' + global.mainname, 
          remarks: '', subscription_id: subs, user_id: global.id
          })
          
        })
        .then(res =>{
          return res.json();
        })
        .then(async(result) =>{
          console.log(result)
          await Linking.openURL(result.data.attributes.checkout_url);
          navigation.navigate('Home')
        })
      }
    }
    return( 
    <>
      <ImageBackground source={require('../../assets/subscribe/playbg.png')}  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: 38}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => [global.standard=true, navigation.navigate("Login")]} style={{width: 40, height: 40}} >
            <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>
        </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: 23, color: '#0D0D0D', fontWeight: 'bold', }} >Subscription Plan</Text>
        </View>
        <Image source={require('../../assets/subscribe/payment.png')}  style={{width: '65%', height: '35%', alignSelf: 'center', marginTop: -30}}/>
        <Text style={{  fontSize: 18, color: '#0D0D0D', fontWeight: 'bold', textAlign: 'center'}} >Upgrade your Subscription Plan</Text>
        <Text style={{  fontSize: 12, color: '#0D0D0D', textAlign: 'center', marginTop: 10}} >Unlimited access to Subliminal Audios.</Text>
        <View style={{height: 110, width: width, marginTop: 30, flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> click(1)} style={{height: 110, width: width/3, paddingHorizontal: 15,}}>
            <View style={{height: 110,  borderRadius: 15, borderColor: color, borderWidth: 2}}>
              <View style={{height: 22, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{  fontSize: 11, fontWeight: '700', color: 'white', textAlign: 'center', marginTop: 0}} >Exclusive</Text>
              </View>
              <Text style={{  fontSize: font, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >30</Text>
              <Text style={{  fontSize: font, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 0}} >Days</Text>
              <Text style={{  fontSize: 11, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >100 Php</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> click(2)} style={{height: 110, width: width/3, paddingHorizontal: 15,}}>
            <View style={{height: 110,  borderRadius: 15, borderColor: color1, borderWidth: 2}}>
              <View style={{height: 22, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{  fontSize: 11, fontWeight: '700', color: 'white', textAlign: 'center', marginTop: 0}} >Ideal Wealth</Text>
              </View>
              <Text style={{  fontSize: font1, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >60</Text>
              <Text style={{  fontSize: font1, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 0}} >Days</Text>
              <Text style={{  fontSize: 11, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >200 Php</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> click(3)} style={{height: 110, width: width/3, paddingHorizontal: 15,}}>
            <View style={{height: 110,  borderRadius: 15, borderColor: color2, borderWidth: 2}}>
              <View style={{height: 22, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{  fontSize: 11, fontWeight: '700', color: 'white', textAlign: 'center', marginTop: 0}} >Pro</Text>
              </View>
              <Text style={{  fontSize: font2, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >30</Text>
              <Text style={{  fontSize: font2, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 0}} >Days</Text>
              <Text style={{  fontSize: 11, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >350 Php</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height: 110, width: width, marginTop: 30, flexDirection: 'row',  justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=> click(4)} style={{height: 110, width: width/3, paddingHorizontal: 15,}}>
            <View style={{height: 110,  borderRadius: 15, borderColor: color3, borderWidth: 2}}>
              <View style={{height: 22, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{  fontSize: 11, fontWeight: '700', color: 'white', textAlign: 'center', marginTop: 0}} >Premium</Text>
              </View>
              <Text style={{  fontSize: font3, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >30</Text>
              <Text style={{  fontSize: font3, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 0}} >Days</Text>
              <Text style={{  fontSize: 11, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >950 Php</Text>
            </View>
          </TouchableOpacity>
          <View style={{height: 110, width: width/3, paddingHorizontal: 15,}}>
            <TouchableOpacity onPress={()=> click(5)} style={{height: 110,  borderRadius: 15, borderColor: color4, borderWidth: 2}}>
              <View style={{height: 22, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{  fontSize: 11, fontWeight: '700', color: 'white', textAlign: 'center', marginTop: 0}} >Platinum</Text>
              </View>
              <Text style={{  fontSize: font4, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >30</Text>
              <Text style={{  fontSize: font4, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 0}} >Days</Text>
              <Text style={{  fontSize: 11, fontWeight: '700', color: 'black', textAlign: 'center', marginTop: 10}} >2450 Php</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        <TouchableOpacity onPress={()=> buttons()} style={[styles.sub]}>
              <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff'}}>{text}</Text>
            </TouchableOpacity>
      </ImageBackground>
    </>
    )
}
const styles = StyleSheet.create({
  
  sub: {height: 55, backgroundColor: '#4C89C6', borderRadius: 10, marginTop: 25,justifyContent: 'center',  alignItems: 'center', marginHorizontal: 40, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8},
  text2: {fontSize: 13, textAlign: 'justify', lineHeight: 28, marginRight: 15, },
  text1: {fontSize: 15, marginRight: 15, fontWeight: 'bold', marginTop: 20}
  
})

export default Payment1;

