import React, {useEffect, useState, useContext} from "react";
import { ImageBackground, SafeAreaView, FlatList, StyleSheet, Text, Dimensions, TouchableOpacity, View, ScrollView } from "react-native";
import { moderateScale, Image, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import { UserContext } from "../UserContext";
import CachedImage from 'expo-cached-image'
import { StateContext } from "../StateContext";
import moment from "moment";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const height1=Dimensions.get('screen').height;

function Item({ id, title, color, image, image_name, selected, onSelect }) {
  return (
    <TouchableOpacity onPress={() => onSelect(id, selected)} style={[ styles.item, { backgroundColor: selected ? color : 'rgba(4,157,217,0.6)' },]}>
      <View style={{width: moderateScale(20), marginBottom: moderateScale(2), height: moderateScale(20), borderRadius: moderateScale(20)}}>
        <CachedImage source={{uri: image }} cacheKey={image_name}  style={{width: verticalScale(20),  backgroundColor: 'rgba(4,157,217,0.4)', height: verticalScale(20), borderRadius: scale(20),}}/>
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
function Item1({ id, title, selected1, onSelect1 }) {
  return (
    <TouchableOpacity onPress={() => onSelect1(id, selected1)} style={[ styles.item1, { backgroundColor: selected1 ? 'rgba(4,157,217,1)' : 'rgba(4,157,217,0.6)' },]}>
      <Text style={styles.title1}>{title}</Text>
    </TouchableOpacity>
  );
}
const Today = ({navigation}) =>{
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [ID, setID] = useState(global.id)
  const [moods, setMoods] = useState([]);
  const [category, setCategory] = useState([]);
  const [history, setHistory] = useState([]);
  const [myContinue, setMyContinue] = useState(false);
  const [featured, setFeatured] = useState([]);
  const [myFeatured, setMyFeatured] = useState(false);
  const [discover, setDiscover] = useState([]);
  const [myDiscover, setMyDiscover] = useState(false);
  const [recommend, setRecommend] = useState([]);
  const [myRecommend, setMyRecommend] = useState(false);
  const [selected, setSelected] = React.useState(new Map());
  const [selected1, setSelected1] = React.useState(new Map());
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const onSelect = ((id, selected1)=>{
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));
    setSelected(newSelected);
    if(selected1==false){
      array1.push(id)
      setArray1(array1)
      mood(array1.toString(),ID)
    }else{
      const filteredItems = array1.filter(item => item !== id)
      setArray1(filteredItems)
      mood(filteredItems.toString(),ID)
    }
  });
  const onSelect1 = ((id, selected)=>{
    const newSelected = new Map(selected1);
    newSelected.set(id, !selected1.get(id));
    setSelected1(newSelected);
    if(selected==false){
      array2.push(id)
      setArray2(array2)
      categorys(array2.toString(),ID)
      fetchRecommended(array1.toString(), array2.toString(), array1.length, array2.length)
    }else{
      const filteredItems = array2.filter(item => item !== id)
      setArray2(filteredItems)
      categorys(filteredItems.toString(),ID)
      fetchRecommended(array1.toString(), filteredItems.toString(), array1.length, filteredItems.length)
    }
  });
  const mood = async(id, ID)=>{
    await fetch(global.link+`api/v1/user/update/moods`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({moods: id,
      user_id: ID
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      fetchRecommended(id, array2, id.length, array2.length)
    })
  } 
  const categorys = async(id, ID)=>{
    await fetch(global.link+`api/v1/user/update/category`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({category: id,
      user_id: ID
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
    })
  }
  const fetchRecommended = async (mood, category, moodlength, categorylength) => {
    if(categorylength==0 && moodlength!=0){
      const resp1 = await fetch(global.link+"api/v1/playlist/recommendation?category=&mood="+mood);
      const data1 = await resp1.json();
      const array = data1.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setRecommend(array);
      if(array.length==0){
        setMyRecommend(false)
      }else{
        setMyRecommend(true)
      }
    }else if(moodlength==0 && categorylength!=0){
      const resp1 = await fetch(global.link+"api/v1/playlist/recommendation?category="+category+"&mood=");
      const data1 = await resp1.json();
      const array = data1.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setRecommend(array);
      if(array.length==0){
        setMyRecommend(false)
      }else{
        setMyRecommend(true)
      }
    }else if(moodlength!=0 && categorylength!=0){
      const resp1 = await fetch(global.link+"api/v1/playlist/recommendation?category="+category+"&mood="+mood);
      const data1 = await resp1.json();
      const array = data1.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setRecommend(array);
      if(array.length==0){
        setMyRecommend(false)
      }else{
        setMyRecommend(true)
      }
    }else{
      setRecommend([])
      setMyRecommend(false)
    }
  };
  const fetchMood = async () => {
    const resp1 = await fetch(global.link+"api/v1/moods");
    const data1 = await resp1.json();
    setMoods(data1.data);
  }
  const fetchCategory = async () => {
    const resp2 = await fetch(global.link+"api/v1/category");
    const data2 = await resp2.json();
    const resp = await fetch(global.link+"api/v1/subliminal");
    const data = await resp.json();
    const array = data.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    global.data=array
    global.datas=array
    setCategory(getDifference(data2, array))
  };
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.id=== object2.category_id ;
      });
    });
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
  const fetchFeatured = async () => {
    const resp5 = await fetch(global.link+"api/v1/playlist/featured");
    const data5 = await resp5.json();
    const array = data5.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setFeatured(array);
    if(array.length==-1 || array.length==0){
      setMyFeatured(false)
    }else{
      setMyFeatured(true)
    }
  };
  const fetchDiscover= async () => {
    const resp6 = await fetch(global.link+"api/v1/playlist/discover");
    const data6 = await resp6.json();
    const array = data6.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setDiscover(array);
    if(array.length==-1 || array.length==0){
      setMyDiscover(false)
    }else{
      setMyDiscover(true)
    }
  };
  useEffect(() => {
    fetchRecommended()
    fetchMood()
    fetchCategory()
    global.standard="Loaded"
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHistory()
      fetchFeatured()
      fetchDiscover()
      generateGreetings()
    });
    return unsubscribe;
  }, [navigation]);
  const player = async(item, length)=>{
    global.liked=false
    if(length==0){
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
          console.log("Please Wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
    }else if(length==2){
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item.track_id;
      })
      global.looping='no'
      global.playlist1=false
      if(global.subs_id!=item.track_id){
        if(global.standard=="Loaded"){
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
    }else if(length==-1){
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item.track_id;
      })
      global.looping='no'
      global.playlist1=false
      if(global.subs_id!=item.track_id){
        if(global.standard=="Loaded"){
        global.cover=global.data[index].cover
        global.location="NotToday"
        global.title=global.data[index].title
        global.subs_id=global.data[index].subliminal_id
        global.category=global.data[index].category.name
        global.description=global.data[index].description
        global.guide=global.data[index].guide
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
          console.log("Please Wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
    }
    else{
      global.playlist=item
      global.myLocation="Today1"
      navigation.navigate("Playlist")
    }
    fetchHistory()
  }
  const recommendedForYou = () => {
    if(myRecommend==true){
      return(
        <>
          <View>
            <Text style={styles.maintitle}>Recommended For You</Text>
            <FlatList
              data={recommend}
              renderItem={({item}) => (
                <TouchableOpacity onPress={()=> [player(item, item.subliminal_ids.length)]}>
                  <View style={styles.mainimage1}>
                    <CachedImage source={{uri: item.cover}}  cacheKey={item.cover_name} style={styles.image1}/>
                  </View>
                  <View style={{}}>
                    <Text numberOfLines={2} style={styles.substitle1}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
              pagingEnabled
              horizontal
              keyExtractor={(item) => item.featured_id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      )
    }
  }
  const continueYourJourney = () => {
    if(myContinue==true){
      return(
        <>
          <View>
            <Text style={styles.maintitle}>Continue Your Journey</Text>
            <FlatList
              data={history}
              renderItem={({item}) => (
                <TouchableOpacity onPress={()=> [player(item, -1)]}>
                   <View style={styles.mainimage}>
                    <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image}/>
                  </View>
                    <View style={styles.mainsubs}>
                      <Text numberOfLines={2} style={styles.substitle}>{item.track_title}</Text>
                    </View>
                </TouchableOpacity>
              )}
              pagingEnabled
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      )
    }
  }
  const featureList = () => {
    if(myFeatured==true){
      return(
        <>
          <View>
            <View style={styles.see}>
              <Text style={styles.maintitle}>Featured</Text>
              <TouchableOpacity onPress={()=> navigation.navigate("Featured")}>
                <Text style={[styles.maintitle, {fontWeight: '400'}]}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
              {
                featured.map((item, index) => {
                  if(index<=5){
                    return(
                      <TouchableOpacity key={index} onPress={()=> [player(item, item.subliminal_ids.length)]}>
                        <View style={styles.mainimage1}>
                          <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image1}/>
                        </View>
                        <View style={{}}>
                          <Text numberOfLines={2} style={styles.substitle1}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                })
              }
            </ScrollView>
            
          </View>
        </>
      )
    }
  }
  const discoverList = () => {
    if(myDiscover==true){
      return(
        <>
          <View>
            <View style={styles.see}>
              <Text style={styles.maintitle}>Discover</Text>
              <TouchableOpacity onPress={()=> navigation.navigate("Discover")}>
                <Text style={[styles.maintitle, {fontWeight: '400'}]}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
              {
                discover.map((item, index) => {
                  if(index<=5){
                    return(
                      <TouchableOpacity onPress={()=> [player(item, item.subliminal_ids.length)]} key={index}>
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
            </ScrollView>
            
          </View>
        </>
      )
    }
  }
  const date = moment().utcOffset('+08').format('H');
  const [greet, setGreet] = useState('');
  const generateGreetings=()=>{
   
    
    if(date==3 || date==22 || date==23 || date==24 || date==0 || date==1 || date==2){
      setGreet('Good Night');
    }else if(date==4 || date==5 || date==6 || date==7 || date==8 || date==9 || date==10 || date==11){
      setGreet('Good Morning');
    }else if(date==12 || date==13 || date==14 || date==15 || date==16 || date==17 ){
      setGreet('Good Afternoon');
    }else if(date==19 || date==20 || date==18 || date==21){
      setGreet('Good Evening');
    }else{
      setGreet('Good Day');
    }
  }
  return(
    <ImageBackground source={require('../../assets/Today/today.png')} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.name}>{greet} {global.first_name}!</Text>
        <Text style={styles.how}>How are you feeling?</Text>
        <View style={{height: moderateScale(180)}}>
          <FlatList
            data={moods}
            renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.name}
              image={item.image}
              image_name={item.image_name}
              color={item.description}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
            )}
            numColumns={4}
            style={styles.mood}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            extraData={selected}
          />
          <FlatList
            data={category}
            renderItem={({ item }) => (
            <Item1
              id={item.id}
              title={item.name}
              color={item.description}
              selected1={!!selected1.get(item.id)}
              onSelect1={onSelect1}
            />
            )}
            horizontal
            pagingEnabled
            style={styles.category}
            keyExtractor={item => item.id}
            extraData={selected1}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {recommendedForYou()}
          {continueYourJourney()}
          {featureList()}
          {discoverList()}
          <View style={{height: moderateScale(400)}}></View>  
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}
const sizes=()=>{
  if(global.value!="MINIMIZE"){
    if(width*2<=height){
      return (height);
    }else if(width*2<=height+100){
      return moderateScale(height);
    }else{
      return moderateVerticalScale(height);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, width: '100%', height: sizes(), resizeMode: 'cover'
  },
  name: {
    fontSize: moderateScale(22), fontWeight: 'bold', textAlign: 'center', marginTop: moderateScale(25)
  },
  how: {
    fontSize: moderateScale(16), fontWeight: '700', textAlign: 'center', marginTop: 1, color: 'white', marginBottom: moderateScale(20)
  },
  maintitle: {
    fontSize: moderateScale(19), fontWeight: '700', marginTop: moderateScale(20)
  },
  scroll: {
    margin: moderateScale(10), 
  },
  mainimage: {
    width: moderateScale(150), height: moderateScale(150), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(15), borderRadius: moderateScale(15), marginRight: moderateScale(20)
  },
  mainsubs: {
    backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', height: moderateScale(50), width: moderateScale(150), marginTop: moderateScale(-50), borderBottomLeftRadius: moderateScale(15), borderBottomRightRadius: moderateScale(15)
  },
  substitle: {
    fontWeight: '600', fontSize: moderateScale(13), paddingHorizontal: moderateScale(10), color: 'white', textAlign: 'center'
  },
  image: {
    width: moderateScale(150), height: moderateScale(150), borderRadius: moderateScale(15)
  },
  item: {
    marginHorizontal: moderateScale(10), width: (width/4)-moderateScale(20), marginVertical: moderateScale(5), borderRadius: moderateScale(10), height: moderateScale(50), justifyContent: 'center', alignItems: 'center'
  },
  title: {
    fontSize: moderateScale(12), textAlign: 'center', marginTop: moderateScale(2), color: 'white'
  },
  item1: {
    marginRight: moderateScale(20), height: moderateScale(41), padding: moderateScale(10), borderRadius: moderateScale(10), justifyContent: 'center', alignItems: 'center'
  },
  title1: {
    fontSize: moderateScale(12), textAlign: 'center', color: 'white'
  },
  mood: {
    marginTop: moderateScale(10)
  },
  category: {
    marginTop: moderateScale(10), marginHorizontal: moderateScale(10), paddingBottom: moderateScale(1)
  },
  see: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  mainimage1: {
    width: moderateScale(150), height: moderateScale(150), backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(15), borderRadius: moderateScale(150), marginRight: moderateScale(20)
  },
  mainsubs1: {
    backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', height: moderateScale(50), width: moderateScale(150), marginTop: moderateScale(-50), borderBottomLeftRadius: moderateScale(15), borderBottomRightRadius: moderateScale(15)
  },
  substitle1: {
    fontWeight: '600', marginTop: moderateScale(10), fontSize: moderateScale(13), paddingHorizontal: moderateScale(10), width: moderateScale(150), color: 'black', textAlign: 'center'
  },
  image1: {
    width: moderateScale(150), height: moderateScale(150), borderRadius: scale(150)
  },
 
});
export default Today;