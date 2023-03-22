import "@/styles/globals.css";
import AuthContextProvider from "@/components/AuthProvider";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const activeChainId = ChainId.SolanaDevnet;

export default function App({ Component, pageProps }) {
    return (
        <ThirdwebProvider desiredChainId={activeChainId}>
            <AuthContextProvider>
                <Component {...pageProps} />
            </AuthContextProvider>
        </ThirdwebProvider>
    );
}
