import { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, Dimensions, Modal, StyleSheet, Text, TouchableWithoutFeedback, View, ImageBackground, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
function Splash({navigation}) {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    global.deleted=false
    global.category=""
    const unsubscribe = navigation.addListener('focus', () => {
      setModal(global.deleted)
      global.modalVisible=false
    });
    return unsubscribe;
  }, [navigation]);
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
  return (
    <ImageBackground source={require('../assets/Splash/welcome.png')} style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
        </View>
        <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
          <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#6A98CA', }}>
            <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#6A98CA'}}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Account Deleted</Text>
            </View>
            <Text style={{textAlign: 'center', fontSize: scale(10), marginTop: verticalScale(20), marginBottom: verticalScale(20), color: '#6A98CA', fontWeight: '600' }}>Your account has been deleted from Magus Audio.</Text>
            <TouchableOpacity onPress={()=>global.deleted=(false)} style={{marginBottom: verticalScale(20), width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
              <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView>
        
        <Image source={require('../assets/Splash/deer.png')} style={styles.deer}/>
        <Text style={styles.title}> Magus </Text>
        <Text style={styles.subtitle}> Subliminal Audio </Text>
        <TouchableOpacity onPress={()=> chose()}>
          <Image source={require('../assets/Splash/next.png')} style={styles.next}/>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
  },
  deer: {
    width: verticalScale(160), height: verticalScale(200), alignSelf: 'center', marginTop: verticalScale(100), shadowColor: 'black', shadowOpacity: 0.4
  },
  title: {
    fontSize: verticalScale(35), color: 'white', fontWeight: '900', textAlign: 'center', marginTop: verticalScale(30), textShadowColor: 'black', textShadowRadius: 3, textShadowOffset: {width: -1, height: -1.5}
  },
  subtitle: {
    fontSize: verticalScale(18), color: 'white', fontWeight: '500', textAlign: 'center', marginTop: verticalScale(5), textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {width: -1, height: -1}
  },
  next: {
    width: verticalScale(40), height: verticalScale(40), borderRadius: scale(100), alignSelf: 'center', marginTop: verticalScale(150), shadowColor: 'black', shadowOpacity: 1
  }
});
export default Splash;