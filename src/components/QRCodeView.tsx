import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { useTheme, Button, Icon } from "react-native-paper";
import CarService from "../services/CarService";
import { useSession } from "../contexts/SessionContext";

export default function App() {
  const [flash, setFlash] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const { session } = useSession();

  if (!permission) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center font-extralight pb-5">
          Carregando Permissões
        </Text>
        <Icon color={theme.colors.primary} size={42} source="loading" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center font-extralight w-[50%] pb-5">
          É necessário permitir o acesso a Câmera
        </Text>
        <Button
          className="w-[50%] mt-8"
          theme={theme}
          icon="cctv"
          mode="contained"
          onPress={requestPermission}
        >
          Permitir Acesso
        </Button>
      </View>
    );
  }

  const handleFlash = () => {
    setFlash(!flash);
  };

  const handleResult = async (result: BarcodeScanningResult) => {
    setIsLoading(true);
    setScanned(true);
    if (!result.data) return;

    const plate = result.data;
    const token = session.token ?? "token";

    const params = { plate: plate, token: token };

    try {
      const car = await CarService.getCar(params);
      if (car) {
        router.navigate({
          pathname: "/confirm-start-run",
          params: { plate: plate },
        });
        return;
      }
    } catch (error) {
      throw console.error("erro ao buscar veículo com qr code: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center">
      <CameraView
        className="flex-1"
        facing="back"
        enableTorch={flash}
        onBarcodeScanned={scanned ? undefined : handleResult}
      >
        <View className="w-[100%] h-full items-center justify-end py-2">
          {scanned ? (
            <View className="flex-1 justify-center items-center w-full">
              <View className="bg-foreground py-16 w-[70%] justify-center items-center rounded-3xl">
                {isLoading ? (
                  <>
                    <Icon
                      color={theme.colors.primary}
                      size={42}
                      source="reload"
                    />
                    <Text className="text-onPrimary text-center font-bold text-2xl">
                      Carregando...
                    </Text>
                  </>
                ) : (
                  <>
                    <Text className="text-onPrimary text-center font-bold text-2xl">
                      QR Code Inválido
                    </Text>
                    <Button
                      className="w-[90%] mt-8"
                      theme={theme}
                      icon="qrcode-scan"
                      mode="contained"
                      onPress={() => setScanned(false)}
                    >
                      Escanear Novamente
                    </Button>
                  </>
                )}
              </View>
            </View>
          ) : (
            <Button
              className="w-[50%] mt-8"
              theme={theme}
              icon={flash ? "flash-off" : "flash"}
              mode="contained"
              onPress={handleFlash}
            >
              {flash ? "Desligar Flash" : "Ligar Flash"}
            </Button>
          )}
        </View>
      </CameraView>
    </View>
  );
}
