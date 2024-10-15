import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../../contexts/SessionContext";
import { Button, useTheme } from "react-native-paper";
import { CameraView, useCameraPermissions } from "expo-camera";

type Register = {
  model: string;
  plate: string;
  startDate: string;
  endDate: string;
  kmTraveled: number;
  violations: number;
};

const Index = () => {
  const [flash, setFlash] = useState(false);
  const theme = useTheme()

  const handleCancel = () => {
    router.replace("/");
  };
  8
  const handleFlash = () => {
    setFlash(!flash);

    if (flash) router.replace('/confirm-start-run')
  }

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // permissions loading
  }

  if (!permission?.granted) {
    // permissions not granted yet
    // request permissions
  }





  return (
    <View className=" flex-1 w-[100%] justify-between items-center">
      <View className="bg-white w-[90%] flex-1 justify-center items-center gap-y-4">
        <View className="w-full items-center">
          <Text className="text-2xl font-extralight mb-10">
            Iniciando Corrida
          </Text>
          <Text className="text-2xl font-extralight">Escaneie o QR Code</Text>
        </View>
        <View className="w-full border border-[#FFC314] h-[55%] rounded-lg">
          <CameraView className="flex-1 rounded-lg" >
            <View className="w-[100%] h-full items-center justify-end py-2">
              <Button className="w-[50%] mt-8" theme={theme} icon={flash ? "flash-off" : "flash"} mode="contained" onPress={handleFlash}>
                {flash ? "Desligar Flash" : "Ligar Flash"}
              </Button>
            </View>
          </CameraView>
        </View>
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
