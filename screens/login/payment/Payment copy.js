import React, { useEffect, useState } from "react";
import { ImageBackground, Linking, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../../app/components/FormContainer";
import FormInput from "../../../app/components/FormInput";
import FormSubmitBtn from "../../FormSubmitBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import PaymentCard from "./PaymentCard";
import PaymentCheck from "./PaymentCheck";
import RandomText from "../../texts/RandomText";
import { scale } from "react-native-size-matters";

const Payment =({navigation}) =>{
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

    const click1 =(val)=>{
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
    const click=(val)=>{
      if(val+1==subs){
        setSubs(1)
        setAmount(0)
        setFont(13)
        setFont1(13)
        setFont2(13)
        setFont3(13)
        setFont4(13)
        setColor('rgba(4,157,217,0)')
        setColor1('rgba(4,157,217,0)')
        setColor2('rgba(4,157,217,0)')
        setColor3('rgba(4,157,217,0)')
        setColor4('rgba(4,157,217,0)')
      }else{
        if(val==1){
          setSubs(2)
          setColor('white')
          setColor1('rgba(4,157,217,0)')
          setColor2('rgba(4,157,217,0)')
          setColor3('rgba(4,157,217,0)')
          setColor4('rgba(4,157,217,0)')
          setAmount(10000)
          setFont(15)
          setFont1(13)
          setFont2(13)
          setFont3(13)
          setFont4(13)
        }else if(val==2){
          setSubs(3)
          setColor1('white')
          setColor('rgba(4,157,217,0)')
          setColor2('rgba(4,157,217,0)')
          setColor3('rgba(4,157,217,0)')
          setColor4('rgba(4,157,217,0)')
          setAmount(20000)
          setFont(13)
          setFont1(15)
          setFont2(13)
          setFont3(13)
          setFont4(13)
        }else if(val==3){
          setSubs(4)
          setColor2('white')
          setColor1('rgba(4,157,217,0)')
          setColor('rgba(4,157,217,0)')
          setColor3('rgba(4,157,217,0)')
          setColor4('rgba(4,157,217,0)')
          setAmount(35000)
          setFont(13)
          setFont1(13)
          setFont2(15)
          setFont3(13)
          setFont4(13)
        }else if(val==4){
          setSubs(5)
          setColor3('white')
          setColor1('rgba(4,157,217,0)')
          setColor2('rgba(4,157,217,0)')
          setColor('rgba(4,157,217,0)')
          setColor4('rgba(4,157,217,0)')
          setAmount(95000)
          setFont(13)
          setFont1(13)
          setFont2(13)
          setFont3(15)
          setFont4(13)
        }else if(val==5){
          setSubs(6)
          setColor4('white')
          setColor1('rgba(4,157,217,0)')
          setColor2('rgba(4,157,217,0)')
          setColor3('rgba(4,157,217,0)')
          setColor('rgba(4,157,217,0)')
          setAmount(245000)
          setFont(13)
          setFont1(13)
          setFont2(13)
          setFont3(13)
          setFont4(15)
        }
      }
    }
    const buttons= async(subs, amount1)=>{
      if(subs==1){
        navigation.navigate("Home")
        global.subscribe=false
      }else{
        global.subscribe=false
        await fetch(`https://dev.node.magusaudio.com/api/v1/payment/create`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({amount: amount1, description: 'Payment from ' + global.mainname, 
          remarks: '', subscription_id: subs, user_id: global.id
          })
          
        })
        .then(res =>{
          return res.json();
        })
        .then(async(result) =>{
          global.subscribe=false
          await Linking.openURL(result.data.attributes.checkout_url);
          navigation.navigate('Home')
        })
      }
    }
    const exclusive =()=>{
      return(
            <View style={[styles.viewCard, {borderColor: '#C8C169'}]}>
              <TouchableOpacity onPress={()=> buttons(2, 10000)}>
                <PaymentCard title={"Exclusive"} color={"#C8C169"}/>
              </TouchableOpacity>
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <TouchableOpacity onPress={()=> buttons(2, 10000)}>
                  <PaymentCheck color={"#C8C169"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#C8C169"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#C8C169"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#C8C169"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                </TouchableOpacity>
              </ScrollView>
            </View>
      )
    }
    const ideal =()=>{
      return(
            <View style={[styles.viewCard, {borderColor: '#FF6680'}]}>
              <TouchableOpacity onPress={()=> buttons(3, 20000)}>
                <PaymentCard title={"Ideal Wealth"} color={"#FF6680"}/>
              </TouchableOpacity>
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <TouchableOpacity onPress={()=> buttons(2, 10000)}>
                  <PaymentCheck color={"#FF6680"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#FF6680"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#FF6680"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#FF6680"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                </TouchableOpacity>
              </ScrollView>
            </View>
      )
    }
    const pro =()=>{
      return(
            <View style={[styles.viewCard, {borderColor: '#5B9ACF'}]}>
              <TouchableOpacity onPress={()=> buttons(4, 35000)}>
                <PaymentCard title={"Pro"} color={"#5B9ACF"}/>
              </TouchableOpacity>
              <View style={{backgroundColor: 'white', width: 35, height: 35, borderRadius: 100, marginTop: -39, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginRight: 5}}>
                <Image source={require('../../../assets/icon1.png')} style={{width: 25, height: 25, alignSelf: 'center'}} />
              </View>
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <TouchableOpacity onPress={()=> buttons(4, 35000)}>
                  <PaymentCheck color={"#5B9ACF"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#5B9ACF"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#5B9ACF"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#5B9ACF"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                </TouchableOpacity>
              </ScrollView>
            </View>
      )
    }
    const premium =()=>{
      return(
           <View style={[styles.viewCard, {borderColor: '#8F6ACA'}]}>
              <TouchableOpacity onPress={()=> buttons(5, 95000)}>
                <PaymentCard title={"Premium"} color={"#8F6ACA"}/>
              </TouchableOpacity>
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <TouchableOpacity onPress={()=> buttons(5, 95000)}>
                  <PaymentCheck color={"#8F6ACA"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#8F6ACA"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#8F6ACA"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#8F6ACA"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                </TouchableOpacity>
              </ScrollView>
            </View>
      )
    }
    const platinum =()=>{
      return(
            <View style={[styles.viewCard, {borderColor: '#69C8C8'}]}>
              <TouchableOpacity onPress={()=> buttons(6, 245000)}>
                <PaymentCard title={"Platinum"} color={"#69C8C8"}/>
              </TouchableOpacity>
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <TouchableOpacity onPress={()=> buttons(6, 245000)}>
                  <PaymentCheck color={"#69C8C8"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#69C8C8"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#69C8C8"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                  <PaymentCheck color={"#69C8C8"} message={"Lorem ipsum dolor sit amet, consetetur eme ok o sadipscing elitr, sed diam nomuny eirmod tempor invidun"}/>
                </TouchableOpacity>
              </ScrollView>
            </View>
      )
    }
    return( 
    <>
      <ImageBackground source={require('../../../assets/subscribe/playbg.png')}  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: 38}}), left: 15, right: 15, width: width-30,justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => [global.subscribe=false, navigation.navigate("Home")]} style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}} >
            <Image source={require('../../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>
          <RandomText fontSize={scale(23)} color={'black'} fontWeight={'bold'} message={"Payment"} />
          <TouchableOpacity onPress={()=> [global.subscribe=false, navigation.navigate("Home")]} style={{ alignItems: 'center', justifyContent: 'center'}}>
          <RandomText fontSize={scale(13)} fontWeight={'bold'} color={'rgba(24,119,242,1)'} message={"Skip"} marginRight={10}/>
          </TouchableOpacity>
        </View>
        <RandomText fontSize={scale(22)} color={'black'} message={"Choose your Plan"} textAlign={"center"} fontWeight={"bold"} marginTop={20}/>
        <RandomText fontSize={scale(12)} color={'black'} message={"Full access to volume controls and layering."} textAlign={"center"} fontWeight={"normal"} marginTop={5}/>
        <RandomText fontSize={scale(12)} color={'black'} message={"Listen with stronger subliminal power."} textAlign={"center"} fontWeight={"normal"} marginTop={5}/>
        <ScrollView style={{paddingHorizontal: 30, marginBottom: 120, marginTop: 20}}>
          <View>
            {exclusive()}
            {ideal()}
            {pro()}
            {premium()}
            {platinum()}
          </View>
        </ScrollView>
            <TouchableOpacity onPress={()=> [navigation.navigate("Login")]} style={{marginBottom: 80, marginTop: -100, alignContent:'center'}}>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <RandomText fontSize={scale(13)} message={"Already have an account? "} />
                <RandomText fontSize={scale(13)} fontWeight={'bold'} color={'rgba(24,119,242,1)'} message={"Login"} />
              </View>
            </TouchableOpacity>
      </ImageBackground>
    </>
    )
}
const styles = StyleSheet.create({
  viewCard:{borderBottomStartRadius: 20, backgroundColor: 'white', borderBottomEndRadius: 20, borderTopEndRadius: 10, borderTopStartRadius: 10, marginBottom: 20, height: 220, borderWidth: 3},
  sub: {height: 55, backgroundColor: '#4C89C6', borderRadius: 10, marginTop: 25,justifyContent: 'center',  alignItems: 'center', marginHorizontal: 40, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8},
  text2: {fontSize: scale(13), textAlign: 'justify', lineHeight: 28, marginRight: 15, },
  text1: {fontSize: scale(15), marginRight: 15, fontWeight: 'bold', marginTop: 20}
  
})

export default Payment;

