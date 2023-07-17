// contexts
import AuthProvider from "./AuthContext";
import { ThemeProvider } from "next-themes";
import MuiTheme from "./MuiTheme";
import { DarkModeProvider } from "./DarkModeContext";
import MobileFirstProvider from "./MobileFirstContext";

export default function Providers({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <MuiTheme>
      <DarkModeProvider>
        <MobileFirstProvider>
          <AuthProvider>{children}</AuthProvider>
        </MobileFirstProvider>
      </DarkModeProvider>
    </MuiTheme>
  );
}

export { DarkModeContext } from "./DarkModeContext";
export { MobileFirstContext } from "./MobileFirstContext";
