import React, {useEffect, useContext, useState} from "react";
import { ImageBackground, FlatList, Modal, View, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CachedImage from 'expo-cached-image'
import { Image as Image1 } from "react-native";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
import Moment from 'moment';
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Me = ({navigation}) =>{
  const [moodList, setMoodList] = useState([]);
  const [moods, setMoods] = useState([]);
  const [myStatus, setMyStatus] = useState(false);
  const {value, setValue} = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [status, setStatus] = useState([]);
  const [color, setColor ] = useState("");
  const [chosen, setChoosen ] = useState(0);
  const myMoodList =async()=>{
    const resp = await fetch(global.link+"api/v1/moods")
    const data = await resp.json();
    setMoodList(data.data)
  }
  const myMoods = async()=>{
    await fetch(global.link+`api/v1/user/moods/history`, {
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
    .then(async(result) =>{
      const resp1 = await fetch(global.link+"api/v1/user");
      const data1 = await resp1.json();
      const user=data1.filter(object=>{
        return object.user_id==global.id
      })
        global.subs=user[0].info.subscription_id
        setMoods(result.data.current_summary);
        if (result.data.current_summary.length==0){
          setMyStatus(false)
        }
        else{
          setMyStatus(true)
        }
    })
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object2=== object1.id.toString() ;
      });
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      myMoods()
      myMoodList()
    });
    return unsubscribe;
  }, [navigation]);
  const moodsHistory = (item, index) => {
    return(
      <View style={{flexDirection: 'row', paddingVertical: moderateScale(8), paddingHorizontal: moderateScale(10), borderRadius: moderateScale(20), justifyContent: 'flex-start', alignItems: 'center', backgroundColor: item.description, marginRight: moderateScale(15)}}>
        <CachedImage source={{uri: item.image}} cacheKey={item.image_name} style={{width: moderateScale(25), height: moderateScale(25)}}/>
        <Text style={{fontSize: moderateScale(13), color: 'white', fontWeight: '600', marginLeft: moderateScale(5)}}>{item.name}</Text>
      </View>
    )
  }
  const out=()=>{
    if(global.standard=="Loaded"){
      if(global.value=="MINIMIZE"){
        global.value="OUT"
        setValue("OUT")
      }
      setModal(true)
    }
  }
  const finallyOut=()=>{
    AsyncStorage.removeItem('id')
    global.id=null
    navigation.reset({
      index: 0, routes: [{name: "Splash"}]
    })
  }
  const statuMe =()=>{
    if(myStatus==true){
      return(
        <>
          <Text style={{ fontSize: moderateScale(22), color: '#0D0D0D', fontWeight: '800', marginBottom: moderateScale(15), alignSelf: 'flex-start', marginTop: moderateScale(15)}} >My Status</Text>
          <View style={{marginLeft: moderateScale(10), marginRight: moderateScale(10)}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', marginBottom: moderateScale(10)}}>
                {
                  (getDifference(moodList, moods)).map((item, index) => {
                    if(index ==0 || index==1 || index==2){
                      return(
                        <View key={index}>
                          {moodsHistory(item, index)}
                        </View>
                      )
                    }
                  })
                }
              </View>
              <View style={{flexDirection: 'row', marginBottom: moderateScale(10)}}>
                {
                  (getDifference(moodList, moods)).map((item, index) => {
                    if(index==3 || index == 4 || index==5){
                      return(
                        <View key={index}>
                          {moodsHistory(item, index)}
                        </View>

                      )
                    }
                  })
                }
              </View>
              <View style={{flexDirection: 'row'}}>
                {
                  (getDifference(moodList, moods)).map((item, index) => {
                    if(index==6 || index==7){
                      return(
                        <View key={index}>
                          {moodsHistory(item, index)}
                        </View>
                      )
                    }
                  })
                }
              </View>
            </View>
          </View>
        </>
      )
    }
  }
  const DATA=[
    {
      id: 1,
      name: require('../../assets/Me/me2/settingswhite.png'),
      name1: require('../../assets/Me/me2/settingscolor.png')
    },
    {
      id: 2,
      name: require('../../assets/Me/me2/paymentwhite.png'),
      name1: require('../../assets/Me/me2/paymentcolor.png')
    },
    {
      id: 3,
      name: require('../../assets/Me/me2/helpwhite.png'),
      name1: require('../../assets/Me/me2/helpcolor.png')
    },
  ]
  const selection = ()=>{
    if(chosen==0){
      return(
        <>
          <View style={{height: moderateScale(55), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/myplaylist.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Playlists</Text>
          </View>
          <View style={{height: moderateScale(55), marginTop: moderateScale(10), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/myfav.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Favorites</Text>
          </View>
          <View style={{height: moderateScale(55), marginTop: moderateScale(10), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/logoutt.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Logout</Text>
          </View>
        </>
      )
    }else if (chosen==1){
      return(
        <>
          <View style={{height: moderateScale(55), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/pass.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Change Password</Text>
          </View>
          <View style={{height: moderateScale(55), marginTop: moderateScale(10), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/delete.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Delete Account</Text>
          </View>
        </>
      )
    }else if (chosen==3){
      return(
        <>
          <View style={{height: moderateScale(55), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/guide.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Subliminal Guide</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate("Privacy")} style={{height: moderateScale(55), marginTop: moderateScale(10), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/privacy.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Privacy and Policy</Text>
          </TouchableOpacity>
          <View style={{height: moderateScale(55), marginTop: moderateScale(10), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/faqs.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>FAQS</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("Terms")} style={{height: moderateScale(55), marginTop: moderateScale(10), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/terms.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Terms and Conditions</Text>
          </TouchableOpacity>
          <View style={{height: moderateScale(55), marginTop: moderateScale(10), flexDirection: 'row', borderRadius: moderateScale(5), alignItems: 'center', width: width-moderateScale(50), marginHorizontal: moderateScale(15), backgroundColor: 'white', elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, }}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#427AB3', borderRadius: 100, marginLeft: moderateScale(10), height: moderateScale(40), width: moderateScale(40)}}>
              <Image1 source={require('../../assets/Me/me2/contact.png')} style={{height: moderateScale(30), width: moderateScale(30)}}/>
            </View>
            <Text style={{color: '#427AB3', marginLeft: moderateScale(10), fontSize: moderateScale(13), fontWeight: '700'}}>Contact Us</Text>
          </View>
        </>
      )
    }
  }
  return(
    <ImageBackground source={require('../../assets/Me/me2/mebg.png')} style={styles.container}>
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
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Logout</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginTop: verticalScale(20), color: '#6A98CA', fontWeight: '600' }}>Are you sure you want to logout?</Text>
              <View style={{width: width-130, marginTop: verticalScale(20), marginBottom: verticalScale(20), flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>[finallyOut()]} style={{width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Proceed</Text>
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
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginBottom: verticalScale(20), marginTop: verticalScale(20), color: '#6A98CA', fontWeight: '600' }}>Pending subscription found!</Text>
              <TouchableOpacity onPress={()=>setModal1(false)} style={{marginBottom: verticalScale(20), width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.bottomView}>              
        </View>
        <View style={{width: width-moderateScale(20), height: height, marginTop: moderateScale(225), marginHorizontal: moderateScale(10)}}>
          <View style={{width: moderateScale(120), height: moderateScale(120), backgroundColor: 'white', alignSelf: 'center', borderRadius: 500}}></View>
          <CachedImage source={{uri: global.maincover}} cacheKey={global.main_cover} style={{width: moderateScale(105), height: moderateScale(105), marginTop: -moderateScale(110), alignSelf: 'center', borderRadius: 100, shadowColor: 'rgba(4,157,217,0.4)', shadowOpacity: 0.8, shadowOffset: {width:2, height: 2}, shadowRadius: 3}} />
          <View style={{ alignItems: 'center', width: width-moderateScale(20), marginTop: moderateScale(10)}}>
            <Text style={{fontSize: moderateScale(16), color: '#427AB3', fontWeight: '800'}} >{global.mainname}</Text>
            <Text style={{fontSize: moderateScale(10), color: '#427AB3', fontWeight: '600', marginTop: moderateScale(3), textDecorationLine: 'underline',}} >{global.email}</Text> 
            <Text style={{fontSize: moderateScale(10), color: '#427AB3', fontWeight: '700', marginTop: moderateScale(3)}} >Member since {Moment(global.member).format('MMM DD, YYYY')}</Text>
          </View>
          <View style={{ alignItems: 'center', height: height, width: width-moderateScale(20), marginTop: moderateScale(15)}}>
            <View style={{justifyContent: 'space-between', alignItems: 'center', width: width-moderateScale(20)}}>
              <FlatList
                data={DATA}
                renderItem={({item}) => 
                <View style={{width: (width/3)-moderateScale(5), alignSelf: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => [item.id===chosen ? setChoosen(0): setChoosen(item.id)]}
                    style={item.id === chosen ? styles.selected : styles.unselected}>
                    <Image1 source={item.id===chosen ? item.name1 : item.name} style={{width: moderateScale(40), height: moderateScale(40)}}/>
                  </TouchableOpacity>
                </View>
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                style={{width: width-moderateScale(20)}}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={{height: height, marginTop: moderateScale(10), paddingTop: moderateScale(10), width: width-moderateScale(20)}}>
              {selection()}
            </View>
          </View>
        </View>
        
      </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  selected: {
    borderRadius: moderateScale(100),
    borderWidth: 1,
    borderColor: 'white',
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(3),
    elevation: 8, shadowColor: 'gray', shadowOpacity: 2, shadowOffset: {width: 1, height:1}, 
  },
  unselected: {
    borderRadius: moderateScale(100),
    borderWidth: 1,
    borderColor: '#427AB3',
    width: moderateScale(50),
    marginVertical: moderateScale(3),
    height: moderateScale(50),
    backgroundColor: '#427AB3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    padding: moderateScale(10),
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  unselectedText: {
    padding: moderateScale(10),
    fontSize: moderateScale(13),
    textAlign: 'center',
  },
  bottomView: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute', 
    ...Platform.select({android: {top: height/2.8}, ios:{top: height/2.612}}), borderTopRightRadius: moderateScale(25), borderTopLeftRadius: moderateScale(25)
  },
});
export default Me;