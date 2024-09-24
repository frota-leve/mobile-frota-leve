import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Input from "../../components/Input";
import { router } from "expo-router";

const UpdatePassword = () => {
  const onSubmit = () => {
    router.replace("/login");
  };

  return (
    <View className="bg-white h-full justify-center items-center">
      <View className="w-[80%] justify-center items-center h-full">
        <View className="items-center rounded-xl w-full py-2">
          <Text className="text-lg items-start mt-2 w-full font-extralight">
            Senha
          </Text>
          <Input />
          <Text className="text-lg items-start mt-2 w-full font-extralight">
            Confirmação da Senha
          </Text>
          <Input />
          <TouchableOpacity
            className="w-full items-center justify-center rounded-xl mt-8 h-12 bg-[#FFC314] text-black"
            onPress={onSubmit}
          >
            <Text className="font-extralight text-xl">ATUALIZAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdatePassword;
