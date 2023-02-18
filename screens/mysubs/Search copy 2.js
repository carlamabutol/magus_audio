import { useState, useEffect } from "react";
import { Modal, TextInput, Image, TouchableOpacity, StatusBar, ScrollView,FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CachedImage from 'expo-cached-image'
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

function Search({navigation}) {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [data4, setData4] = useState([]);
  const [category, setCategory] = useState([]);
  const [data10, setData10] = useState([]);
  const [text, setText] = useState("");
  const [searchingFirst, setSearchingFirst] = useState(false)
  const [number, setNumber] = useState(0)
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [history, setHistory] = useState([]);
  const [myContinue, setMyContinue] = useState(false);
  const find = (item)=>{
    const object = global.data.findIndex(obj => obj.subliminal_id === item.track_playlist_id);
    play(global.data[object])
  }
  const play = (item)=>{
      global.liked=false
      global.playlist1=false
      global.item=item
      if(global.subs_id!=item.subliminal_id){
        if(global.standard=="Loaded"){
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
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.subliminal_id === object2.featured_id;
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
      space()
      fetchHistory()
      setData10(global.data)
      fetchCategory()
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
    if(myContinue==true){
      return(
        <View style={{marginTop: moderateScale(20), marginHorizontal: moderateScale(10)}}>
          <Text style={{fontSize: moderateScale(19), marginBottom: moderateScale(15), fontWeight: '600'}}>Recently Played</Text>
          <View style={{}}>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  history.map((item, index) => {
                    if(index < 2){
                      return(
                        <TouchableOpacity onPress={()=> find(item)} key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{(item.track_title)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  history.map((item, index) => {
                    if(index < 6 && index > 2){
                      return(
                        <TouchableOpacity onPress={()=> find(item)} key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{(item.track_title)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              {
                history.length>5 ?
              <TouchableOpacity onPress={()=> [setSearchingFirst('true'), setData4(history)]} style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                <View style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(20), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                  <Text numberOfLines={2} style={{fontSize: moderateScale(13), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>...</Text>
                </View>
              </TouchableOpacity>
                : null
              }
            </View>
        </View>
      )
    }
  }
  const browse =()=>{
    if(category.length!=0){
      return(
        <View style={{marginTop: moderateScale(20), marginHorizontal: moderateScale(10)}}>
          <Text style={{fontSize: moderateScale(19), marginBottom: moderateScale(15), fontWeight: '600'}}>Browse Category</Text>
          <View style={{}}>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  category.map((item, index) => {
                    if(index < 4){
                      return(
                        <TouchableOpacity onPress={() => fetchData(item.id, item.name)} key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{getWordStr(item.name)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  category.map((item, index) => {
                    if(index < 9 && index > 4){
                      return(
                        <TouchableOpacity onPress={() => fetchData(item.id, item.name)} key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{getWordStr(item.name)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  category.map((item, index) => {
                    if(index < 14 && index > 9){
                      return(
                        <TouchableOpacity key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{getWordStr(item.name)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  category.map((item, index) => {
                    if(index < 19 && index > 14){
                      return(
                        <TouchableOpacity key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{getWordStr(item.name)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  category.map((item, index) => {
                    if(index < 25 && index > 19){
                      return(
                        <TouchableOpacity key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{getWordStr(item.name)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  category.map((item, index) => {
                    if(index < 30 && index > 25){
                      return(
                        <TouchableOpacity key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{getWordStr(item.name)}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View style={{ marginRight: moderateScale(5), flexDirection: 'row'}}>
                {
                  category.map((item, index) => {
                    if(index < 35 && index > 30){
                      return(
                        <TouchableOpacity key={index} style={{flexDirection: 'row',  marginBottom: moderateScale(10), height: moderateScale(35), paddingVertical: moderateScale(5), paddingHorizontal: moderateScale(8), borderRadius: moderateScale(8), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', marginRight: moderateScale(10)}}>
                          <Text numberOfLines={2} style={{fontSize: moderateScale(12), lineHeight: moderateScale(18), textAlign: 'center', color: 'black', fontWeight: '600'}}>{getWordStr(item.name)}</Text>
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
  const ifSearching =()=>{
    if(searchingFirst==false){
      return(
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {recently()}
          {browse()}
          <View style={{height: moderateScale(135)}}></View>
        </ScrollView>
      </>
      )
    }else if(searchingFirst==true){
      return(
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: moderateScale(10)}}>
                {
                  data4.map((item, index) => {
                    if(item.info.length!=0){
                      if(index % 2 == 0){
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
              <View>
                {
                  data4.map((item, index) => {
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
  return (
    <ImageBackground style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: moderateScale(15), flex: 1, justifyContent: 'flex-start', backgroundColor: 'white'  }}>
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', ...Platform.select({ android: {marginTop: verticalScale(-10)},ios: {marginTop: moderateScale(10)}}), marginBottom: 5, height: moderateScale(40), justifyContent: 'center', alignItems: 'center'}}>
        <View style={{borderWidth:1, flexDirection: 'row', borderRadius: moderateScale(10), marginRight: moderateScale(10), height: moderateScale(40), justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={()=> navigation.navigate("Search")} style={styles.search}>
            <Image source={require('../../assets/Choose/search.png')} style={styles.search}/>
          </TouchableOpacity>
          <TextInput placeholder="Search" autoCorrect={true} autoFocus={true} value={text} onChangeText={newText => searchfilter(newText)}  style={{width: Dimensions.get('window').width-moderateScale(185), marginTop: 1, height: moderateScale(30),  fontSize: moderateScale(13), fontWeight: 'bold', marginLeft: moderateScale(15), }}/>
          <TouchableOpacity onPress={()=> [setSearchingFirst(false), setText('')]} style={{}}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/3856/3856213.png'}} style={{width: moderateScale(22), height: moderateScale(22), marginRight: moderateScale(8)}}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(60), marginLeft: -moderateScale(5), height: moderateScale(40), justifyContent: 'flex-end', alignItems: 'center'}} >
          <Text style={{fontSize: moderateScale(12), fontWeight: '700', textAlign: 'center', marginBottom: moderateScale(10)}}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {ifSearching()}

    </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#F9C2FF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  scroll: {
    marginTop: moderateScale(10)
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
  search: {
    height: moderateScale(22), width: moderateScale(22), tintColor: 'black', marginLeft: moderateScale(5)
  },
  
});
export default Search;