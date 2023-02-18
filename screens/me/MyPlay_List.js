import React, {useEffect, useRef, useContext, useState} from "react";
import { ImageBackground, Modal, View, TextInput, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import { Image as Image1 } from "react-native";
import CachedImage from 'expo-cached-image'
import { Image } from "react-native-expo-image-cache";
import { BottomSheet } from 'react-native-btr';
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import Swipeable from 'react-native-gesture-handler/Swipeable';
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const MyPlay_List = ({navigation}) =>{
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [list, setList] = useState([]);
  const [heart, setHeart] = useState(false);
  const [likeID, setLikeID] = useState('')
  const [visible, setVisible] = useState(false)
  const [modal, setModal] = useState(false)
  const [modal3, setModal3] = useState(true)
  const [test, setTest] = useState('')
  const [data4, setData4] = useState([])
  const [data11, setData11] = useState([])
  const [index, setIndex] = useState(0)
  const [error, setError] = useState('');
  const [item, setItem] = useState('');
  const [colors, setColors] = useState('rgba(4,157,217,1)');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 3500);
  }
  const play=()=>{
    if(global.standard="Loaded"){
    global.list=list
    global.lists=list
    global.looping='no'
    global.shuffling=false
    global.playlist1=true
      global.cover=global.list[0].cover
      global.location="NotToday"
      global.title=global.list[0].title
      global.subs_id=global.list[0].subliminal_id
      global.category=global.list[0].category.name
      global.guide=global.list[0].guide
      global.description=global.list[0].description
      global.cover_name=global.list[0].cover_name
      if(value!="MINIMIZE"){
        setValue("MINIMIZE")
        global.count=1
        global.value="MINIMIZE"
      }else{global.count=1}
      setSubliminal(global.list[0])
      global.category=global.list[0].category.name
      for(var i=0; i<global.list[0].info.length; i++){
        if( global.list[0].info.length==1){
          global.track1=global.list[0].info[0].track_id;
          global.volume1= global.list[0].info[0].volume/100
          global.type1=global.list[0].info[0].audio_type.name;
          
        }else if( global.list[0].info.length==2){
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
    }else{
      console.log('please wait')
    }
  }
  const play1=(item)=>{
    if(global.subs_id!=item.subliminal_id){
      global.list=list
      global.lists=list
      global.playlist1=true
      global.shuffling=false
      if(global.standard=="Loaded"){
        const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
        global.subs_id=item.subliminal_id
        global.cover=item.cover
        global.title=item.title
        global.category=item.category.name
        global.location="NotToday"
        global.description=item.description
        global.guide=item.guide
        global.looping='no'
        global.cover_name=item.cover_name
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.value="MINIMIZE"
        }
        setSubliminal(item)
        global.count=1
        for(var i=0; i<item.info.length; i++){
          global.length=item.info.length;
          if(item.info.length==1){
            global.track1=item.info[0].track_id;
            global.volume1=item.info[0].audio_type.volume/100;
            global.type1=item.info[0].audio_type.name;
          }else if(item.info.length==2){
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
    else{
      console.log("Please Wait")
    }
  }else{
    setValue("")
    global.value=""
    global.modalVisible=true
  }
  }
  const fetchData11 = async () => {
    const resp1 = await fetch(global.link+"api/v1/playlist");
    const data1 = await resp1.json();
    const index =data1.findIndex(object => {
      return object.playlist_id === global.favplaylist.playlist_id;
    })
    setData11(data1)
    setIndex(index)
  };
  const fetchFeatured = async () => {
    const resp = await fetch(global.link+"api/v1/track/"+global.favplaylist.playlist_id);
    const data5 = await resp.json();
    if(data5.tracks){
      console.log(data5.tracks.length)
      const unique=getDifference(global.data, data5.tracks)
      const array = unique.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setVisible(true)
      setList(array)
    }else{
      setList([])
      setVisible(false)
    }
  };
  const toggleBottomNavigationView1 = () => {
    setTest('')
    setModal(!modal);
  };
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.title;
      });
    });
  }
  const findLiked=async()=>{
    const resp = await fetch(global.link+"api/v1/liked/playlist/"+global.id);
    const data5 = await resp.json();
    const index =data5.findIndex(object => {
      return object.title === global.favplaylist.title;
    })
    if(index!=-1){
      setHeart(true)
      setLikeID(data5[index].playlist_id)
    }else{
      setHeart(false)
      setLikeID('')
    }
  }
  const hea_rt = async()=>{
    if(heart==true){
      await fetch(global.link+"api/v1/liked/playlist/delete", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({playlist_id: likeID, 
          user_id: global.id
        })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        findLiked()
      })
    }else{
      await fetch(global.link+"api/v1/liked/playlist-info/add", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({playlist_id: "", featured_id: global.favplaylist.playlist_id, cover: global.favplaylist.cover,
          user_id: global.id, title: global.favplaylist.title,
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
  const deleting=async(item)=>{
    await fetch(global.link+`api/v1/own/playlist-info/delete`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({subliminal_id: item.subliminal_id, playlist_id: global.favplaylist.playlist_id,
      user_id: global.id,
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
          fetchData11()
          fetchFeatured()
          setColors('#6A98CA')
          return updateError("Subliminal successfully deleted!", setError);
      })
      closeSwipeable()
  }
  const addToPlaylist=async(item)=>{
    setModal(false)
    await fetch(global.link+`api/v1/own/playlist-info/add`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({featured_id: item.subliminal_id, playlist_id: global.favplaylist.playlist_id,
      user_id: global.id, cover: item.cover
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
          setTest('')
          setData4([])
          fetchFeatured()
          setColors('#6A98CA')
          return updateError("Subliminal successfully added to playlist!", setError);
      })
  }
  const searchfilter=(text)=>{
    if(text!=''){
      setTest(text)
      const newData =global.data.filter((item)=>{
        const itemData = item.title ? item.title.toUpperCase(): ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData)> -1;
      })
      setData4(getDifference1(getDifference(global.data, newData), data11[index].info))
    }else{
      setTest('')
      setData4([])
    }
  }
  const heartimage =()=>{
    if(heart==true){
      return(
        <TouchableOpacity onPress={()=> hea_rt()} style={{width: moderateScale(38), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(10)}} >
          <Image1 source={require('../../assets/Player/heart.png')} style={{width: moderateScale(24), tintColor: '#427AB3', height: moderateScale(24)}} />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={()=> hea_rt()} style={{width: moderateScale(38), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center', backgroundColor: '#427AB3', height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(10)}} >
          <Image1 source={require('../../assets/Player/heart.png')} style={{width: moderateScale(24), tintColor: 'white', height: moderateScale(24)}} />
        </TouchableOpacity>
      )
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFeatured()
      findLiked()
      fetchData11()
    });
    return unsubscribe;
  }, [navigation]);
  const space=()=>{
    if(width*2<=height){
      return moderateScale(170);
    }else if(width*2<=height+100){
      return moderateScale(210);
    }else{
      return moderateScale(210);
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
  const heightScale=()=>{
    if(width*2<=height){
      return moderateScale(160);
    }else if(width*2<=height+100){
      return moderateScale(130);
    }else{
      return moderateScale(130);
    }
  }
  const swipeableRef = useRef(null);
  const closeSwipeable = () => {
    console.log("OMG")
    swipeableRef.current.close();
  }
  
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity onPress={()=> deleting(item)}>
          <Image1 source={require('../../assets/Me/delete2.png')} style={{margin: moderateScale(20), tintColor: 'black', height: moderateScale(25), width: moderateScale(20)}} />
        </TouchableOpacity>
      </View>
    );
  };
  return(
    <>
      <ImageBackground imageStyle={{borderBottomLeftRadius: moderateScale(200), borderBottomRightRadius: moderateScale(200),}} style={styles.container}>
      </ImageBackground>
      
      <SafeAreaView style={{...Platform.select({android: {marginTop: -heightScale()}, ios: {marginTop: -heightScale()}}), height: height, width: width, transform: [{scaleX: 1}]}}>
      {error ?(
              <Modal
                animationType="fade"
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
            </Modal> ):null}
        <View style={{width: width, justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(38), height: moderateScale(38), marginTop: moderateScale(10), marginLeft: moderateScale(10)}} >
            <Image1 source={require('../../assets/back.png')} style={{width: moderateScale(38), height: moderateScale(38)}} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginRight: moderateScale(10)}}>
            {
              visible==true ?
              <>
                {heartimage()} 
              </>
              : null
            }
          </View>
        </View>
          <View style={{marginBottom: moderateScale(40), marginTop: moderateScale(20)}}>
            <Text style={{fontSize: moderateScale(22), color: 'white', textAlign: 'center', fontWeight: '700'}}>{global.favplaylist.title}</Text>
          </View>
          
        <ScrollView showsVerticalScrollIndicator={false} style={{width: width-moderateScale(30), marginTop: moderateScale(20), marginHorizontal: moderateScale(15), height: height}}>
          <TouchableOpacity onPress={()=> setModal(true)} style={{backgroundColor: 'white', borderColor: '#427AB3', borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: moderateScale(15) }}>
            <Image1 source={require('../../assets/Today/playAll.png')} style={{width: moderateScale(30), height: moderateScale(30), tintColor: 'white'}}/>
            <Text style={{fontSize: moderateScale(20), fontWeight: '600', textAlign: 'center', color: '#427AB3', padding: moderateScale(15)}}>Add Subliminal</Text>
          </TouchableOpacity>
          {
            visible==true ? 
            <TouchableOpacity onPress={()=> play()} style={{backgroundColor: '#427AB3', borderColor: '#427AB3', borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: moderateScale(15) }}>
              <Image1 source={require('../../assets/Today/playAll.png')} style={{width: moderateScale(30), height: moderateScale(30), tintColor: 'white'}}/>
              <Text style={{fontSize: moderateScale(20), fontWeight: '600', textAlign: 'center', color: 'white', padding: moderateScale(15)}}>Play</Text>
            </TouchableOpacity> 
            : null
          }
          <View style={{flexDirection: 'column'}}>
            <View style={{marginRight: moderateScale(10)}}>
              {
                list.map((item, index) => {
                    return(
                      
                      <Swipeable key={index} 
                        ref={swipeableRef}
                        renderLeftActions={rightSwipeActions}
                        renderRightActions={rightSwipeActions}
                        onSwipeableOpen={()=> setItem(item)}
                      >
                        <TouchableOpacity onLongPress={()=> deleting(item)} onPress={()=> play1(item)} style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View style={styles.mainimage5}>
                            <Image1 source={{uri: item.cover}} style={styles.image5}/>
                          </View>
                          <View style={{width: width/1.8, marginLeft: moderateScale(5), height: width/4, justifyContent: 'center'}}>
                            <Text numberOfLines={2} style={styles.substitle5}>{item.title}</Text>
                            <Text numberOfLines={3} style={styles.substitle15}>{item.description}</Text>
                          </View>
                        </TouchableOpacity>
                      </Swipeable>
                    )
                })
              }
            </View>
            <Text style={{fontSize: moderateScale(12), fontWeight: '600', textAlign: 'center', color: 'gray', marginTop: moderateScale(25)}}>*Long Press to Delete Subliminal from Playlist*</Text>
          </View>
          <View style={{height: moderateScale(170)}}></View>
        </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
              >
              <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
              </View>
              
              <View style={styles.bottomView}>
                    <TouchableOpacity onPress={()=> toggleBottomNavigationView1()} style={{alignSelf: 'flex-end', marginTop: moderateScale(10), marginRight: moderateScale(10), borderRadius: moderateScale(59), marginTop: moderateScale(5), backgroundColor: '#427AB3'}}>
                      <Image1 source={require('../../assets/Player/exit.png')} style={{width: moderateScale(17), margin: moderateScale(10), tintColor: 'white', height: moderateScale(17)}} />
                    </TouchableOpacity>
                    
                    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: moderateScale(10), height: height-moderateScale(140)}}>
                      <View style={{alignSelf: 'center', alignItems: 'center'}}>
                        <View style={{ width: width/1.3, alignSelf: 'center', marginTop: moderateScale(30)}}>
                          <TextInput placeholder="Search to add Subliminal" value={test} onChangeText={newTet => searchfilter(newTet)}  style={{width: width/1.3, height: moderateScale(30), color: '#427AB3', fontSize: moderateScale(13), fontWeight: 'bold', textAlign: 'center', marginTop: moderateScale(3), }}/>
                          <View style={{backgroundColor: '#427AB3', height: moderateScale(2), width: width/1.3, marginTop: 0}}></View>
                        </View>
                        
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight: moderateScale(10)}}>
                          {
                            data4.map((item, index) => {
                              if(index % 2 == 0){
                                return(
                                    <TouchableOpacity key={index} onPress={()=> addToPlaylist(item)}>
                                      <View style={styles.mainimage}>
                                        <Image1 source={{uri: item.cover}} style={styles.image}/>
                                      </View>
                                      <View style={styles.mainsubs}>
                                        <Text numberOfLines={1} style={styles.substitle}>{item.title}</Text>
                                      </View>
                                    </TouchableOpacity>
                                )
                              }
                            })
                          }
                        </View>
                        <View>
                          {
                            data4.map((item, index) => {
                              if(index % 2 != 0){
                                return(
                                    <TouchableOpacity key={index} onPress={()=> addToPlaylist(item)}>
                                      <View style={styles.mainimage}>
                                      <Image1 source={{uri: item.cover}} style={styles.image}/>
                                      </View>
                                        <View style={styles.mainsubs}>
                                          <Text numberOfLines={1} style={styles.substitle}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                              }
                            })
                          }
                        </View>
                      </View>
                      <View style={{height: moderateScale(100)}}></View>  
                    </ScrollView>
              </View>
            </Modal>
      </SafeAreaView>
   </>
  )
}
const space=()=>{
  if(width*2<=height){
    return moderateScale(15);
  }else if(width*2<=height+100){
    return moderateScale(25);
  }else{
    return moderateScale(30);
  }
}
const heightScale=()=>{
  if(width*2<=height){
    return moderateScale(160);
  }else if(width*2<=height+100){
    return moderateScale(130);
  }else{
    return moderateScale(130);
  }
}
const styles = StyleSheet.create({
  container: {
    width:width-scale(200), backgroundColor: 'rgba(66,122,179,1)', alignItems: 'center', justifyContent: 'flex-end', height: heightScale(), borderBottomLeftRadius: moderateScale(100), borderBottomRightRadius: moderateScale(100), alignSelf: 'center', transform: [{scaleX: 2.5}]
  },
  bg: {
    width: width, height: moderateScale(200)
  },
  featured: {
    textAlign: 'left', color: 'white', fontSize: moderateScale(30), fontWeight: '700', marginHorizontal: moderateScale(20)
  },
  mainimage: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), alignSelf: 'center', borderRadius: moderateScale(15)
  },
  mainsubs: {
    backgroundColor: 'rgba(4,157,217,0.6)', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: moderateScale(50), width: (width/2)-moderateScale(20), marginTop: moderateScale(-50), borderBottomLeftRadius: moderateScale(15), borderBottomRightRadius: moderateScale(15)
  },
  substitle: {
    fontWeight: '700', fontSize: moderateScale(13), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'center'
  },
  substitle1: {
    fontWeight: '600', fontSize: moderateScale(13), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'left'
  },
  substitle2: {
    fontWeight: '700', fontSize: moderateScale(13), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'left'
  },
  image: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), borderRadius: moderateScale(15)
  },
  bottomNavigationView1: {
    backgroundColor: '#fff',
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  mainimage5: {
    width: width/3, height: width/3.5, backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), alignSelf: 'center', borderRadius: moderateScale(15)
  },
  substitle5: {
    fontWeight: '600', lineHeight: moderateScale(20), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), color: 'black', textAlign: 'left'
  },
  substitle15: {
    fontWeight: '600', marginHorizontal: moderateScale(10), marginTop: moderateScale(10), fontSize: moderateScale(11), paddingHorizontal: moderateScale(10), color: 'gray', textAlign: 'left'
  },
  image5: {
    width: width/3, height: width/3.5, borderRadius: moderateScale(15)
  },
  bottomView: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0, 
    borderTopLeftRadius: moderateScale(25), borderTopRightRadius: moderateScale(25)
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  
});
export default MyPlay_List;

/*
 <View style={{width:width-scale(170), marginTop: -moderateScale(100), height: moderateScale(350), borderRadius: moderateScale(60), alignSelf: 'center', transform: [{scaleX: 2}], backgroundColor: 'red'}}>
      </View>
      <SafeAreaView style={{marginTop: -moderateScale(250)}}>
        

      </SafeAreaView>
*/