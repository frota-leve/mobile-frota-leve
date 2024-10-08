import React, { useState } from "react";
import { Alert, Image, View } from "react-native";
import { useSession } from "../../components/SessionContext";
import { router } from "expo-router";
import UserService from "../../services/UserService";
import { Button, Dialog, TextInput, useTheme } from "react-native-paper";

const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateSession } = useSession();

  const onSubmit = async () => {
    if (await checkFirstLogin()) {
      router.replace("/update-password");
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

    console.log('response, ', response)

    if (isFirstLogin) {
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
      const data = await UserService.authUser(body);
      console.log('data ', data)
      updateSession(data.token);
      router.replace("/");
    } catch (error) {
      throw Alert.alert("Falha ao Autenticar", "Verifique suas Credenciais");
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
            <Button labelStyle={{color: theme.colors.onPrimary}} theme={theme} compact mode="text" onPress={() => console.log('Pressed')}>
              Esqueceu?
            </Button>
          </View>

          <Button className="mt-8 w-full bg-primary" loading={isLoading} theme={theme} icon="login" mode="contained" onPress={onSubmit}>
            Entrar
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
