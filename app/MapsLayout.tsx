import { View, Text, ScrollView, Keyboard } from 'react-native'
import { useState, useEffect, useRef } from "react"
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function Maps(props: any) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardVisible(true)
      setKeyboardHeight(e.endCoordinates.height)
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const getRoute = async (start: any, end: any) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const points = data.routes[0].geometry.coordinates.map((coord: any) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoords(points);

        mapRef.current?.fitToCoordinates(points, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props.location && props.pickup) {
      getRoute(props.location, props.pickup);
    } else {
      setRouteCoords([]);
    }
  }, [props.pickup, props.location]);

  return (
    <View style={{ flex: 1 }}>
      {props.location === null ? (
        <View className="p-4"><Text>Loading...</Text></View>
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
              latitude: props.location.latitude,
              longitude: props.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker 
              coordinate={props.location} 
              title="You are here" 
              pinColor='blue' 
            />

            {props.pickup && (
              <Marker 
                coordinate={props.pickup} 
                title="Pick up location" 
                pinColor='red' 
              />
            )}

            {routeCoords.length > 0 && (
              <Polyline
                coordinates={routeCoords}
                strokeColor="#0000FF"
                strokeWidth={4}
              />
            )}
          </MapView>

          <ScrollView 
            className={`absolute bottom-0 bg-white w-full gap-4 p-4 ${isKeyboardVisible ? `h-3/5` : 'h-2/5'}`}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 }}
          >
            {props.children}
          </ScrollView>
        </>
      )}
    </View>
  )
}