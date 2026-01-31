import { View, Text, Pressable, ScrollView, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState,useEffect } from "react"
import { useRouter } from 'expo-router'
import MapView, { Marker } from 'react-native-maps';

export default function maps(props:any) {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
    
  return (
    <>
        {props.location === null ? <View className="p-4"><Text>Loading...</Text></View> :
        <>
            <MapView 
                style={{ width:'100%', height:'100%' }} 
                initialRegion={{
                    latitude: props.location.latitude,
                    longitude: props.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                {location && (
                <Marker coordinate={{ latitude: props.location.latitude, longitude: props.location.longitude }} title="You are here" />
                )}
            </MapView>
            <ScrollView className={`absolute bottom-0 bg-white h-1/3 w-full gap-4 ${isKeyboardVisible ? 'mb-24' : ''}`}>
              {props.children}
            </ScrollView>
        </>
        }
    </>
  )
}