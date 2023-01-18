import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, ImageBackground, Image, Text, TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { StateContext } from "../../StateContext";
import { UserContext } from "../../UserContext";
const Privacy =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const space=()=>{
    if(global.value!="MINIMIZE"){
      if(width*2<=height){
        return scale(65);
      }else{
        return scale(40);
      }
    }
    else{
      return verticalScale(134);
    }
  }
  return(
    <ImageBackground source={require('../../../assets/me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
        <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> [navigation.navigate("Help")]} style={{width: scale(38), height: scale(38)}} >
          <Image  source={require('../../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
        </TouchableOpacity>
        </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{ fontSize: scale(21), color: '#0D0D0D', fontWeight: 'bold', }} >Privacy and Policy</Text>
        </View>
        <ScrollView style={{marginLeft: 30, marginRight: 20, marginTop: 15}}>
            <Image source={require('../../../assets/me/policy.png')} style={{width: scale(230), height: scale(200), alignSelf: 'center',}}/>
                <Text style={{fontSize: scale(13), lineHeight: scale(25), marginRight: 15, fontWeight: 'bold'}}>Intro/Scope</Text>
                <Text style={styles.text1}>Magus Technology Inc. (“Magus,” “Magus Audio”, “we,” “our,” and/or “us”) value the privacy of individuals who use our application, website, and related services (collectively, our “Services”). This privacy policy (the “Privacy Policy”) explains how we collect, use, and share information from users of our Services (“Users”) to provide self-hypnosis exercises. By using our Services, you agree to the collection, use, disclosure, and procedures this Privacy Policy describes. Beyond the Privacy Policy, your use of our Services is also subject to our Terms of Service ([magusaudio.com/termsofservice]).‍</Text>
                <Text style={styles.text1}>{'\u2022'} Listening Best Practices</Text>
                <Text style={styles.label1}>Information We Collect</Text>
                <Text style={styles.text1}>We may collect a variety of information from or about you or your devices from various sources, as described below.</Text>
                <Text style={styles.text1}>If you do not provide your information when requested, you may not be able to use our Services if that information is necessary to provide you with our Services or if we are legally required to collect it.</Text>
                <Text style={styles.label1}>A. Information You Provide to U</Text>
                <Text style={styles.label2}>Registration and Profile Information.</Text>
                <Text style={styles.text1}>When you sign up for an account with us, we ask you for your first name, e-mail address, and password</Text>
                <Text style={styles.label2}>‍Communications.</Text>
                <Text style={styles.text1}>If you contact us directly, we may receive additional information about you. For example, when you contact our Customer Support Team, we will receive your first and last name, e-mail address, phone number, and the contents of a message or attachments that you may send to us, and other information you choose to provide. When we send you emails, we may track whether you open them to learn how to deliver a better customer experience and improve our Services.</Text>
                <Text style={styles.label2}>‍Careers.</Text>
                <Text style={styles.text1}>‍If you decide that you wish to apply for a job with us, you may submit your contact information and your resume online. We will collect the information you choose to provide on your resume, such as your education and employment experience. You may also apply through LinkedIn. If you do so, we will collect the information you make available to us on LinkedIn.</Text>
                <Text style={styles.label1}>B. Information We Collect When You Use Our Services</Text>
                <Text style={styles.label2}>Responses to Surveys and Mood Tracker.</Text>
                <Text style={styles.text1}>When you use our Services for subliminal audio programs such as surveys or mood trackers, we may ask you to answer questions so that we can provide you with a more personalized experience. For example, we may ask you about your mood today. You can provide responses based on choices presented in the app or by typing in your responses.</Text>
                <Text style={styles.label2}>Location Information.</Text>
                <Text style={styles.text1}>When you use our Services, we may infer your general location information, for example by using your internet protocol (IP) address.</Text>
                <Text style={styles.label2}>Device Information.</Text>
                <Text style={styles.text1}>We receive information about the device and software you use to access our Services, including IP address, web browser type, operating system version, phone carrier and manufacturer, application installations, device identifiers, and push notification tokens.</Text>
                <Text style={styles.label2}>Usage Information.</Text>
                <Text style={styles.text1}>To help us understand how you use our Services and to help us improve them, we automatically receive information about your interactions with our Services, like the pages or other content you view, the searches you conduct, and the dates and times of your visits. Information from Cookies and Similar Technologies. We collect information using cookies, pixel tags, or similar technologies. We may use these technologies to collect information about your online activities over time. Cookies are small text files containing a string of alphanumeric characters. We may use both session cookies and persistent cookies. A session cookie disappears after you close your browser. A persistent cookie remains after you close your browser and may be used by your browser on subsequent visits to our Services.</Text>
                <Text style={styles.text1}>Please review your web browser’s “Help” file to learn the proper way to modify your cookie settings. Please note that if you delete or choose not to accept cookies from the Service, you may not be able to utilize the features of the Service to their fullest potential.</Text>
                <Text style={styles.label1}>How We Use the Information We Collect</Text>
                <Text style={styles.label2}>We use the information we collect:</Text>
                <Text style={styles.text1}>{'\u2022'} To provide, maintain, improve, and enhance our Services;</Text>
                <Text style={styles.text1}>{'\u2022'} To personalize your experience on our Services such as by providing tailored content and recommendations;</Text>
                <Text style={styles.text1}>{'\u2022'} To communicate with you, provide you with updates and other information relating to our Services, provide information that you request, respond to comments and questions, and otherwise provide customer support;</Text>
                <Text style={styles.text1}>{'\u2022'} To generate anonymized, aggregate data containing only de-identified, non-personal information that we may use for any legal purpose;</Text>
                <Text style={styles.text1}>{'\u2022'} To send you push notifications;</Text>
                <View style={{height: verticalScale(230), width: width/2}}>
                </View>
              </ScrollView>
        </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  text1: {fontSize: scale(12), lineHeight: scale(25), marginRight: 15, marginLeft: 15, textAlign: 'justify'},
  label1: {fontSize: scale(13), lineHeight: scale(25), marginRight: 15, fontWeight: 'bold', marginTop: 10},
  label2: {fontSize: scale(13), lineHeight: scale(25), marginRight: 15, marginLeft: 15, fontWeight: 'bold', marginTop: 10}
});
export default Privacy;