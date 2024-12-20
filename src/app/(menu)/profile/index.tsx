import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Session, useSession } from "../../../contexts/SessionContext";
import { Button, TextInput, useTheme } from "react-native-paper";
import UserService from "../../../services/UserService";

const Index = () => {
  const { session, updateSession } = useSession();
  const token = session.token ?? ''
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setName(session.name)
  }, [])

  const endSession = () => {
    updateSession({ params: {} } as { params: Session });
    router.push("/login");
  };

  const handleSaveName = async () => {
    setIsLoading(true)

    try {
      await UserService.changeName({ employeeId: session.employeeId, name, token })

      session.name = name
      updateSession({ params: session })

      setIsLoading(false)
    } catch (error) {
      throw console.error(error)
    } finally {
      setIsLoading(false)
    }
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

            <Button className=" w-full bg-primary" loading={isLoading} theme={theme} icon="content-save" mode="contained" onPress={handleSaveName}>
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
