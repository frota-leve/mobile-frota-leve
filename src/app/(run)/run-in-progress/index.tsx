import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Icon, useTheme } from "react-native-paper";
import { useSession } from "../../../contexts/SessionContext";
import { useCar } from "../../../hooks/useCar";
import { Race } from "../../../types/types";
import RaceService from "../../../services/RaceService";
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale/pt-BR";

const Index = () => {
  const params = useLocalSearchParams();
  const { session } = useSession();
  const token = session.token ?? "";
  const raceId = params.raceId as string;
  const [race, setRace] = useState<Race | null>(null);
  const dateString = params.dateString as string;
  const theme = useTheme();
  const iconsSize = 24;

  function handleBack() {
    router.push('/')
  }

  const handleEndRun = () => {
    router.navigate({
      pathname: "/end-run",
      params: {
        raceId,
        startAt: race?.startAt,
        startMileage: race?.startMileage
      },
    });
  };

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}`;
  const formattedTime = `${hours}:${minutes}`;

  async function getRace() {
    const { data } = await RaceService.getRaceById(raceId, token);
    setRace(data)
  }

  useEffect(() => {
    getRace();
  }, [])

  return (
    <View className="flex-1 w-[100%]  items-center">
      <View className="w-[90%] flex-1  items-center">
        <View className="flex-1 w-full justify-center">
          <View className="shadow-sm w-full shadow-foreground bg-background items-center  py-6 px-2 my-2 border border-foreground rounded-xl">
            <View className=" w-full items-center py-4">
              <View>
                <Text className="text-3xl mb-4">
                  { race?.situation === 'IN_PROGRESS' ? 'Corrida em Andamento' : 'Corrida Finalizada' }
                </Text>
              </View>
              <View className="flex-row ">
                <Icon color={theme.colors.primary} size={42} source="car" />
                <Text className="text-5xl ml-1 font-bold">{race?.carName}</Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  color={theme.colors.primary}
                  size={iconsSize}
                  source="card-text-outline"
                />
                <Text className="text-xl font-semibold ml-1">{race?.carPlate}</Text>
              </View>
            </View>
            <View className="w-full px-4">
              <View className="flex-row items-center">
                <Icon
                  color={theme.colors.primary}
                  size={iconsSize}
                  source="ray-start-arrow"
                />
                <Text className="text-md ml-1">
                  <Text className="font-semibold">
                    Início: {race?.startAt ? format(race?.startAt, 'dd/MM/yyy HH:mm', { locale: ptBR }) : ''}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  color={theme.colors.primary}
                  size={iconsSize}
                  source="ray-end"
                />
                <Text className="text-md ml-1">
                  <Text className="font-semibold">
                    Fim: {race?.endAt ? format(race?.endAt, 'dd/MM/yyy HH:mm', { locale: ptBR }) : ''}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  color={theme.colors.primary}
                  size={iconsSize}
                  source="ray-start-arrow"
                />
                <Text className="text-md ml-1">
                  <Text className="font-semibold">
                    KM Inicial: {race?.startMileage} KM
                  </Text>
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
                  {race?.employeeName}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Button
              className="w-full mb-4"
              theme={theme}
              icon="exit-to-app"
              mode="contained"
              onPress={handleBack}
            >
              Voltar
            </Button>
          </View>
          {
            race?.situation === 'IN_PROGRESS' ? 
              <Button
                className="w-full"
                theme={theme}
                icon="stop-circle-outline"
                mode="contained"
                onPress={handleEndRun}
              >
                Finalizar Corrida
              </Button> : ''
          }
        </View>
      </View>
    </View>
  );
};

export default Index;
