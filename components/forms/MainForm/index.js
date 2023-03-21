import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import EmailStep from "./EmailStep";
import WalletStep from "./WalletStep";

const MainForm = () => {
  const { name, email } = useContext(AuthContext);

  return (
    <div className="wrapper">
      <div className="overflow-hidden py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-xl ">
          {name && email ? <WalletStep /> : <EmailStep />}
        </div>
      </div>
      {/* <div className="overflow-hidden py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-xl">
          {response ? (
            publicKey ? (
              isLoading ? (
                <div className="loadingwrapper my-8">
                  <p className="font-bold text-white text-lg mb-1">
                    {statusText}
                  </p>
                  <p className="text-red-600 font-bold mb-4 text-sm italic">
                    Please do not close this window or refresh the page
                  </p>
                  <LoadingCircle color="#FFFFFF" />
                </div>
              ) : solanaExplorerLink ? (
                <div className="loadingwrapper my-8 flex flex-col justify-center items-center">
                  <CheckCircleIcon className="h-20 w-20 text-green-500 mb-4" />
                  <p className="font-bold text-white text-lg mb-2 break-normal break-all">
                    {statusText}
                  </p>
                  <a
                    href={solanaExplorerLink}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-600"
                  >
                    View transaction in Solana Explorer
                  </a>
                </div>
              ) : (
                <>
                  <p className="text-white font-bold">
                    Your Wallet is connected 🙌🏼
                  </p>{" "}
                  <p className="text-white font-bold">{publicKey.toString()}</p>
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
              )
            ) : (
              // Este es el useState del PublicKey, boton de conectar wallet
              <>
                
              </>
            )
          ) : (
            // Este es el useState del response, verificar correo
            
          )}
        </div>
      </div> */}
    </div>
  );
};

export default MainForm;
