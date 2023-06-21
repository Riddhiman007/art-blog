// contexts
import AuthProvider from "./AuthContext";
import { ThemeProvider } from "next-themes";
import MuiTheme from "./MuiTheme";
import { DarkModeProvider } from "./DarkModeContext";

export default function Providers({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <DarkModeProvider>
      <MuiTheme>
        <AuthProvider>{children}</AuthProvider>
      </MuiTheme>
    </DarkModeProvider>
    
  );
}

export { DarkModeContext } from './DarkModeContext';