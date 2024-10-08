import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../../components/SessionContext";
import { Button, useTheme } from "react-native-paper";

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

  const theme = useTheme()

  return (
    <View className="bg-white flex-1 justify-center items-center">
      <View className="w-[80%] justify-center items-center">

        <View className="items-center rounded-xl w-full py-2">
          
          <Button className="w-full" theme={theme} icon="logout" mode="contained" onPress={endSession}>
            Sair
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Index;
