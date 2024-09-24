import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../components/SessionContext";

type Register = {
  car: string;
};

const Index = () => {
  const { session, updateSession } = useSession();
  const [data, setData] = useState<Register[]>([
    { car: "Carro 1" },
    { car: "Carro 2" },
    { car: "Carro 3" },
    { car: "Carro 4" },
    { car: "Carro 5" },
    { car: "Carro 6" },
    { car: "Carro 7" },
    { car: "Carro 8" },
    { car: "Carro 9" },
    { car: "Carro 10" },
  ]);

  const endSession = () => {
    updateSession("");
    router.push("/login");
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
                key={register.car}
                className="flex-row items-center py-2 px-4 my-2 border border-[#FFC314] rounded-xl"
              >
                <Text className="text-lg font-extralight">{register.car}</Text>
              </View>
            ))}
        </ScrollView>
      </View>
      <View className="w-[90%]  items-center justify-end rounded-xl py-2">
        <TouchableOpacity
          className="w-full items-center justify-center rounded-xl mt-8 h-12 bg-[#FFC314] text-black"
          onPress={() => {}}
        >
          <Text className="font-extralight text-xl">INICIAR CORRIDA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
