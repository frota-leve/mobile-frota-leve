import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../../contexts/SessionContext";
import { Button, TextInput, useTheme } from "react-native-paper";
import UserService from "../../../services/UserService";

const Index = () => {
  const { session, updateSession } = useSession();
  const [name, setName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setName(session.name)
  }, [])

  const endSession = () => {
    updateSession();
    router.push("/login");
  };

  const handleUpdateName = () => {
    setIsLoading(true)

    if (name) {
      UserService.changeName({ id: session.employeeId, newName: name })
    }

    setTimeout(() => setIsLoading(false), 2000)
  }

  const theme = useTheme()

  return (
    <View className="flex-1 justify-center  items-center">
      <View className="w-[90%] justify-between flex-1  items-center">
        <View className="items-center w-full flex-1 justify-center ">

          <View className="items-center w-full gap-y-2">
            <TextInput
              className=" w-full rounded-full"
              mode="outlined"
              label="Empresa"
              value="UniCesumar - Maringá"
              disabled
            />
            <TextInput
              className=" w-full rounded-full"
              mode="outlined"
              label="Nome"
              value={name}
              onChangeText={name => setName(name)}
            />

            <Button className=" w-full bg-primary" loading={isLoading} theme={theme} icon="content-save" mode="contained" onPress={handleUpdateName}>
              {isLoading ? "Carregando" : "Salvar"}
            </Button>
          </View>
        </View>
        <Button className="w-full mb-2" theme={theme} icon="logout" mode="contained" onPress={endSession}>
          Sair
        </Button>
      </View>
    </View>
  );
};

export default Index;
