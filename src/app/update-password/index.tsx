import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Input from "../../components/Input";
import { router } from "expo-router";
import UserService from "../../services/UserService";

const UpdatePassword = (email: string) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSetPassword = async () => {
    setIsLoading(true);
    const body = {
      email: email,
      password: password,
    };

    try {
      const data = await UserService.authUser(body);
      console.log('data password ', data)
    } catch (error) {
      throw Alert.alert("Falha! Senhas Não Conferem!", "");
    }
}

  const onSubmit = () => {
    handleSetPassword();
    router.replace("/login");
  };

  return (
    <View className="bg-white h-full justify-center items-center">
      <View className="w-[80%] justify-center items-center h-full">
        <View className="items-center rounded-xl w-full py-2">
          <Text className="text-lg items-start mt-2 w-full font-extralight">
            Senha
          </Text>
          <Input text={password} setText={setPassword} />
          <Text className="text-lg items-start mt-2 w-full font-extralight">
            Confirmação da Senha
          </Text>
          <Input text={confirmPassword} setText={setConfirmPassword} />
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
