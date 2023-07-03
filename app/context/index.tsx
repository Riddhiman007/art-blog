// contexts
import AuthProvider from "./AuthContext";
import { ThemeProvider } from "next-themes";
import MuiTheme from "./MuiTheme";
import { DarkModeProvider } from "./DarkModeContext";

export default function Providers({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <MuiTheme>
      <DarkModeProvider>
        <AuthProvider>{children}</AuthProvider>
      </DarkModeProvider>
    </MuiTheme>
  );
}

export { DarkModeContext } from "./DarkModeContext";
