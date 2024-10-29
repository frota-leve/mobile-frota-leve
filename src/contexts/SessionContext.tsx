import React, {
  createContext,
  useContext,
  useState,
} from "react";

export type Session = {
  name: string,
  email: string,
  employeeId: string,
  businessId: string,
  businessName: string,
  token: string | null,
  tokenExpiresAt: string,
  refreshToken: string,
  refreshTokenExpiresAt: string
}

type SessionContextType = {
  session: Session;
  updateSession: ({ params }: { params: Session }) => void;
  checkSession: () => boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session>({ token: null } as Session)

  const updateSession = ({ params }: { params: Session }) => {
    setSession(params)
  }

  const checkSession = () => {
    if (!session || !session.token) return false
    return true
  }

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
