import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput, ImageBackground, Linking, Modal, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ScrollView } from "react-native-gesture-handler";
import PaymentCard from "../login/payment/PaymentCard";
import PaymentCheck from "../login/payment/PaymentCheck";
import RandomText from "../texts/RandomText";
import { scale, verticalScale } from "react-native-size-matters";
const PaymentTab =({navigation}) =>{
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [newsubs, setNewsubs] = useState(false);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(180000);
  const [color, setColor] = useState('#69C8C8');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
    const buttons= async(subs, amount1)=>{
      if(subs==1){
        navigation.navigate("Home")
        global.subscribe=true
      }else{
        global.subscribe=false
        setNewsubs(subs)
        setAmount(amount1)
        setModal(true)
      }
    }
    const pay =async()=>{
      await fetch(`https://dev.node.magusaudio.com/api/v1/payment/create`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({amount: (amount), description: 'Payment from ' + global.mainname, 
          remarks: '', subscription_id: 3, user_id: global.id
          })
          
        })
        .then(res =>{
          return res.json();
        })
        .then(async(result) =>{
          console.log(result)
          setModal(false)
          await Linking.openURL(result.data.attributes.checkout_url);
          navigation.navigate('MeFree1')
          navigation.navigate('Today1')
        })
    }
  const subscription=async()=>{
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/subscription");
    const data = await resp1.json();
    const object = data.filter(function(datas){
      return datas.id>global.subs
    });
    setData(object)
  }
  useEffect(() => {
    subscription()
  }, []);
    return( 
    <>
      <ImageBackground source={require('../../assets/subscribe/subscribe.png')}  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <SafeAreaView>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
           <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#6A98CA', }}>
              <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#6A98CA'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginTop: verticalScale(20), color: '#6A98CA', fontWeight: '600' }}>Proceed to Payment?</Text>
              <View style={{width: width-scale(150), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: verticalScale(20), borderWidth: 0.5, borderColor: '#6A98CA', padding: verticalScale(10), }}>
                <Text style={{fontSize: scale(11), color: '#6A98CA', fontWeight: '600'}}>Subtotal: </Text>
                <Text style={{fontSize: scale(11), color: '#6A98CA', fontWeight: '600'}}>1800</Text>
              </View>
              <View style={{width: width-130, marginTop: verticalScale(20), marginBottom: verticalScale(20), flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>[setModal(false), pay()]} style={{width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setModal(false)} style={{width: (width-150)/2, backgroundColor: 'white', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color:'#6A98CA'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal1}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#6A98CA', }}>
              <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#6A98CA'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Magus Premium</Text>
              </View>
              <View style={{width: width-scale(150), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: verticalScale(20), borderWidth: 0.5, borderColor: '#6A98CA', padding: verticalScale(10), }}>
                <Text style={{fontSize: scale(11), color: '#6A98CA', fontWeight: '600'}}>Subtotal: </Text>
                <Text style={{fontSize: scale(11), color: '#6A98CA', fontWeight: '600'}}>1800</Text>
              </View>
              <View style={{width: width-scale(150), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: verticalScale(20), borderWidth: 0.5, borderColor: '#6A98CA', padding: verticalScale(10), }}>
                <TextInput placeholder={"Enter Promo Code"} value={text} onChangeText={val=> setError("Promo Code does not exist.")}  style={{fontSize: scale(11), color: '#6A98CA', fontWeight: '600'}}/>
              </View>
              {error ? (<Text style={{textAlign: 'center', color: '#FF6A6A', fontSize: scale(10), marginTop: verticalScale(10), fontWeight: '600' }}>{error}</Text>) : null}
              <View style={{width: width-130, marginTop: verticalScale(20), marginBottom: verticalScale(20), flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>setError("Promo Code does not exist.")} style={{width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Proceed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> [setModal1(false), setModal(true)]} style={{width: (width-150)/2, backgroundColor: 'white', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color:'#6A98CA'}}>Skip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          
        </Modal>  
        <View style={{flexDirection: 'row', alignItems: 'center', ...Platform.select({android: {marginTop: -10}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30,justifyContent: 'flex-start'}}>
          <TouchableOpacity onPress={()=> [navigation.navigate("MeFree1")]} style={{width: scale(38), height: scale(38)}} >
            <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', backgroundColor: '#114F76', borderRadius: 5, marginTop: verticalScale(10),justifyContent: 'center',  alignItems: 'center', marginHorizontal: 40, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8}}>
          <Text style={{fontSize: scale(19), textAlign: 'center', color: '#fff', padding: 20}}>Unlock Magus Premium</Text>
              <View style={{backgroundColor: 'white', width: scale(35), height: scale(35), borderRadius: 100, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                <Image source={require('../../assets/icon1.png')} style={{width: scale(25), height: scale(25), alignSelf: 'center'}} />
              </View>
        </View>
        <View style={{marginHorizontal: 40, marginTop: 30}}>
              <View style={{flexDirection: 'row', marginRight: 0, marginBottom: 10, alignItems: 'center', padding: 10 }}>
                <View style={{ width: 30, height: 30, borderRadius: 100, borderColor: 'white', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/87/87932.png'}} style={{width: 21, height: 21, tintColor: 'white'}}/>
                </View>
                <RandomText marginLeft={10} color={'white'} fontSize={scale(15)} marginRight={30} textAlign={'justify'} message={"Gain access to exclusive titles."} />
              </View>
              <View style={{flexDirection: 'row', marginRight: 0, marginBottom: 10, alignItems: 'center', padding: 10 }}>
                <View style={{ width: 30, height: 30, borderRadius: 100, borderColor: 'white', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/87/87932.png'}} style={{width: 21, height: 21, tintColor: 'white'}}/>
                </View>
                <RandomText marginLeft={10} color={'white'} fontSize={scale(15)} marginRight={30} textAlign={'justify'} message={"Explore more combination with advanced curated playlist."} />
              </View>
              <View style={{flexDirection: 'row', marginRight: 0, marginBottom: 10, alignItems: 'center', padding: 10 }}>
                <View style={{ width: 30, height: 30, borderRadius: 100, borderColor: 'white', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/87/87932.png'}} style={{width: 21, height: 21, tintColor: 'white'}}/>
                </View>
                <RandomText marginLeft={10} color={'white'} fontSize={scale(15)} marginRight={30} textAlign={'justify'} message={"Enjoy premium versions with stronger power and effects."} />
              </View>
              <View style={{flexDirection: 'row', marginRight: 0, marginBottom: 10, alignItems: 'center', padding: 10 }}>
                <View style={{ width: 30, height: 30, borderRadius: 100, borderColor: 'white', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/87/87932.png'}} style={{width: 21, height: 21, tintColor: 'white'}}/>
                </View>
                <RandomText marginLeft={10} color={'white'} fontSize={scale(15)} marginRight={30} textAlign={'justify'} message={"Listen with more volume control options."} />
              </View>
        </View>
        <TouchableOpacity onPress={()=> setModal1(true)} style={{ backgroundColor: '#049DD9', borderRadius: 20, marginTop: verticalScale(20),justifyContent: 'center',  alignItems: 'center', marginHorizontal: scale(60), shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8}}>
          <Text style={{fontSize: scale(17), color: '#fff', padding: 20}}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>      
      </ImageBackground>
    </>
    )
}
const styles = StyleSheet.create({
  viewCard:{borderBottomStartRadius: 20, backgroundColor: 'white', borderBottomEndRadius: 20, borderTopEndRadius: 10, borderTopStartRadius: 10, marginBottom: 20, paddingBottom: 20, borderWidth: 3},
  sub: {height: 55, backgroundColor: '#4C89C6', borderRadius: 10, marginTop: 25,justifyContent: 'center',  alignItems: 'center', marginHorizontal: 40, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8},
  text2: {fontSize: 13, textAlign: 'justify', lineHeight: 28, marginRight: 15, },
  text1: {fontSize: 15, marginRight: 15, fontWeight: 'bold', marginTop: 20}
  
})

export default PaymentTab;

/*<ScrollView style={{paddingHorizontal: 30, marginBottom: 80, marginTop: 20}}>
          <View>
             
            {upgrade()}
            
          </View>
        </ScrollView> */