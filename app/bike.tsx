import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import useGeolocation from "../hooks/useGeolocation"
import AntDesign from '@expo/vector-icons/AntDesign';
import MapsLayout from './MapsLayout'

export default function bike() {
  const location = useGeolocation()
  const [input, onChangeInput] = useState('');
  const [pickUp, setPickUp] = useState<any>('');
  const [price, setPrice] = useState<any>(0);

  const submitLocation = async() => {
    const fetching = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=1`,{
        headers:{
          'User-Agent':'DriveApp'
        }
      }
    );
    const data = await fetching.json();
    const result = {latitude:parseFloat(data[0].lat), longitude:parseFloat(data[0].lon)}
    const distance:any = countDistance(location.latitude, location.longitude, result.latitude, result.longitude)
    setPickUp(result)
    setPrice(Math.round(distance*3000))
  }
  
  const countDistance = (lat1:number, lon1:number, lat2:number, lon2:number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const jarak = R * c; 

    return jarak.toFixed(2);
  };

  function numberWithCommas(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  return (
    <MapsLayout location={location} pickup={pickUp}>
        {pickUp === '' ?
            <View>
                <View>
                    <Text className='p-4 text-lg font-semibold'>Where do you want to go?</Text>
                </View>
                <View className="px-4">
                    <TextInput value={input} onChangeText={onChangeInput} placeholder="Pick up location" returnKeyType="search" onSubmitEditing={submitLocation} className="border border-gray-300 rounded-md p-2"/>
                </View>
            </View> :
            <>
              <View className="flex-row items-center gap-3">
                <Pressable onPress={() => setPickUp("")}>
                  <AntDesign name="arrow-left" size={24} color="black" />
                </Pressable>
                <Text className="text-lg font-semibold p-4">Select your ride</Text>
              </View>
              <View>
                <View className='flex-row justify-between p-4'>
                    <Text>Drive Bike</Text>
                    <Text>Rp. {price < 10000 ? numberWithCommas(10000) : numberWithCommas(price)}</Text>
                </View>
                <View className='flex-row justify-between p-4'>
                    <Text>Drive Bike Cepat</Text>
                    <Text>Rp. {price < 10000 ? numberWithCommas(10000 + (10000 * 0.1)) : numberWithCommas(price + (price * 0.1))}</Text>
                </View>
                <View className='flex-row justify-between p-4'>
                    <Text>Drive Bike Hemat</Text>
                    <Text>Rp. {price < 10000 ? numberWithCommas(10000 - (10000 * 0.1)) : numberWithCommas(price - (price * 0.1))}</Text>
                </View>
              </View>
            </>
        }
    </MapsLayout>
  )
}