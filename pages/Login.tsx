import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/Input";

const Login = ({
  setSession,
}: {
  setSession: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View className="bg-white h-full justify-center items-center">
      <View className="w-[80%] justify-center items-center h-full">
        <Image
          resizeMode="contain"
          className="w-full"
          source={require("../public/logo-big.png")}
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
            onPress={() => setSession(true)}
          >
            <Text className="font-semibold text-2xl">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
