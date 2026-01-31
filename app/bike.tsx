import { View, Text, TextInput, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapsLayout from './MapsLayout'

export default function bike() {
  const [pickUp, onChangePickUp] = useState('');
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
    <MapsLayout>
        {pickUp === '' ?
            <View className={`${isKeyboardVisible ? 'mb-40' : ''}`}>
                <View>
                    <Text className='p-4 text-lg font-semibold'>Where do you want to go?</Text>
                </View>
                <View className="px-4">
                    <TextInput value={pickUp} onChangeText={onChangePickUp} placeholder="Pick up location" />
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