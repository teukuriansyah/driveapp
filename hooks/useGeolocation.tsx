import { useState, useEffect } from "react"
import * as Location from 'expo-location';

export default function useGeolocation() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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
    return location
}