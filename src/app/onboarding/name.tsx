import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUserStore } from "@/store/user";

export default function OnboardingNameScreen() {
  const storedName = useUserStore((state) => state.name);
  const setName = useUserStore((state) => state.setName);
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const [name, setLocalName] = useState(storedName);
  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;

    setName(trimmedName);
    completeOnboarding();
    router.replace("/explore");
  };

  return (
    <View className="flex-1 bg-[#0B0B15]">
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-between px-6 pb-8 pt-16">
            <View className="items-center">
              <Text className="text-center text-3xl font-bold text-white">
                What is Your Name ?
              </Text>
              <Text className="mt-4 text-center text-sm leading-6 text-gray-400">
                Please provide your name, which we&apos;ll use for display and
                personalize your to-do experience.
              </Text>
            </View>

            <View className="items-center px-2">
              <TextInput
                value={name}
                onChangeText={setLocalName}
                placeholder="Enter Your Name"
                placeholderTextColor="#6B7280"
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                className="w-full text-center text-xl text-white"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#4B5563",
                  paddingVertical: 12,
                }}
              />
            </View>

            <Pressable
              className={`items-center rounded-2xl py-4 ${
                canSubmit ? "bg-[#A78BFA] active:opacity-80" : "bg-[#4C3A7A]"
              }`}
              disabled={!canSubmit}
              onPress={handleSubmit}
            >
              <Text className="text-base font-semibold text-white">
                Get Start
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
