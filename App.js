LogBox.ignoreAllLogs();
import React, {useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Dimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "./screens/Splash";
import Choose from "./screens/Choose";
import Home from "./screens/Home";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Forgot from "./screens/login/Forgot";
import LoginForm from "./screens/login/Login";
import SignupForm from "./screens/login/Signup";
import Loading from "./screens/Loading";
const Stack = createNativeStackNavigator();
export default function App() {
  global.link='https://magusaudio.com/'
  global.node='https://node.magusaudio.com/' 
  
  const fetchDataSubliminal = async () => {
    const resp1 = await fetch("https://magusaudio.com/api/v1/user");
    const data11 = await resp1.json();
    const value = await AsyncStorage.getItem('id')
    global.id=value
    if(value !== null) {
      const index =data11.findIndex(object => {
        return object.user_id === value;
      })
        global.first_name=data11[index].info.first_name;
        global.last_name=data11[index].info.last_name;
        global.email=data11[index].email;
        global.mainname=data11[index].name;
        global.maincover=data11[index].info.cover;
        global.subs =data11[index].info.subscription_id;
        global.main_cover=data11[index].info.cover_name;
        global.member = data11[index].created_at;
        global.id =data11[index].user_id;
        const resp = await fetch(global.link+"api/v1/subliminal");
        const data = await resp.json();
        const array = data.filter(object=>{
          return object.subscription_id.includes(data11[index].info.subscription_id)
        })
        global.data=array
        global.datas=array
    }else{
      console.log("NO DATA1")
    }
  };
  useEffect(() => {
    global.deleted=false
    global.favorites=[]
    global.userPlaylist=[]
    fetchDataSubliminal()
   }, []); 
  return (
    <NavigationContainer>
        <StatusBar
        animated={true}
        backgroundColor="black"
        hidden={true} />
        <Stack.Navigator initialRouteName='Loading' screenOptions={{headerShown: false,
         animation: "fade_from_bottom"
        }}>
          <Stack.Screen options={{gestureEnabled: false}} name='Loading' component={Loading} />
          <Stack.Screen options={{gestureEnabled: false}} name='Home' component={Home} />
          <Stack.Screen options={{gestureEnabled: false}} name='Splash' component={Splash} />
          <Stack.Screen options={{gestureEnabled: false}} name='Choose' component={Choose} />
          <Stack.Screen options={{gestureEnabled: false}} name='Forgot' component={Forgot} />
          <Stack.Screen options={{gestureEnabled: false}} name='Signup' component={SignupForm} />
          <Stack.Screen options={{gestureEnabled: false}} name='Login' component={LoginForm} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/*"NSCameraUsageDescription": [
          "Magus uses your camera to capture photo for your profile picture. Your photo will not be shared without your permission."
        ]*/