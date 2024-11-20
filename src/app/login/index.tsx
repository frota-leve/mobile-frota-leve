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
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showCheckFirstLoginBtn, setShowCheckFirstLoginBtn] =
    useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>("");
  const [data, setData] = useState<any>("");

  const { updateSession } = useSession();

  const checkFirstLogin = async () => {
    const body = {
      email: email,
    };

    try {
      setIsLoading(true);
      const response = await UserService.checkFirstAcess(body);
      setShowConfirmPassword(response?.firstAccess);
      setShowCheckFirstLoginBtn(false);
      setShowPassword(true);
    } catch(err) {
      Alert.alert('Falha na validação do email, por favor tente novamente')
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (showConfirmPassword && password !== confirmPassword) {
      Alert.alert('As senhas não coincidem')
      return;
    }

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
      const errorJson = JSON.stringify(error, null, 2);
      setError(errorJson);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgetPassword = () => {
    Alert.alert("Esqueceu sua Senha?", "Entre em contato com seu Gestor");
  };

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
            keyboardType="email-address"
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          {showCheckFirstLoginBtn ? (
            <Button
              className="mt-8 w-full bg-primary"
              loading={isLoading}
              theme={theme}
              icon="login"
              mode="contained"
              onPress={checkFirstLogin}
            >
              Entrar
            </Button>
          ) : null}

          {showPassword ? 
            <TextInput
              className=" w-full rounded-full mt-5"
              secureTextEntry
              mode="outlined"
              label="Senha"
              value={password}
              onChangeText={(password) => setPassword(password)}
            /> : null
          }
          {
            showConfirmPassword ? 
              <TextInput
                className=" w-full rounded-full mt-5"
                secureTextEntry
                mode="outlined"
                label="Confirme sua senha"
                value={confirmPassword}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              />
            : null
          }
          {
            !showCheckFirstLoginBtn ? 
            <Button
              className="mt-8 w-full bg-primary"
              loading={isLoading}
              theme={theme}
              icon="login"
              mode="contained"
              onPress={handleLogin}
            >
              Entrar
            </Button>
            : null
          }
        </View>
      </View>
    </View>
  );
};

export default Login;
