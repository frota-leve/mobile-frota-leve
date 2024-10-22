import React from "react";
import { Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Button, useTheme } from "react-native-paper";
import { useSession } from "../../contexts/SessionContext";
import LastRunsList from "../../components/LastRunsList";

const Index = () => {
  const theme = useTheme()
  const { checkSession } = useSession();
  const session = checkSession()

  const handleStartRun = () => {
    router.replace("/start-run");
  };

  return (
    <>
      {session ? <View className="flex-1 w-[100%]  justify-between items-center">
        <View className="w-[90%] flex-1 justify-start  items-start">
          <View className="w-full">
            <Text className="text-2xl font-extralight">Últimos Registros</Text>
          </View>
          <LastRunsList />
        </View>
        <View className="w-[90%] items-center justify-end rounded-xl pb-2">
          <Button className="w-full" theme={theme} icon="logout" mode="contained" onPress={handleStartRun}>
            Iniciar Corrida
          </Button>
        </View>
      </View> : <Redirect href="/login" />}
    </>

  );
};

export default Index;
