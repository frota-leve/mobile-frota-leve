import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/Input";

const Home = ({
  setSession,
}: {
  setSession: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View className="bg-white h-full justify-center items-center">
      <View className="w-[80%] justify-center items-center h-full">
        <View className="items-center rounded-xl w-full py-2">
          <TouchableOpacity
            className="w-full items-center justify-center rounded-xl mt-8 h-14 bg-[#FFC314] text-black"
            onPress={() => setSession(false)}
          >
            <Text className="font-semibold text-2xl">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
