import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../components/SessionContext";
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
  const theme = useTheme()
  const { session, updateSession } = useSession();
  const [data, setData] = useState<Register[]>([
    {
      model: "Corolla",
      plate: "ABC-1234",
      startDate: "28/08",
      endDate: "29/08",
      kmTraveled: 5000,
      violations: 0,
    },
    {
      model: "Civic",
      plate: "ABC-1234",
      startDate: "28/08",
      endDate: "29/08",
      kmTraveled: 6000,
      violations: 1,
    },
    {
      model: "Fusion",
      plate: "ABC-1234",
      startDate: "28/08",
      endDate: "29/08",
      kmTraveled: 4000,
      violations: 2,
    },
    {
      model: "Corvette",
      plate: "ABC-1234",
      startDate: "28/08",
      endDate: "29/08",
      kmTraveled: 3000,
      violations: 3,
    },
    {
      model: "Golf",
      plate: "ABC-1234",
      startDate: "28/08",
      endDate: "29/08",
      kmTraveled: 4500,
      violations: 1,
    },
  ]);

  const handleStartRun = () => {
    router.replace("/start-run");
  };

  return (
    <View className=" flex-1 w-[100%] justify-between items-center">
      <View className="bg-white w-[90%] flex-1 justify-center items-center gap-4">
        <View className="w-full">
          <Text className="text-2xl font-extralight">Últimos Registros</Text>
        </View>
        <ScrollView className=" w-full max-h-[70%]">
          {data &&
            data.map((register: Register) => (
              <View
                key={register.model}
                className="flex-row justify-around items-center py-2 px-2 my-2 border border-[#FFC314] rounded-xl"
              >
                <View className="mx-2 w-[20%] items-center">
                  <Text className="text-sm">ícone</Text>
                </View>
                <View className=" w-[40%] items-center">
                  <Text className="text-lg font-extralight">
                    {register.model}
                  </Text>
                  <Text className="text-lg font-extralight">
                    Início: {register.startDate}
                  </Text>
                  <Text className="text-lg font-extralight">
                    Fim: {register.endDate}
                  </Text>
                </View>
                <View className="ml-3 w-[40%] items-start">
                  <Text className="text-lg font-extralight">
                    Placa: {register.plate}
                  </Text>
                  <Text className="text-lg font-extralight">
                    Percorrido: {register.kmTraveled}
                  </Text>
                  <Text className="text-lg font-extralight">
                    Infrações: {register.violations}
                  </Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
      <View className="w-[90%]  items-center justify-end rounded-xl py-2">
          <Button className="w-full" theme={theme} icon="logout" mode="contained" onPress={() => {}}>
            Iniciar Corrida
          </Button>
      </View>
    </View>
  );
};

export default Index;
