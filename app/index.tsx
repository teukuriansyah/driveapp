import { Pressable, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <Text className="text-4xl font-bold">Drive App</Text>
      </View>
      <View className="flex-row gap-3 p-4">
        <Pressable onPress={() => router.navigate("/bike")} className="bg-gray-500 p-4 rounded items-center">
          <Image source={require("../assets/images/bike1.png")} className="w-16 h-16 mb-2 rounded" />
          <Text className="text-white font-bold">Bike</Text>
        </Pressable>
        <Pressable onPress={() => router.navigate("/car")} className="bg-gray-500 p-4 rounded items-center">
          <Image source={require("../assets/images/car1.png")} className="w-16 h-16 mb-2 rounded" />
          <Text className="text-white font-bold">Car</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
