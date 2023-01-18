LogBox.ignoreAllLogs();
import { Dimensions, StatusBar, FlatList, TextInput, Modal, ScrollView, ImageBackground, StyleSheet, Image, TouchableOpacity, Text, View, LogBox, SafeAreaView, Settings } from 'react-native';
import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import MySubs from '../mysubs/Mysubs';
import MySubsSearch from '../mysubs/MysubsSearch';
import Recommended from './Recommended';
import Discover from '../today/Discover';
import Featured from '../today/Featured';
import Featured_Track from './Featured_Track';
import Discover_Track from './Discover_Track';
import { UserContext } from '../UserContext';
import { StateContext } from '../StateContext';
import Search from '../search/Search';
import SearchCategory from '../search/SearchCategory';
import SearchIcon from '../search/SearchIcon';
import {Audio} from "expo-av";
import arrayShuffle from 'array-shuffle';
import MeFree from '../me/MeFree';
import Today from '../today/Today';
import Recommended_Track from './Recommended_Track';
import TodayAllPlaylist from './TodayAllPlaylist';
import TodayPlaylist from './TodayPlaylist';
import Favorites from '../me/favorites/Favorites';
import FavoritesMagus from '../me/favorites/FavoritesMagus';
import Playlist from '../me/playlist/Playlist';
import PlaylistMagus from '../me/playlist/PlaylistMagus';
import PlaylistMagusSpecific from '../me/playlist/PlaylistMagusSpecific';
import SubGuide from '../me/help/SubGuide';
import Help from '../me/help/Help';
import Terms from '../me/help/Terms';
import Faqs from './Faqs';
import Privacy from '../me/help/Privacy';
import UpdateProfile from '../me/UpdateProfile';
import UpdatePassword from '../me/UpdatePassword';
import AnimatedLottieView from 'lottie-react-native';
import UpdatePass from '../me/UpdatePass';
import PaymentTab from '../me/PaymentTab';
import SubName from '../me/SubName';
import { scale, verticalScale } from 'react-native-size-matters';
import Settings1 from '../me/Settings';
import Three from './Three';
import ThreeGuide from './ThreeGuide';
import ThreePlaylist from './ThreePlaylist';
const Tab= createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const PlayStack=()=>{
  return(
    <Stack.Navigator initialRouteName='MySubs' screenOptions={{headerShown: false}}>
      <Stack.Screen name='MySubs' component={MySubs}/>
      <Stack.Screen name='Featured' component={Featured}/>
      <Stack.Screen name='MysubsSearch' component={MySubsSearch}/>
      <Stack.Screen name='TodayPlaylist' component={TodayPlaylist}/>
    </Stack.Navigator>
  )
}
const PlayStack2=()=>{
  return(
    <Stack.Navigator initialRouteName='Today1' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Today1' component={Today}/>
      <Stack.Screen name='Featured_Track' component={Featured_Track}/>
      <Stack.Screen name='Discover_Track' component={Discover_Track}/>
      <Stack.Screen name='Featured' component={Featured}/>
      <Stack.Screen name='Recommended' component={Recommended}/>
      <Stack.Screen name='Recommended_Track' component={Recommended_Track}/>
      <Stack.Screen name='Discover' component={Discover}/>
      <Stack.Screen name='TodayAllPlaylist' component={TodayAllPlaylist}/>
      <Stack.Screen name='TodayPlaylist' component={TodayPlaylist}/>

    </Stack.Navigator>
  )
}
const PlayStack4=()=>{
  return(
    <Stack.Navigator initialRouteName='Search1' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Search1' component={Search}/>
      <Stack.Screen name='Three' component={Three}/>
      <Stack.Screen name='ThreePlaylist' component={ThreePlaylist}/>
      <Stack.Screen name='ThreeGuide' component={ThreeGuide}/>
      <Stack.Screen name='SearchCategory' component={SearchCategory}/>
      <Stack.Screen name='SearchIcon' component={SearchIcon}/>
      <Stack.Screen name='TodayPlaylist' component={TodayPlaylist}/>
    </Stack.Navigator>
  )
}
const PlayStack3=()=>{
  return(
    <Stack.Navigator initialRouteName='MeFree1' screenOptions={{headerShown: false}}>
      <Stack.Screen name='MeFree1' component={MeFree}/>
      <Stack.Screen name='SubGuide' component={SubGuide}/>
      <Stack.Screen name='SubName' component={SubName}/>
      <Stack.Screen name='Settings' component={Settings1}/>
      <Stack.Screen name='Help' component={Help}/>
      <Stack.Screen name='ThreePlaylist' component={ThreePlaylist}/>
      <Stack.Screen name='Three' component={Three}/>
      <Stack.Screen name='ThreeGuide' component={ThreeGuide}/>
      <Stack.Screen name='PaymentTab' component={PaymentTab}/>
      <Stack.Screen name='Terms' component={Terms}/>
      <Stack.Screen name='UpdateProfile' component={UpdateProfile} />
      <Stack.Screen name='UpdatePass' component={UpdatePass} />
      <Stack.Screen name='Faqs' component={Faqs}/>
      <Stack.Screen name='Privacy' component={Privacy}/>
      <Stack.Screen name='Playlist' component={Playlist}/>
      <Stack.Screen name='PlaylistMagus' component={PlaylistMagus}/>
      <Stack.Screen name='PlaylistMagusSpecific' component={PlaylistMagusSpecific}/>
      <Stack.Screen name='Favorites' component={Favorites}/>
      <Stack.Screen name='FavoritesMagus' component={FavoritesMagus}/>
    </Stack.Navigator>
  )
}
const Home =({navigation}) =>{
  const width=Dimensions.get('window').width;
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
  const [colors, setColors] = useState('#6A98CA');
  const [looping, setLooping] = useState(false);
  const [isVolumeClick, setIsVolumeClick] = useState(false);
  const [isGuideClick, setIsGuideClick] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [duration, setDuration] = useState(60000);
  const [position, setPosition] = useState(0);
  const [seekbar, setSeekbar] = useState(0);
  const [dati, setDati]=useState(1)
  const [data25, setData25]=useState([])
  const [min, setMin]=useState(false)
  const [text, setText] = useState('')
  const [unmount, setUnmount] = useState(true);
  const [modal, setModal] = useState(false);
  const [modal3, setModal3] = useState(true);
  const [modal_playlist, setModalPlaylist] = useState(false);
  const [modal_guide, setModalGuide] = useState(false);
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  
  const fetchSubs=async()=>{
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/user");
    const data1 = await resp1.json();
    const user=data1.filter(object=>{
      return object.user_id==global.id
    })
    global.subs=user[0].info.subscription_id
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal");
    const data = await resp.json();
    const array = data.filter(object=>{
      return object.subscription_id.includes(user[0].info.subscription_id)
    })
    global.data=array
    global.datas=array
  }
   useEffect(() => {
    fetchSubs()
    Audio.setAudioModeAsync({
       allowsRecordingIOS: false,
       shouldDuckAndroid: true,
       interruptionModeIOS: 0,
       playsInSilentModeIOS: true,
       interruptionModeAndroid: 1,
       staysActiveInBackground: true,
       playThroughEarpieceAndroid: true,
    })
    return()=> setUnmount(false)

   }, []);
   
  function renderPlayPauseBtn(){
    switch (isPlaying){
      case "playing":
        return (
          <TouchableOpacity onPress={()=> playpause()} style={{backgroundColor: 'rgba(4,157,217,1)', borderRadius: scale(40), height: scale(40), width: scale(40), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/3669/3669483.png"}} style={{width: scale(26), height: scale(26), marginTop: 0, tintColor: 'white'}} />
          </TouchableOpacity>
        )
      case "paused":
        return (
          <TouchableOpacity onPress={()=> playpause()} style={{backgroundColor: '#7EC8E3', borderRadius: scale(40), height: scale(40), width: scale(40), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}>  
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/128/27/27223.png"}} style={{width: scale(26), height: scale(26), marginTop: 0, marginLeft: 5, tintColor: 'white' }} />
          </TouchableOpacity>
        )
    }
    
  }
  function renderPlayPauseBtn1(){
    switch (isPlaying){
      case "playing":
        return (
          <TouchableOpacity onPress={()=> playpause()} style={{width:scale(24), justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/3669/3669483.png"}} style={{width: scale(22), height: scale(22), marginTop: 0, tintColor: 'white'}} />
          </TouchableOpacity>
        )
      case "paused":
        return (
          <TouchableOpacity onPress={()=> playpause()} style={{width: scale(24), justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/128/27/27223.png"}} style={{width: scale(22), height: scale(22), marginTop: 0, marginLeft: scale(5), tintColor: 'white' }} />
          </TouchableOpacity>
        )
    }
  }
  const playpause = async()=>{
    if(global.standard=="Loaded"){
      if(soundObj.isLoaded==true && soundObj.shouldPlay==true){
        setIsPlaying('paused')
        if(global.length==2){
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
        if(global.length==2){
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
    }
  }
  const loos =async()=>{
    if(looping==true){
      setLooping(false)
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

    }else{
      global.looping=true
      setLooping(true)
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
    }
  }
  function loopImage(){
    try{
      if(global.looping==true){
        return(
          <TouchableOpacity onPress={()=> loos()}  style={{backgroundColor: 'rgba(4,157,217,1)', tintColor: 'white', height: scale(43), width: scale(43), borderRadius: scale(120), borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center'  }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/4146/4146819.png"}} style={{height: scale(28), width: scale(33), tintColor: 'white'}} />
          </TouchableOpacity>
        )
      }else{
        
        return(
          <TouchableOpacity onPress={()=> loos()} style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: scale(43), width: scale(43), borderRadius: scale(120), borderWidth: 1, borderColor: 'white',justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/4146/4146819.png"}}  style={{height: scale(28), width: scale(33), tintColor: 'white'}} />
          </TouchableOpacity>
        )
  
      }
    }catch(e){
      console.log(e)
    }
  }
  const shuffleSUbliminal =async()=>{
      try{
      if(global.shuffling==true){
        global.shuffling=(false)
        if(global.playlist==true){
          global.list=global.lists
        }else{
          global.data=global.datas
        }
  
      }else{
        global.shuffling=(true)
        if(global.playlist==true){
          global.list=arrayShuffle(global.lists)
        }else{
          global.data=arrayShuffle(global.datas)
        }
        }
      }catch(e){
        console.log(e)
      }
  }
  function shuffleImage(){
    try{
      if(global.shuffling==true){
        return(
          <TouchableOpacity onPress={()=> shuffleSUbliminal()} style={{backgroundColor: 'rgba(4,157,217,1)', tintColor: 'white', height: scale(43), width: scale(43), borderRadius: scale(120), borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center'  }}>
            <Image source={require('../../assets/playing/shuffle.png')} style={{height: scale(40), width: scale(40), tintColor: 'white'}} />
          </TouchableOpacity>
        )
      }else{
        return(
          <TouchableOpacity onPress={()=> shuffleSUbliminal()} style={{backgroundColor: 'rgba(4,157,217,0.4)', tintColor: 'white', height: scale(43), width: scale(43), borderRadius: scale(120), borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center'  }}>
            <Image source={require('../../assets/playing/shuffle.png')} style={{height: scale(40), width: scale(40), tintColor: 'white'}} />
          </TouchableOpacity>
        )
  
      }
    }catch(e){
      console.log(e)
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
  const onPlaybackStatusUpdate = async status => {
    setPosition(status.positionMillis)
    setDuration(status.durationMillis || 60000)
    setLooping(status.isLooping)
    setSeekbar(position/duration)
    
  }
  const onPrev =async()=>{
    universalArray.pop()
          setUniversalArray(universalArray)
          global.array=universalArray
          const object = universalArray[universalArray.length-1]
          global.title=object.title
          global.cover=object.cover
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
  const prev = async(tap, click) => {
    if(global.standard=="Loaded"){  
      if(position!=undefined){
        if(global.length==2){
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
          if(click==false){
            if(global.length==2){
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
            onPrev()
          }
        }else{
        }
      }
    }
  }
  const addHistory = async ()=>{
    if(global.length==2){
      global.all = global.volume1*100 + "," + global.volume2*100
    }else if(global.length==3){
      global.all= global.volume1*100 + "," + global.volume2*100 +","+ global.volume3*100
    }else if(global.length==4){
      global.all= global.volume1*100 + "," + global.volume2*100 +","+ global.volume3*100 +","+ global.volume4*100
    }
    await fetch(`https://dev.magusaudio.com/api/v1/audio/history`, {
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
        setTap(2)
        addHistory()
        if(global.length==2){
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
        if(global.playlist==true){
          console.log("You")
          myPlayerforAllTypes()
        }else{
          console.log("ME")
          myPlayerforAllTypes1()
        }
        
      }
    }else{
      console.log("Please Wait")
    }
  }
  const plays = async ()=> {
      if(time==1){
        //console.log("MY PLAYS")
        fetchMusic(global.subs_id); 
        setTime(2);
      }else if(time==3){
        //console.log("MY PLAYS3")
        setTime(2);
      }else if(time==2){
          //console.log("STOP MALALA")
          if(dati==2){
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
  const myPlayerforAllTypes1= async()=>{
    const index =global.data.findIndex(object => {
      return object.subliminal_id === global.subs_id;
    })
    if(index+1==global.data.length){
        universalArray.push(global.data[0])
        setUniversalArray(universalArray)
        global.array=universalArray
        const object = global.data[0]
        global.subs_id=object.subliminal_id
        global.title=object.title
        global.cover=object.cover
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
    else{
      console.log(index)
      universalArray.push(global.data[index+1])
      setUniversalArray(universalArray)
      global.array=universalArray
      const object = global.data[index+1]
      global.subs_id=object.subliminal_id
      global.title=object.title
      global.cover=object.cover
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
    //console.log("myPlayerforAllTypes")
    fetchMusic(global.subs_id)

  }
  const myPlayerforAllTypes= async()=>{
    const index =global.list.findIndex(object => {
      return object.subliminal_id === global.subs_id;
    })
    if(index+1==global.list.length){
        universalArray.push(global.list[0])
        setUniversalArray(universalArray)
        global.array=universalArray
        const object = global.list[0]
        global.subs_id=object.subliminal_id
        global.title=object.title
        global.cover=object.cover
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
    else{
      universalArray.push(global.list[index+1])
      setUniversalArray(universalArray)
      global.array=universalArray
      const object = global.list[index+1]
      global.subs_id=object.subliminal_id
      global.title=object.title
      global.cover=object.cover
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
    //console.log("myPlayerforAllTypes")
    fetchMusic(global.subs_id)

  }
  const fetchMusic = async (current) => {
    global.standard="Wait"
    setIsPlaying('playing')
    
     if( global.length==2){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {shouldPlay: true});
      
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        setPosition(status.positionMillis)
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          setTime(3)
          if(global.playlist==false){
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
      
      await soundObject1.playAsync();
      await soundObject.playAsync();
      setTap(1)
     }
     else if( global.length==3){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const soundObject2 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {shouldPlay: true});
      const status2 = await soundObject2.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track3+"&version=1"}, {shouldPlay: true});
      
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        setPosition(status.positionMillis)
       
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          soundObject2.unloadAsync();
          setTime(3)
          if(global.playlist==false){
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
      
      await soundObject.playAsync();
      await soundObject1.playAsync();
      await soundObject2.playAsync();
      setTap(1)
     }
     else if( global.length==4){
      const soundObject = new Audio.Sound();
      const soundObject1 = new Audio.Sound();
      const soundObject2 = new Audio.Sound();
      const soundObject3 = new Audio.Sound();
      const status = await soundObject.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track1+"&version=1"}, {shouldPlay: true});
      const status1 = await soundObject1.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track2+"&version=1"}, {shouldPlay: true});
      const status2 = await soundObject2.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track3+"&version=1"}, {shouldPlay: true});
      const status3 = await soundObject3.loadAsync({'uri': "https://dev.node.magusaudio.com/api/v1/s3/audio/track?id="+global.track4+"&version=1"}, {shouldPlay: true});
      
      soundObject.setOnPlaybackStatusUpdate(async(status)=>{
        setPosition(status.positionMillis)
        if(status.didJustFinish && status.isLooping==false){
          soundObject.unloadAsync();
          soundObject1.unloadAsync();
          soundObject2.unloadAsync();
          soundObject3.unloadAsync();
          setTime(3)
          if(global.playlist==false){
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
      
      await soundObject.playAsync();
      await soundObject1.playAsync();
      await soundObject2.playAsync();
      await soundObject3.playAsync();
      setTap(1)
     }
   
     setDati(global.length)
     global.standard="Loaded"
     addHistory()

  }
  const sliderVolume=()=>{
    if(global.length==2){
      return(
        <>
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                step={.01}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumeone(value)}
            />
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type2}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60, marginBottom: verticalScale(10)}}
                minimumValue={0}
                maximumValue={1}
                step={.01}
                value={global.volume2}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumetwo(value)}
            />
        </>
      )
    }else if(global.length==3){
      return(
        <>
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                step={.01}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> [volumeone(value)]}
            />
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type2}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume2}
                step={.01}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumetwo(value)}
            />
          <Text style={{fontSize: scale(11),marginTop: verticalScale(10),  fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type3}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60, marginBottom: verticalScale(10)}}
                minimumValue={0}
                maximumValue={1}
                step={.01}
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
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',    marginBottom: -50}}>{global.type1}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume1}
                step={.01}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumeone(value)}
            />
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type2}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                value={global.volume2}
                step={.01}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumetwo(value)}
            />
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type3}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60}}
                minimumValue={0}
                maximumValue={1}
                step={.01}
                value={global.volume3}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumethree(value)}
            />
          <Text style={{fontSize: scale(11), marginTop: verticalScale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white',   marginBottom: -50}}>{global.type4}</Text>
            <Slider
              style={{width: Dimensions.get('window').width-80, height: 20, marginHorizontal:30, marginTop: 60,marginBottom: verticalScale(10)}}
                minimumValue={0}
                maximumValue={1}
                step={.01}
                value={global.volume4}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value)=> volumefour(value)}
            />
        </>
      )
    }
  }
  const volumeClick =()=>{
    if(isVolumeClick==true){
      return(
            <View style={{ height: Dimensions.get('window').height, marginTop: -Dimensions.get('window').height, width: Dimensions.get('window').width, marginLeft: -10}}>
              <TouchableOpacity onPress={()=> setIsVolumeClick(false)} style={{height: heighsize()}} >
              </TouchableOpacity>
                <View style={{backgroundColor: 'rgba(67,156,212,0.9)',paddingBottom: 20, width: Dimensions.get('window').width-(30), borderRadius: 15, marginLeft: 15}}>
                  <Text style={{fontSize: scale(14), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', color: 'white', padding: 10,}}>Advance Volume Setting</Text>
                  {sliderVolume()}
                </View>
              <TouchableOpacity onPress={()=> setIsVolumeClick(false)} style={{height: 100,}} >
              </TouchableOpacity>
            </View>
      )
    }
  }

  const guideClick=()=>{
    if(isGuideClick==true){
      return(
            <ImageBackground onPress={()=> setIsGuideClick(false)} style={{ height: Dimensions.get('window').height/1.95, backgroundColor: 'white', marginTop: -Dimensions.get('window').height/3, width: Dimensions.get('window').width, marginLeft: -10}}>
              <TouchableOpacity onPress={()=> [setIsGuideClick(false), global.modalVisible=(true)]}  style={{width: 40, height: 40, left: 20,marginTop: 20}} >
                <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26,  marginLeft: 2}} />
              </TouchableOpacity>
              <Text style={{paddingLeft: 35, color: '#0D0D0D', fontWeight: 'bold', fontSize: 18, marginTop: 0 }}>Guide</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 35, marginTop: 10, marginBottom: 70,}}>
                <View>
                  <Text style={{lineHeight: 22, textAlign: 'justify', fontSize: 13}}>{subliminal.guide}</Text>
                </View>
              </ScrollView>
            </ImageBackground>
      )
    }
  }
  const stopandout=async()=>{
    if(global.length==2){
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
      await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked`, {
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
      await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked`, {
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
    await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked/all`, {
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
          
        <TouchableOpacity onPress={()=> likeOrNot()} style={{marginRight: scale(15), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/2077/2077502.png'}} style={{ marginLeft: scale(15), width: scale(27), height: scale(26),  tintColor: 'rgba(4,157,217,1)', }} />
        </TouchableOpacity>
        )
      }else{
        return(
        <TouchableOpacity onPress={()=> likeOrNot()} style={{marginRight: scale(15), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/151/151910.png'}} style={{  width: scale(27), height: scale(26),  tintColor: 'rgba(4,157,217,0.4)', }} />
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
      await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
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
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
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
    const resp = await fetch("https://dev.magusaudio.com/api/v1/own/playlist/"+global.id);
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
  const upgraded=()=>{
    if(global.subs==1){
      return(
        <TouchableOpacity onPress={()=> [setModal(false), global.modalVisible=false, global.value="MINIMIZE", setValue("MINIMIZE"), navigation.navigate("Me")]} style={{flexDirection: 'row', marginTop: verticalScale(20), paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={require('../../assets/icon3.png')} style={{height: scale(34), width: scale(34), tintColor: 'rgba(4,157,217,1)'}}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Upgrade Plan</Text>
              </TouchableOpacity>
      )
    }
  }
  return(
      <>
      <ImageBackground source={require('../../assets/home2bg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, flex: 1}}>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={global.modalVisible}
        >
          <ImageBackground source={require('../../assets/playing/playbg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10, flex: 1,}}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modal}
            >
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modal_guide}
                >
                <ImageBackground source={require('../../assets/homebg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black'}}>
                </ImageBackground>
                <SafeAreaView style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
                  <TouchableOpacity onPress={()=> [setModalGuide(false)]}  style={{width: scale(35), height: scale(35), left: 10,...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}),}} >
                    <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', marginHorizontal: scale(30), alignItems: 'center'}}>
                  <Image source={{uri: global.cover}} style={{width: scale(90), height: scale(90), borderRadius: 20}} />
                    <View>
                      <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', textAlign: 'left', width: width-scale(150), paddingHorizontal: scale(10)}} >{global.title}</Text>
                      <Text style={{ fontSize: scale(15), marginTop: 5, color: '#505050', fontWeight: '600', textAlign: 'left', width: width-scale(150), paddingHorizontal: scale(10)}} >{global.category}</Text>
                    </View>
                  </View>
                  <Text style={{paddingLeft: scale(30), color: '#0D0D0D', fontWeight: 'bold', fontSize: scale(16), marginTop: 30 }}>Guide</Text>
                  <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: scale(30), marginTop: 10, ...Platform.select({android: {marginBottom: 0}, ios: {marginBottom: 20}})}}>
                    <View>
                      <Text style={{lineHeight: fontsize2(), textAlign: 'justify', fontSize: fontsize1()}}>{subliminal.guide}</Text>
                    </View>
                  </ScrollView>
                  
                </SafeAreaView>
                
                
              </Modal>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modal_playlist}
                >
                <ImageBackground source={require('../../assets/homebg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black'}}>
                </ImageBackground>
                <SafeAreaView style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
                  
                  <TouchableOpacity onPress={()=> [setModalPlaylist(false)]}  style={{width: scale(35), height: scale(35), left: 10,...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}),}} >
                    <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', marginHorizontal: scale(30), alignItems: 'center'}}>
                  <Image source={{uri: global.cover}} style={{width: scale(90), height: scale(90), borderRadius: 20}} />
                    <View>
                      <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', textAlign: 'left', width: width-scale(150), paddingHorizontal: scale(10)}} >{global.title}</Text>
                      <Text style={{ fontSize: scale(15), marginTop: 5, color: '#505050', fontWeight: '600', textAlign: 'left', width: width-scale(150), paddingHorizontal: scale(10)}} >{global.category}</Text>
                    </View>
                  </View>
                  <View style={{ width: width/1.3, alignSelf: 'center', marginTop: 50}}>
                    <TextInput placeholder="Enter Playlist Name" utoCorrect={true} value={text} onChangeText={newText => setText(newText)}  style={{width: width/1.3, height: verticalScale(30),   fontSize: scale(12), fontWeight: 'bold', textAlign: 'center', marginTop: scale(3), }}/>
                    <View style={{backgroundColor: 'gray', height: 2, width: width/1.3, marginTop: 0}}></View>
                  </View>
                  <View style={{width: width/1.3, alignSelf: 'center', marginTop: 25, marginBottom: 20}}>
                    <TouchableOpacity onPress={()=> addToNewPLaylist(global.playlist, text)} style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', backgroundColor: '#049DD9', borderRadius: 15 }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center',  fontSize: scale(15)}}>Add to New Playlist</Text>
                    </TouchableOpacity>
                  </View>
                      <FlatList
                        data={data25}
                        renderItem={({ item }) => (          
                          <TouchableOpacity onPress={()=> addToOldPlaylist(item)} style={{height:scale(70), width: width, flexDirection: 'row', marginBottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={{uri: item.cover}} style={{width: scale(60), height: scale(60), borderRadius: 10, marginBottom: 5, marginLeft: scale(10)}}/>
                            <View style={{ width: width-scale(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5}}>
                              <Text numberOfLines={2}style={{ width: width/1.9, marginLeft: 10, color: '#0D0D0D', fontWeight: 'bold', fontSize: scale(16), }}>{item.title}</Text>
                            </View>
                            
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.playlist_id}
                        style={{marginHorizontal: scale(35), width: width-scale(70), ...Platform.select({android: {marginBottom: 0}, ios: {marginBottom: 20}})}}
                        showsHorizontalScrollIndicator={false}
                      />
                  
                </SafeAreaView>
                
                
              </Modal>
            <ImageBackground source={require('../../assets/homebg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black'}}>
            </ImageBackground>
            <SafeAreaView style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
            {error ? (
                <Modal
                animationType="slide"
                transparent={true}
                visible={modal3}
              >
              <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
              </View>
              <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
                <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: colors, }}>
                  <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: colors}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
                  </View>
                  <Text style={{textAlign: 'center', fontSize: scale(10), marginBottom: verticalScale(20),  marginTop: verticalScale(20), color: colors, fontWeight: '600' }}>{error}</Text>
                  
                </View>
              </View>
              
              
            </Modal>
                
                ):null}
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
              <TouchableOpacity onPress={()=> [setModal(false)]}  style={{width: 40, height: 40, left: 10,...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}),}} >
                <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26), marginLeft: 2}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> [setModal(false), global.modalVisible=false, global.value="MINIMIZE", setValue("MINIMIZE"), navigation.navigate("Today")]} style={{width: scale(40), height: scale(40), right: scale(10),...Platform.select({android: {marginTop: 17}, ios: {marginTop: verticalScale(5)}}),}} >
                <Image source={require('../../assets/nav/Today.png')} style={{width: scale(30), height: scale(30), tintColor: 'black'}} />
                <Text style={{ fontSize: scale(8), marginTop: 2, color: '#0D0D0D', fontWeight: 'bold'}} >Today</Text>
              </TouchableOpacity>

            </View> 
              <Image source={{uri: global.cover}} style={{width: scale(155), height: scale(155), alignSelf: 'center'}} />
              <Text style={{ fontSize: scale(17), marginTop: 15, marginHorizontal: 20, color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >{global.title}</Text>
              <Text style={{ fontSize: scale(15), marginTop: 5, marginHorizontal: 20, color: '#505050', fontWeight: '600', alignSelf: 'center', }} >{global.category}</Text>

              {upgraded()}
              <TouchableOpacity onPress={()=> setModalGuide(true)} style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/727/727239.png'}} style={{height: scale(31), width: scale(31), tintColor: 'rgba(4,157,217,1)'}}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Guide</Text>
              </TouchableOpacity>
              {liked12()}
              <TouchableOpacity onPress={()=> [fetchData25(), setModalPlaylist(true)]} style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={require('../../assets/playing/add_playlist.png')} style={{height: scale(31), width: scale(31), tintColor: 'rgba(4,157,217,1)'}}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Add to playlist</Text>
              </TouchableOpacity>
              
              
            </SafeAreaView>
            
            
          </Modal>
          <SafeAreaView style={styles.container}>
        <View style={{ }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={()=> [global.modalVisible=(false), setValue('MINIMIZE'), global.value="MINIMIZE", global.count=2]}  style={{width: scale(40), height: scale(40), left: scale(5),...Platform.select({android: {marginTop: verticalScale(-10)}, ios: {marginTop: verticalScale(10)}}),}} >
                <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>[setModal(true)]} style={{width: scale(40), height: scale(40), right: scale(-7), ...Platform.select({android: {marginTop: verticalScale(-10)}, ios: {marginTop: verticalScale(10)}}),}} >
                <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/512/512222.png'}} style={{width: scale(26), height: scale(26), }} />
              </TouchableOpacity>
              
            </View> 
            <View style={{flexDirection: 'row', marginTop: 25, justifyContent: 'space-around', height: Dimensions.get('window').height/2.8,width: Dimensions.get('window').width-20, marginHorizontal: 0,alignItems: 'center',}}>
              <TouchableOpacity onPress={()=> prev(tap, true)}>
                <Image source={require('../../assets/playing/back.png')} style={{width: scale(52), height: scale(52),  tintColor: 'white', marginTop: 40}} />
              </TouchableOpacity>
              <Image source={require('../../assets/playing/flower2.png')} style={{width: scale(250) ,height: scale(270)}} />
              <TouchableOpacity onPress={()=> [next(tap, true)]}>
                <Image source={require('../../assets/playing/forward.png')} style={{width: scale(52), height: scale(52),  tintColor: 'white', marginTop: 40}} />
              </TouchableOpacity>
            </View>

            <ImageBackground onPress={()=> playpause()} source={{uri: global.cover}} imageStyle={{borderRadius: scale(120)}} style={{height: scale(120), marginTop:  -Dimensions.get('window').height/4, width: scale(120), borderRadius: 150, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width: 0, height: 0}, shadowRadius: 3, elevation: 1}}>
              {renderPlayPauseBtn()}
            </ImageBackground>

            <View style={{justifyContent: 'center', alignSelf: 'center', marginTop: verticalScale(55), marginBottom: verticalScale(20)}}>
              <Text style={{textAlign: 'center', marginTop: 0, fontSize: scale(11)}}>{convertTime(position)} / {convertTime(duration)}</Text>
            </View>

        </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 70, marginRight: 70, marginTop: 0 }}>
              {shuffleImage()}
              <TouchableOpacity onPress={()=> [setIsVolumeClick(true)]} style={[styles.volumeBtn, {backgroundColor: color}]}>
                <Image source={require('../../assets/playing/sound.png')} style={{width: scale(35), height:scale(35), tintColor: 'white'}} />
              </TouchableOpacity>
              {loopImage()}
            </View>
            <View style={{flexDirection: 'row', marginTop: 38, justifyContent: 'space-between'}}>
              <Text numberOfLines={1} style={{width: Dimensions.get('window').width-scale(80), paddingLeft: 20, color: '#0D0D0D', fontWeight: 'bold',  fontSize: scale(17), }}>{global.title}</Text>
              {isLiked1()}
            </View>
            <Text style={{marginTop: 0, paddingLeft: 20, color: 'black',   fontSize: scale(14), }}>{global.category}</Text>

            <ScrollView style={{marginHorizontal: 20, marginBottom: 35,}}>
              <Text style={{marginTop: 8, paddingTop: 3, paddingBottom:3, paddingRight: 20, lineHeight: verticalScale(25), color: 'black', fontSize: scale(14),textAlign: 'justify' }}>{global.description}</Text>
            </ScrollView>

           
            {volumeClick()}
            {guideClick()}

            </SafeAreaView>
          </ImageBackground>

          
        </Modal>
        
        <StateContext.Provider value={{subliminal, setSubliminal}}>
        <UserContext.Provider value={{value, setValue}}>
          <Tab.Navigator screenOptions={{tabBarShowLabel: false, tabBarStyle: [{height: verticalScale(60),paddingTop: scale(-10), shadowColor: 'gray', shadowOffset: {width:1, height: 1}, shadowOpacity: 10, paddingBottom: scale(20), backgroundColor: 'white', borderColor: 'gray', borderTopLeftRadius:25, borderTopRightRadius:25, borderWidth: 0.2, position: 'absolute', paddingLeft:20, paddingRight: 20, elevation: 20,}]}}>
            <Tab.Screen name="Today" component={PlayStack2} 
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10, width: width/4}}>
                <Image source={require('../../assets/nav/Today.png')} style={{width: imagesize(), height: imagesize(), tintColor: focused ? 'rgba(24,119,242,1)' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold', fontSize: fontsize(), color: focused ? 'rgba(24,119,242,1)' : 'black'}}>Today</Text>
              </View> 
              )}}
            />
            <Tab.Screen name="My Subs" component={PlayStack}
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10, width: width/4}}>
                <Image source={require('../../assets/nav/Mysubs.png')} style={{width: imagesize(), height: imagesize(), tintColor: focused ? 'rgba(24,119,242,1)' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold', fontSize: fontsize(), color: focused ? 'rgba(24,119,242,1)' : 'black'}}>My Subs</Text>
              </View> 
              )}}
            />
            <Tab.Screen name="Search" component={PlayStack4}
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10, width: width/4}}>
                <Image source={require('../../assets/nav/Search.png')} style={{width: imagesize()+5, height: imagesize(), tintColor: focused ? 'rgba(24,119,242,1)' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold',   fontSize: fontsize(), color: focused ? 'rgba(24,119,242,1)' : 'black'}}>Search</Text>
              </View> 
              )}}
            />
            
            <Tab.Screen name="Me" component={PlayStack3}
              options={{headerShown: false ,tabBarIcon: ({focused})=>(
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10, width: width/4}}>
                <Image source={require('../../assets/nav/Me.png')} style={{width: imagesize(), height: imagesize(), tintColor: focused ? 'rgba(24,119,242,1)' : 'black'}}/>
                <Text style={{marginTop: 5, fontWeight: 'bold', fontSize: fontsize(), color: focused ? 'rgba(24,119,242,1)' : 'black'}}>Me</Text>
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
          //console.log("global.value")
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

          <View style={{marginBottom: 5, shadowOpacity: 0.5, shadowColor: 'black', position: 'absolute', bottom: verticalScale(60), marginHorizontal: scale(20)}}>
            <ImageBackground imageStyle={{borderRadius: 10}} style={{backgroundColor: 'rgba(67,156,212,0.9)', justifyContent: 'center', alignItems: 'center', height: verticalScale(65), borderRadius: 10, shadowOpacity: 0.2, opacity: 1}}>
              
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=> [global.modalVisible=(true), setValue(''), global.value=""]} style={{width: scale(70), alignItems: 'center', height: verticalScale(65), borderRadius:10, marginLeft: scale(-10)}}> 
                  <Image source={{uri: global.cover}} style={{width: scale(70), height: verticalScale(65), borderBottomLeftRadius:10, borderTopLeftRadius: 10}} />
                </TouchableOpacity>
        
                <View style={{width: Dimensions.get('window').width-scale(90), alignItems: 'center', height: 70, flexDirection: 'row' }}>
                  <TouchableOpacity onPress={()=> [global.modalVisible=(true), setValue(''), global.value=""]} style={{marginRight: scale(15), }} >
                    <View style={{ alignItems: 'center', width: Dimensions.get('window').width-sizes(), marginLeft: 10, }}>
                      <Text numberOfLines={1} style={{ width: Dimensions.get('window').width-sizes(), color: 'white', fontWeight: 'bold', fontSize: scale(13), textAlign: 'left', marginBottom: 5}}>{global.title}</Text>
                      <Text numberOfLines={1} style={{ width: Dimensions.get('window').width-sizes(),  color: '#E8E8E8',   fontSize: scale(11), textAlign: 'left', }}>{global.category}</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-around', marginLeft: scale(-10)}}>
                    <TouchableOpacity onPress={()=> pause1()} >
                      {renderPlayPauseBtn1()}
                    </TouchableOpacity>
                    {isLiked()}
                  </View>
                  <TouchableOpacity onPress={()=> close()} style={{ marginTop: verticalScale(-65), backgroundColor: 'rgba(4,157,217,0.8)', width: scale(22), height: scale(22), alignItems: 'center', justifyContent: 'center', borderRadius: scale(22)}}>
                    <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828945.png'}} style={{width:scale(18), height:scale(18), tintColor: 'white',}}/>
                  </TouchableOpacity>

                </View>
              </View>

            </ImageBackground>

          </View>
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
});
export default Home;
/*<TouchableOpacity style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:42, height: 42, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/3138/3138377.png'}} style={{height: 36, width: 36, tintColor: 'rgba(4,157,217,1)'}}/>
                </View>
                <Text style={{ fontSize: 20, color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Add to queue</Text>
              </TouchableOpacity> */