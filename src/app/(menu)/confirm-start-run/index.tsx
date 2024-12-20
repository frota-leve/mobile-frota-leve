import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Icon, useTheme } from "react-native-paper";
import { useCar } from "../../../hooks/useCar";
import { useSession } from "../../../contexts/SessionContext";
import RaceService from "../../../services/RaceService";

const Index = () => {
  const params = useLocalSearchParams();
  const { session } = useSession();
  const token = session.token ?? "";
  const plate = params.plate;
  const car = useCar({ plate: plate, token: token } as {
    plate: string;
    token: string;
  });
  const theme = useTheme();
  const iconsSize = 24;
  const [loadingStartRun, setLoadingStartRun] = useState<boolean>(false);

  const handleCancel = () => {
    router.replace("/");
  };

  const handleConfirmStartRun = async () => {
    const body = {
      employeeId: session.employeeId,
      carId: car.id,
      token: token,
    };
    try {
      setLoadingStartRun(true);
      const response = await RaceService.startRace(body);
      router.navigate({
        pathname: "/run-in-progress",
        params: { raceId: response.id },
      });
    } catch (error) {
      Alert.alert("Erro!", "Erro ao Iniciar Corrida!");
      console.error("Error ", error);
    } finally {
      setLoadingStartRun(false);
    }
  };

  return (
    <View className="flex-1 w-[100%]  items-center">
      <View className="w-[90%] flex-1  items-center ">
        <View className="w-full items-center">
          <Text className="text-2xl font-extralight mb-10">
            Confirmar Início de Corrida
          </Text>
        </View>
        <View className="flex-1 w-full justify-center">
          <View className="shadow-sm w-full shadow-foreground bg-background items-center  py-6 px-2 my-2 border border-foreground rounded-xl">
            <View className=" w-full items-center py-4">
              <View className="flex-row ">
                <Icon color={theme.colors.primary} size={42} source="car" />
                <Text className="text-5xl ml-1 font-bold">{car.name}</Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  color={theme.colors.primary}
                  size={iconsSize}
                  source="card-text-outline"
                />
                <Text className="text-xl font-semibold ml-1">{car.plate}</Text>
              </View>
            </View>
            <View className="w-full px-4">
              <View className="flex-row items-center">
                <Icon
                  color={theme.colors.primary}
                  size={iconsSize}
                  source="car-cruise-control"
                />
                <Text className="text-md ml-1">
                  <Text className="font-semibold">Km Atual:</Text> {car.mileage}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  color={theme.colors.primary}
                  size={iconsSize}
                  source="card-account-details"
                />
                <Text className="text-md ml-1">
                  <Text className="font-semibold">Motorista:</Text>{" "}
                  {session.name}
                </Text>
              </View>
            </View>
          </View>
          <Button
            className="w-full"
            theme={theme}
            icon="car-traction-control"
            mode="contained"
            loading={loadingStartRun}
            onPress={handleConfirmStartRun}
          >
            Iniciar
          </Button>
        </View>
      </View>
      <View className="w-[90%] items-center justify-end py-2">
        <Button
          className="w-full"
          theme={theme}
          icon="close-circle-outline"
          mode="contained"
          onPress={handleCancel}
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
};

export default Index;
