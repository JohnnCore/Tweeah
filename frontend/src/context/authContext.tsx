import { ReactElement, createContext, useMemo, useReducer } from "react";

type AuthStateType = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

const initAuthState: AuthStateType = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const AUTH_ACTION_TYPE = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
  REFRESH: "REFRESH",
};

export type AuthReducerActionType = typeof AUTH_ACTION_TYPE;

export type AuthReducerAction = {
  type: string;
  payload?: { accessToken?: string; refreshToken?: string };
};

const authReducer = (state: AuthStateType, action: AuthReducerAction): AuthStateType => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.LOGIN: {
      if (!action.payload || !action.payload.accessToken || !action.payload.refreshToken) {
        throw new Error("Invalid payload in LOGIN action");
      }
      console.log(action.payload);

      localStorage.setItem('accessToken', action?.payload?.accessToken);
      localStorage.setItem('refreshToken', action?.payload?.refreshToken);
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action?.payload?.accessToken,
        refreshToken: action?.payload?.refreshToken,
      };
    }

    case AUTH_ACTION_TYPE.REGISTER: {
      // if (!action.payload) {
      //   throw new Error("Registration not implemented");
      // }
      return {
        ...state
      }
    }

    case AUTH_ACTION_TYPE.LOGOUT: {
      // Implemente o logout aqui e remova os tokens do localStorage.
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      }
    }

    case AUTH_ACTION_TYPE.REFRESH: {
      if (!action.payload || !action.payload.accessToken || !action.payload.refreshToken) {
        throw new Error("Invalid payload in LOGIN action");
      }
      console.log(action?.payload?.accessToken);
      
      localStorage.setItem('accessToken', action?.payload?.accessToken);
      localStorage.setItem('refreshToken', action?.payload?.refreshToken);
      return {
        ...state,
        accessToken: action?.payload?.accessToken,
        refreshToken: action?.payload?.refreshToken,
      }
    }

    default:
      throw new Error("Undefined auth reducer action type");
  }
};

// Implemente o contexto de autenticação
const useAuthContext = (initAuthState: AuthStateType) => {
  const [state, dispatch] = useReducer(authReducer, initAuthState);

  const AUTH_ACTIONS = useMemo(() => {
    return AUTH_ACTION_TYPE;
  }, []);

  return { state, dispatch, AUTH_ACTIONS };
};

export type UseAuthContextType = ReturnType<typeof useAuthContext>;

const initAuthContextState: UseAuthContextType = {
  state: initAuthState,
  dispatch: () => { },
  AUTH_ACTIONS: AUTH_ACTION_TYPE,
};

export const AuthContext = createContext<UseAuthContextType>(initAuthContextState);

type AuthProviderProps = { children?: ReactElement | ReactElement[] };

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  // Verifique se há tokens no localStorage ao iniciar
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const isAuthenticated = !!accessToken && !!refreshToken;
  
  // Inicialize o estado com base nos tokens no localStorage
  const initialState: AuthStateType = {
    isAuthenticated,
    accessToken,
    refreshToken,
  };


  return (
    <AuthContext.Provider value={useAuthContext(initialState)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
