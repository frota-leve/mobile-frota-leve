import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface SessionContextType {
  session: boolean;
  updateSession: Dispatch<SetStateAction<boolean>>;
}

const SessionContext = createContext<SessionContextType>({
  session: false,
  updateSession: () => {},
});

export const useSession = () => useContext(SessionContext);

export default SessionContext;
