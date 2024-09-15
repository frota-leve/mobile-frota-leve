import React, { Dispatch, SetStateAction, useState } from "react";
import { TextInput } from "react-native";

const Input = ({
  placeholder,
  text,
  setText,
}: {
  placeholder?: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <TextInput
      className="bg-white border-slate-300 border-2 w-full h-14 rounded-xl py-2 px-5"
      placeholder={placeholder}
      value={text}
      onChangeText={setText}
    />
  );
};

export default Input;
