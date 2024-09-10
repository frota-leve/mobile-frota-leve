import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../../components/SessionContext";
import { router } from "expo-router";

const Index = () => {
  const { session, updateSession } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkSession = () => {
      if (isMounted && session === false) {
        navigateToLogin();
      }
    };

    checkSession();
  }, [session, isMounted]);

  const navigateToLogin = () => {
    try {
      router.push("/login");
    } catch (error) {
      console.error("Failed to nevigate to login: ", error);
    }
  };

  return (
    <View className="bg-white h-full justify-center items-center">
      <View className="w-[80%] bg-blue-500 justify-between items-center h-full">
        <View className="w-full bg-green-500 py-2"></View>
        <View className="bg-red-500 items-center rounded-xl w-full py-2">
          <TouchableOpacity
            className="w-full items-center justify-center rounded-xl mt-8 h-14 bg-[#FFC314] text-black"
            onPress={() => {}}
          >
            <Text className="font-semibold text-2xl">Iniciar Corrida</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Index;
