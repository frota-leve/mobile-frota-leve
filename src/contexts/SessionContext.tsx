import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Session = {
  businessId: string,
  businessName: string,
  email: string,
  employeeId: string,
  name: string,
  refreshToken: string,
  refreshTokenExpiresAt: string,
  token: string,
  tokenExpiresAt: string,
}

type SessionContextType = {
  session: Session;
  updateSession: (data?: Session) => void;
  checkSession: () => boolean;
}

const SessionContext = createContext<SessionContextType>({} as SessionContextType);

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session>({} as Session)

  const updateSession = (data?: Session) => {
    if (!data) {
      setSession({} as Session)
    } else {
      setSession(data)
    }
  }

  const checkSession = () => {
    if (!session.token) return false
    return true
  }

  useEffect(() => {
  }, [session])

  return (
    <SessionContext.Provider value={{ session, updateSession, checkSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}

export default SessionProvider;
