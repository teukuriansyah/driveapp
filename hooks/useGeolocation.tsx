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
      // setLocation({latitude: location?.coords?.latitude, longitude: location?.coords?.longitude});
      setLocation({latitude:-6.157730303565986, longitude:106.70434990997822})
    }

    useEffect(() => {
        getCurrentLocation();
    }, []);
    return location
}