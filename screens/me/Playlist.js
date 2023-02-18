import React, {useEffect, useState} from "react";
import { TextInput, Modal, FlatList, ImageBackground, View, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CachedImage from 'expo-cached-image'
import { Image as Image1 } from "react-native";
import { Image } from "react-native-expo-image-cache";
import NativeDialogManagerAndroid from "react-native/Libraries/NativeModules/specs/NativeDialogManagerAndroid";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const Playlist = ({navigation}) =>{
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [select, setSelected] = useState(1);
  const [unmount, setUnmount] = useState(true);
  const [modal3, setModal3] = useState(true);
  const [text, setText] = useState('');
  const [one, setOne] = useState(true);
  const [colors, setColors] = useState('rgba(4,157,217,1)');
  const [error, setError] = useState('');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const fetchMagusPlaylist = async () => {
    const resp1 = await fetch(global.link+"api/v1/playlist/");
    const data1 = await resp1.json();
    const object = data1.filter(data => {
        return data.user_id ==='';
      });
    if(unmount){
      const array = object.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setData1(array);
    }

  };
  const fetchMyPlaylist = async () => {
    const resp1 = await fetch(global.link+"api/v1/own/playlist/"+global.id);
    const data1 = await resp1.json();
    if(data1.length==0){
      setOne(false)
    }else{
      setOne(true)
      if(unmount){
        setData(data1);
        global.userPlaylist=data1
      }
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSubs()
      fetchMyPlaylist()
      fetchMagusPlaylist()
    });
    return unsubscribe;
  }, [navigation]);
  const space=()=>{
    if(width*2<=height){
      return moderateScale(10);
    }else if(width*2<=height+100){
      return moderateScale(20);
    }else{
      return moderateScale(30);
    }
  }
  const heightScale=()=>{
    if(width*2<=height){
      return moderateScale(180);
    }else if(width*2<=height+100){
      return moderateScale(130);
    }else{
      return moderateScale(130);
    }
  }
  const DATA=[
    {
      id: 1,
      name: "By You"
    },
    {
      id: 2,
      name: "By Magus"
    },
  ]
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
   
  }
  const images = (item1) =>{
    if(item1.subliminal_count==0){
      return(
        <>
          <CachedImage source={{uri: item1.cover}} cacheKey={item1.playlist_id} style={{height: moderateScale(70), width: moderateScale(70), borderTopLeftRadius: moderateScale(15), borderBottomLeftRadius: moderateScale(15)}}/>
        </>
      )
    }else{
      var a= item1.subliminals[0]
      const index =global.data.findIndex(object => {
        return object.subliminal_id ===  a;
      })
      console.log(index)
      if(index==-1){
        return(
          <>
            <CachedImage source={{uri: item1.cover}} cacheKey={item1.playlist_id} style={{height: moderateScale(70), width: moderateScale(70), borderTopLeftRadius: moderateScale(15), borderBottomLeftRadius: moderateScale(15)}}/>
          </>
        )
      }else{
        return(
          <>
            <CachedImage source={{uri: global.data[index].cover}} cacheKey={global.data[index].cover_name} style={{height: moderateScale(70), width: moderateScale(70), borderTopLeftRadius: moderateScale(15), borderBottomLeftRadius: moderateScale(15)}}/>
          </>
        )
      }      
    }
  }
  const createPlaylist = async (text)=>{
    if(text==""){
      setColors('#FF6A6A')
      return updateError('Please enter playlist name to add!', setError);
    }else{
      await fetch(global.link+"api/v1/own/playlist-info/add", {
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
          fetchMyPlaylist()
          setText('')
          setColors('#6A98CA')
          return updateError('Playlist successfully added!', setError);
        }else{
          fetchMyPlaylist();
          setText('')
          setColors('#FF6A6A')
          return updateError("Playlist name already exists!", setError);
        }
      })
    }
  }
  const deleting= async(item)=>{
    await fetch(global.link+`api/v1/own/playlist/delete/`, {
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
      fetchMyPlaylist()
      setColors('#6A98CA')
      return updateError('Playlist Successfully Deleted!', setError);
    })
  }
  const view = () =>{
    if(select==1){
      if(one==false){
        return(
          <View style={{alignSelf: 'center', alignItems: 'center'}}>
            <View style={{ width: width/1.3, alignSelf: 'center', marginTop: height/6}}>
              <TextInput placeholder="Enter Playlist Name" autoFocus={true} value={text} onChangeText={newText => setText(newText)}  style={{width: width/1.3, height: moderateScale(30), color: '#427AB3', fontSize: moderateScale(13), fontWeight: 'bold', textAlign: 'center', marginTop: moderateScale(3), }}/>
              <View style={{backgroundColor: '#427AB3', height: moderateScale(2), width: width/1.3, marginTop: 0}}></View>
            </View>
            <View style={{justifyContent: 'center', width: width, alignItems: 'center', marginTop: moderateScale(10)}} >
              <TouchableOpacity onPress={()=> createPlaylist(text)} style={{width: width/1.3, borderColor: '#427AB3', borderRadius: moderateScale(15), borderWidth: moderateScale(1.5), padding: moderateScale(12), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: moderateScale(15), color: '#427AB3', marginLeft: moderateScale(10), fontWeight: 'bold' }} >Create New Playlist</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }else{
        return(
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={{}}>
              <View style={{}}>
                {
                  global.userPlaylist.map((item1, index1) => {
                      return(
                          <View style={{flexDirection: 'row', borderColor: 'rgba(66,122,179,1)', borderWidth: 1, borderRadius: moderateScale(15), marginBottom: moderateScale(10), backgroundColor: 'white'}} key={index1}>
                            <TouchableOpacity onPress={()=> [global.favplaylist=item1, navigation.navigate("MyPlay_List")]} style={{height: moderateScale(70), width: moderateScale(70), marginRight: moderateScale(10)}}>
                              {images(item1)}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> [global.favplaylist=item1, navigation.navigate("MyPlay_List")]} style={{width: width-moderateScale(170), justifyContent: 'center', height: moderateScale(70)}}>
                              <Text numberOfLines={2} style={{textAlign: 'left', fontSize: moderateScale(16), fontWeight: '700', color: 'black'}}>{item1.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> deleting(item1.playlist_id)} style={{width: moderateScale(60), alignItems: 'center', justifyContent: 'center', height: moderateScale(70)}}>
                              <Image1 source={require('../../assets/Me/delete2.png')} style={{width: moderateScale(23), tintColor: 'black', height: moderateScale(31)}} />
                            </TouchableOpacity>
                          </View>
                      )
                  })
                }
              </View>
            </View>
            <View style={{height: moderateScale(235)}}></View>
          </ScrollView>
        )
      }
    }else{
      if(data1.length==0){
        return(
          <View style={{height: moderateScale(500), justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: 'white', width: width-moderateScale(100), borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: 'rgba(66,122,179,1)', }}>
              <View style={{width: width-moderateScale(100), borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: 'rgba(66,122,179,1)'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginVertical: verticalScale(20), color: 'rgba(66,122,179,1)', fontWeight: '600' }}>No Magus Playlist Available</Text>
            </View>
          </View>  
        )
      }else{
        return(
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: moderateScale(10)}}>
                {
                  data1.map((item1, index1) => {
                    if(index1 % 2 == 0){
                      return(
                          <TouchableOpacity key={index1} onPress={()=> [global.favplaylist=item1, navigation.navigate("Play_List")]}>
                            <View style={styles.mainimage}>
                              <Image preview={{uri: item1.cover}} uri={item1.cover} style={styles.image}/>
                            </View>
                            <View style={styles.mainsubs}>
                              <Text numberOfLines={2} style={[styles.substitle, {textAlign: 'center'}]}>{item1.title}</Text>
                            </View>
                          </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View>
                {
                  data1.map((item1, index1) => {
                    if(index1 % 2 != 0){
                      return(
                          <TouchableOpacity key={index1} onPress={()=> [global.favplaylist=item1, navigation.navigate("Play_List")]}>
                            <View style={styles.mainimage}>
                              <Image preview={{uri: item1.cover}} uri={item1.cover} style={styles.image}/>
                            </View>
                              <View style={styles.mainsubs}>
                                <Text numberOfLines={2} style={[styles.substitle, {textAlign: 'center'}]}>{item1.title}</Text>
                              </View>
                          </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
            </View>
            <View style={{height: moderateScale(235)}}></View>
          </ScrollView>
        )
      }
    }
  }
  return(
    <>
      <ImageBackground imageStyle={{borderBottomLeftRadius: moderateScale(100), borderBottomRightRadius: moderateScale(100),}} style={styles.container}>
      </ImageBackground>
      <SafeAreaView style={{...Platform.select({android: {marginTop: -heightScale()}, ios: {marginTop: -heightScale()}}), height: height, width: width, transform: [{scaleX: 1}]}}>
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
        <View style={{width: width, justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(38), height: moderateScale(38), marginTop: moderateScale(10), marginLeft: moderateScale(10)}} >
            <Image1 source={require('../../assets/back.png')} style={{width: moderateScale(38), height: moderateScale(38)}} />
          </TouchableOpacity>
          <Text style={styles.mysubs}>Playlists</Text>
          <View style={{width: moderateScale(38), height: moderateScale(38), marginRight: moderateScale(20)}} >
            <TouchableOpacity onPress={()=> [setSelected(1), setOne(false)]} style={{width: moderateScale(38), height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(10)}} >
              <Image1 source={require('../../assets/Me/playlist.png')} style={{width: moderateScale(38), height: moderateScale(38)}} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{...Platform.select({android: {marginTop: space()+moderateScale(35)}, ios: {marginTop: space()}}), alignItems: 'center',}}>
          <FlatList
            data={DATA}
            renderItem={({item}) => 
              <TouchableOpacity onPress={() => [setSelected(item.id), setOne(true)]}
                style={item.id === select ? styles.selected : styles.unselected} >
                <Text style={item.id === select ? styles.selectedText : styles.unselectedText}>{item.name}</Text>
              </TouchableOpacity>
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={item => item.id}
          />
        </View>
          {view()}

      </SafeAreaView>
    </>
  )
}
const heightScale=()=>{
  if(width*2<=height){
    return moderateScale(180);
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
  mysubs: {
    textAlign: 'left', color: 'white', fontSize: moderateScale(30), fontWeight: '700', marginTop: moderateScale(10)
  },
  selected: {
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    marginRight: moderateScale(10),
    width: moderateScale(120),
    justifyContent: 'center',
  },
  unselected: {
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: 'white',
    marginRight: moderateScale(10),
    width: moderateScale(120),
    color: 'black',
    justifyContent: 'center'
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
  mainimage: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: moderateScale(15)
  },
  mainsubs: {
    backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', height: moderateScale(50), width: (width/2)-moderateScale(20), marginTop: moderateScale(-50), borderBottomLeftRadius: moderateScale(15), borderBottomRightRadius: moderateScale(15)
  },
  substitle: {
    fontWeight: '800', fontSize: moderateScale(17), paddingHorizontal: moderateScale(10), color: 'white'
  },
  substitle1: {
    fontWeight: '600', fontSize: moderateScale(13), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'left'
  },
  image: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), borderRadius: moderateScale(15)
  },
  scroll: {
    paddingHorizontal: moderateScale(15), marginTop: moderateScale(60)
  },
 
});
export default Playlist;