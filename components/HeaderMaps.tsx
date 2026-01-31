import { Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function HeaderMaps() {
    const router = useRouter();
    return (
        <SafeAreaView className='bg-white flex-row items-center px-4 py-2 gap-4'>
            <Pressable onPress={() => router.navigate("/")}>
                <AntDesign name="arrow-left" size={24} color="black" />
            </Pressable>
            <Text className="text-2xl font-bold">Maps Screen</Text>
        </SafeAreaView>
    )
}