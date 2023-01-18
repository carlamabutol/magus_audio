import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [text, setText] = useState('')
  const [text1, setText1] = useState('')
  const timing=(val)=>{
    setText1(60-val)
    if(val>60){
      setText("00:0"+text1)
    }else{
      setText("00:"+text1)
    }
  }
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: true, delay: 2 })}
        strokeWidth={3}
        size={200}
        
        strokeLinecap={'square'}
      
    >
      {({ remainingTime, color  }) => (
        [timing(remainingTime)]
      )}  
    </CountdownCircleTimer>
    <Text>{text}</Text>
    <Button title="Play" onPress={() => setIsPlaying(prev => !prev)} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
