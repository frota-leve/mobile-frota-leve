import React, { useState } from "react";
import SessionContext from "../components/SessionContext";
import { Slot } from "expo-router";

const Layout = () => {
  const [session, updateSession] = useState<boolean>(false);
  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      <Slot />
    </SessionContext.Provider>
  );
};

export default Layout;
