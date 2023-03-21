import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useState } from "react";

const WalletStep = () => {
  const {
    signIn,
    signOut,
    name,
    email,
    signature,
    publicKey,
    truncatePublicKey,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="sm:col-span-2">
      {signature && publicKey ? (
        <>
          <p className="text-white font-bold">Hey {name}! </p>{" "}
          <p className="text-white font-bold">Tu Wallet está conectada 🙌🏼</p>{" "}
          <p className="text-white font-bold">{truncatePublicKey.toString()}</p>
          <br />
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              disabled={isLoading}
              onClick={() => {
                generateCertificate();
              }}
            >
              Emite tu certifiado :D
            </button>
          </div>
          <br />
          <button
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out 🚪
          </button>
        </>
      ) : (
        <>
          <div className="labellegend">
            <p className="text-white mb-4 uppercase font-bold">
              Hola {name} 👋🏼
            </p>
            <p className="text-white italic text-sm mb-4">
              Por favor conecta tu wallet en el botón de abajo para canjear tu
              certificado
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            disabled={isLoading}
            onClick={() => {
              signIn();
            }}
          >
            Conecta tu wallet 👻
          </button>
        </>
      )}
    </div>
  );
};

export default WalletStep;
