import React, { useState, useEffect, useContext } from "react";
import { Linking, Modal, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
import Moment from 'moment';
import RandomText from "../texts/RandomText";
import { scale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
const SubName =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [data, setData] = useState([])
  const [plan, setPlan] = useState('')
  const [end, setEnd] = useState('')
  const [start, setStart] = useState('')
  const [status, setStatus] = useState('')
  const [unmount, setUnmount] = useState(true)
  const [pending, setPending] = useState(false)
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const subscribe = async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/user");
    const data = await resp.json();
    if(unmount){
      const index =data.findIndex(object => {
        return object.user_id=== global.id;
      })
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/subscription")
      const data1 = await resp1.json();
      const object = data1.find(obj => obj.id === Number(data[index].info.subscription_id));
      setPlan(object.name)
      if(global.subs==1){
        setStatus("Inactive")
      }
      else if(data[index].info.subscription_status==1){
        setStatus("Active")
      }else if(data[index].info.subscription_status==2){
        setStatus("Cancelled")
      }else{
        setStatus("Expired")
      }
      setData(data[index])

      setEnd(data[index].info.subscription_end)
      setStart(data[index].info.subscription_start)
    }
  }
  useEffect(()=>{
    paying()
    global.standard="Loaded"
    subscribe()
    return()=> setUnmount(false)
  }, [plan, data]);
  const cancel=()=>{
    if(status=="Active" && global.subs!=1){
      return(
        <TouchableOpacity onPress={()=> navigation.navigate("UpdatePass")} style={{alignItems: 'center', marginTop: 20, paddingBottom: 30}}>
          <RandomText fontSize={scale(10)} fontWeight={'bold'} color={'rgba(24,119,242,1)'} message={"Cancel"}/>
        </TouchableOpacity>
      )
    }
  }
  const paying =async()=>{
    await fetch(`https://dev.node.magusaudio.com/api/v1/payment/verify/pending`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        user_id: global.id
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        if(result.message=="Pending subscription found."){
          setPending(true)
        }else{
          setPending(false)
        }
      })
  }
  const renew=()=>{
    console.log(status)
    if(pending==true || status=="Cancelled"){
      setModal(true)
    }else{
      if(plan=="Free"){
        setModal1(true)
      }else{
        setModal2(true)
      }
    }
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      if(width*2<=height){
        return scale(65);
      }else{
        return scale(40);
      }
    }
    else{
      return scale(200);
    }
  }
  const buttons= async(subs, amount1)=>{
    const resp11 = await fetch("https://dev.magusaudio.com/api/v1/subscription");
    const data11 = await resp11.json();
    const index =data11.findIndex(object => {
      return object.name === plan;
    })
    
    await fetch(`https://dev.node.magusaudio.com/api/v1/payment/create`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: Number(data11[index].amount+'00'), description: 'Payment from ' + global.mainname, 
      remarks: '', subscription_id: index, user_id: global.id
      })
    })
    .then(res =>{
      return res.json();
    })
    .then(async(result) =>{
      await Linking.openURL(result.data.attributes.checkout_url);
    })
  }
  return(
    <ImageBackground source={require('../../assets/me/profilebg.png')} style={{width: width, height: height}}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{height: 200, backgroundColor: 'white', width: width-100, borderRadius: 20,  alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{textAlign: 'center', fontSize: 18, }}>Pending subscription found.</Text>
              <View style={{width: width-130, marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={()=> setModal(false)} style={{width: (width-150)/3, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 20, padding: 10, marginRight: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Okay</Text>
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
            <View style={{height: 200, backgroundColor: 'white', width: width-100, borderRadius: 20,  alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{textAlign: 'center', fontSize: 18, }}>Please upgrade your subscription plan first.</Text>
              <View style={{width: width-130, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=> setModal1(false)} style={{width: (width-150)/2, backgroundColor: '#7EC8E3', borderRadius: 20, padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> [setModal1(false), navigation.navigate('PaymentTab')]} style={{width: (width-150)/2, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 20, padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal2}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{height: 200, backgroundColor: 'white', width: width-100, borderRadius: 20,  alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{textAlign: 'center', fontSize: 18, }}>Are you sure you want to renew you {plan} plan?</Text>
              <View style={{width: width-130, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=> setModal2(false)} style={{width: (width-150)/2, backgroundColor: '#7EC8E3', borderRadius: 20, padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> [buttons()]} style={{width: (width-150)/2, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 20, padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: 38}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> [navigation.navigate("MeFree1")]} style={{width: scale(38), height: scale(38)}} >
          <Image  source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26), marginTop: scale(4)}} />
          </TouchableOpacity>
        </View>
        <View style={{left: 40, marginTop: 0, right: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: scale(20), color: '#0D0D0D', fontWeight: 'bold', }} >Subscription Details</Text>
        </View>
        <ScrollView style={{marginBottom: space()}}>
        <Image source={require('../../assets/me/subs.png')} style={{width: scale(130), height: scale(130), alignSelf: 'center',}}/>

          <View style={{marginTop: scale(20), marginHorizontal: 50}}>
            <Text style={{ fontSize: scale(16), color: '#0D0D0D', fontWeight: 'bold'}} >Subscription Plan:</Text>
            <Text style={{ fontSize: scale(14), color: '#505050', fontWeight: '700', marginLeft: 20, marginTop: 5}} >{plan}</Text>
          </View>
          <View style={{marginTop: scale(10), marginHorizontal: 50}}>
            <Text style={{ fontSize: scale(16), color: '#0D0D0D', fontWeight: 'bold'}} >Start Date:</Text>
            <Text style={{ fontSize: scale(14), color: '#505050', fontWeight: '700', marginLeft: 20, marginTop: 5}} >{Moment(start).format('MMMM DD, YYYY')}</Text>
          </View>
          <View style={{marginTop: scale(10), marginHorizontal: 50}}>
            <Text style={{ fontSize: scale(16), color: '#0D0D0D', fontWeight: 'bold'}} >End Date:</Text>
            <Text style={{ fontSize: scale(14), color: '#505050', fontWeight: '700', marginLeft: 20, marginTop: 5}} >{Moment(end).format('MMMM DD, YYYY')}</Text>
          </View>
        

      </ScrollView>
    </ImageBackground>
  )
}

export default SubName;
/*
<TouchableOpacity onPress={()=> renew()} style={{height: scale(47), backgroundColor: '#4C89C6', borderRadius: 10, marginTop: 30,justifyContent: 'center',  alignItems: 'center', marginHorizontal: 50, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8}}>
          <Text style={{fontSize: scale(14), fontWeight: 'bold', color: '#fff'}}>Renew</Text>
        </TouchableOpacity>
        
        {cancel()} */