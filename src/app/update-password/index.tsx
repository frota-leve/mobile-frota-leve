import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Input from "../../components/Input";
import { router, useLocalSearchParams } from "expo-router";
import UserService from "../../services/UserService";
import { Button, TextInput, useTheme } from "react-native-paper";

const UpdatePassword = () => {
  const { email } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const theme = useTheme()

  useEffect(() => {
    console.log(email)
  }, [])

  const handleSetPassword = async () => {
    setIsLoading(true);
    const body = {
      email: email as string,
      password: password,
    };

    try {
      const data = await UserService.authUser(body);
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
          <TextInput
            className=" w-full rounded-full"
            mode="outlined"
            secureTextEntry
            label="Senha"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            className=" w-full rounded-full mt-5"
            secureTextEntry
            mode="outlined"
            label="Confirmação de Senha"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />

          <Button className="mt-8 w-full bg-primary" loading={isLoading} theme={theme} icon="lock-reset" mode="contained" onPress={onSubmit}>
            Atualizar Senha
          </Button>

        </View>
      </View>
    </View>
  );
};

export default UpdatePassword;
