import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Routes } from './src/routes'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'

import { CartContextProvider } from './src/contexts/CartContext'
import { tagUserEmailCreate } from './src/notifications/notificationsTags'

OneSignal.initialize('cd84abf6-762e-41ed-8354-d4d00b4e0bfe')
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  tagUserEmailCreate('bruno@gmail.com', 'Bruno Anjos')

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result

      switch (actionId) {
        case '1':
          console.log('Products')
          break;
        case '2':
          console.log('Orders')
          break;
        default:
          console.log('None')
          break;
      }
    }

    OneSignal.Notifications.addEventListener('click', handleNotificationClick)

    return () => {
      OneSignal.Notifications.removeEventListener('click', handleNotificationClick)
    }
  }, [])

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      console.log('the notification was opened! ', event)
    }

    OneSignal.Notifications.addEventListener('click', handleNotificationClick)

    return () => {
      OneSignal.Notifications.removeEventListener('click', handleNotificationClick)
    }
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
