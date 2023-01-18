import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ImageBackground, Linking, Modal, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
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
  const [newsubs, setNewsubs] = useState(false);
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(false);
  const [color, setColor] = useState('#69C8C8');
  
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
          body: JSON.stringify({amount: amount, description: 'Payment from ' + global.mainname, 
          remarks: '', subscription_id: newsubs, user_id: global.id
          })
          
        })
        .then(res =>{
          return res.json();
        })
        .then(async(result) =>{
          global.subscribe=false
          setModal(false)
          await Linking.openURL(result.data.attributes.checkout_url);
          navigation.navigate('MeFree1')
          navigation.navigate('Today1')
        })
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
              <TouchableOpacity onPress={()=> buttons(3, 10000)}>
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
              <TouchableOpacity onPress={()=> buttons(4, 35000)} >
                <PaymentCard title={"Pro"} color={"#5B9ACF"}/>
              </TouchableOpacity>
              <View style={{backgroundColor: 'white', width: 35, height: 35, borderRadius: 100, marginTop: -39, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginRight: 5}}>
                <Image source={require('../../assets/icon1.png')} style={{width: 25, height: 25, alignSelf: 'center'}} />
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
    const upgrade =()=>{
      if(global.subs==1){
        return(
          <>
            {exclusive()}
            {ideal()}
            {pro()}
            {premium()}
            {platinum()}
          </>
        )
      }else if(global.subs==2){
        return(
          <>
            {ideal()}
            {pro()}
            {premium()}
            {platinum()}
          </>
        )
      }else if(global.subs==3){
        return(
          <>
            {pro()}
            {premium()}
            {platinum()}
          </>
        )
      }else if(global.subs==4){
        return(
          <>
            {premium()}
            {platinum()}
          </>
        )
      }else if(global.subs==5){
        return(
          <>
            {platinum()}
          </>
        )
      }
      
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
      <ImageBackground source={require('../../assets/subscribe/playbg.png')}  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <SafeAreaView>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{height: 200, backgroundColor: 'white', width: width-100, borderRadius: 20,  alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{textAlign: 'center', fontSize: 18, }}>Are you sure you want to upgrade you plan?</Text>
              <View style={{width: width-130, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=> setModal(false)} style={{width: (width-150)/2, backgroundColor: '#7EC8E3', borderRadius: 20, padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>pay()} style={{width: (width-150)/2, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 20, padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          
        </Modal>
        <View style={{flexDirection: 'row', alignItems: 'center', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30,justifyContent: 'flex-start'}}>
          <TouchableOpacity onPress={() => [global.subscribe=false, navigation.goBack()]} style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}} >
            <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>
          <RandomText fontSize={23} color={'black'} fontWeight={'bold'} message={"Payment"} />
          
        </View>
        <RandomText fontSize={22} color={'black'} message={"Upgrade your Plan"} textAlign={"center"} fontWeight={"bold"} marginTop={20}/>
        <RandomText fontSize={12} color={'black'} message={"Full access to volume controls and layering."} textAlign={"center"} fontWeight={"normal"} marginTop={5}/>
        <RandomText fontSize={12} color={'black'} message={"Listen with stronger subliminal power."} textAlign={"center"} fontWeight={"normal"} marginTop={5}/>
        <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <View style={[styles.viewCard, {borderColor: color}]}>
              <TouchableOpacity onPress={()=> buttons(item.id, Number(item.amount+"00"))}>
                { item.name=="Exclusive" ? <PaymentCard title={item.name} color={"#C8C169"}/> 
                : item.name=="Ideal Wealth" ? <PaymentCard title={item.name} color={"#FF6680"}/> 
                : item.name=="Pro" ? <PaymentCard title={item.name} color={"#5B9ACF"}/>
                : item.name=="Premium" ? <PaymentCard title={item.name} color={"#8F6ACA"}/>
                : item.name=="Platinum" ? <PaymentCard title={item.name} color={"#69C8C8"}/>
                : <PaymentCard title={item.name} color={"gray"}/>}
              </TouchableOpacity>
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <TouchableOpacity onPress={()=> buttons(item.id, Number(item.amount+"00"))}>
                  <PaymentCheck color={color} message={item.description}/>
                 
                </TouchableOpacity>
              </ScrollView>
            </View>
          </>
        )}
        keyExtractor={(item) => item.id}
        style={{marginTop: 10, marginHorizontal: 30}}
        showsVerticalScrollIndicator={false}
      />
      
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