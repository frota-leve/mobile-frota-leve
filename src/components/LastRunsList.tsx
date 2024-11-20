import { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import RaceService from "../services/RaceService";
import { useSession } from "../contexts/SessionContext";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR';
import { router } from "expo-router";

type Race = {
  id: string;
  carName: string;
  carPlate: string;
  startAt: string;
  endAt: string;
  finalMileage: number;
  startMileage: number;
  violations: number;
  situation: string;
};

export default function LastRunsList() {
  const { session } = useSession();
  const theme = useTheme();
  const iconsSize = 18;

  const [data, setData] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        if (!session.token) {
          console.error("Token não encontrado");
          return;
        }
        const response = await RaceService.getRaces({ token: session.token });
        setData(response.content);
      } catch (error: any) {
        if (error?.response?.status === 403) {
          console.error("Sessão expirada ou token inválido");
        } else {
          console.error("Erro ao carregar corridas:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, [session.token]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  function handlePressRace(raceId: string) {
    router.navigate({
      pathname: "/run-in-progress",
      params: {
        raceId,
      },
    });
  }

  return (
    <>
      <View>
        <ScrollView className="p-3">
          {data &&
            data.map((register: Race) => (
              <Pressable key={register.id} onPress={() => handlePressRace(register.id)}>
                <View
                  className="shadow-sm shadow-foreground bg-background items-center py-2 px-2 my-2 border border-foreground rounded-xl"
                >
                  <Pressable key={register.id} onPress={() => handlePressRace}></Pressable>
                  <View className="w-full flex-row items-start justify-between">
                    <View className="flex-row items-center mb-1">
                      <Icon color={theme.colors.primary} size={30} source="car" />
                      <Text className="text-2xl ml-1 font-semibold">
                        {register.carName}
                      </Text>
                    </View>
                    <View
                      className={` ${
                        register.situation === 'COMPLETED' ? "bg-green-400" : "bg-red-400"
                      } rounded-full px-2`}
                    >
                      <Text className="text-md m-1">
                        {register.situation === 'COMPLETED' ? "Finalizada" : "Em andamento"}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row  w-full justify-around ">
                    <View className="w-[45%] items-start">
                      <View className="flex-row items-center">
                        <Icon
                          color={theme.colors.primary}
                          size={iconsSize}
                          source="card-text-outline"
                        />
                        <Text className="text-md ml-1">{register.carPlate}</Text>
                      </View>
                    </View>
                    <View className="w-[55%] items-start ">
                      <View className="flex-row items-center">
                        <Icon
                          color={theme.colors.primary}
                          size={iconsSize}
                          source="ray-start-arrow"
                        />
                        <Text className="text-md ml-1">
                          <Text className="font-semibold">
                            Início: {register.startAt ? format(register.startAt, 'dd/MMM/yyyy - HH:MM', { locale: ptBR }) : ''}
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
                            Fim: {register.endAt ? format(register.endAt, 'dd/MMM/yyyy - HH:MM', { locale: ptBR }) : ''}
                          </Text>
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Icon
                          color={theme.colors.primary}
                          size={iconsSize}
                          source="map-marker-distance"
                        />
                        <Text className="text-md ml-1">
                          <Text className="font-semibold">
                            Percorrido:
                            {register.finalMileage === 0 ? ' 0' : (register.finalMileage ? ` ${register.finalMileage - register.startMileage} KM` : ' -')}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </>
  );
}
