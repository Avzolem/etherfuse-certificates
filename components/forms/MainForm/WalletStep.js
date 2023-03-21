import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const price = process.env.NEXT_PUBLIC_MINTING_PRICE;

const WalletStep = () => {
  const {
    signIn,
    signOut,
    name,
    email,
    signature,
    publicKey,
    truncatePublicKey,
    sendTransaction,
  } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [solanaExplorerLink, setSolanaExplorerLink] = useState(null);

  const generateCertificate = async () => {
    setIsLoading(true);

    setStatusText("Por favor confirma la transacción en tu wallet 👻 ");
    const explorerLink = await sendTransaction(price);
    console.log("explorer link....", explorerLink);
    // try {
    //   const explorerLink = await sendTransaction(price);
    //   setSolanaExplorerLink(explorerLink);
    //   setStatusText(
    //     "Llamando a los robots certificadores de hackathones 🤖..."
    //   );

    //   try {
    //     //Aqui anidamos el nombre
    //     const imgname = name.replace(/\s+/g, "%20");
    //     console.log("Nombre para certificado", name);

    //     //Generamos la imagen con Cloudinary
    //     setStatusText(
    //       "Generando la imagen de certificado más bonita del mundo 🌏"
    //     );

    //     const outputCloudinary = `https://res.cloudinary.com/dyalnhdcl/image/upload/l_text:Arial_128_bold:${imgname}/v1679367000/certificates/certificado_qlsxoq.png`;
    //     console.log("outputUrl =>", outputCloudinary);
    //     setIsLoading(true);

    //     const mintedData = {
    //       name,
    //       explorerLink,
    //       imageUrl: outputCloudinary,
    //       publicKey,
    //     };

    //     console.log("Preparando información para  =>", mintedData);

    //     //Generamos la imagen con Cloudinary
    //     setStatusText("Emitiendo tu certificado en la blockchain de Solana 🚀");

    //     const mintresponse = await axios.post("/api/mintnft", mintedData);
    //     console.log("mintresponse =>", mintresponse);
    //     setStatusText(
    //       "¡Listo! Tu certificado ha sido emitido, revisa tu Phantom Wallet"
    //     );
    //   } catch (error) {
    //     console.error("error =>", error);
    //     toast.error(
    //       "Ocurrió un error al generar el certificado, intenta de nuevo 😢"
    //     );
    //     setStatusText("");
    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   console.error("error =>", error);
    //   toast.error(
    //     "Ocurrió un error al generar el certificado, intenta de nuevo 😢"
    //   );
    //   setStatusText("");
    //   setIsLoading(false);
    // }
    setStatusText("");
    setIsLoading(false);
  };

  return (
    <div className="sm:col-span-2">
      {signature && publicKey ? (
        <>
          {!isLoading && (
            <>
              <p className="text-white font-bold">Hey {name}! </p>{" "}
              <p className="text-white font-bold">
                Tu Wallet está conectada 🙌🏼
              </p>{" "}
              <p className="text-white font-bold">
                {truncatePublicKey.toString()}
              </p>
            </>
          )}

          <br />
          {isLoading && statusText && (
            <div className="wrapersin flex flex-col items-center justify-center">
              <div className="loading flex">
                <LoadingCircle className="m-0 p-0" />
              </div>
              <div className="statustextcontainer mt-4">
                <p className="text-white font-bold mb-8">{statusText}</p>
                <p className="text-red-600 italic mb-8 text-sm">
                  ⚠️ Por favor no cierres esta ventana hasta que se complete el
                  proceso
                </p>
              </div>
            </div>
          )}
          {!isLoading && (
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                disabled={isLoading}
                onClick={() => {
                  generateCertificate();
                }}
              >
                Canjear certificado 🏅
              </button>
            </div>
          )}
          <br />
          {!isLoading && (
            <button
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out 🚪
            </button>
          )}
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
