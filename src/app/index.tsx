import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../components/SessionContext";
import { router } from "expo-router";

const Index = () => {
  const { session, updateSession } = useSession();

  const endSession = () => {
    updateSession("");
    router.push("/login");
  };

  return (
    <View className="bg-white h-full justify-center items-center">
      <View className="w-[80%] justify-center items-center h-full">
        <View className="items-center rounded-xl w-full py-2">
          <TouchableOpacity
            className="w-full items-center justify-center rounded-xl mt-8 h-14 bg-[#FFC314] text-black"
            onPress={endSession}
          >
            <Text className="font-semibold text-2xl">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Index;
