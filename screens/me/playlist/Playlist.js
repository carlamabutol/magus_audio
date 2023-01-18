import React, { useState, useEffect, useContext } from "react";
import { ScrollView, TextInput, Modal, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions, SafeAreaView } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { StateContext } from "../../StateContext";
import { UserContext } from "../../UserContext";
const Playlist =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [unmount, setUnmount] = useState(true);
  const [one, setOne] = useState(true);
  const [text, setText] = useState("");
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(4,157,217,1)');
  const [colors, setColors] = useState('rgba(4,157,217,1)');
  const [modal3, setModal3] = useState(true);
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData1()
    });
    return unsubscribe;
   // fetchData1()
    //return()=> setUnmount(false)
  }, []);
  const createPlaylist = async (text)=>{
    if(text==""){
      setColor('red')
      setColors('#FF6A6A')
      return updateError('Please enter playlist name to add!', setError);
    }else{
      await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({moods_id: "",
        user_id: global.id, title: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then(async (result) =>{
        if(result.message=="success"){
          fetch1()
          setText('')
          setColors('#6A98CA')
          return updateError('Playlist successfully added!', setError);
        }else{
          fetch1();
          setText('')
          setColors('#FF6A6A')
          return updateError("Playlist name already exists!", setError);
        }
      })
    }
  }
  const fetchData1 = async () => {
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/own/playlist/"+global.id);
    const data1 = await resp1.json();
    if(data1.length!=0){
      if(unmount){setData(data1);}
      setOne(true)
    }
    else{
      setOne(false)
    }
  };
  const play = (item)=>{
    global.playlist=false

    if(global.subs_id!=item.subliminal_id){
    const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
    global.subs_id=item.subliminal_id
    global.cover=item.cover
    global.title=item.title
    global.category=item.category.name
    global.location="NotToday"
    global.description=item.description
    if(value!="MINIMIZE"){
      setValue("MINIMIZE")
      global.value="MINIMIZE"
    }
    setSubliminal(item)
    global.count=1
    for(var i=0; i<item.info.length; i++){
      global.length=item.info.length;
      if(item.info.length==2){
        global.track1=item.info[0].track_id;
        global.volume1=item.info[0].audio_type.volume/100;
        global.type1=item.info[0].audio_type.name;
        global.track2=item.info[1].track_id;
        global.volume2=item.info[1].audio_type.volume/100;
        global.type2=item.info[1].audio_type.name;

      }else if(item.info.length==3){
        global.track1=item.info[0].track_id;
        global.volume1=item.info[0].audio_type.volume/100;
        global.type1=item.info[0].audio_type.name;
        global.track2=item.info[1].track_id;
        global.volume2=item.info[1].audio_type.volume/100;
        global.type2=item.info[1].audio_type.name;
        global.track3=item.info[2].track_id;
        global.volume3=item.info[2].audio_type.volume/100;
        global.type3=item.info[2].audio_type.name;

      }else if(item.info.length==4){
        global.track1=item.info[0].track_id;
        global.volume1=item.info[0].audio_type.volume/100;
        global.type1=item.info[0].audio_type.name;
        global.track2=item.info[1].track_id;
        global.volume2=item.info[1].audio_type.volume/100;
        global.type2=item.info[1].audio_type.name;
        global.track3=item.info[2].track_id;
        global.volume3=item.info[2].audio_type.volume/100;
        global.type3=item.info[2].audio_type.name;
        global.track4=item.info[3].track_id;
        global.volume4=item.info[3].audio_type.volume/100;
        global.type4=item.info[3].audio_type.name;
      }
    }
  }
  };
  
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="Favorites"
    navigation.navigate("TodayPlaylist")
  }
  const space=()=>{
    if(width*2<=height){
      return verticalScale(260);
    }else if(width*2<=height+100){
      return verticalScale(310);
    }else{
      return verticalScale(340);
    }
  }
  const fetch1=async()=>{
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/own/playlist/"+global.id);
      const data1 = await resp1.json();
      if(data1.length!=0){
        setData(data1)
        setOne(true)
      }else{
        setOne(false)
      }
  }
  const deleting= async(item)=>{
    //console.log(item)
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist/delete/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({playlist_id: item,
        user_id: global.id
      })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      setText('')
      fetch1()
      setColors('#6A98CA')
      return updateError('Playlist Successfully Deleted!', setError);
    })
  }
  const adding=async(item)=>{
    global.playlist=item
    navigation.navigate("PlaylistMagusSpecific")
  }
  const sizes =()=>{
    if(width*2<=height+100){
      return scale(140);
    }else{
      return scale(110);
    }
  }
  const spaces=()=>{
    if(global.value!="MINIMIZE"){
      if(width*2<=height){
        return verticalScale(140);
      }else if(width*2<=height+100){
        return verticalScale(190);
      }else{
        return verticalScale(205);
      }
    }
    else{
      return verticalScale(130);
    }
  }
  const playlistCount=()=>{
    if(one==true){
      return(
      <>
        <ScrollView style={{marginTop: 20,}}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=> adding(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
                <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50), borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                
                <View style={{ width: Dimensions.get('window').width-sizes(), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                  <View>
                    <Text numberOfLines={1}style={{width: Dimensions.get('window').width-sizes(), color: '#0D0D0D', fontWeight: 'bold', fontSize: scale(14),}}>{item.title}</Text>
                  </View>
                  <TouchableOpacity  onPress={()=> deleting(item.playlist_id)} style={{marginRight: -30, shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 1, shadowOffset: {width: 1, height: 1}}}>
                    <Image source={require('../../../assets/me/delete2.png')} style={{width: scale(18), height: scale(23), tintColor: 'black',}}/>
                  </TouchableOpacity>
                </View>
                
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
            style={{ marginHorizontal: 20, padding: 1}}
            showsVerticalScrollIndicator={false}
          />
          <View style={{height: space(), width: width/2}}>
          </View> 
        </ScrollView>
      </>
      )
    }else{
      return(
        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <View style={{ width: width/1.3, alignSelf: 'center', marginTop: height/6}}>
            <TextInput placeholder="Enter Playlist Name" autoCorrect={true} autoFocus={true} value={text} onChangeText={newText => setText(newText)}  style={{width: width/1.3, height: scale(30), fontSize: scale(13), fontWeight: 'bold', textAlign: 'center', marginTop: 3, }}/>
            <View style={{backgroundColor: 'white', height: scale(2), width: width/1.3, marginTop: 0}}></View>
          </View>
          <View style={{justifyContent: 'center', width: width, alignItems: 'center', marginTop: 10}} >
            <TouchableOpacity onPress={()=> createPlaylist(text)} style={{width: width/1.3, borderColor: 'white', borderRadius: 15, borderWidth: 1.5, padding: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../../assets/playing/plus.png')} style={{width: scale(21), height: scale(21), marginTop: 0, marginLeft: 6, tintColor: 'white', }} />
              <Text style={{  fontSize: scale(15), color: 'white', marginLeft: 10, fontWeight: 'bold' }} >Create New Playlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  return(
    
    <ImageBackground source={require('../../../assets/me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
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
          <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={()=> [navigation.navigate("MeFree1")]} style={{width: scale(38), height: scale(38),}} >
              <Image  source={require('../../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setOne(false)} style={{marginRight: 15}} >
              <View style={{width: scale(33), height: scale(33), borderColor: 'rgba(4,157,217,1)', borderRadius: scale(38), borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/playing/add_playlist.png')} style={{width: scale(20), height: scale(17), tintColor: 'rgba(4,157,217,1)'}} />
              </View>
            </TouchableOpacity>
          </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: scale(21), color: '#0D0D0D', fontWeight: 'bold', }} >Playlists</Text>
        </View>
      
     
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <View style={{backgroundColor: 'white', width: scale(100), height: scale(30), borderRadius: scale(12), flexDirection: 'row', justifyContent: 'center', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}}>
          <Text style={{ color:'rgba(4,157,217,1)', fontWeight: 'bold', fontSize: scale(11), justifyContent: 'center', alignSelf: 'center', textAlign: 'center',  paddingLeft: 15, paddingRight: 15, }}>By You</Text>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate("PlaylistMagus")} style={{backgroundColor: 'rgba(4,157,217,1)', width:  scale(100), height: scale(30), borderRadius: scale(12), flexDirection: 'row',justifyContent: 'center', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}}>
          <Text style={{ color:'white', fontWeight: 'bold', fontSize: scale(11), justifyContent: 'center', alignSelf: 'center', textAlign: 'center',  paddingLeft: 15, paddingRight: 15, }}>By Magus</Text>
        </TouchableOpacity>
      </View>
      {playlistCount()}
      
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Playlist;