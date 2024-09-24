import { router } from "expo-router";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

const Navbar = () => {
  const [myProfile, setMyProfile] = useState<boolean>(false);

  const handleChange = () => {
    if (myProfile) {
      router.replace("/");
    } else {
      router.replace("/profile");
    }

    setMyProfile(!myProfile);
  };

  return (
    <View className="flex-1 items-center">
      <View className="bg-[#332C2B] w-[90%] py-2 rounded-xl flex-row justify-evenly">
        <TouchableOpacity
          onPress={handleChange}
          className=" px-5 justify-center"
        >
          {myProfile ? (
            <Image
              className="w-12 h-12"
              source={require("../../public/iconMapNotSelected.png")}
            />
          ) : (
            <Image
              className="w-12 h-12"
              source={require("../../public/iconMapSelected.png")}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChange}
          className=" px-5 justify-center"
        >
          {myProfile ? (
            <Image
              className="w-12 h-12"
              source={require("../../public/iconUserSelected.png")}
            />
          ) : (
            <Image
              className="w-12 h-12"
              source={require("../../public/iconUserNotSelected.png")}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
