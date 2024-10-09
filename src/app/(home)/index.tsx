import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../components/SessionContext";
import { Button, useTheme } from "react-native-paper";
import LastRunsList from "../../components/LastRunsList";

const Index = () => {
  const theme = useTheme()
  const { session, updateSession } = useSession();
  

  const handleStartRun = () => {
    router.replace("/start-run");
  };

  return (
    <View className=" flex-1 w-[100%] justify-between items-center">
      <View className="bg-white w-[90%] flex-1 justify-center items-center gap-4">
        <View className="w-full">
          <Text className="text-2xl mt-10 font-extralight">Últimos Registros</Text>
        </View>
        <LastRunsList/>
      </View>
      <View className="w-[90%] items-center justify-end rounded-xl py-2">
          <Button className="w-full" theme={theme} icon="logout" mode="contained" onPress={() => {router.replace('/start-run')}}>
            Iniciar Corrida
          </Button>
      </View>
    </View>
  );
};

export default Index;
