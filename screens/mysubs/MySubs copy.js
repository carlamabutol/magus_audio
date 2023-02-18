import React, {useEffect, useContext, useState} from "react";
import { TextInput, FlatList, ImageBackground, View, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Image as Image1 } from "react-native";
import CachedImage from 'expo-cached-image'
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import { Image } from "react-native-expo-image-cache";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const My_Subs = ({navigation}) =>{
  const [subliminals, setSubliminals] = useState([]);
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);

  const fetchSubs=async()=>{
    const resp = await fetch(global.link+"api/v1/subliminal");
    const data = await resp.json();
    const array = data.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setSubliminals(array)
    global.data=array
    global.datas=array
  }
  useEffect(() => {
    global.standard="Loaded"
      fetchSubs()
  }, []);
  const play = (item)=>{
    global.liked=false
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
        setSubliminal(item)
        global.guide=item.guide
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
  return(
    <ImageBackground style={styles.container}>
      <SafeAreaView style={{width: width}}>
          <View style={styles.mysubContainer}>
            <Text style={styles.mysubs}>My Subs</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Search")} style={styles.search}>
              <Image1 source={require('../../assets/Choose/search.png')} style={styles.search}/>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: moderateScale(10)}}>
                {
                  subliminals.map((item, index) => {
                    if(item.info.length!=0){
                      if(index % 2 == 0){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage}>
                                <Image preview={{uri: item.cover}} uri={item.cover} style={styles.image}/>
                              </View>
                              <View style={styles.mainsubs}>
                                <Text numberOfLines={1} style={styles.substitle}>{item.title}</Text>
                                <Text numberOfLines={1} style={styles.substitle1}>{item.category.name}</Text>
                              </View>
                            </TouchableOpacity>
                        )
                      }
                    }
                  })
                }
              </View>
              <View>
                {
                  subliminals.map((item, index) => {
                    if(item.info.length!=0){
                      if(index % 2 != 0){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image}/>
                              </View>
                                <View style={styles.mainsubs}>
                                  <Text numberOfLines={1} style={styles.substitle}>{item.title}</Text>
                                  <Text numberOfLines={1} style={styles.substitle1}>{item.category.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                      }
                    }
                  })
                }
              </View>
            </View>
            <View style={{height: moderateScale(235)}}></View>
          </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', backgroundColor: 'white'
  },
  mainimage: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: moderateScale(15)
  },
  mainsubs: {
    backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'flex-start', height: moderateScale(50), width: (width/2)-moderateScale(20), marginTop: moderateScale(-50), borderBottomLeftRadius: moderateScale(15), borderBottomRightRadius: moderateScale(15)
  },
  substitle: {
    fontWeight: '800', fontSize: moderateScale(17), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'left'
  },
  substitle1: {
    fontWeight: '600', fontSize: moderateScale(13), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'left'
  },
  image: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), borderRadius: moderateScale(15)
  },
  mysubContainer: {
    paddingHorizontal: moderateScale(15), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: moderateScale(50)
  },
  mysubs: {
    textAlign: 'left', fontSize: moderateScale(30), fontWeight: '700'
  },
  search: {
    height: moderateScale(30), width: moderateScale(30), tintColor: 'black'
  },
  scroll: {
    paddingHorizontal: moderateScale(15), marginTop: moderateScale(15)
  },
  browse: {
    textAlign: 'center', fontSize: moderateScale(20), fontWeight: '700', marginTop: moderateScale(25), marginBottom: moderateScale(-5)
  },
  categoryview: {
    height: moderateScale(100), padding: moderateScale(10), alignItems: 'flex-start', justifyContent: 'flex-end', width: (width/2)-moderateScale(20), marginTop: moderateScale(5), marginBottom: moderateScale(10)
  },
  searchname: {
    lineHeight: moderateScale(22), color: 'black', textAlign: 'left', fontSize: moderateScale(18), fontWeight: '700'
  },
  view: {
    paddingHorizontal: moderateScale(15), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: moderateScale(50)
  },
  back: {
    width: moderateScale(38), height: moderateScale(38), marginTop: moderateScale(10), marginLeft: moderateScale(-5)
  },
  input: {
    height: moderateScale(35), paddingLeft: moderateScale(15), width: width-moderateScale(99), marginRight: moderateScale(33), borderRadius: moderateScale(10), fontSize: moderateScale(17), borderWidth: 2, borderColor: 'black'
  }
  
});
export default My_Subs;
//backgroundColor: '#4C89C6', flexDirection: 'row', width: width-(scale(50)), height: moderateScale(50), alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(20), marginTop: moderateScale(100)