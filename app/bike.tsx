import { View, Text, TextInput, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import useGeolocation from "../hooks/useGeolocation.tsx"
import MapsLayout from './MapsLayout'

export default function bike() {
  const location = useGeolocation()
  const [input, onChangeInput] = useState('');
  const [pickUp, setPickUp] = useState('');

  const submitLocation = async() => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=1`,{
        headers:{
          'User-Agent':'DriveApp'
        }
      }
    );
    const data = await response.json();
    console.log(data)
  }
  return (
    <MapsLayout location={location}>
        {pickUp === '' ?
            <View>
                <View>
                    <Text className='p-4 text-lg font-semibold'>Where do you want to go?</Text>
                </View>
                <View className="px-4">
                    <TextInput value={input} onChangeText={onChangeInput} placeholder="Pick up location" returnKeyType="search" onSubmitEditing={submitLocation}/>
                </View>
            </View> :
            <>
                <View className='flex-row justify-between p-4'>
                    <Text>Drive Bike</Text>
                    <Text>Rp. </Text>
                </View>
                <View className='flex-row justify-between p-4'>
                    <Text>Drive Bike Cepat</Text>
                    <Text>Rp. </Text>
                </View>
                <View className='flex-row justify-between p-4'>
                    <Text>Drive Bike Hemat</Text>
                    <Text>Rp. </Text>
                </View>
            </>
        }
    </MapsLayout>
  )
}