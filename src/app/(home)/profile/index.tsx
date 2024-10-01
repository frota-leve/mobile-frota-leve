import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../../components/SessionContext";

const Index = () => {
  const { session, updateSession } = useSession();
  const [token, setToken] = useState("");

  console.log( 'session ', session)


  useEffect(() => {
    const randNumber = Math.floor(Math.random() * 31)
    const token = randNumber.toFixed(0)

    setToken(token)
  },[])

  const endSession = () => {
    updateSession("");
    router.push("/login");
  };

  return (
    <View className="bg-white flex-1 justify-center items-center">
      <View className="w-[80%] justify-center items-center">

      <View className="items-center rounded-xl w-full py-2">
          <View
            className="w-full items-center justify-center rounded-xl mt-8 h-12 bg-[#FFC314] text-black"
          >
            <Text className="font-extralight text-xl">Seu Número: {token}</Text>
          </View>
        </View>

        {token === "30" && (
          <View className="items-center rounded-xl w-full py-2">
          <View
            className="w-full items-center justify-center rounded-xl mt-8 h-12 bg-[#F00] text-black"
          >
            <Text className="font-extralight text-xl">GANHOU BOMBOM</Text>
          </View>
        </View>
        )}

        <View className="items-center rounded-xl w-full py-2">
          <TouchableOpacity
            className="w-full items-center justify-center rounded-xl mt-8 h-12 bg-[#FFC314] text-black"
            onPress={endSession}
          >
            <Text className="font-extralight text-xl">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Index;
