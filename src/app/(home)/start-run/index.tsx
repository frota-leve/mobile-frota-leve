import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../../components/SessionContext";

type Register = {
  model: string;
  plate: string;
  startDate: string;
  endDate: string;
  kmTraveled: number;
  violations: number;
};

const Index = () => {
  const { session, updateSession } = useSession();

  const handleCancel = () => {
    router.replace("/");
  };

  return (
    <View className=" flex-1 w-[100%] justify-between items-center">
      <View className="bg-white w-[90%] flex-1 justify-center items-center gap-4">
        <View className="w-full items-center">
          <Text className="text-2xl font-extralight mb-10">
            Iniciando Corrida
          </Text>
          <Text className="text-2xl font-extralight">Escaneie o QR Code</Text>
        </View>
        <View className="w-full border border-[#FFC314] h-[50%] rounded-lg"></View>
      </View>
      <View className="w-[90%]  items-center justify-end rounded-xl py-2">
        <TouchableOpacity
          className="w-full items-center justify-center rounded-xl mt-8 h-12 bg-[#FFC314] text-black"
          onPress={() => {}}
        >
          <Text className="font-extralight text-xl" onPress={handleCancel}>
            CANCELAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
