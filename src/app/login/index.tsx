import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../../components/SessionContext";
import Input from "../../components/Input";
import { router } from "expo-router";

let isFirstLogin: boolean = true;

const Login = () => {
  const { updateSession } = useSession();

  const checkFirstLogin = () => {
    if (isFirstLogin) {
      isFirstLogin = false;
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = () => {
    if (checkFirstLogin()) {
      router.replace("/update-password");
    } else {
      updateSession(true);
      router.replace("/");
    }
  };

  return (
    <View className="bg-white h-full justify-center items-center">
      <View className="w-[80%] justify-center items-center h-full">
        <Image
          resizeMode="contain"
          className="w-full"
          source={require("../../../public/logo-big.png")}
        />
        <View className="items-center rounded-xl w-full py-2">
          <Text className="text-lg items-start mt-2 w-full font-semibold">
            Email
          </Text>
          <Input />
          <Text className="text-lg items-start mt-2 w-full font-semibold">
            Senha
          </Text>
          <Input />
          <View className="w-full items-end">
            <Text className="color-slate-400 text-sm font-semibold">
              Esqueceu?
            </Text>
          </View>
          <TouchableOpacity
            className="w-full items-center justify-center rounded-xl mt-8 h-14 bg-[#FFC314] text-black"
            onPress={onSubmit}
          >
            <Text className="font-semibold text-2xl">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
