import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface SessionContextType {
  session: string;
  updateSession: Dispatch<SetStateAction<string>>;
}

const SessionContext = createContext<SessionContextType>({
  session: "",
  updateSession: () => {},
});

export const useSession = () => useContext(SessionContext);

export default SessionContext;
