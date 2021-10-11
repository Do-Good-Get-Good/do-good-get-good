import React, { useState, useEffect } from 'react'
import { Mystack } from './navigate'
import auth from '@react-native-firebase/auth'
import Login from './components/Login'
import { UserProvider } from './context/UserContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ActivityProvider } from './context/ActivityContext'
export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  if (!user) {
    return <Login />
  }

  return (
    <SafeAreaProvider>
      {/* <UserProvider value={user}> */}
      <ActivityProvider>
        <Mystack />
      </ActivityProvider>

      {/* </UserProvider> */}
    </SafeAreaProvider>
  )
}
