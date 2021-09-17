import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image
} from 'react-native'

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')

  return (
    <ImageBackground
      source={require('../img/blueprint - white.png')}
      resizeMode={'cover'}
      style={{
        flex: 1,
        height: 100,
        weight: 100
      }}
    >
      <View
        style={{
          backgroundColor: '#00000010'
        }}
      >
        <Image
          source={require('../img/Logo-DGGG-13.png')}
          style={{ width: '100%', height: 250 }}
        />
      </View>
      <View
        style={{
          padding: 20,
          flex: 1,
          backgroundColor: '#00000010'
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            marginBottom: 50,
            color: '#333333',
            fontWeight: '600'
          }}
        >
          Du är riktigt grym!
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20
          }}
        >
          <TextInput
            textContentType={'emailAddress'}
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType={'email-address'}
            placeholder={'E-mail'}
            style={styles.inputField}
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
            style={styles.inputField}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 25,
            width: '100%'
          }}
        >
          <Pressable
            style={{
              backgroundColor: '#84BD00',
              height: 55,
              justifyContent: 'center',
              borderRadius: 5
            }}
            onPress={() => {
              console.log("Tryckte på 'logga in'")
              navigation.navigate('LandingPage')
            }}
          >
            <Text
              style={{
                color: '#333333',
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: '400'
              }}
            >
              Logga in
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 20,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color: '#333333',
              fontSize: 14,
              fontWeight: '400'
            }}
          >
            Glömt ditt lösenord?
          </Text>
          <Pressable
            style={{
              backgroundColor: '',
              justifyContent: 'center',
              marginLeft: 5
            }}
            onPress={() => {
              console.log("Tryckte på 'glömt lösenord'")
            }}
          >
            <Text
              style={{
                color: '#84BD00',
                fontSize: 14,
                fontWeight: '400',
                textDecorationLine: 'underline'
              }}
            >
              Tryck här
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#00000010',
          width: '100%'
          //  flex: 1
        }}
      >
        <Image
          source={require('../img/Technogarden-logotyp-Large.png')}
          style={{
            width: 143,
            height: 23,
            alignSelf: 'center',
            marginBottom: 10
          }}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inputField: {
    flex: 1,
    height: 49,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    fontWeight: '500',
    borderRadius: 5,
    fontSize: 18,
    color: '#333333'
  }
})
