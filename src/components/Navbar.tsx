import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";

const Navbar = () => {
  const theme = useTheme()
  const iconsSize = 30

  const [homeOption, setHomeOption] = useState(true)
  const [profileOption, setProfileOption] = useState(false)

  const options = [
    {
      name: 'home',
      path: '/',
      selected: homeOption,
      set: setHomeOption
    },
    {
      name: 'profile',
      path: '/profile',
      selected: profileOption,
      set: setProfileOption
    }
  ]

  const handleChange = (option: number) => {
      router.replace(options[option].path);
      handleSelectedOption(option)
  }
  
  const handleSelectedOption = (option: number) => {
    options.forEach((e) => e.set(false))
    options[option].set(true)
  }

  return (
    <View className="flex-1 items-center">
      <View className="bg-foreground w-[90%] py-1 rounded-full flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => handleChange(0)}
          className={`p-2 rounded-full justify-center ${options[0].selected ? " bg-secondary " : ""}`}
        >
        <Icon
          source="map-marker-path"

          size={iconsSize}
        />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChange(1)}
          className={`p-2 rounded-full justify-center ${options[1].selected ? " bg-secondary " : ""}`}
        >
        <Icon
          source="account"
          size={iconsSize}
        />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
