import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Modal, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions, SafeAreaView } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { array } from "yup";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
const TodayAllPlaylist =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([])
  const [myData, setMyData] = useState([])
  const [arr, setArr] = useState([])
  const [liked, setLiked] = useState('')
  const [covers, setCovers] = useState('')
  const [titles, setTitles] = useState('')
  const [image1, setImage1] = useState('');
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(4,157,217,1)');
  const [unmount, setUnmount] = useState(true);
  const [colors, setColors] = useState('rgba(4,157,217,1)');
  const [modal3, setModal3] = useState(true);
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const fetchData = async () => {
    if(global.playlist.featured_id!=undefined){
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.playlist.featured_id);
    const data5 = await resp.json();
    const unique=getDifference(global.data, data5.tracks)
    const array = unique.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setData(array)
    }else{
      const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.playlist.playlist_id);
      const data5 = await resp.json();
      const unique=getDifference(global.data, data5.tracks)
      const array = unique.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setData(array)
    }
    likedAll()

  };
  function getDifference1(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.track_title;
      });
    });
  }
  function getDifference2(array1, array2) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.title === object2.track_title;
      });
    });
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.title;
      });
    });
  }
  
  const play=()=>{
    global.list=myData
    global.lists=myData
    global.shuffling=false
    global.repeat=false
    global.playlist1=true
      global.cover=global.list[0].cover
      global.location="NotToday"
      global.title=global.list[0].title
      global.subs_id=global.list[0].subliminal_id
      global.category=global.list[0].category.name
      global.description=global.list[0].description

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
  const play1=(item)=>{
    global.list=myData
    global.lists=myData
    global.shuffling=false
    global.playlist1=true
    global.repeat=true
    if(global.subs_id!=item.subliminal_id){
      if(global.standard=="Loaded"){
        const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
        global.subs_id=item.subliminal_id
        global.cover=item.cover
        global.title=item.title
        global.category=item.category.name
        global.location="NotToday"
        global.description=item.description
        global.looping=false
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
    else{
      console.log("Please Wait")
    }
  }else{
    setValue("")
    global.value=""
    global.modalVisible=true
  }
  }
  useEffect(() => {
    findLiked()
    fetchData()
    setTitles(global.playlist.title)
    setCovers(global.playlist.cover)
    return()=> setUnmount(false)
    
  }, [arr, myData]);
  const toLike=async(item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({playlist_id: item.subliminal_id, status:1,
        user_id: global.id, track_id:item.subliminal_id,
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        likedAll()
      })
  }
  const notToLike=async(item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({playlist_id: item.subliminal_id, status:0,
        user_id: global.id, track_id:item.subliminal_id,
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        likedAll()
      })
  }
  const sizes =()=>{
    if(width*2<=height){
      return scale(140);
    }if(width*2<=height+100){
      return scale(145);
    }else{
      return scale(115);
    }
  }
  const imagesize =()=>{
    if(width*2<=height+100){
      return scale(150);
    }else{
      return scale(100);
    }
  }
  const renderItem1= ({ item }) => {
    if(item.liked==1){
    return (
      <View style={{ flexDirection: 'row', width: width-40, marginTop: 10, alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 15,}}>
        <TouchableOpacity onPress={()=> play1(item)} style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50),  borderRadius: 10,shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.5 }}/>
        </TouchableOpacity>
        <View style={{width: width-sizes(), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
          <TouchableOpacity onPress={()=> play1(item)}>
            <Text numberOfLines={1}style={{width: width-sizes(), marginRight: 10, color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(14), marginBottom: 5}}>{item.title}</Text>
            <Text numberOfLines={1}style={{width: width-sizes(), marginRight: 10, color: '#0D0D0D',  fontSize: scale(11),}}>{item.category.name}</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={()=>notToLike(item)} style={{width: scale(30), height: scale(30),}} >
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/1518/1518194.png'}} style={{paddingRight: scale(10), width: scale(30), height: scale(30),  tintColor: 'white', backgroundColor: 'rgba(4,157,217,1)', borderRadius: 50 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
    }else{
      return (
        <View style={{ flexDirection: 'row', width: width-40, marginTop: 10, alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 15,}}>
          <TouchableOpacity  onPress={()=> play1(item)} style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50), borderRadius: 10,shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.5 }}/>
          </TouchableOpacity>
          <View style={{width: width-sizes(), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
            <TouchableOpacity onPress={()=> play1(item)}>
              <Text numberOfLines={1}style={{width: width-sizes(), marginRight: 10, color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(14), marginBottom: 5}}>{item.title}</Text>
              <Text numberOfLines={1}style={{width: width-sizes(), marginRight: 10, color: '#0D0D0D',  fontSize: scale(11),}}>{item.category.name}</Text>
  
            </TouchableOpacity>
          <TouchableOpacity onPress={()=>toLike(item)}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/1518/1518194.png'}} style={{ paddingRight: scale(10), width: scale(30), height: scale(30),  tintColor: 'rgba(4,157,217,.8)', backgroundColor: 'white', borderRadius: 50 }} />
          </TouchableOpacity>
          </View>
          
        </View>
      );  
    }
  };
  const likedAll=async()=>{
    await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked/all`, {
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
        setArr(result.featured_track_liked)
        const one = (getDifference1(data, result.featured_track_liked))
        one.forEach(object => {
          object.liked = 1;
        });
        const two = (getDifference2(data, result.featured_track_liked))
        two.forEach(object => {
          object.liked = 0;
        });
        if(unmount){
        setMyData(one.concat(two))
        }
      }else{
        const two = data
        two.forEach(object => {
          object.liked = 0;
        });
        if(unmount){
        setMyData(two)
        }
      }
       /*if(result){
        setArr(result.featured_track_liked)
        const one = (getDifference1(data, result.featured_track_liked))
        one.forEach(object => {
          object.liked = 1;
        });
        const two = (getDifference2(data, result.featured_track_liked))
        two.forEach(object => {
          object.liked = 0;
        });
        if(unmount){
        setMyData(one.concat(two))
      }
      }else{
        const two = data
        two.forEach(object => {
          object.liked = 0;
        });
        setMyData(two)
      }*/
    })
  }
  const addlistToPlaylist =async (item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({playlist_id: '', moods_id: item.moods_id, cover: global.playlist.cover,
        user_id: global.id, featured_id: item.featured_id, title: item.title
      })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      if(result.message != 'success'){
        setColors('#FF6A6A')
        return updateError("Playlist already added as own playlist1!", setError); 
      }else{
        setColors('#6A98CA')
        return updateError("Playlist successfully added as own playlist1!", setError); 
      }
    })
  }
  const space=()=>{
    if(width*2<=height){
      return verticalScale(460);
    }else if(width*2<=height+100){
      return verticalScale(560);
    }else{
      return verticalScale(600);
    }
  }
  
  const findLiked=async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/liked/playlist/"+global.id);
    const data5 = await resp.json();
    const index =data5.findIndex(object => {
      return object.title === global.playlist.title;
    })
    if(index!=-1){
      global.myPlaylist_liked=true
      setLiked(data5[index].playlist_id)
    }else{
      global.myPlaylist_liked=false
      setLiked("")
    }
  }
  const likeOrNot=async()=>{
    if(global.myPlaylist_liked==true){
      await fetch(`https://dev.magusaudio.com/api/v1/liked/playlist/delete`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({playlist_id: liked, 
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
      await fetch(`https://dev.magusaudio.com/api/v1/liked/playlist-info/add`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({playlist_id: "", featured_id: global.playlist.featured_id, cover: global.playlist.cover,
          user_id: global.id, title: global.playlist.title, cover: global.playlist.cover
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
  const isLiked1=()=>{
    if(global.myPlaylist_liked==true){
      return(
        <TouchableOpacity onPress={()=> likeOrNot()} >
          <View style={{...Platform.select({android: {marginTop: 24}, ios: {marginTop: verticalScale(6)}}), width: scale(35), height: scale(35), right: scale(15), borderColor: 'white', borderRadius: scale(35), alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, backgroundColor: 'white' }}>
            <Image source={require('../../assets/playing/heart.png')} style={{width: scale(20), height: scale(18),tintColor: 'rgba(4,157,217,1)'}} />
          </View>
        </TouchableOpacity>
      )
    }else if(global.myPlaylist_liked==false){
      return(
        <TouchableOpacity onPress={()=> likeOrNot()} >
          
          <View style={{...Platform.select({android: {marginTop: 24}, ios: {marginTop: verticalScale(6)}}), width: scale(35), height: scale(35), right: scale(15), borderColor: 'white', borderRadius: scale(35), alignItems: 'center', justifyContent: 'center', borderWidth: 1.5,}}>
            <Image source={require('../../assets/playing/heart.png')} style={{width: scale(20), height: scale(18),tintColor: 'white'}} />
          </View>
        </TouchableOpacity>
      )
    }
  } 
  return(
    <ImageBackground source={require('../../assets/homebg.png')} style={{width: width, height: height}}>
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
        
        <TouchableOpacity onPress={() => navigation.navigate(global.myLocation)} style={{width: 40, height: 40, left: 10, ...Platform.select({android: {marginTop: 30}, ios: {marginTop: verticalScale(10)}}), }} >
          <Image  source={require('../../assets/pageback.png')} style={{width: scale(24), height: scale(24)}} />
        </TouchableOpacity>
          {isLiked1()}
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image source={{uri: global.playlist.cover|| global.cover}} style={{width: imagesize(), height: imagesize(), borderRadius: 20}} />
        <Text numberOfLines={1}style={{color: '#0D0D0D', fontWeight: 'bold',  fontSize: scale(17), marginTop: 10, paddingLeft: 30, paddingRight: 30 , textAlign: 'center' }}>{global.playlist.title || global.title}</Text>
        <View style={{marginTop: scale(17)}}>
          <TouchableOpacity onPress={()=> [addlistToPlaylist(global.playlist)]} style={{backgroundColor: '#049DD9', width: width-40, borderRadius: 10, padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', }}>
            <Image  source={require('../../assets/playing/add_playlist.png')}  style={{width:scale(35), height: scale(35), tintColor: 'white'}}/>
            <Text style={{ color: 'white', fontWeight: 'bold',   fontSize: scale(15), marginLeft: 15}}>Add to My Playlists</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> play()} style={{backgroundColor: 'white', width: width-40, borderRadius: 10, padding: 8, marginTop: 15, flexDirection: 'row', borderColor: '#049DD9', borderWidth: 1, justifyContent: 'center', alignItems: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: '#049DD9', }}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/347/347941.png"}} style={{width:scale(30), height: scale(30), tintColor: '#049DD9'}}/>
            <Text style={{ color: '#049DD9', fontWeight: 'bold',   fontSize: scale(15), marginLeft: 15}}>Play</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList
              data={myData}
              renderItem={renderItem1}
              keyExtractor={(item) => item.title}
              style={{marginLeft: 20, marginRight: 20, borderRadius: 10, padding: 0, marginTop: 10}}
              showsVerticalScrollIndicator={false}
            />  
          <View style={{height: space(), width: width/2}}>
          </View>
        </ScrollView>
          
      </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default TodayAllPlaylist;