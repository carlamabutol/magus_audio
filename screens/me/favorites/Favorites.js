import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, ImageBackground, StyleSheet, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../../UserContext";
import { StateContext } from "../../StateContext";
import { Image } from "react-native-expo-image-cache";
import { Image as Image1 } from "react-native";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const covers = global.node+"api/v1/s3/imagev2?file=default_cover.png"
  
const Favorites =({navigation})=>{
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [select, setSelected] = useState(1);
  const [unmount, setUnmount] = useState(true);
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
    const likedPlaylist = async () => {
    const resp1 = await fetch(global.link+"api/v1/liked/playlist/"+global.id);
    const data1 = await resp1.json();
    if(unmount){
      setData1(data1)
    }
  };
  const likedSubliminal =async()=>{
    await fetch(global.link+`api/v1/track/featured/liked/all`, {
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
        if(unmount){
          setData(getDifference(global.data, result.featured_track_liked));
          global.favorites=(getDifference(global.data, result.featured_track_liked))
        }
      }else{
        global.favorites=[]
        setData([])
      }
    })
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.track_title;
      });
    });
  }
  useEffect(() => {
    global.standard="Loaded"
    const unsubscribe = navigation.addListener('focus', () => {
      likedSubliminal()
      likedPlaylist()
    });
    return unsubscribe, setUnmount(false);
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
      name: "Subliminal"
    },
    {
      id: 2,
      name: "Playlist"
    },
  ]
  const play = (item)=>{
    global.playlist1=false
    global.item=item
  if(global.subs_id!=item.subliminal_id){
      if(global.standard=="Loaded"){
        const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
        global.subs_id=item.subliminal_id
        global.cover=item.cover
        global.cover_name=item.cover_name
        global.description=item.description
        global.title=item.title
        global.category=item.category.name
        global.location="NotToday"
        global.looping='no'
        global.guide=item.guide
        setSubliminal(item)
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.value="MINIMIZE"
        }
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
  };
  const images = (item1) =>{
    if(item1.subliminal_count==0){
      console.log(1)
      return(
        <>
          <Image preview={{uri: item1.cover}} uri={item1.cover} style={{width: moderateScale(67), borderRadius: moderateScale(10), height: moderateScale(67),}}/>
        </>
      )
    }else if(item1.cover==covers && item1.subliminal_count!=0){
      console.log(2)
      var a= item1.subliminals[0]
      const index =global.data.findIndex(object => {
        return object.subliminal_id ===  a;
      })
      if(index==-1){
        return(
          <>
            <Image preview={{uri: item1.cover}} uri={item1.cover} style={{width: moderateScale(67), borderRadius: moderateScale(10), height: moderateScale(67),}}/>
          </>
        )
      }else{
      console.log(3)
        return(
          <>
            <Image preview={{uri: global.data[index].cover}} uri={global.data[index].cover} style={{width: moderateScale(67), borderRadius: moderateScale(10), height: moderateScale(67),}}/>
          </>
        )
      }      
    }else if(item1.cover!=covers){
      return(
        <>
          <Image preview={{uri: item1.cover}} uri={item1.cover}  style={{width: moderateScale(67), borderRadius: moderateScale(10), height: moderateScale(67),}}/>
        </>
      )
    }
  }
  const view = () =>{
    if(select==1){
      if(global.favorites.length==0){
        return(
          <View style={{height: moderateScale(500), justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: 'white', width: width-moderateScale(100), borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: 'rgba(66,122,179,1)', }}>
              <View style={{width: width-moderateScale(100), borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: 'rgba(66,122,179,1)'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginVertical: verticalScale(20), color: 'rgba(66,122,179,1)', fontWeight: '600' }}>No Favorite Subliminal Available</Text>
            </View>
          </View>  
        )
      }else{
        return(
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: moderateScale(10)}}>
                {
                  global.favorites.map((item, index) => {
                      return(
                          <TouchableOpacity onPress={()=> play(item)} key={index} style={{flexDirection: 'row', elevation: 5, shadowColor: 'gray', shadowOpacity: 0.4, shadowOffset: {width: 1, height:1}, backgroundColor: 'white', width: width-moderateScale(100), alignItems: 'center', justifyContent: 'center', height: moderateScale(90), marginHorizontal: moderateScale(20), borderRadius: moderateScale(20), borderWidth: 0.4, borderColor: 'gray'}}>
                            <View style={{width: moderateScale(80)}}>
                              <Image preview={{uri: item.cover}} uri={item.cover} style={{width: moderateScale(67), borderRadius: moderateScale(10), height: moderateScale(67), }}/>
                            </View>
                            <View style={{width: width-moderateScale(207)}}>
                              <Text numberOfLines={1} style={[styles.substitle, {textAlign: 'left'}]}>{item.title}</Text>
                              <Text numberOfLines={1} style={styles.substitle1}>{item.category.name}</Text>
                            </View>
                          </TouchableOpacity>
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
              <Text style={{textAlign: 'center', fontSize: scale(10), marginVertical: moderateScale(20), color: 'rgba(66,122,179,1)', fontWeight: '600' }}>No Favorite Playlist Available</Text>
            </View>
          </View>
        )
      }else{
        return(
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: moderateScale(10)}}>
                {
                  data1.map((item1, index) => {
                      return(
                          <TouchableOpacity onPress={()=> [global.favplaylist=item1, navigation.navigate("Play_List")]} key={index} style={{flexDirection: 'row', elevation: 5, shadowColor: 'gray', shadowOpacity: 0.4, shadowOffset: {width: 1, height:1}, backgroundColor: 'white', width: width-moderateScale(100), alignItems: 'center', justifyContent: 'center', height: moderateScale(90), marginHorizontal: moderateScale(20), borderRadius: moderateScale(20), borderWidth: 0.4, borderColor: 'gray'}}>
                            <View style={{width: moderateScale(80)}}>
                              {images(item1)}
                            </View>
                            <View style={{width: width-moderateScale(207)}}>
                              <Text numberOfLines={2} style={[styles.substitle, {textAlign: 'left'}]}>{item1.title}</Text>
                            </View>
                          </TouchableOpacity>
                      )
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
    <ImageBackground source={require('../../../assets/Me/me2/mebg.png')} style={styles.container}>
    <SafeAreaView style={{height: height, width: width}}>
      <View style={{marginTop: moderateScale(10), height: height, width: width, marginRight: moderateScale(5), marginLeft: moderateScale(10)}}>
        <LinearGradient
            colors={['#e9f0f7', '#bed3e7', '#93b5d7', '#6898c7', '#427AB3',]}
            style={{height: moderateScale(40), width: moderateScale(40), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(30), height: moderateScale(30)}} >
              <Image1 source={require('../../../assets/back.png')} style={{width: moderateScale(30), tintColor: 'white', height: moderateScale(30)}} />
            </TouchableOpacity>
          </LinearGradient>
      </View>
      <View style={styles.bottomView}>              
      </View>
      <View style={{width: width-moderateScale(20), height: height, marginTop:-height+moderateScale(145), marginHorizontal: moderateScale(10)}}>
        <Text style={styles.maintitle}>Favorites</Text>
        <View style={{...Platform.select({android: {marginTop: space()+moderateScale(35)}, ios: {marginTop: space()}}), alignItems: 'center',}}>
          <FlatList
            data={DATA}
            renderItem={({item}) => 
              <TouchableOpacity onPress={() => [setSelected(item.id)]}
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
  maintitle: {
    fontSize: moderateScale(22), fontWeight: '700', marginTop: moderateScale(0), textAlign: 'center', marginBottom: moderateScale(10), color: '#427AB3',
  },
  mysubs: {
    textAlign: 'left', color: 'white', fontSize: moderateScale(30), fontWeight: '700', marginTop: moderateScale(10)
  },
  selected: {
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#427AB3',
    backgroundColor: '#427AB3',
    marginRight: moderateScale(10),
    width: moderateScale(120),
    justifyContent: 'center',
  },
  unselected: {
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#427AB3',
    marginRight: moderateScale(10),
    width: moderateScale(120),
    color: 'black',
    justifyContent: 'center'
  },
  selectedText: {
    padding: moderateScale(10),
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: 'white',
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
    fontWeight: '800', fontSize: moderateScale(16), color: '#427AB3'
  },
  substitle1: {
    fontWeight: '600', fontSize: moderateScale(12), color: '#427AB3', textAlign: 'left'
  },
  image: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), borderRadius: moderateScale(15)
  },
  scroll: {
    paddingHorizontal: moderateScale(15), marginTop: moderateScale(20)
  },
  bottomView: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute', 
    ...Platform.select({android: {top: height/2.8}, ios:{top: height/4.902}}), borderTopRightRadius: moderateScale(25), borderTopLeftRadius: moderateScale(25)
  },
  
})
export default Favorites;