import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LayoutSplashScreen } from "../_metronic/layout/core";
import { AuthModel, UserModel } from "./_models";
import * as authHelper from "./AuthHelpers";
import { getUserByToken } from "./_requests";
import { WithChildren } from "../_metronic/helpers";

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
  hasRequiredRole: (role: number, exclusive?: boolean) => boolean;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
  hasRequiredRole: () => false,
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    localStorage.removeItem('currentCompany');
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  function hasRequiredRole(role: number, exclusive: boolean = false) {
    if (!currentUser) return false;
    //check if is 1
    if (exclusive && currentUser.auth_profile_id === 1) return false;
    if (exclusive && currentUser.auth_profile_id < role) return true;

    if (currentUser.auth_profile_id === 1) return true;


    return currentUser?.auth_profile_id === role;
  }


  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout, hasRequiredRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken);
          if (data) {

            const permissions = data.permissions || [];
            console.log('Permissions', permissions)
            if (permissions.length > 0) {
              console.log("has permissions")
              const previusCompany = localStorage.getItem('currentCompany') ? JSON.parse(localStorage.getItem('currentCompany') as string) : null;
              if (previusCompany) {
                console.log('Previous company found', previusCompany)

                const companyExists = permissions.find(company => company.id === previusCompany.id);
                console.log('Company exists', companyExists)

                if (!companyExists) {

                  const currentCompany = permissions[0];
                  console.log('Setting current company', currentCompany)

                  localStorage.setItem('currentCompany', JSON.stringify(currentCompany));
                  data.currentCompany = currentCompany;
                } else {

                  data.currentCompany = previusCompany;
                }

              } else {
                console.log('No previous company')

                const currentCompany = permissions[0];
                localStorage.setItem('currentCompany', JSON.stringify(currentCompany));

                data.currentCompany = currentCompany;
              }
            } else {
              console.log('No permissions found')
              logout();
            }
            setCurrentUser(data);
          }
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth && auth.token) {
      requestUser(auth.token);
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthInit, AuthProvider, useAuth };
