import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../../components/SessionContext";
import { Button, useTheme } from "react-native-paper";

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
  const theme = useTheme()

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
          <Button className="w-full mt-8" theme={theme} icon="close-circle-outline" mode="contained" onPress={handleCancel}>
            Cancelar
          </Button>
      </View>
    </View>
  );
};

export default Index;
