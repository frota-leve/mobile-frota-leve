import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../contexts/SessionContext";
import { Button, useTheme } from "react-native-paper";
import LastRunsList from "../../components/LastRunsList";

const Index = () => {
  const theme = useTheme()
  const { session, updateSession } = useSession();


  const handleStartRun = () => {
    router.replace("/start-run");
  };

  return (
    <View className="flex-1 w-[100%]  justify-between items-center">
      <View className="w-[90%] flex-1 justify-start  items-start">
        <View className="w-full">
          <Text className="text-2xl font-extralight">Últimos Registros</Text>
        </View>
        <LastRunsList />
      </View>
      <View className="w-[90%] items-center justify-end rounded-xl pb-2">
        <Button className="w-full" theme={theme} icon="logout" mode="contained" onPress={() => { router.replace('/start-run') }}>
          Iniciar Corrida
        </Button>
      </View>
    </View>
  );
};

export default Index;
