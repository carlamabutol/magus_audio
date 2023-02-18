import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions, ScrollView } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { UserContext } from "../../UserContext";
const SubGuide =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  return(
    <ImageBackground source={require('../../../assets/Me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
          <View style={{width: width, justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(38), height: moderateScale(38), marginTop: moderateScale(10), marginLeft: moderateScale(10)}} >
              <Image source={require('../../../assets/back.png')} style={{width: moderateScale(38), height: moderateScale(38)}} />
            </TouchableOpacity>
            <Text style={styles.mysubs}>Subliminal Guide</Text>
            <View style={{width: moderateScale(38), height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(20)}} >
            </View>
          </View>
        <ScrollView style={{marginLeft: moderateScale(30), marginTop: moderateScale(15) }}>
            <Image source={require('../../../assets/Me/guideme.png')}style={{width: moderateScale(280), height: moderateScale(200), alignSelf: 'center',}}/>
              <Text style={{fontSize: moderateScale(15), fontWeight: 'bold', color: 'black', alignSelf: 'flex-start', marginTop: moderateScale(15), marginBottom: moderateScale(15), marginLeft: 0}}>Making the Most Out of Your Subliminal </Text>
                <Text style={{fontSize: moderateScale(13), lineHeight: moderateScale(25), marginRight: moderateScale(15), fontWeight: 'bold'}}>Audios</Text>
                <Text style={styles.text1}>{'\u2022'} Setting Your Listening Routine and Schedule</Text>
                <Text style={styles.text1}>{'\u2022'} Listening Best Practices</Text>
                <Text style={styles.label1}>Setting Your Goals Effectively</Text>
                <Text style={styles.text1}>{'\u2022'} Determining Areas of Focus</Text>
                <Text style={styles.text1}>{'\u2022'} SMART Goals</Text>
                <Text style={styles.text1}>{'\u2022'} Toward Goals vs Avoid Goals</Text>
                <Text style={styles.text1}>{'\u2022'} Short-term and Long-term Planning</Text>
                <Text style={styles.text1}>{'\u2022'} Subliminal Curriculum (For Godliminal Users)</Text>
                <Text style={styles.label1}>Playlists and Combos</Text>
                <Text style={styles.text1}>{'\u2022'} Diffrences of Playlists and Combos</Text>
                <Text style={styles.text1}>{'\u2022'} Choosing Subliminal Topics</Text>
                <Text style={styles.text1}>{'\u2022'} How Different Topics Work Synergistically</Text>
                <Text style={styles.text1}>{'\u2022'} Setting up Your Ideal Playlist</Text>
                <Text style={styles.text1}>{'\u2022'} Using Multiple Subliminal Combos</Text>
                <Text style={styles.label1}>Tips and Practical Advice</Text>
                <Text style={styles.text1}>{'\u2022'} Important Mindset Changes to Make</Text>
                <Text style={styles.text1}>{'\u2022'} Treat Your Mind and Body Like a Sacred Temple</Text>
                <Text style={styles.text1}>{'\u2022'} Prayer and Fasting</Text>
                <Text style={styles.text1}>{'\u2022'} Strengthening your Faith</Text>
                <Text style={styles.text1}>{'\u2022'} Practicing Speed Reading and Reading Comprehension</Text>
                <Text style={styles.text1}>{'\u2022'} Enhancing your Vocabulary and Experiences</Text>
                <Text style={styles.text1}>{'\u2022'} How to Deal with Headache and Migraine</Text>
                <Text style={styles.text1}>{'\u2022'} How to Deal with Stress</Text>
                <Text style={styles.text1}>{'\u2022'} How to Deal with Information Overload</Text>
                <Text style={styles.text1}>{'\u2022'} How to Deal with Fear and Anxiety</Text>
                <Text style={styles.text1}>{'\u2022'} How to Deal with Panic Attack and Anxiety Attack Episodes</Text>
                <Text style={styles.text1}>{'\u2022'} Taking Care of Your Mental and Emotional Health</Text>
                <Text style={styles.text1}>{'\u2022'} Placebo Effect and How to Use it to Your Advantage</Text>
                <Text style={styles.text1}>{'\u2022'} Getting Rid of Limiting Beliefs</Text>
                <Text style={styles.text1}>{'\u2022'} Getting Rid of Faulty Logic</Text>
                <Text style={styles.text1}>{'\u2022'} Getting Rid of Negative Emotions</Text>
                <Text style={styles.text1}>{'\u2022'} Getting Rid of Discomfort</Text>
                <Text style={styles.text1}>{'\u2022'} Water Tips</Text>
                <Text style={styles.text1}>{'\u2022'} Nutrition Tips</Text>
                <Text style={styles.text1}>{'\u2022'} Using Frequencies</Text>
                <Text style={styles.text1}>{'\u2022'} Using Energy Manipulation (Sound/ Mandala/ Physical)</Text>
                <Text style={styles.text1}>{'\u2022'} Visualization Guide</Text>
                <Text style={styles.text1}>{'\u2022'} Affirmation Guide</Text>
                <Text style={styles.text1}>{'\u2022'} Meditation</Text>
                <Text style={styles.text1}>{'\u2022'} NLP and Hypnosis</Text>
                <Text style={styles.text1}>{'\u2022'} How to Maximize Effectiveness of Different Techniques</Text>
                <View style={{height: moderateScale(230), width: width/2}}>
                </View>
        </ScrollView>
        
      </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  text1: {fontSize: moderateScale(12), lineHeight: moderateScale(25), marginRight: moderateScale(15), marginLeft: moderateScale(25)},
  label1: {fontSize: moderateScale(12), lineHeight: moderateScale(25), marginRight: moderateScale(15), fontWeight: 'bold', marginTop: moderateScale(10)},
  mysubs: {
    textAlign: 'left', color: 'black', fontSize: moderateScale(30), fontWeight: '700', marginTop: moderateScale(10)
  },
});
export default SubGuide;