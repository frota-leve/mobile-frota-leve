import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../../components/SessionContext";
import Input from "../../components/Input";
import { router } from "expo-router";
import UserService from "../../services/UserService";

let isFirstLogin: boolean = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateSession } = useSession();

  const onSubmit = () => {
    if (checkFirstLogin()) {
      router.replace("/update-password");
    } else {
      handleLogin();
    }
  };

  const checkFirstLogin = () => {
    if (isFirstLogin) {
      isFirstLogin = false;
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const body = {
      email: email,
      password: password,
    };

    try {
      // const data = await UserService.authUser(body);
      const data = {
        token: "token",
      };
      updateSession(data.token);
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", "Falha ao autenticar. ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-white font-extralight h-full justify-center items-center">
      <View className="w-[80%] justify-center items-center h-full">
        <Image
          resizeMode="contain"
          className="w-full"
          source={require("../../../public/logo-big.png")}
        />
        <View className="items-center rounded-xl w-full py-2">
          <Text className="font-extralight text-lg items-start mt-2 w-full ">
            Email
          </Text>
          <Input text={email} setText={setEmail} />
          <Text className="font-extralight text-lg items-start mt-2 w-full ">
            Senha
          </Text>
          <Input text={password} setText={setPassword} />
          <View className="w-full items-end">
            <Text className="font-bold color-slate-400 text-sm ">
              Esqueceu?
            </Text>
          </View>
          <TouchableOpacity
            className="w-full items-center justify-center rounded-xl mt-8 h-12 bg-[#FFC314] text-black"
            onPress={onSubmit}
          >
            <Text className="font-extralight text-xl">
              {isLoading ? "CARREGANDO..." : "ENTRAR"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
