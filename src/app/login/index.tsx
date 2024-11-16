import React, { useState } from "react";
import { Alert, Image, View, Text, ScrollView } from "react-native";
import { useSession } from "../../contexts/SessionContext";
import { router } from "expo-router";
import UserService from "../../services/UserService";
import { Button, TextInput, useTheme } from "react-native-paper";

const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>('');
  const [data, setData] = useState<any>('');

  const { updateSession } = useSession();

  const onSubmit = async () => {
    if (await checkFirstLogin()) {
      router.push({ pathname: "/update-password", params: { email: email } });
    } else {
      handleLogin();
    }
  };

  const checkFirstLogin = async () => {
    const body = {
      email: email,
    };

    const response = await UserService.checkFirstAcess(body);
    const isFirstLogin = response?.firstAccess;

    if (isFirstLogin) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);
      const data = await UserService.authUser(body);
      updateSession({ params: data });
      router.replace("/");
    } catch (error) {
      const errorJson = JSON.stringify(error, null, 2)
      setError(errorJson)
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgetPassword = () => {
    Alert.alert("Esqueceu sua Senha?", "Entre em contato com seu Gestor");
  }

  return (
    <View className="font-extralight h-full justify-center items-center">
      <View className="w-[80%] justify-center items-center h-full">
        <Image
          resizeMode="contain"
          className="w-full"
          source={require("../../../public/logo-big.png")}
        />
        <View className="items-center rounded-xl w-full py-2">
          <TextInput
            className=" w-full rounded-full"
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            className=" w-full rounded-full mt-5"
            secureTextEntry
            mode="outlined"
            label="Senha"
            value={password}
            onChangeText={password => setPassword(password)}
          />

          <View className="w-full items-end">
            <Button labelStyle={{ color: theme.colors.onPrimary }} theme={theme} compact mode="text" onPress={handleForgetPassword}>
              Esqueceu a Senha?
            </Button>
          </View>

          <Button className="mt-8 w-full bg-primary" loading={isLoading} theme={theme} icon="login" mode="contained" onPress={onSubmit}>
            Entrar
          </Button>
          <ScrollView className="h-[30%]">
            <Text>{error}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Login;
