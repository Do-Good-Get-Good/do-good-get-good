import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import inputStyles from '../styles/inputStyle';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [randomText, setRandomText] = React.useState('')

  const motivationTexts = [
    'Du är riktigt grym!',
    'Bra jobbat!',
    'Detta förtjänar du!',
    'Wohoo, du är tillbaka!'
  ]

  //Authorize user and sign in
  const signIn = () => {
    auth()
    .signInWithEmailAndPassword(email, pass)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
  }

  //Randomizes a motivational text once every app launch
  useEffect(() => {
    setRandomText(motivationTexts[Math.floor(Math.random()*motivationTexts.length)])
  }, [])

  return (
    <ImageBackground
      source={require('../img/blueprint-white.png')}
      resizeMode={'cover'}
      style={{
        flex: 1,
        backgroundColor: '#00000009'
      }}
      imageStyle={{opacity: 1}}
    >
      <SafeAreaView style={tw`flex-1`}>
        <StatusBar style="auto" />
        <View style={styles.logo}>
          <Image source={require('../img/Logo-DGGG-13.png')} style={styles.logoImg} />
        </View>
        <View style={styles.inputsAndBtns}>
          <Text style={[tw`text-center text-xl mb-8 font-semibold`, {color: '#333333'}]}>
            {randomText}
          </Text>
          <View style={tw`flex-row mb-3`}>
            <TextInput
              textContentType={'emailAddress'}
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType={'email-address'}
              placeholder={'E-mail'}
              style={inputStyles.textInput}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20
            }}
          >
            <TextInput
              textContentType={'password'}
              onChangeText={(text) => setPass(text)}
              value={pass}
              placeholder={'Lösenord'}
              secureTextEntry={true}
              style={inputStyles.textInput}
            />
          </View>
          <View style={tw `mt-2`}>
            <Pressable
              style={styles.loginBtn}
              onPress={() => {
                signIn()
              }}
            >
              <Text style={[tw`text-center text-xl`, {color: '#333333'}]}>
                Logga in
              </Text>
            </Pressable>
          </View>
          <View style={tw`mt-3 w-full flex-row justify-center`}>
            <Text style={{ color: '#333333' }}>
              Glömt ditt lösenord?
            </Text>
            <Pressable
              style={tw`ml-1`}
              onPress={() => {
                console.log("Tryckte på 'glömt lösenord'")
              }}
            >
              <Text
                style={{
                  color: '#84BD00',
                  textDecorationLine: 'underline'
                }}
              >
                Tryck här
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={require('../img/Technogarden-logotyp-Large.png')}
            style={styles.bottomLogoImg}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  logo: {
    flex: 1
  },
  logoImg: {
    flex: 1,
    width: '100%'
  },
  inputsAndBtns: {
    padding: 20,
    flex: 1
  },
  loginBtn: {
    backgroundColor: '#84BD00',
    height: 55,
    justifyContent: 'center',
    borderRadius: 5
  },
  bottomLogoImg: {
    width: 143,
    height: 23,
    alignSelf: 'center',
    position: "absolute",
    bottom: 10
  }
})
