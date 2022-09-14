import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RemoteConnectPersistance, TonhubConnectProvider } from "react-ton-x";
import { useLocalStorage } from "../utils/useLocalStorage";

function MyApp({ Component, pageProps }: AppProps) {
  const [connectionState, setConnectionState] =
    useLocalStorage<RemoteConnectPersistance>("connection", {
      type: "initing",
    });
  return (
    <TonhubConnectProvider
      network="mainnet"
      url="https://tonhub-price-history-extension.vercel.app"
      name="TON Price History"
      debug={false}
      connectionState={connectionState}
      setConnectionState={setConnectionState}
    >
      <Component {...pageProps} />
    </TonhubConnectProvider>
  );
}

export default MyApp;
