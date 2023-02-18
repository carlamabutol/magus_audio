import React, {useState, useEffect} from 'react';
import { Text, View, BackHandler, StyleSheet, Image, Dimensions } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

export default function Loading({navigation}) {
  const [isPlaying, setIsPlaying] = useState(true)
  const chose=()=>{
    if(global.id==null){
      navigation.navigate("Choose")
    }else if(global.id==undefined){
      navigation.navigate("Choose")
    }else if(global.id==''){
      navigation.navigate("Choose")
    }else{
      navigation.reset({
        index: 0, routes: [{name: "Home"}]
      })
    }
  }
  useEffect(() => {
    global.deleted=false
    global.category=""
    const unsubscribe = navigation.addListener('focus', () => {
      global.modalVisible=false
      BackHandler.addEventListener('hardwareBackPress', () => true);
    });
    return ()=> [unsubscribe, BackHandler.removeEventListener('hardwareBackPress', () => true)];
  }, [navigation]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{height: height, width: width}}>
        <View style={{height: height, width: width, backgroundColor: 'white'}}>
          <Image source={require('../assets/Login/yoga1.gif')} style={styles.deer}/>
        </View>
        <View style={{height: height, width: width, marginTop: -height}}>
          <Image source={require('../assets/splash.png')} style={{height: moderateScale(80), width: moderateScale(120), marginTop: moderateScale(20), alignSelf: 'center'}}/>
          <Image source={require('../assets/Login/image1.png')} style={{height: moderateScale(300), width: moderateScale(160), marginTop: -moderateScale(70), alignSelf: 'flex-start', shadowColor: 'black', shadowOpacity: 0.3}}/>
          <Image source={require('../assets/Login/image2.png')} style={{height: moderateScale(300), width: moderateScale(160), marginTop: -moderateScale(30), alignSelf: 'flex-end', shadowColor: 'black', shadowOpacity: 0.3}}/>
          <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/Login/ear.png')} style={{height: moderateScale(20), width: moderateScale(20)}}/>
            <Text style={{marginLeft: moderateScale(5), fontSize: moderateScale(12), fontWeight: '500'}}>better with earphones</Text>
          </View>
          
        </View>
        <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={4}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[4, 3, 2, 0]}
            onComplete={() => (chose())}
            updateInterval={1}
        >
          {({ remainingTime, color }) => (
            <Text style={{ color, fontSize: 40 }}>
              {remainingTime}
            </Text>
          )}
        </CountdownCircleTimer> 
      </SafeAreaView> 
    
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  deer: {
    width: moderateScale(420), height: moderateScale(480), marginLeft: -moderateScale(120), marginTop: moderateScale(70), alignSelf: 'center', shadowColor: 'black', shadowOpacity: 0.4
  },
});

/*<View style={{backgroundColor: 'black', width: width, height: height*1.9, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/Splash/yogo.gif')} style={styles.deer}/>
      </View>
      <View style={{width: width, height: height*1.5, marginTop: -height}}>
        <Image source={require('../assets/splash.png')} style={{height: moderateScale(80), width: moderateScale(120), marginTop: moderateScale(100), alignSelf: 'center'}}/>
        <Image source={require('../assets/Login/image1.png')} style={{height: moderateScale(270), width: moderateScale(160), alignSelf: 'flex-start'}}/>
      
      </View>*/