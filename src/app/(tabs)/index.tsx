import { router } from "expo-router";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

import { BottomTabInset } from "@/constants/theme";

type TaskCardProps = {
  title: string;
  date: string;
  flagColor: string;
};

function TaskCard({ title, date, flagColor }: TaskCardProps) {
  return (
    <View className="flex-row items-center rounded-2xl bg-[#1E1E28] px-4 py-3.5 shadow-lg">
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#7C3AED]">
        <Text className="text-base font-bold text-white">✓</Text>
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-white">{title}</Text>
        <Text className="mt-0.5 text-sm text-gray-400">{date}</Text>
      </View>
      <SymbolView
        name={{ ios: "flag.fill", android: "flag", web: "flag" }}
        size={18}
        tintColor={flagColor}
      />
    </View>
  );
}

const CHARACTER_ASPECT = 720 / 1060;

export default function HomeScreen() {
  const { height: windowHeight } = useWindowDimensions();
  const illustrationHeight = windowHeight * 0.45;
  const characterHeight = illustrationHeight * 0.8;

  return (
    <View className="flex-1 bg-[#0B0B15]">
      <SafeAreaView
        className="flex-1"
        style={{ paddingBottom: BottomTabInset }}
      >
        <View className="flex-1 justify-between">
          <View className="flex-1">
            <View
              className="relative w-full"
              style={{ height: illustrationHeight }}
            >
              <Image
                source={require("@/assets/images/Vector 4.png")}
                className="absolute inset-0 h-full w-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 items-center justify-center">
                <Image
                  source={require("@/assets/images/freepik--Character.png")}
                  style={{
                    height: characterHeight,
                    aspectRatio: CHARACTER_ASPECT,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="-mt-10 z-10 px-5">
              <View
                className="z-10"
                style={{ transform: [{ rotate: "2deg" }] }}
              >
                <TaskCard
                  title="Design workshop"
                  date="7,june,2023"
                  flagColor="#EF4444"
                />
              </View>
              <View
                className="-mt-3"
                style={{ transform: [{ rotate: "-3deg" }] }}
              >
                <TaskCard
                  title="Create New Post"
                  date="7,june,2023"
                  flagColor="#22C55E"
                />
              </View>
            </View>
          </View>

          <View className="px-6 pb-4 pt-6">
            <Pressable
              className="mb-5 items-center rounded-2xl bg-[#7C3AED] py-4 active:opacity-80"
              onPress={() => router.push("/onboarding/name")}
            >
              <Text className="text-base font-semibold text-white">
                Get Start
              </Text>
            </Pressable>

            <Text className="text-center text-xs leading-5 text-gray-500">
              By Continuing, You Accept Our{" "}
              <Text className="text-gray-400 underline">Terms Of Services</Text>{" "}
              And Acknowledge Receipt Of Our{" "}
              <Text className="text-gray-400 underline">Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
