import React, {useEffect, useContext, useState} from "react";
import { ImageBackground, View, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Image as Image1 } from "react-native";
import { UserContext } from "../UserContext";
import CachedImage from 'expo-cached-image'
import { StateContext } from "../StateContext";
import { LinearGradient } from "expo-linear-gradient";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const Featured = ({navigation}) =>{
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [featured, setFeatured] = useState([]);
  const fetchFeatured = async () => {
    const resp5 = await fetch(global.link+"api/v1/playlist/featured");
    const data5 = await resp5.json();
    const array = data5.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setFeatured(array);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFeatured()
    });
    return unsubscribe;
  }, [navigation]);
  const play = async(item1)=>{
    if(item1.subliminal_ids==''){
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item1.featured_id;
      })
      if(global.subs_id!=item1.featured_id){
        if(global.standard=="Loaded"){
        global.looping='no'
        global.playlist1=false
        global.cover=global.data[index].cover
        global.location="NotToday"
        global.title=global.data[index].title
        global.subs_id=global.data[index].subliminal_id
        global.category=global.data[index].category.name
        global.guide=global.data[index].guide
        global.cover_name=global.data[index].cover_name
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.count=1
          global.value="MINIMIZE"
        }else{global.count=1}
        setSubliminal(global.data[index])
        global.category=global.data[index].category.name
        global.guide=global.data[index].guide
        for(var i=0; i<global.data[index].info.length; i++){
          if( global.data[index].info.length==1){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
          }else if( global.data[index].info.length==2){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;
            
          }else if(global.data[index].info.length==3){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;
            
          }else if(global.data[index].info.length==4){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;

            global.track4=global.data[index].info[3].track_id;
            global.volume4= global.data[index].info[3].volume/100
            global.type4=global.data[index].info[3].audio_type.name;
          }
        }
        global.length=global.data[index].info.length;
        }else{
          console.log("Please Wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
    }
    else{
      global.playlist=item1
      navigation.navigate("Playlist")
    }
  };
  return(
    <ImageBackground source={require('../../assets/Today/todaybg.png')} style={styles.container}>
        <SafeAreaView style={{height: height, width: width}}>
        
          <View style={{marginTop: moderateScale(10), marginRight: moderateScale(5), marginLeft: moderateScale(10)}}>
            <LinearGradient
              colors={['#e9f0f7', '#bed3e7', '#93b5d7', '#6898c7', '#427AB3',]}
              style={{height: moderateScale(40), width: moderateScale(40), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(30), height: moderateScale(30)}} >
                <Image1 source={require('../../assets/back.png')} style={{width: moderateScale(30), tintColor: 'white', height: moderateScale(30)}} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.bottomView}>              
          </View>
          <View style={{width: width-moderateScale(20), height: height, marginTop: moderateScale(160), marginHorizontal: moderateScale(10)}}>
            <Text style={styles.maintitle}>Featured Subliminal</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{width: width, height: height, backgroundColor: 'white'}}>
              <View style={{flexDirection: 'row', width: width-moderateScale(30), marginHorizontal: moderateScale(25)}}>
                <View style={{marginRight: moderateScale(10)}}>
                  {
                    featured.map((item, index) => {
                      if(index % 2 == 0){
                        return(
                          <TouchableOpacity onPress={()=> play(item)} key={index}>
                            <View style={styles.mainimage}>
                              <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image}/>
                            </View>
                              <View style={styles.mainsubs}>
                                <Text numberOfLines={2} style={styles.substitle}>{item.title}</Text>
                              </View>
                          </TouchableOpacity>
                        )
                      }
                    })
                  }
                </View>
                <View>
                  {
                    featured.map((item, index) => {
                      if(index % 2 != 0){
                        return(
                          <TouchableOpacity onPress={()=> play(item)} key={index}>
                            <View style={styles.mainimage}>
                              <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image}/>
                            </View>
                              <View style={styles.mainsubs}>
                                <Text numberOfLines={2} style={styles.substitle}>{item.title}</Text>
                              </View>
                          </TouchableOpacity>
                        )
                      }
                    })
                  }
                </View>
              </View>
              <View style={{height: moderateScale(385)}}></View>
            </ScrollView>
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
  bg: {
    width: width, height: moderateScale(200)
  },
  featured: {
    textAlign: 'left', color: 'black', fontSize: moderateScale(30), fontWeight: '700', marginHorizontal: moderateScale(20)
  },
  mainimage: {
    width: (width/2)-moderateScale(40), height: (width/2)-moderateScale(40), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: moderateScale(15)
  },
  mainsubs: {
    backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', height: moderateScale(50), width: (width/2)-moderateScale(40), marginTop: moderateScale(-50), borderBottomLeftRadius: moderateScale(15), borderBottomRightRadius: moderateScale(15)
  },
  substitle: {
    fontWeight: '700', fontSize: moderateScale(14), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'center'
  },
  substitle1: {
    fontWeight: '600', fontSize: moderateScale(13), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'left'
  },
  see: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  maintitle: {
    fontSize: moderateScale(16), fontWeight: '700', marginTop: moderateScale(20), marginBottom: moderateScale(10), color: '#427AB3',
  },
  image: {
    width: (width/2)-moderateScale(40), height: (width/2)-moderateScale(40), borderRadius: moderateScale(15)
  },
  bottomView: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute', 
    top: height/4.3, borderTopRightRadius: moderateScale(25), borderTopLeftRadius: moderateScale(25)
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  
});
export default Featured;