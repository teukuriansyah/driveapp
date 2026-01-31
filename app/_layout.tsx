import { Stack } from "expo-router";
import HeaderMaps from "../components/HeaderMaps";
import "./global.css"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false,}}/>
      <Stack.Screen name="bike" options={{header: () => <HeaderMaps />}}/>
    </Stack>
  )
}
