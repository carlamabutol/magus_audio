LogBox.ignoreAllLogs();
import { Dimensions, StatusBar, FlatList, TextInput, Modal, ScrollView, ImageBackground, StyleSheet, Image, TouchableOpacity, Text, View, LogBox, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useMemo, useRef, } from 'react';
import Slider from '@react-native-community/slider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { StateContext } from './StateContext';
import { UserContext } from './UserContext';
import {Audio} from "expo-av";
import arrayShuffle from 'array-shuffle';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CachedImage from 'expo-cached-image'
import My_Subs from './mysubs/MySubs';
import Search from './mysubs/Search';
import Today from './today/Today';
import Featured from './today/Featured';
import Discover from './today/Discover.copy';
import Playlist from './today/Playlist';
import Playlist1 from './me/Playlist';
import Me from './me/Me';
import Favorites from './me/Favorites';
import MyPlay_List from './me/MyPlay_List';
import Help from './me/help/Help';
import Privacy from './me/help/Privacy';
import Terms from './me/help/Terms';
import SubGuide from './me/help/SubGuide';
import Settings1 from './me/help/Settings';
import Play_List from './me/Play_List';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet/";

const Tab= createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const PlayStack=()=>{
  return(
    <Stack.Navigator initialRouteName='MySubs' screenOptions={{headerShown: false,
      animation: "fade_from_bottom"}}>
      <Stack.Screen name='MySubs' component={My_Subs}/>
      <Stack.Screen name='Search' component={Search}/>
    </Stack.Navigator>
  )
}
const PlayStack2=()=>{
  return(
    <Stack.Navigator initialRouteName='Today1' screenOptions={{headerShown: false,
      animation: "fade_from_bottom"}}>
      <Stack.Screen name='Today1' component={Today}/>
      <Stack.Screen name='Featured' component={Featured}/>
      <Stack.Screen name='Discover' component={Discover}/>
      <Stack.Screen name='Playlist' component={Playlist}/>
    </Stack.Navigator>
  )
}
const PlayStack3=()=>{
  return(
    <Stack.Navigator initialRouteName='Me1' screenOptions={{headerShown: false,
      animation: "fade_from_bottom"}}>
      <Stack.Screen name='Me1' component={Me}/>
      <Stack.Screen name='Favorites' component={Favorites}/>
      <Stack.Screen name='Playlist1' component={Playlist1}/>
      <Stack.Screen name='MyPlay_List' component={MyPlay_List}/>
      <Stack.Screen name='Play_List' component={Play_List}/>
      <Stack.Screen name='Help' component={Help}/>
      <Stack.Screen name='Privacy' component={Privacy}/>
      <Stack.Screen name='Settings' component={Settings1}/>
      <Stack.Screen name='Terms' component={Terms}/>
      <Stack.Screen name='SubGuide' component={SubGuide}/>
    </Stack.Navigator>
  )
}
const Home =({navigation}) =>{
  const width1=Dimensions.get('screen').width;
  const width=Dimensions.get('window').width;
  const height1=Dimensions.get('screen').height;
  const height=Dimensions.get('window').height;
  const route = useRoute();
  const [biggerNext, setBiggerNext] = useState(false)
  const [indx, setIndx] = useState(0);
  const [time, setTime] = useState(1);
  const [value, setValue] = useState("");
  const [subliminal, setSubliminal] = useState("");
  const [playbackObj, setPlaybackObj] = useState([]);
  const [playbackObj1, setPlaybackObj1] = useState([]);
  const [playbackObj2, setPlaybackObj2] = useState([]);
  const [playbackObj3, setPlaybackObj3] = useState([]);
  const [universalArray, setUniversalArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState("playing");
  const [soundObj, setSoundObj] = useState('');
  const [soundObj1, setSoundObj1] = useState('');
  const [soundObj2, setSoundObj2] = useState('');
  const [soundObj3, setSoundObj3] = useState('');
  const [tap, setTap] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [color, setColor] = useState('rgba(4,157,217,0.4)');
  const [error, setError] = useState('');
  const [click, setClick] = useState(1)
  const [colors, setColors] = useState('#6A98CA');
  const [back, setBack] = useState(true);
  const [heart, setHeart] = useState(false);
  const [forward, setForward] = useState(true);
  const [mainloop, setMainloop] = useState(global.looping);
  const [isVolumeClick, setIsVolumeClick] = useState(false);
  const [isGuideClick, setIsGuideClick] = useState(false);
  const [mainshuffle, setMainshuffle] = useState(global.shuffling);
  const [duration, setDuration] = useState(60000);
  const [position, setPosition] = useState(0);
  const [shufflearray, setShufflearray] = useState([]);
  const [vol, setVol] = useState(false);
  const [dati, setDati]=useState(1)
  const [data25, setData25]=useState([])
  const [min, setMin]=useState(false)
  const [text, setText] = useState('')
  const [unmount, setUnmount] = useState(true);
  const [modal, setModal] = useState(false);
  const [modal3, setModal3] = useState(true);
  const [modal_playlist, setModalPlaylist] = useState(false);
  const [modal_guide, setModalGuide] = useState(false);
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['87%', '10%'], []);
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const fetchSubs=async()=>{
    const resp1 = await fetch(global.link+"api/v1/user");
    const data1 = await resp1.json();
    const user=data1.filter(object=>{
      return object.user_id==global.id
    })
    global.subs=user[0].info.subscription_id
    const resp = await fetch(global.link+"api/v1/subliminal");
    const data = await resp.json();
    const array = data.filter(object=>{
      return object.subscription_id.includes(user[0].info.subscription_id)
    })
    global.data=array
    global.datas=array
    setShufflearray(arrayShuffle(array))
  }
   useEffect(() => {
    fetchSubs()
    Audio.setAudioModeAsync({
       allowsRecordingIOS: false,
       shouldDuckAndroid: true,
       interruptionModeIOS: 1,
       playsInSilentModeIOS: true,
       interruptionModeAndroid: 1,
       staysActiveInBackground: true,
       playThroughEarpieceAndroid: true,
    })
    return()=> setUnmount(false)

   }, []);
   
  const renderPlayPauseBtn =()=>{
    if(isPlaying=='playing'){
      return (
        <TouchableOpacity onPress={()=> playpause()} style={{backgroundColor: '#427AB3', justifyContent: 'center', alignItems: 'center', height: moderateScale(62), width: moderateScale(62), borderRadius: moderateScale(100) }}>
          <Image source={require('../assets/Player/pause.png')}
            style={{width: moderateScale(40), height: moderateScale(40), tintColor: 'white'}}/>
        </TouchableOpacity>
      )
    }else{
      return (
        <TouchableOpacity onPress={()=> playpause()} style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: moderateScale(62), width: moderateScale(62), borderRadius: moderateScale(100) }}>
          <Image source={require('../assets/Player/play.png')}
            style={{marginLeft: moderateScale(5), width: moderateScale(40), height: moderateScale(40), tintColor: '#427AB3'}}/>
        </TouchableOpacity>
      )
    }
  }
  const renderPlayPauseBtn1 =() => {
    if(isPlaying=="playing"){
      return(
        <TouchableOpacity onPress={()=> [console.log("il"), playpause()]} style={{}}>
          <Image source={require('../assets/Player/pause.png')}
            style={{width: moderateScale(25), height: moderateScale(25), tintColor: 'white'}}/>
        </TouchableOpacity>
      )
    }else{
      return (
        <TouchableOpacity onPress={()=> [console.log('uo'), playpause()]} style={{}}>
          <Image source={require('../assets/Player/play.png')}
            style={{width: moderateScale(25), height: moderateScale(25), tintColor: 'white'}}/>
        </TouchableOpacity>
      )
    }
  }
  const playpause = async()=>{
    if(global.standard=="Loaded"){
      if(isPlaying=='playing'){
        setIsPlaying('paused')
        if(global.length==1){
          const status = await playbackObj.setStatusAsync({shouldPlay: false})
          return [setSoundObj(status)]
        }else if(global.length==2){
          const status = await playbackObj.setStatusAsync({shouldPlay: false})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: false})
          return [setSoundObj(status), setSoundObj1(status1)]
        }else if(global.length==3){
          const status = await playbackObj.setStatusAsync({shouldPlay: false})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: false})
          const status2 = await playbackObj2.setStatusAsync({shouldPlay: false})
          return [setSoundObj(status), setSoundObj1(status1), setSoundObj2(status2)]
        }else if(global.length==4){
          const status = await playbackObj.setStatusAsync({shouldPlay: false})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: false})
          const status2 = await playbackObj2.setStatusAsync({shouldPlay: false})
          const status3 = await playbackObj3.setStatusAsync({shouldPlay: false})
          return [setSoundObj(status), setSoundObj1(status1), setSoundObj2(status2), setSoundObj3(status3)]
        }
      }
      else{
        setIsPlaying('playing')
        if(global.length==1){
          const status = await playbackObj.setStatusAsync({shouldPlay: true})
          return [setSoundObj(status)]
        }else if(global.length==2){
          const status = await playbackObj.setStatusAsync({shouldPlay: true})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: true})
          return [setSoundObj(status), setSoundObj1(status1)]
        }else if(global.length==3){
          const status = await playbackObj.setStatusAsync({shouldPlay: true})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: true})
          const status2 = await playbackObj2.setStatusAsync({shouldPlay: true})
          return [setSoundObj(status), setSoundObj1(status1), setSoundObj2(status2)]
        }else if(global.length==4){
          const status = await playbackObj.setStatusAsync({shouldPlay: true})
          const status1 = await playbackObj1.setStatusAsync({shouldPlay: true})
          const status2 = await playbackObj2.setStatusAsync({shouldPlay: true})
          const status3 = await playbackObj3.setStatusAsync({shouldPlay: true})
          return [setSoundObj(status), setSoundObj1(status1), setSoundObj2(status2), setSoundObj3(status3)]
        }
      }
    }else{
      console.log("WAIT")
    }
  }
  const loos =async()=>{
    if(global.playlist1==true){
      console.log('ooo')
      if(global.looping==false){
        global.looping=='one'
        if(global.length==2){
          await playbackObj.setStatusAsync({isLooping:true})
          await playbackObj1.setStatusAsync({isLooping:true})
        }else if(global.length==3){
          await playbackObj.setStatusAsync({isLooping:true})
          await playbackObj1.setStatusAsync({isLooping:true})
          await playbackObj2.setStatusAsync({isLooping:true})
        }else if(global.length==4){
          await playbackObj.setStatusAsync({isLooping:true})
          await playbackObj1.setStatusAsync({isLooping:true})
          await playbackObj2.setStatusAsync({isLooping:true})
          await playbackObj3.setStatusAsync({isLooping:true})
        }
      }else if(global.looping=='one'){
        global.looping='list'
        if(global.length==2){
          await playbackObj.setStatusAsync({isLooping:false})
          await playbackObj1.setStatusAsync({isLooping:false})
        }else if(global.length==3){
          await playbackObj.setStatusAsync({isLooping:false})
          await playbackObj1.setStatusAsync({isLooping:false})
          await playbackObj2.setStatusAsync({isLooping:false})
        }else if(global.length==4){
          await playbackObj.setStatusAsync({isLooping:false})
          await playbackObj1.setStatusAsync({isLooping:false})
          await playbackObj2.setStatusAsync({isLooping:false})
          await playbackObj3.setStatusAsync({isLooping:false})
        }
        console.log('repeat list')
      }else if(global.looping=='list'){
        global.looping=false
      }
    }else{
      if(global.looping=='one'){
        console.log('jddj')
        global.looping=false
        if(global.length==2){
          await playbackObj.setStatusAsync({isLooping:false})
          await playbackObj1.setStatusAsync({isLooping:false})
        }else if(global.length==3){
          await playbackObj.setStatusAsync({isLooping:false})
          await playbackObj1.setStatusAsync({isLooping:false})
          await playbackObj2.setStatusAsync({isLooping:false})
        }else if(global.length==4){
          await playbackObj.setStatusAsync({isLooping:false})
          await playbackObj1.setStatusAsync({isLooping:false})
          await playbackObj2.setStatusAsync({isLooping:false})
          await playbackObj3.setStatusAsync({isLooping:false})
        }
        return global.looping=false
      }else{
        console.log('one')
        global.looping='one'
        if(global.length==2){
          await playbackObj.setStatusAsync({isLooping:true})
          await playbackObj1.setStatusAsync({isLooping:true})
        }else if(global.length==3){
          await playbackObj.setStatusAsync({isLooping:true})
          await playbackObj1.setStatusAsync({isLooping:true})
          await playbackObj2.setStatusAsync({isLooping:true})
        }else if(global.length==4){
          await playbackObj.setStatusAsync({isLooping:true})
          await playbackObj1.setStatusAsync({isLooping:true})
          await playbackObj2.setStatusAsync({isLooping:true})
          await playbackObj3.setStatusAsync({isLooping:true})
        }
        return global.looping='one'

      }
    }
  }
  const loopingno=async()=>{
    if(global.length==1){
      await playbackObj.setStatusAsync({isLooping:false})
    }else if(global.length==2){
      await playbackObj.setStatusAsync({isLooping:false})
      await playbackObj1.setStatusAsync({isLooping:false})
    }else if(global.length==3){
      await playbackObj.setStatusAsync({isLooping:false})
      await playbackObj1.setStatusAsync({isLooping:false})
      await playbackObj2.setStatusAsync({isLooping:false})
    }else if(global.length==4){
      await playbackObj.setStatusAsync({isLooping:false})
      await playbackObj1.setStatusAsync({isLooping:false})
      await playbackObj2.setStatusAsync({isLooping:false})
      await playbackObj3.setStatusAsync({isLooping:false})
    }
  }
  const loopingone=async()=>{
    global.looping=('one')
    if(global.length==1){
      await playbackObj.setStatusAsync({isLooping:true})
    }else if(global.length==2){
      await playbackObj.setStatusAsync({isLooping:true})
      await playbackObj1.setStatusAsync({isLooping:true})
    }else if(global.length==3){
      await playbackObj.setStatusAsync({isLooping:true})
      await playbackObj1.setStatusAsync({isLooping:true})
      await playbackObj2.setStatusAsync({isLooping:true})
    }else if(global.length==4){
      await playbackObj.setStatusAsync({isLooping:true})
      await playbackObj1.setStatusAsync({isLooping:true})
      await playbackObj2.setStatusAsync({isLooping:true})
      await playbackObj3.setStatusAsync({isLooping:true})
    }
  }
  const loopinglist=()=>{
    global.looping=('list')
    global.repeat=true
    console.log('repeat')
  }
  const loopingno2=async()=>{
    global.looping=('no')
    global.repeat=false
    if(global.length==1){
      await playbackObj.setStatusAsync({isLooping:false})
    }else if(global.length==2){
      await playbackObj.setStatusAsync({isLooping:false})
      await playbackObj1.setStatusAsync({isLooping:false})
    }else if(global.length==3){
      await playbackObj.setStatusAsync({isLooping:false})
      await playbackObj1.setStatusAsync({isLooping:false})
      await playbackObj2.setStatusAsync({isLooping:false})
    }else if(global.length==4){
      await playbackObj.setStatusAsync({isLooping:false})
      await playbackObj1.setStatusAsync({isLooping:false})
      await playbackObj2.setStatusAsync({isLooping:false})
      await playbackObj3.setStatusAsync({isLooping:false})
    }
  }
  const loopImage=()=>{
    if(global.playlist1==true){
      return(
        <>
        {
          mainloop=='no' || global.looping=='no' ?
          <TouchableOpacity onPress={()=> [setMainloop('list'), loopinglist()]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', alignItems: 'center', backgroundColor: '#427AB3', borderRadius: scale(50)}}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/9432/9432312.png'}} style={{tintColor: 'white', width: moderateScale(25), height: moderateScale(25)}}/>
          </TouchableOpacity>
        : mainloop=='list' || global.looping=='list' ?
        <TouchableOpacity onPress={()=> [setMainloop('one'), loopingone()]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: scale(50)}}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/9432/9432312.png'}} style={{tintColor: '#427AB3', width: moderateScale(25), height: moderateScale(25)}}/>
          </TouchableOpacity>
        : <TouchableOpacity onPress={()=> [setMainloop('no'), loopingno2()]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: scale(50)}}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/9432/9432265.png'}} style={{tintColor: '#427AB3', width: moderateScale(25), height: moderateScale(25)}}/>
          </TouchableOpacity>
        }
 </>
      )
    }else{
      return(
       <>
              {
                mainloop=='one' ?
                <TouchableOpacity onPress={()=> [setMainloop('no'), loopingno()]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: scale(50)}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/9432/9432265.png'}} style={{tintColor: '#427AB3', width: moderateScale(25), height: moderateScale(25)}}/>
                </TouchableOpacity> 
              : <TouchableOpacity onPress={()=> [setMainloop('one'), loopingone()]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', alignItems: 'center', backgroundColor: '#427AB3', borderRadius: scale(50)}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/9432/9432312.png'}} style={{tintColor: 'white', width: moderateScale(25), height: moderateScale(25)}}/> 
                </TouchableOpacity>
              }
       </>
      )
    }
  }
  const shuffleSUbliminal =async()=>{
        global.shuffling=(false)
        if(global.playlist1==true){
          global.list=global.lists
        }else{
          global.data=global.datas
        }
  }
  const shuffleSUbliminal1 =async()=>{
    global.shuffling=(true)
    if(global.playlist1==true){
      console.log('pp')
      global.list=arrayShuffle(global.lists)
    }else{
      global.data=arrayShuffle(global.datas)
    }
  }
  const volumeone=async (volume)=>{
    const status = await playbackObj.setStatusAsync({volume: volume})
    global.volume1=volume
    return setSoundObj(status)
  
  }
  const volumetwo=async (volume1)=>{
    const status1 = await playbackObj1.setStatusAsync({volume: volume1})
    global.volume2=volume1
  
    return setSoundObj1(status1)
  }
  const volumethree=async (volume1)=>{
    const status1 = await playbackObj2.setStatusAsync({volume: volume1})
    global.volume3=volume1
  
    return setSoundObj2(status1)
  }
  const volumefour=async (volume1)=>{
    const status1 = await playbackObj3.setStatusAsync({volume: volume1})
    global.volume4=volume1
  
    return setSoundObj3(status1)
  }
  const calculate =()=>{
    if(duration!==null && position!==null){
      return position/duration
    }
    return 0
  }
  const adjustSeekbar = async (time) =>{
    if(global.length==2){
      try{
        await playbackObj1.setStatusAsync({positionMillis:time, shouldPlay: true})
        await playbackObj.setStatusAsync({positionMillis:time, shouldPlay: true})
        }catch(e){
          console.log(e)
        }
    }else if(global.length==3){
      try{
        await playbackObj1.setStatusAsync({positionMillis:time})
        await playbackObj.setStatusAsync({positionMillis:time})
        await playbackObj2.setStatusAsync({positionMillis:time})
        }catch(e){
          console.log(e)
        }
    }else if(global.length==4){
      try{
        await playbackObj1.setStatusAsync({positionMillis:time})
        await playbackObj.setStatusAsync({positionMillis:time})
        await playbackObj2.setStatusAsync({positionMillis:time})
        await playbackObj3.setStatusAsync({positionMillis:time})
        }catch(e){
          console.log(e)
        }
    }
    
  }
  const convertTime = time =>{
    if(time!=null){
    const totalSeconds = time / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return(padWithZero(minutes) + ':' + padWithZero(seconds));
    }else{
      return '00:00'
    }
  }
  const onPrev =async()=>{
          universalArray.pop()
          setUniversalArray(universalArray)
          global.array=universalArray
          const object = universalArray[universalArray.length-1]
          global.title=object.title
          global.cover=object.cover
          global.cove_name=object.cover_name
          global.guide=object.guide
          global.description=object.description
          setSubliminal(object)
          global.count=1
          global.subs_id=object.subliminal_id
         
          for(var i=0; i<object.info.length; i++){
            global.length=object.info.length;
            if(object.info.length==2){
              global.track1=object.info[0].track_id;
              global.volume1= object.info[0].audio_type.volume/100
              global.type1=object.info[0].audio_type.name;
              global.track2=object.info[1].track_id;
              global.volume2= object.info[1].audio_type.volume/100
              global.type2=object.info[1].audio_type.name;
            }else if(object.info.length==3){
              global.track1=object.info[0].track_id;
              global.volume1= object.info[0].audio_type.volume/100
              global.type1=object.info[0].audio_type.name;
              global.track2=object.info[1].track_id;
              global.volume2= object.info[1].audio_type.volume/100
              global.type2=object.info[1].audio_type.name;
              global.track3=object.info[2].track_id;
              global.volume3= object.info[2].audio_type.volume/100
              global.type3=object.info[2].audio_type.name;

            }else if(object.info.length==4){
              global.track1=object.info[0].track_id;
              global.volume1= object.info[0].audio_type.volume/100
              global.type1=object.info[0].audio_type.name;
              global.track2=object.info[1].track_id;
              global.volume2= object.info[1].audio_type.volume/100
              global.type2=object.info[1].audio_type.name;
              global.track3=object.info[2].track_id;
              global.volume3= object.info[2].audio_type.volume/100
              global.type3=object.info[2].audio_type.name;
              global.track4=object.info[3].track_id;
              global.volume4= object.info[3].audio_type.volume/100
              global.type4=object.info[3].audio_type.name;
            }
          }
  }
  const prev = async(tap) => {
    setBack(false)
      if(position!=undefined){
        console.log("MEk")
        if(global.length==1){
          await playbackObj.unloadAsync()
        }else if(global.length==2){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
        }else if(global.length==3){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
          await playbackObj2.unloadAsync()
        }else if(global.length==4){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
          await playbackObj2.unloadAsync()
          await playbackObj3.unloadAsync()
        }
        fetchMusic(global.subs_id)
      }
      else{
        if(universalArray.length!=1){
        console.log("yu")
            if(global.length==1){
              await playbackObj.unloadAsync()
            }else if(global.length==2){
              await playbackObj.unloadAsync()
              await playbackObj1.unloadAsync()
            }else if(global.length==3){
              await playbackObj.unloadAsync()
              await playbackObj1.unloadAsync()
              await playbackObj2.unloadAsync()
            }else if(global.length==4){
              await playbackObj.unloadAsync()
              await playbackObj1.unloadAsync()
              await playbackObj2.unloadAsync()
              await playbackObj3.unloadAsync()
            }
            onPrev()
            setTime(3)
        }else{
          console.log("yuk")

        }
      }
    setBack(true)
  }
  const addHistory = async ()=>{
    if(global.length==1){
      global.all = global.volume1*100
    }else if(global.length==2){
      global.all = global.volume1*100 + "," + global.volume2*100
    }else if(global.length==3){
      global.all= global.volume1*100 + "," + global.volume2*100 +","+ global.volume3*100
    }else if(global.length==4){
      global.all= global.volume1*100 + "," + global.volume2*100 +","+ global.volume3*100 +","+ global.volume4*100
    }
    await fetch(global.link+"api/v1/audio/history", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({user_id: global.id, track_id: global.subs_id, track_volume: global.all,
      track_playlist_id: global.subs_id, track_current_time: position, track_duration_time: 60
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      //console.log(result);
    })
  }
  const next = async(tap, pick) => {
    if(global.standard=="Loaded"){
      if(tap==1){
        setForward(false)
        setTap(2)
        addHistory()
        if(global.length==1){
          await playbackObj.unloadAsync()
        }else if(global.length==2){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
        }else if(global.length==3){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
          await playbackObj2.unloadAsync()
        }else if(global.length==4){
          await playbackObj.unloadAsync()
          await playbackObj1.unloadAsync()
          await playbackObj2.unloadAsync()
          await playbackObj3.unloadAsync()
        }
        if(global.playlist1==true){
          console.log("Youtrue")
          myPlayerforAllTypes()
        }else{
          console.log("MEfalse")
          myPlayerforAllTypes1()
        }
      }
      setForward(true)
    }else{
      console.log("Please Wait")
    }
  }
  const plays = async ()=> {
      if(time==1){
        fetchMusic(global.subs_id); 
        setTime(2);
      }else if(time==3){
        setTime(2);
      }else if(time==2){
          if(dati==1){
            await playbackObj.unloadAsync()
            if(time!=3){
            fetchMusic(global.subs_id);}
          }else if(dati==2){
            await playbackObj.unloadAsync()
            await playbackObj1.unloadAsync()
            if(time!=3){
            fetchMusic(global.subs_id);}
          }else if(dati==3){
            await playbackObj.unloadAsync()
            await playbackObj1.unloadAsync()
            await playbackObj2.unloadAsync()
            if(time!=3){
              fetchMusic(global.subs_id);} 
          }else if(dati==4){
            await playbackObj.unloadAsync()
            await playbackObj1.unloadAsync()
            await playbackObj2.unloadAsync()
            await playbackObj3.unloadAsync()
            if(time!=3){
              fetchMusic(global.subs_id);} 
          }
          
          //setTime(1);
      }
  }
  const types1=(object)=>{
        global.subs_id=object.subliminal_id
        global.title=object.title
        global.cover=object.cover
        global.cover_name=object.cover_name
        global.description=object.description
        global.count=1;
        global.category=object.category.name;
        global.guide=object.guide
    for(var i=0; i<object.info.length; i++){
      global.length=object.info.length;
      if(object.info.length==2){
        global.track1=object.info[0].track_id;
        global.volume1= object.info[0].audio_type.volume/100
        global.type1=object.info[0].audio_type.name;
        global.track2=object.info[1].track_id;
        global.volume2= object.info[1].audio_type.volume/100
        global.type2=object.info[1].audio_type.name;

      }else if(object.info.length==3){
        global.track1=object.info[0].track_id;
        global.volume1= object.info[0].audio_type.volume/100
        global.type1=object.info[0].audio_type.name;
        global.track2=object.info[1].track_id;
        global.volume2= object.info[1].audio_type.volume/100
        global.type2=object.info[1].audio_type.name;
        global.track3=object.info[2].track_id;
        global.volume3= object.info[2].audio_type.volume/100
        global.type3=object.info[2].audio_type.name;

      }else if(object.info.length==4){
        global.track1=object.info[0].track_id;
        global.volume1= object.info[0].audio_type.volume/100
        global.type1=object.info[0].audio_type.name;
        global.track2=object.info[1].track_id;
        global.volume2= object.info[1].audio_type.volume/100
        global.type2=object.info[1].audio_type.name;
        global.track3=object.info[2].track_id;
        global.volume3= object.info[2].audio_type.volume/100
        global.type3=object.info[2].audio_type.name;
        global.track4=object.info[3].track_id;
        global.volume4= object.info[3].audio_type.volume/100
        global.type4=object.info[3].audio_type.name;

      }
    }
  }
  const myPlayerforAllTypes1= async()=>{
    if(mainshuffle==true){
      const index =shufflearray.findIndex(object => {
        return object.subliminal_id === global.subs_id;
      })
      if(index+1==shufflearray.length){
          universalArray.push(shufflearray[0])
          setUniversalArray(universalArray)
          global.array=universalArray
          const object = shufflearray[0]
          types1(object)
      }
      else{
        console.log('index')
        console.log(index)
        universalArray.push(shufflearray[index+1])
        setUniversalArray(universalArray)
        global.array=universalArray
        const object = shufflearray[index+1]
        types1(object)
      }
      fetchMusic(global.subs_id)
    }else{
      const index =global.data.findIndex(object => {
        return object.subliminal_id === global.subs_id;
      })
      if(index+1==global.data.length){
          universalArray.push(global.data[0])
          setUniversalArray(universalArray)
          global.array=universalArray
          const object = global.data[0]
          types1(object)
      }
      else{
        console.log(index)
        universalArray.push(global.data[index+1])
        setUniversalArray(universalArray)
        global.array=universalArray
        const object = global.data[index+1]
        types1(object)
      }
      fetchMusic(global.subs_id)
    }
  }
  const myPlayerforAllTypes= async()=>{
    if(mainshuffle==true){
      console.log('toshuffle')
      const index =global.list.findIndex(object => {
        return object.subliminal_id === global.subs_id;
      })
      if(index+1==global.list.length){
          universalArray.push(global.list[0])
          setUniversalArray(universalArray)
          global.array=universalArray
          const object = global.list[0]
          types1(object)
      }
      else{
        console.log("ME0988")
        universalArray.push(global.list[index+1])
        setUniversalArray(universalArray)
        global.array=universalArray
        const object = global.list[index+1]
        types1(object)
      }
      fetchMusic(global.subs_id)
    }else{
      console.log('list lang')
      const index =global.list.findIndex(object => {
        return object.subliminal_id === global.subs_id;
      })
      if(index+1==global.list.length){
          universalArray.push(global.list[0])
          setUniversalArray(universalArray)
          global.array=universalArray
          const object = global.list[0]
          types1(object)
      }
      else{
        console.log("ME0988")
        universalArray.push(global.list[index+1])
        setUniversalArray(universalArray)
        global.array=universalArray
        const object = global.list[index+1]
        types1(object)
      }
      fetchMusic(global.subs_id)
    }
  }
  const fetchMusic = async (current) => {
    global.standard="Wait"
    setMainloop(global.looping)
    setMainshuffle(global.shuffling)
    setIsPlaying('playing')
    
     if( global.length==1){
      const soundObject = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true});
      
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        setPosition(status.positionMillis)
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          setTime(3)
          if(global.playlist1==false){
            myPlayerforAllTypes1()
          }else{
            const index =global.list.findIndex(object => {
              return object.subliminal_id === global.subs_id;
            })
            if(index+1==global.list.length){
              if(global.repeat==true){
                console.log('repeat')
                myPlayerforAllTypes()
              }else{
                console.log('repeatno')
                global.value=""
                global.subs=''
                setValue("")
              }
            }else{
              myPlayerforAllTypes()
            }
          }
        }
      });
      setPlaybackObj(soundObject)
       soundObject.playAsync();
      setTap(1)
     }else if( global.length==2){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true});
      const status1 = await soundObject1.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {shouldPlay: true});
      
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        setPosition(status.positionMillis)
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          setTime(3)
          if(global.playlist1==false){
            myPlayerforAllTypes1()
          }else{
            const index =global.list.findIndex(object => {
              return object.subliminal_id === global.subs_id;
            })
            if(index+1==global.list.length){
              if(global.repeat==true){
                console.log('repeat')
                myPlayerforAllTypes()
              }else{
                console.log('repeatno')
                global.value=""
                global.subs=''
                setValue("")
              }
            }else{
              myPlayerforAllTypes()
            }
          }
        }
      });
      setPlaybackObj1(soundObject1)
      setPlaybackObj(soundObject)
       soundObject1.playAsync();
       soundObject.playAsync();
      setTap(1)
     }
     else if( global.length==3){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const soundObject2 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true});
      const status1 = await soundObject1.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {shouldPlay: true});
      const status2 = await soundObject2.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track3+"&version=1"}, {shouldPlay: true});
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        setPosition(status.positionMillis)
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          soundObject2.unloadAsync();
          setTime(3)
          if(global.playlist1==false){
            myPlayerforAllTypes1()
          }else{
            const index =global.list.findIndex(object => {
              return object.subliminal_id === global.subs_id;
            })
            if(index+1==global.list.length){
              if(global.repeat==true){
                console.log('repeat')
                myPlayerforAllTypes()
              }else{
                console.log('repeatno')
                global.value=""
                setValue("")
                global.subs=''
              }
            }else{
              myPlayerforAllTypes()
            }
          }
        }
      });
      
      setPlaybackObj(soundObject)
      setPlaybackObj1(soundObject1)
      setPlaybackObj2(soundObject2)
       soundObject.playAsync();
       soundObject1.playAsync();
       soundObject2.playAsync();
      setTap(1)
     }
     else if( global.length==4){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const soundObject2 = new Audio.Sound();
      const soundObject3 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true});
      const status1 = await soundObject1.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {shouldPlay: true});
      const status2 = await soundObject2.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track3+"&version=1"}, {shouldPlay: true});
      const status3 = await soundObject3.loadAsync({'uri': global.node+"api/v1/s3/audio/track?id="+global.track4+"&version=1"}, {shouldPlay: true});
      
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        setPosition(status.positionMillis)
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          soundObject2.unloadAsync();
          soundObject3.unloadAsync();
          setTime(3)
          if(global.playlist1==false){
            myPlayerforAllTypes1()
          }else{
            const index =global.list.findIndex(object => {
              return object.subliminal_id === global.subs_id;
            })
            if(index+1==global.list.length){
              if(global.repeat==true){
                console.log('repeat')
                myPlayerforAllTypes()
              }else{
                console.log('repeatno')
                global.value=""
                global.subs=''
                setValue("")
              }
            }else{
              myPlayerforAllTypes()
            }
          }
        }
      });
      setPlaybackObj(soundObject)
      setPlaybackObj1(soundObject1)
      setPlaybackObj2(soundObject2)
      setPlaybackObj3(soundObject3)
      
       soundObject.playAsync();
       soundObject1.playAsync();
       soundObject2.playAsync();
       soundObject3.playAsync();
      setTap(1)
     }
   
     setDati(global.length)
     global.standard="Loaded"
     addHistory()

  }
  const sliderVolume=()=>{
    if(global.length==1){
      return(
        <>
          <Text style={{fontSize: moderateScale(11), marginTop: moderateScale(40), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{height: 20, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                thumbTintColor={'#427AB3'}
                step={.01}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumeone(value)}
            />
        </>
      )
    }
    else if(global.length==2){
      return(
        <>
          <Text style={{fontSize: moderateScale(11), marginTop: moderateScale(40), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{height: 20, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                step={.01}
                thumbTintColor={'#427AB3'}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumeone(value)}
            />
          <Text style={{fontSize: moderateScale(11), marginTop: moderateScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type2}</Text>
            <Slider
              style={{height: 20, marginTop: 60, marginBottom: verticalScale(10)}}
                minimumValue={0}
                maximumValue={1}
                step={.01}
                value={global.volume2}
                thumbTintColor={'#427AB3'}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumetwo(value)}
            />
        </>
      )
    }else if(global.length==3){
      return(
        <>
          <Text style={{fontSize: moderateScale(11), marginTop: moderateScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{height: 20,marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                step={.01}
                thumbTintColor={'#427AB3'}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> [volumeone(value)]}
            />
          <Text style={{fontSize: moderateScale(11), marginTop: moderateScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type2}</Text>
            <Slider
              style={{height: 20, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume2}
                step={.01}
                thumbTintColor={'#427AB3'}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumetwo(value)}
            />
          <Text style={{fontSize: moderateScale(11),marginTop: moderateScale(10),  fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type3}</Text>
            <Slider
              style={{height: 20, marginTop: 60, marginBottom: verticalScale(10)}}
                minimumValue={0}
                maximumValue={1}
                step={.01}
                thumbTintColor={'#427AB3'}
                value={global.volume3}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumethree(value)}
            />
        </>
      )
    }else if(global.length==4){
      return(
        <>
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',    marginBottom: -60}}>{global.type1}</Text>
            <Slider
              style={{height: 20, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                thumbTintColor={'#427AB3'}
                step={.01}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumeone(value)}
            />
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -60}}>{global.type2}</Text>
            <Slider
              style={{height: 20, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume2}
                step={.01}
                thumbTintColor={'#427AB3'}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumetwo(value)}
            />
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -60}}>{global.type3}</Text>
            <Slider
              style={{height: 20, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                step={.01}
                value={global.volume3}
                thumbTintColor={'#427AB3'}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumethree(value)}
            />
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -60}}>{global.type4}</Text>
            <Slider
              style={{height: 20, marginTop: 60, marginBottom: verticalScale(10)}}
                minimumValue={0}
                maximumValue={1}
                step={.01}
                value={global.volume4}
                thumbTintColor={'#427AB3'}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumefour(value)}
            />
        </>
      )
    }
  }
  const stopandout=async()=>{
    if(global.length==1){
      await playbackObj.unloadAsync()
    }else if(global.length==2){
      await playbackObj.unloadAsync()
      await playbackObj1.unloadAsync()
    }else if(global.length==3){
      await playbackObj.unloadAsync()
      await playbackObj1.unloadAsync()
      await playbackObj2.unloadAsync()

    }else if(global.length==4){
      await playbackObj.unloadAsync()
      await playbackObj1.unloadAsync()
      await playbackObj2.unloadAsync()
      await playbackObj3.unloadAsync()
    }
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.track_title;
      });
    });
  }
  const likeOrNot= async()=>{
    if(global.liked==true){
      await fetch(global.link+"api/v1/track/featured/liked", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
        body: JSON.stringify({playlist_id: global.subs_id, status:0,
          user_id: global.id, track_id: global.subs_id,
        })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        if(result.length!=0){
        findLiked()}
        else{
            setLiked(false)
            global.liked=false
        }
      })
    }else if(global.liked==false){
      //console.log("FALSE")
      await fetch(global.link+"api/v1/track/featured/liked", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({playlist_id: global.subs_id, status:1,
        user_id: global.id, track_id: global.subs_id,
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        findLiked()
      })
    }
  }
  const findLiked=async()=>{
    await fetch(global.link+"api/v1/track/featured/liked/all", {
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
      var arr=[]
      arr.push(result)
      if(arr[0].featured_track_liked!=undefined){
        global.favorites=(getDifference(global.data, result.featured_track_liked));
        const index =result.featured_track_liked.findIndex(object => {
          return object.track_title === global.title;
        })
        if(index!=-1){
          global.liked=true
          setLiked(true)
        }else{
          global.liked=false
          setLiked(false)
        }
      }else{
        global.liked=false
        setLiked(false)
        global.favorites=[]
      }

    })
  }
  const isLiked1=()=>{
      if(global.liked==true){
        return(
        <TouchableOpacity onPress={()=> likeOrNot()} style={{width: moderateScale(38), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(10)}} >
          <Image source={require('../assets/Player/heart.png')} style={{width: moderateScale(24), tintColor: '#427AB3', height: moderateScale(24)}} />
        </TouchableOpacity>
        )
      }else{
        return(
        <TouchableOpacity onPress={()=> likeOrNot()} style={{width: moderateScale(38), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center', backgroundColor: '#427AB3', height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(10)}} >
          <Image source={require('../assets/Player/heart.png')} style={{width: moderateScale(24), tintColor: 'white', height: moderateScale(24)}} />
        </TouchableOpacity>
        )
      }
  }
  const isLiked=()=>{
    if(global.liked==false){
      return(
        <TouchableOpacity onPress={()=>likeOrNot()} style={{marginLeft: scale(15), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/151/151910.png'}} style={{  width: scale(27), height: scale(26),  tintColor: 'white', }} />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={()=>likeOrNot()} style={{}}>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/2077/2077502.png'}} style={{ marginLeft: scale(15), width: scale(27), height: scale(26),  tintColor: 'white', }} />
        </TouchableOpacity>
      )
    }
  }  
  
  const close =()=>{
    if(global.standard=="Loaded"){
      global.value="OUT", global.subs_id="", setValue("OUT")

    }else{
      console.log("Please Wait")
    }
  }
  const addToNewPLaylist = async (item, text) =>{
    if(text!=""){
      await fetch(global.link+"api/v1/own/playlist-info/add", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        playlist_id: '', moods_id: '', cover: global.cover,
        user_id: global.id, featured_id: global.subs_id, title: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then(async (result) =>{
        if(result.message=="success"){
          fetchData25();
          setText('')
          setModalPlaylist(false)
          setColors('#6A98CA')
          return updateError("Subliminal successfully added to playlist!", setError);
        }else{
          fetchData25();
          setText('')
          setModalPlaylist(false)
          setColors('#FF6A6A')
          return updateError("Playlist name already exists!", setError);
        }
      })
    }else{
      fetchData25();
      setModalPlaylist(false)
      setColors('#FF6A6A')
      return updateError("Please enter playlist name!", setError);
 
    }
  }
  const addToOldPlaylist = async (item)=>{
    await fetch(global.link+"api/v1/own/playlist-info/add", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({featured_id: global.playlist.featured_id, playlist_id: item.playlist_id,
      user_id: global.id,
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        const index =result.data.findIndex(object => {
          return object.id === item.id;
        })
        if(item.subliminal_count==result.data[index].subliminal_count){
          fetchData25()
          setModalPlaylist(false)
          setColors('#FF6A6A')
          return updateError("Subliminal is already part of this playlist!", setError);
        }else{
          fetchData25()
          setModalPlaylist(false)
          setColors('#6A98CA')
          return updateError("Subliminal successfully added!", setError);
        }
      })
    fetchData25()
  }
  const fetchData25= async()=>{
    const resp = await fetch(global.link+"api/v1/own/playlist/"+global.id);
    const data = await resp.json();
    setData25(data)
  }
  const liked12=()=>{
    if(global.liked==false){
      return(
        <TouchableOpacity onPress={()=> likeOrNot()} style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png'}} style={{height: scale(31), width: scale(31), tintColor: 'rgba(4,157,217,1)', }}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Like</Text>
              </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={()=> likeOrNot()} style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/2077/2077502.png'}} style={{height: scale(31), width: scale(31), tintColor: 'rgba(4,157,217,1)', }}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Liked</Text>
              </TouchableOpacity>
      )
    }
  }
  const imagesize=()=>{
    if(width*2<=height+100){
      return scale(28);
    }else{
      return scale(15);
    }
  }
  const heighsize=()=>{
    if(width*2<=height){
      return verticalScale(height/2.1);
    }if(width*2<=height+100){
      return verticalScale(height/1.8);
    }else{
      return verticalScale(height/3.05);
    }
  }
  const fontsize=()=>{
    if(width*2<=height+100){
      return scale(9);
    }else{
      return scale(6);
    }
  }
  const fontsize1=()=>{
    if(width*2<=height+100){
      return scale(13);
    }else{
      return scale(11);
    }
  }
  const fontsize2=()=>{
    if(width*2<=height+100){
      return scale(23);
    }else{
      return scale(18);
    }
  }
  const sizes =()=>{
    if(width*2<=height+100){
      return scale(200);
    }else{
      return scale(190);
    }
  }
  const bottom = () => {
    if(vol==false){
      return(
        <>
          <View style={{}}>
            <Text style={{fontSize: moderateScale(16), fontWeight: '500', textAlign: 'center', color: 'white', marginTop: moderateScale(12),}}>00:00</Text>
            <View style={{borderRadius: moderateScale(15), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: width-moderateScale(40), marginTop: moderateScale(10),}}>
              <TouchableOpacity onPress={()=> [prev(tap)]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', backgroundColor: back==true ? '#427AB3' : 'white', alignItems: 'center', borderRadius: scale(50)}}>
                <Image source={require('../assets/Player/back.png')} style={{tintColor: back ==true ? 'white' : '#427AB3', width: moderateScale(22), height: moderateScale(22)}}/>
              </TouchableOpacity>
              {
                mainshuffle==true ?
            
                <TouchableOpacity onPress={()=> [setMainshuffle(false), shuffleSUbliminal()]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', borderRadius: scale(50)}}>
                  <Image source={require('../assets/Player/shuffle.png')} style={{tintColor: '#427AB3', width: moderateScale(25), height: moderateScale(25)}}/>
                </TouchableOpacity>
              : 
                <TouchableOpacity onPress={()=> [setMainshuffle(true), shuffleSUbliminal1()]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', backgroundColor: '#427AB3', alignItems: 'center', borderRadius: scale(50)}}>
                  <Image source={require('../assets/Player/shuffle.png')} style={{tintColor: 'white', width: moderateScale(25), height: moderateScale(25)}}/>
                </TouchableOpacity>
              }
              <TouchableOpacity onPress={()=> {vol==true? setVol(false) : setVol(true)}} style={{width: moderateScale(55), height: moderateScale(55), justifyContent: 'center', backgroundColor: '#427AB3', alignItems: 'center', borderRadius: scale(50)}}>
                <Image source={require('../assets/Player/sound.png')} style={{tintColor: 'white', width: moderateScale(40), height: moderateScale(40)}}/>
              </TouchableOpacity>
              {loopImage()}
              <TouchableOpacity onPress={()=> [next(tap, true)]} style={{width: moderateScale(38), height: moderateScale(38), justifyContent: 'center', backgroundColor: forward==true ? '#427AB3' : 'white', alignItems: 'center', borderRadius: scale(50)}}>
                <Image source={require('../assets/Player/forward.png')} style={{tintColor: forward ==true ? 'white' : '#427AB3',  width: moderateScale(22), height: moderateScale(22)}}/>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <View style={{paddingLeft: moderateScale(10), borderRadius: moderateScale(15), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: moderateScale(80)}}>
                <View style={{width: width-moderateScale(60)}}>
                  <Text numberOfLines={1} style={{fontSize: moderateScale(23), color: 'white', fontWeight: '800', marginBottom: moderateScale(4)}}>{global.title}</Text>
                  <Text numberOfLines={1} style={{fontSize: moderateScale(14), color: 'white', fontWeight: '500'}}>{global.category.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>
          <ScrollView style={{marginTop: moderateScale(5), borderRadius: moderateScale(15) }}>
            <Text style={{fontSize: moderateScale(14), color: 'white', lineHeight: moderateScale(24), fontWeight: '500', borderRadius: moderateScale(15), padding: moderateScale(10)}}>{global.description}</Text>
          </ScrollView>
        </>
      )
    }
    else{
      return(
        <>
          <Text style={{fontSize: moderateScale(16), color: 'white', fontWeight: '500', textAlign: 'center', marginTop: moderateScale(12),}}>Advance Volume Settings</Text>
          <View style={{margin: moderateScale(10)}}>
            <TouchableOpacity onPress={()=> {vol==true? setVol(false) : setVol(true)}} style={{width: moderateScale(55), height: moderateScale(55), alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', borderRadius: scale(50)}}>
              <Image source={require('../assets/Player/sound.png')} style={{tintColor: '#427AB3', width: moderateScale(40), height: moderateScale(40)}}/>
            </TouchableOpacity>
          </View>
          <View style={{}}>
          {sliderVolume()}
          </View>
        </>
      )
    }
  }
  return(
      <>
      <ImageBackground source={require('../assets/Player/bg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, flex: 1, backgroundColor: 'white'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={global.modalVisible}
        >
          <ImageBackground style={{width: width, flex: 1, backgroundColor: 'white', height: height}}>
            <Image source={{uri: global.cover}} style={{width: width, height: height}}/>
              <SafeAreaView style={{flex: 1, marginTop: -height, height: height, width: width}}>
                <View style={{width: width, justifyContent: 'space-between', flexDirection: 'row'}}>
                  <TouchableOpacity onPress={()=> [global.modalVisible=(false), setValue('MINIMIZE'), global.value="MINIMIZE", global.count=2]} style={{width: moderateScale(38), height: moderateScale(38), marginTop: moderateScale(10), marginLeft: moderateScale(10)}} >
                    <Image source={require('../assets/back.png')} style={{width: moderateScale(38), height: moderateScale(38)}} />
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', marginRight: moderateScale(10)}}>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(38), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center', backgroundColor: '#427AB3', height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(10)}} >
                      <Image source={require('../assets/Me/playlist.png')} style={{width: moderateScale(24), tintColor: 'white', height: moderateScale(24)}} />
                    </TouchableOpacity>
                    {isLiked1()}
                  </View>
                </View>
                <View style={{height: height/2.6, width: width, justifyContent: 'center', alignItems: 'center'}}>
                    {renderPlayPauseBtn()}
                </View>
                <View style={{backgroundColor: 'black', opacity: 0.4, borderRadius: moderateScale(50), width: width, height: height}}></View>
                <View style={{marginTop: -height, width: width-moderateScale(40), marginHorizontal: moderateScale(20), height: height}}>
                  {bottom()}
                </View>
                  <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                  >
                  <View>
                    <View style={{backgroundColor: '#427AB3', width: moderateScale(150), alignSelf: 'center', borderRadius: moderateScale(15) }}>
                      <Text style={{fontSize: moderateScale(16), fontWeight: '700', color: 'white', textAlign: 'center', borderRadius: moderateScale(10), padding: moderateScale(10)}}>Guide</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: moderateScale(10), marginHorizontal: moderateScale(10), height: height-moderateScale(140)}}>
                      <Text style={{fontSize: moderateScale(16), textAlign: 'justify', color: 'black', lineHeight: moderateScale(25), fontWeight: '500', borderRadius: moderateScale(15), padding: moderateScale(10)}}>{global.guide}</Text>
                      <View style={{height: moderateScale(100)}}></View>  
                    </ScrollView>
                  </View>
                </BottomSheet>
              </SafeAreaView>
          </ImageBackground>

          
        </Modal>
        
        <StateContext.Provider value={{subliminal, setSubliminal}}>
        <UserContext.Provider value={{value, setValue}}>
        <Tab.Navigator screenOptions={{tabBarShowLabel: false, tabBarStyle: [{height: moderateScale(70), shadowColor: 'gray', shadowOffset: {width:1, height: 1}, shadowOpacity: 10, paddingBottom: moderateScale(30), backgroundColor: 'white', borderColor: 'gray', borderTopLeftRadius:moderateScale(25), borderTopRightRadius:moderateScale(25), borderWidth: 0.2, position: 'absolute', paddingLeft:20, paddingRight: 20, elevation: 20,}]}}>
            <Tab.Screen name="Today" component={PlayStack2} 
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: moderateScale(10), width: width/4}}>
                <Image source={require('../assets/Nav/Today.png')} style={{width: imagesize(), height: imagesize(), tintColor: focused ? '#427AB3' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold', fontSize: fontsize(), color: focused ? '#427AB3' : 'black'}}>Today</Text>
              </View> 
              )}}
            />
            <Tab.Screen name="My Subs" component={PlayStack}
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: moderateScale(10), width: width/4}}>
                <Image source={require('../assets/Nav/Mysubs.png')} style={{width: imagesize(), height: imagesize(), tintColor: focused ? '#427AB3' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold', fontSize: fontsize(), color: focused ? '#427AB3' : 'black'}}>My Subs</Text>
              </View> 
              )}}
            />
            <Tab.Screen name="Me" component={PlayStack3}
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: moderateScale(10), width: width/4}}>
                <Image source={require('../assets/Nav/Me.png')} style={{width: imagesize(), height: imagesize(), tintColor: focused ? '#427AB3' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold', fontSize: fontsize(), color: focused ? '#427AB3' : 'black'}}>Me</Text>
              </View> 
              )}}
            />
          </Tab.Navigator>
          {PlayerWidget()}
          </UserContext.Provider>
        </StateContext.Provider>
      </ImageBackground>
      </>
    )
    
    function PlayerWidget (){
      if(global.value=="MINIMIZE"){
        findLiked()
        if(global.count==1){
          plays();
          universalArray.push(subliminal);
          setUniversalArray(universalArray);
          global.array=universalArray;
          global.count=2
        }
        else if(global.count==undefined){
          plays();
          universalArray.push(subliminal);
          setUniversalArray(universalArray);
          global.array=universalArray;
          global.count=2
        }else if(global.count==3){
          universalArray.push(subliminal);
          setUniversalArray(universalArray);
          global.array=universalArray;
          global.count=2
        }else{
        }
        return(
          <>
          <View style={{marginBottom: moderateScale(5), shadowOpacity: 0.5, shadowColor: 'black', position: 'absolute', bottom: moderateScale(68), marginLeft: moderateScale(20), marginRight: moderateScale(10)}}>
            <ImageBackground imageStyle={{borderRadius: moderateScale(10)}} style={{backgroundColor: '#427AB3', width: width-moderateScale(30), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: moderateScale(65), borderRadius: moderateScale(10), shadowOpacity: 0.2, opacity: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'center', width: width-moderateScale(130)}}>
                <TouchableOpacity onPress={()=> [global.modalVisible=(true), setValue(''), global.value=""]} style={{width: moderateScale(70), alignItems: 'center', height: moderateScale(65), borderRadius:10, marginLeft: moderateScale(-10)}}> 
                <Image source={{uri: global.cover}} style={{width: moderateScale(70), backgroundColor: '#427AB3', height: moderateScale(65), borderBottomLeftRadius:10, borderTopLeftRadius: 10}} />
                </TouchableOpacity>
                <View style={{alignItems: 'center', width: width-moderateScale(205), height: moderateScale(70), flexDirection: 'row' }}>
                  <TouchableOpacity onPress={()=> [global.modalVisible=(true), setValue(''), global.value=""]} style={{marginRight: moderateScale(15), width: width-moderateScale(205) }} >
                    <View style={{ alignItems: 'flex-start', marginLeft: moderateScale(10), }}>
                      <Text numberOfLines={1} style={{width: width-moderateScale(205),  color: 'white', fontWeight: 'bold', fontSize: moderateScale(16), textAlign: 'left', marginBottom: moderateScale(5)}}>{global.title}</Text>
                      <Text numberOfLines={1} style={{width: width-moderateScale(205),  color: '#E8E8E8', fontSize: moderateScale(11), textAlign: 'left', }}>{global.category.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: moderateScale(100)}}>
                {renderPlayPauseBtn1()}
                <TouchableOpacity onPress={()=> [close()]}style={{marginRight: moderateScale(15)}}>
                  <Image source={require('../assets/Player/exit.png')}
                  style={{width: moderateScale(24), height: moderateScale(23), tintColor: 'white'}}/>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            
          </View>
          </>
          )
      }else if(global.value=="OUT"){
          stopandout()
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  volumeBtn: {
    tintColor: 'white',  height: scale(43), width: scale(43), borderRadius: scale(120), borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' 
  },
  guideBtn: {
    width: Dimensions.get('window').width/5, height: 35, borderRadius: 20, justifyContent: 'center', alignItems: 'center'
  },
  downBtn: {
    backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 38, width: 38, borderRadius: 20, borderWidth: 1, borderColor: 'white' 
  },
  upBtn: {
    backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: 38, width: 38, borderRadius: 20, borderWidth: 1, borderColor: 'white'  
  }, 
  onShuffle:{
    backgroundColor: 'rgba(4,157,217,1)', tintColor: 'white', height: scale(43), width: scale(43), borderRadius: scale(120), borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' 
  },
  offShuffle:{
    backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: scale(43), width: scale(43), borderRadius: scale(120), borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center'  
  }
});
export default Home;
/*<TouchableOpacity style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:42, height: 42, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/3138/3138377.png'}} style={{height: 36, width: 36, tintColor: 'rgba(4,157,217,1)'}}/>
                </View>
                <Text style={{ fontSize: 20, color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Add to queue</Text>
              </TouchableOpacity> */