import React, { useState, useEffect, useContext } from "react";
import { TextInput, Modal, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { StateContext } from "../../StateContext";
import { UserContext } from "../../UserContext";
const PlaylistMagusSpecific =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [list, setList] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal3, setModal3] = useState(true);
  const [modal4, setModal4] = useState(true);
  const [data11, setData11] = useState([]);
  const [data10, setData10] = useState([]);
  const [array, setArray] = useState([]);
  const [text, setText] = useState('');
  const [index, setIndex] = useState('');
  const [error1, setError1] = useState('');
  const [error, setError] = useState('');
  const [colors, setColors] = useState('rgba(4,157,217,1)');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  useEffect(() => {
    if(text==""){
      setData10([])
    }
    fetch1()
    fetchData11()
  }, []);
  const fetch1=async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.playlist.playlist_id);
    const data1 = await resp.json();
    if(data1.tracks==undefined){
      setList(false)
    }else{
      setList(true)
      setData(getDifference(global.data,data1.tracks))
    }
  }
  const fetchData11 = async () => {
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist");
    const data1 = await resp1.json();
    const index =data1.findIndex(object => {
      return object.playlist_id === global.playlist.playlist_id;
    })
    setData11(data1)
    setIndex(index)
  };
  const search = async(text)=>{
    if(text==''){
      setData10([])
    }
    else{
    await fetch(`https://dev.magusaudio.com/api/v1/playlist/search`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({user_id: global.id, search: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setData10(getDifference1(getDifference(global.data, result[0]), data11[index].info))
      })
    }
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.title;
      });
    });
  }
  function getDifference1(array1,array2){
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.subliminal_id == object2.subliminal_id;
      });
    });
  }
  const texting =(text)=>{
    if(text==""){
      setData10([])
      setText('')
    }else if(text!=""){
      setText(text)
      search(text)
    }
  }
  const addToPlaylist=async(item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({featured_id: item.subliminal_id, playlist_id: global.playlist.playlist_id,
      user_id: global.id, cover: item.cover
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
          fetch1()
          fetchData11()
          setText('')
          setData10([])
          setModal(false)
          setColors('#6A98CA')
          return updateError("Subliminal successfully added to playlist!", setError);
          
      })
  }
  const space=()=>{
    if(width*2<=height){
      return verticalScale(420);
    }else if(width*2<=height+100){
      return verticalScale(480);
    }else{
      return verticalScale(490);
    }
  }
  const sizes=()=>{
    if(width*2<=height){
      return scale(120);
    }else if(width*2<=height+100){
      return scale(120);
    }else{
      return scale(85);
    }
  }
  const sizes1=()=>{
    if(width*2<=height){
      return scale(140);
    }else if(width*2<=height+100){
      return scale(140);
    }else{
      return scale(105);
    }
  }
  const deleting=async(item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/delete`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({subliminal_id: item.subliminal_id, playlist_id: global.playlist.playlist_id,
      user_id: global.id,
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
          fetch1()
          fetchData11()
          setColors('#6A98CA')
          return updateError("Subliminal successfully deleted!", setError);
      })
  }
  const play1=()=>{
    global.repeat=false
    global.playlist1=true
    global.cover=global.list[0].cover
    global.location="NotToday"
    global.title=global.list[0].title
    global.subs_id=global.list[0].subliminal_id
    global.category=global.list[0].category.name
    global.description=global.list[0].description
    global.list=data
    global.lists=data
    global.count=1
    if(value!="MINIMIZE"){
      setValue("MINIMIZE")
      global.count=1
      global.value="MINIMIZE"
      
    }else{global.count=1}
    setSubliminal(global.list[0])
    global.category=global.list[0].category.name
    for(var i=0; i<global.list[0].info.length; i++){
      if( global.list[0].info.length==2){
        global.track1=global.list[0].info[0].track_id;
        global.volume1= global.list[0].info[0].volume/100
        global.type1=global.list[0].info[0].audio_type.name;
        
        global.track2=global.list[0].info[1].track_id;
        global.volume2= global.list[0].info[1].volume/100
        global.type2=global.list[0].info[1].audio_type.name;
        
      }else if(global.list[0].info.length==3){
        global.track1=global.list[0].info[0].track_id;
        global.volume1= global.list[0].info[0].volume/100
        global.type1=global.list[0].info[0].audio_type.name;
        
        global.track2=global.list[0].info[1].track_id;
        global.volume2= global.list[0].info[1].volume/100
        global.type2=global.list[0].info[1].audio_type.name;

        global.track3=global.list[0].info[2].track_id;
        global.volume3= global.list[0].info[2].volume/100
        global.type3=global.list[0].info[2].audio_type.name;
        
      }else if(global.list[0].info.length==4){
        global.track1=global.list[0].info[0].track_id;
        global.volume1= global.list[0].info[0].volume/100
        global.type1=global.list[0].info[0].audio_type.name;
        
        global.track2=global.list[0].info[1].track_id;
        global.volume2= global.list[0].info[1].volume/100
        global.type2=global.list[0].info[1].audio_type.name;

        global.track3=global.list[0].info[2].track_id;
        global.volume3= global.list[0].info[2].volume/100
        global.type3=global.list[0].info[2].audio_type.name;

        global.track4=global.list[0].info[3].track_id;
        global.volume4= global.list[0].info[3].volume/100
        global.type4=global.list[0].info[3].audio_type.name;
      }
    }
    global.length=global.list[0].info.length;
}
  const play = (item)=>{
    global.playlist1=true
    global.repeat=true
    if(global.subs_id!=item.subliminal_id){
    const object = global.data.find(obj => obj.subliminal_id === item.subliminal_id);
    global.subs_id=item.subliminal_id
    global.cover=item.cover
    global.title=item.title
    global.description=item.description
    global.category=item.category.name
    global.location="NotToday"
    global.list=data
    global.lists=data
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
  const myList=()=>{
    if(list==true){
      return(
        <>
          <TouchableOpacity onPress={()=> play1()} style={{backgroundColor: '#049DD9', marginLeft: 20, marginRight: 20, width: width-40, borderRadius: 10, padding: 8, marginTop: verticalScale(15), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/347/347941.png"}} style={{width:scale(30), height: scale(30), tintColor: 'white'}}/>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scale(16), marginLeft: 15}}> Play1</Text>
          </TouchableOpacity>
          <ScrollView>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=> play(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
                    <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50), borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                    <View style={{ width: Dimensions.get('window').width-sizes(), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                      <View>
                        <Text numberOfLines={1}style={{width: Dimensions.get('window').width-sizes1(), color: '#0D0D0D', fontWeight: 'bold', fontSize: scale(14), marginBottom: 5}}>{item.title}</Text>
                        <Text numberOfLines={1}style={{width: Dimensions.get('window').width-sizes1(), color: '#0D0D0D',  fontSize: scale(11),}}>{item.category.name}</Text>
                      </View>
                      <TouchableOpacity  onPress={()=> deleting(item)} style={{marginRight: -30, marginLeft: 10, shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 1, shadowOffset: {width: 1, height: 1}}}>
                        <Image source={require('../../../assets/me/delete2.png')} style={{width: scale(18), height: scale(24), tintColor: 'black',}}/>
                      </TouchableOpacity>
                    </View>
                    
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.title}
                style={{marginTop: 10, marginHorizontal: 20, padding: 1 }}
                showsVerticalScrollIndicator={false}
              />
            <View style={{height: space(), width: width/2}}>
            </View> 
          </ScrollView> 
        </>
      )
    }
  }
  const imagesize =()=>{
    if(width*2<=height+100){
      return scale(150);
    }else{
      return scale(100);
    }
  }
  return(
    <ImageBackground source={require('../../../assets/me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
      
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
        >
        <ImageBackground source={require('../../../assets/me/profilebg.png')} style={{width: width, height: height}}>
          <SafeAreaView>
            <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={()=> [setModal(false)]} style={{width: scale(38), height: scale(38)}} >
                <Image source={require('../../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
              </TouchableOpacity>
            </View>
            <View style={{borderWidth:1,borderRadius: 5, marginHorizontal: 20}}>
              <TextInput placeholder="Search to add subliminal" value={text} onChangeText={newText => texting(newText)}  style={{width: Dimensions.get('window').width-scale(115), fontSize: scale(14),padding: verticalScale(15),}}/>
            </View>
            <ScrollView>
                <FlatList
                  data={data10}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> addToPlaylist(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.8, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
                      <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50), borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                      
                      <View style={{ width: Dimensions.get('window').width-scale(130), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                        <View>
                          <Text numberOfLines={1}style={{width: Dimensions.get('window').width-scale(150), color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(14), marginBottom: 5}}>{item.title}</Text>
                          <Text numberOfLines={1}style={{width: Dimensions.get('window').width-scale(150), color: '#0D0D0D',  fontSize: scale(11),}}>{item.category.name}</Text>
                        </View>
                      </View>
                      
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.title}
                  style={{marginTop: 10, padding: 2, marginHorizontal: 20}}
                  showsVerticalScrollIndicator={false}
                />
                <View style={{height: verticalScale(150), width: width/2}}>
                </View> 
            </ScrollView>
          </SafeAreaView>
      </ImageBackground>
              
        </Modal>
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
            <TouchableOpacity onPress={()=> [navigation.navigate("Playlist")]} style={{width: scale(38), height: scale(38),}} >
              <Image  source={require('../../../assets/pageback.png')} style={{width: scale(26), height: scale(26), marginTop: scale(4)}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> [setText(''), setData10([]), setModal(true)]} style={{marginRight: 15}} >
              <View style={{width: scale(33), height: scale(33), borderColor: 'rgba(4,157,217,1)', borderRadius: scale(38), borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/2550/2550026.png'}} style={{width: scale(20), height: scale(17), tintColor: 'rgba(4,157,217,1)'}} />
              </View>
            </TouchableOpacity>
          </View>
        <View style={{alignItems: 'center'}}>
          <Image source={{uri: global.playlist.cover}} style={{width: imagesize(), height: imagesize(), borderRadius: 20, alignSelf: 'center'}} />
          <Text numberOfLines={1}style={{color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(18), marginTop: 10, paddingLeft: 30, paddingRight: 30 , textAlign: 'center' }}>{global.playlist.title}</Text>
        </View>
      {myList()}
      </SafeAreaView>
    </ImageBackground>
  )
}

export default PlaylistMagusSpecific;
/*
<View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
          <View style={{marginTop: verticalScale(25)}}>
            <View style={{ padding: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', width: width}}>
                <TouchableOpacity onPress={()=> [setModal(false)]} style={{width: scale(38), height: scale(38),justifyContent: 'center', alignItems: 'center'}} >
                  <Image  source={require('../../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
                </TouchableOpacity>
                <View style={{borderWidth:0.8, padding: 5, borderRadius: 5}}>
                  <TextInput placeholder="Search to Add Subliminal"  autoCorrect={true} autoFocus={false} value={text} onChangeText={newText => texting(newText)}  style={{width: Dimensions.get('window').width-scale(85), fontSize: scale(12), fontWeight: 'bold', padding: (10), textAlign: 'center' }}/>
                </View>
              </View>
                <FlatList
                  data={data10}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> addToPlaylist(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.8, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
                      <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50), borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
                      
                      <View style={{ width: Dimensions.get('window').width-scale(130), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                        <View>
                          <Text numberOfLines={1}style={{width: Dimensions.get('window').width-scale(150), color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(14), marginBottom: 5}}>{item.title}</Text>
                          <Text numberOfLines={1}style={{width: Dimensions.get('window').width-scale(150), color: '#0D0D0D',  fontSize: scale(11),}}>{item.category.name}</Text>
                        </View>
                      </View>
                      
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.title}
                  style={{marginTop: 10, marginBottom:verticalScale(50), padding: 2}}
                  showsVerticalScrollIndicator={false}
                />
            </View>
          </View>
        </View> */