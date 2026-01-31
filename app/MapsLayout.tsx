import { View, Text, Pressable, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function maps(props:any) {
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({latitude: location?.coords?.latitude, longitude: location?.coords?.longitude});
    }

    useEffect(() => {
        getCurrentLocation();
    }, []);
  return (
    <>
        {location === null ? <View className="p-4"><Text>Loading...</Text></View> :
        <>
            <MapView 
                style={{ width:'100%', height:'100%' }} 
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                {location && (
                <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="You are here" />
                )}
            </MapView>
            <ScrollView className='absolute bottom-0 bg-white h-1/3 w-full gap-4'>
              {props.children}
            </ScrollView>
        </>
        }
    </>
  )
}