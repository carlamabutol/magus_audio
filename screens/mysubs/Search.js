import React, {useEffect, useContext, useState} from "react";
import { TextInput, FlatList, ImageBackground, View, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Image as Image1 } from "react-native";
import CachedImage from 'expo-cached-image'
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native-expo-image-cache";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const Search = ({navigation}) =>{
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [data4, setData4] = useState([]);
  const [category, setCategory] = useState([]);
  const [data10, setData10] = useState([]);
  const [text, setText] = useState("");
  const [searchingFirst, setSearchingFirst] = useState(false)
  const [number, setNumber] = useState(0)
  const [history, setHistory] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [myDiscover, setMyDiscover] = useState(false);
  const [discover1, setDiscover1] = useState([]);
  const [myDiscover1, setMyDiscover1] = useState(false);
  const [searches, setSearches] = useState([]);
  const [mysearches, setMySearches] = useState(false);
  const [myContinue, setMyContinue] = useState(false);
  const find = (item)=>{
    const object = global.data.findIndex(obj => obj.subliminal_id === item.track_playlist_id);
    play(global.data[object])
  }
  const play = (item)=>{
    if(item.subliminal_id){
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item.subliminal_id;
      })
      global.playlist1=false
      global.looping='no'
      if(global.subs_id!=item.featured_id){
        if(global.standard=="Loaded"){
        global.cover=global.data[index].cover
        global.location="NotToday"
        global.title=global.data[index].title
        global.subs_id=global.data[index].subliminal_id
        global.guide=global.data[index].guide
        global.category=global.data[index].category.name
        global.cover_name=global.data[index].cover_name
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.count=1
          global.value="MINIMIZE"
        }else{global.count=1}
        setSubliminal(global.data[index])
        global.category=global.data[index].category.name
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
          console.log("Please wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }  
    }
    else{
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item.featured_id;
      })
      global.playlist1=false
      global.looping='no'
      if(global.subs_id!=item.featured_id){
        if(global.standard=="Loaded"){
        global.cover=global.data[index].cover
        global.location="NotToday"
        global.title=global.data[index].title
        global.subs_id=global.data[index].subliminal_id
        global.guide=global.data[index].guide
        global.category=global.data[index].category.name
        global.cover_name=global.data[index].cover_name
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.count=1
          global.value="MINIMIZE"
        }else{global.count=1}
        setSubliminal(global.data[index])
        global.category=global.data[index].category.name
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
          console.log("Please wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
    }
  };
  const fetchDiscover= async () => {
    const resp6 = await fetch(global.link+"api/v1/playlist/discover");
    const data6 = await resp6.json();
    const array = data6.filter(object=>{
      return object.subscription_id.includes(global.subs) && object.subliminal_ids.length==0
    })
    const array1 = data6.filter(object=>{
      return object.subscription_id.includes(global.subs) && object.subliminal_ids.length>0
    })
    setDiscover(getDifference(array,global.data));
    if(getDifference(array,global.data).length==0){
      setMyDiscover(false)
    }else{
      setMyDiscover(true)
    }
    setDiscover1(array1);
    if(array1.length==0){
      setMyDiscover1(false)
    }else{
      setMyDiscover1(true)
    }
  };
  const searchHistory = async (ID) => {
    await fetch(global.link+"api/v1/user/search/history", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({user_id: global.id,
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      setSearches(result.data)
      if(result.data.length==0){
        setMySearches(false)
      }else{
        setMySearches(true)
      }
    })
  };
  const searchfilter=(text)=>{
    if(text){
      setText(text)
      const newData =global.data.filter((item)=>{
        const itemData = item.title ? item.title.toUpperCase(): ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData)> -1;
      })
      setData4(newData);
      setSearchingFirst(true)
    }else{
      setText('')
      setSearchingFirst(false)
    }
  }
  const searchfilter2=async(text)=>{
    if(text){
      await fetch(global.link+"api/v1/user/add/search/history", {
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
          setSearches(result.data)
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
  const fetchCategory = async () => {
    const resp = await fetch(global.link+"api/v1/category");
    const data = await resp.json();
    setCategory(getDifference11(data, global.datas))
  };
  function getDifference11(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.id=== object2.category_id ;
      });
    });
  }
  function getWordStr(str) {
    return str.split(/\s+/).slice(0,1).join(" ");
}
  useEffect(() => {
    setSearchingFirst(false)
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDiscover()
      space()
      fetchHistory()
      setData10(global.data)
      fetchCategory()
      searchHistory()
    });
    return unsubscribe;
    
  }, []);
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="SearchIcon"
    navigation.navigate("TodayPlaylist")
  }
  const sizes =()=>{
    if(width*2<=height+100){
      return scale(150);
    }else{
      return scale(110);
    }
  }
  const fetchHistory = async () => {
    const resp3 = await fetch(global.link+"api/v1/audio/history/"+global.id);
    const data3 = await resp3.json();
    const unique = [
      ...new Map(data3.track_history.map((item) => [item["track_title"], item])).values(),
    ];
    const array = unique.filter(object=>{
      return object.subscription_id.includes(global.subs)
    }) 
    setHistory(array)
    if(unique.length==0){
      setMyContinue(false)
    }else{
      setMyContinue(true)
    }
  };
  const fetchData = async (ids, name) => {
    if(ids==1){
      setData4(global.data)
      
    }else if(ids!=1){
    await fetch(global.link+`api/v1/search/playlist/category`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({category: ids})
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setData4(getDifferences(global.data, result[0]))
        setText(name)
        setSearchingFirst(true)
      })
    }
  };
  function getDifferences(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.subliminal_id === object2.featured_id;
      });
    });
  }
  const recently =()=>{
    if(mysearches==true){
      return(
        <View style={{marginHorizontal: moderateScale(10), marginBottom: moderateScale(10)}}>
          <Text style={{fontSize: moderateScale(19), color: '#427AB3', marginBottom: moderateScale(10), fontWeight: '600'}}>Recent Searches</Text>
          <View style={{}}>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                  searches.map((item, index) => {
                    if(index < 5){
                      return(
                        <TouchableOpacity onPress={()=>searchfilter(item)} key={index} style={{flexDirection: 'row', marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E9F0F7', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: '#427AB3', fontWeight: '600'}}>{(item)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
            </View>
        </View>
      )
    }
  }
  const newplaylist =()=>{
    if(myDiscover1==true){
      return(
        <>
          <Text style={{fontSize: moderateScale(19), marginLeft: moderateScale(10), color: '#427AB3', fontWeight: '600'}}>New Playlists for You</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: moderateScale(5), marginLeft: moderateScale(0)}}>
                {
                  discover1.map((item, index) => {
                      if(index % 3 == 0 && index < 6){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage3}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image3}/>
                              </View>
                                <View style={styles.mainsubs3}>
                                  <Text numberOfLines={3} style={styles.substitle3}>{item.title.toUpperCase()}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                  })
                }
              </View>
              <View style={{marginRight: moderateScale(5)}}>
                {
                  discover1.map((item, index) => {
                      if(index % 3 == 1 && index < 6){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage3}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image3}/>
                              </View>
                                <View style={styles.mainsubs3}>
                                  <Text numberOfLines={3} style={styles.substitle3}>{item.title.toUpperCase()}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                  })
                }
              </View>
              <View>
                {
                  discover1.map((item, index) => {
                      if(index % 3 == 2 && index < 6){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage3}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image3}/>
                              </View>
                                <View style={styles.mainsubs3}>
                                  <Text numberOfLines={3} style={styles.substitle3}>{item.title.toUpperCase()}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                  })
                }
              </View>
            </View>
        </>
      )
    }
  }
  const newsubs =()=>{
    if(myDiscover==true){
      return(
        <>
          <Text style={{fontSize: moderateScale(19), marginLeft: moderateScale(10), color: '#427AB3', fontWeight: '600'}}>New Subliminals for You</Text>
            <View style={{flexDirection: 'row', marginBottom: moderateScale(20)}}>
              <View style={{marginRight: moderateScale(5), marginLeft: moderateScale(0)}}>
                {
                  discover.map((item, index) => {
                      if(index % 3 == 0 && index < 6){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage3}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image3}/>
                              </View>
                                <View style={styles.mainsubs3}>
                                  <Text numberOfLines={3} style={styles.substitle3}>{item.title.toUpperCase()}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                  })
                }
              </View>
              <View style={{marginRight: moderateScale(5)}}>
                {
                  discover.map((item, index) => {
                      if(index % 3 == 1 && index < 6){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage3}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image3}/>
                              </View>
                                <View style={styles.mainsubs3}>
                                  <Text numberOfLines={3} style={styles.substitle3}>{item.title.toUpperCase()}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                  })
                }
              </View>
              <View>
                {
                  discover.map((item, index) => {
                      if(index % 3 == 2 && index < 6){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage3}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image3}/>
                              </View>
                                <View style={styles.mainsubs3}>
                                  <Text numberOfLines={3} style={styles.substitle3}>{item.title.toUpperCase()}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                  })
                }
              </View>
            </View>
        </>
      )
    }
  }
  const ifSearching =()=>{
    if(searchingFirst==false){
      return(
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {recently()}
          {newsubs()}
          {newplaylist()}
          <View style={{height: moderateScale(135)}}></View>
        </ScrollView>
      </>
      )
    }else if(searchingFirst==true){
      return(
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: moderateScale(10), marginLeft: moderateScale(5)}}>
                {
                  data4.map((item, index) => {
                    if(item.info.length!=0){
                      if(index % 2 == 0){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage2}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image2}/>
                              </View>
                              <View style={styles.mainsubs2}>
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
                  data4.map((item, index) => {
                    if(item.info.length!=0){
                      if(index % 2 != 0){
                        return(
                            <TouchableOpacity key={index} onPress={()=> play(item)}>
                              <View style={styles.mainimage2}>
                                <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image2}/>
                              </View>
                                <View style={styles.mainsubs2}>
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
      )
    }else{
      return(
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: moderateScale(10)}}>
                {
                  data4.map((item, index) => {
                    if(index % 2 == 0){
                      return(
                          <TouchableOpacity key={index} onPress={()=> find(item)}>
                            <View style={styles.mainimage}>
                              <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image}/>
                            </View>
                            <View style={{ justifyContent: 'center', marginBottom: moderateScale(13), alignItems: 'flex-start', marginTop: moderateScale(7), width: (width/2)-moderateScale(20)}}>
                              <Text numberOfLines={1} style={{fontWeight: '600', fontSize: moderateScale(15), paddingHorizontal: moderateScale(5), color: 'black', textAlign: 'left'}}>{item.track_playlist_title}</Text>
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
                        <TouchableOpacity key={index} onPress={()=> find(item)}>
                          <View style={styles.mainimage}>
                            <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image}/>
                          </View>
                          <View style={{ justifyContent: 'center', marginBottom: moderateScale(13), alignItems: 'flex-start', marginTop: moderateScale(7), width: (width/2)-moderateScale(20)}}>
                            <Text numberOfLines={1} style={{fontWeight: '600', fontSize: moderateScale(15), paddingHorizontal: moderateScale(5), color: 'black', textAlign: 'left'}}>{item.track_playlist_title}</Text>
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
  const space=()=>{
    if(width*2<=height){
      return verticalScale(135);
    }else if(width*2<=height+100){
      return verticalScale(165);
    }else{
      return verticalScale(155);
    }
  }
  
  return(
    <ImageBackground  source={require('../../assets/Me/me2/mebg.png')} style={styles.container}>
      <SafeAreaView style={{width: width, height: height}}>
        <View style={{marginTop: moderateScale(10), height: height, alignItems: 'flex-end', width: width-moderateScale(20), marginRight: moderateScale(5), marginLeft: moderateScale(10)}}>
            <LinearGradient
              colors={['white', 'white', 'white', 'white', 'white',]}
              style={{height: moderateScale(40), width: width-moderateScale(20), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', width: width-moderateScale(30), justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(30), height: moderateScale(30)}} >
                  <Image1 source={require('../../assets/back.png')} style={{width: moderateScale(30), tintColor: 'black', height: moderateScale(30)}} />
                </TouchableOpacity>
                <TextInput placeholder="Search" returnKeyType="search" autoCorrect={true} value={text} onEndEditing={()=> searchfilter2(text)} onChangeText={newText => searchfilter(newText)} style={{width: width-moderateScale(120)}}/>
                <View style={{width: moderateScale(30), height: moderateScale(30)}} >
                  <Image1 source={require('../../assets/Choose/search1.png')} style={{width: moderateScale(30), tintColor: 'black', height: moderateScale(30)}} />
                </View>
              </View>
            </LinearGradient>
        </View>
        <View style={styles.bottomView}>              
        </View>
        <View style={{width: width-moderateScale(20), height: height, marginTop: -height+moderateScale(170), marginHorizontal: moderateScale(10)}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: moderateScale(10), height: height, width: width-moderateScale(20)}}>
            {ifSearching()}
            <View style={{height: moderateScale(200)}}></View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center'
  },
  mainimage: {
    width: (width/3)-moderateScale(20), height: (width/3)-moderateScale(20), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: moderateScale(8)
  },
  mainimage2: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: moderateScale(8)
  },
  mainimage3: {
    width: (width/3)-moderateScale(10), height: (width/3)-moderateScale(10), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: moderateScale(8)
  },
  mainsubs: {
    backgroundColor: '#427AB3', marginTop: -moderateScale(1), justifyContent: 'center', alignItems: 'center', height: moderateScale(50), width: (width/3)-moderateScale(20), borderBottomLeftRadius: moderateScale(8), borderBottomRightRadius: moderateScale(8)
  },
  mainsubs2: {
    backgroundColor: '#427AB3', marginTop: -moderateScale(1), justifyContent: 'center', alignItems: 'center', height: moderateScale(50), width: (width/2)-moderateScale(20), borderBottomLeftRadius: moderateScale(8), borderBottomRightRadius: moderateScale(8)
  },
  mainsubs3: {
    marginTop: -(width/3)+moderateScale(10), justifyContent: 'center', alignItems: 'center', height: (width/3)-moderateScale(10), width: (width/3)-moderateScale(10), borderBottomLeftRadius: moderateScale(8), borderBottomRightRadius: moderateScale(8)
  },
  substitle: {
    fontWeight: '700', fontSize: moderateScale(14), paddingHorizontal: moderateScale(5), color: 'white', textAlign: 'center'
  },
  substitle3: {
    fontWeight: '700', fontStyle: 'italic', fontSize: moderateScale(12), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'center', textShadowColor: 'black', textShadowRadius: 5, textShadowOffset: {width: 1, height: 1}
  },
  substitle1: {
    fontWeight: '500', fontSize: moderateScale(12), paddingHorizontal: moderateScale(5), color: 'white', textAlign: 'center'
  },
  image: {
    width: (width/3)-moderateScale(20), height: (width/3)-moderateScale(20), borderTopLeftRadius: moderateScale(8), borderTopRightRadius: moderateScale(8)
  },
  image2: {
    width: (width/2)-moderateScale(20), height: (width/2)-moderateScale(20), borderTopLeftRadius: moderateScale(8), borderTopRightRadius: moderateScale(8)
  },
  image3: {
    width: (width/3)-moderateScale(10), height: (width/3)-moderateScale(10), borderRadius: moderateScale(8)
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
    marginTop: moderateScale(15)
  },
  browse: {
    textAlign: 'center', fontSize: moderateScale(20), fontWeight: '700', marginTop: moderateScale(25), marginBottom: moderateScale(-5)
  },
  categoryview: {
    height: moderateScale(100), padding: moderateScale(10), alignItems: 'flex-start', justifyContent: 'flex-end', width: (width/3)-moderateScale(20), marginTop: moderateScale(5), marginBottom: moderateScale(10)
  },
  categoryview2: {
    height: moderateScale(100), padding: moderateScale(10), alignItems: 'flex-start', justifyContent: 'flex-end', width: (width/3)-moderateScale(20), marginTop: moderateScale(5), marginBottom: moderateScale(10)
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
  
});
export default Search;
//backgroundColor: '#4C89C6', flexDirection: 'row', width: width-(scale(50)), height: moderateScale(50), alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(20), marginTop: moderateScale(100)