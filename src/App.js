import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Mystack } from './navigate'
import { LandingPage } from './views/LandingPage'
import Login from './views/Login'

export default function App() {
  return (
    // <Mystack />
    // <Login />
    <LandingPage></LandingPage>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
