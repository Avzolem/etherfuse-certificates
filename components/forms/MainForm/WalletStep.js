import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useStorageUpload } from "@thirdweb-dev/react";

const price = process.env.NEXT_PUBLIC_MINTING_PRICE;
const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK;

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
    const [solanaExplorerLink, setSolanaExplorerLink] = useState("");

    const { mutateAsync: upload } = useStorageUpload();

    const uploadToIpfs = async (file) => {
        console.log("Este es el file", file);
        const uploadUrl = await upload({
            data: [file],
            options: {
                uploadWithGatewayUrl: true,
                uploadWithoutDirectory: true,
            },
        });
        //console.log("Upload URL to IPS: ", ipfsUrl);
        return uploadUrl;
    };

    const generateCertificate = async () => {
        setIsLoading(true);

        let file = null;

        try {
            setStatusText("Por favor confirma la transacción en tu wallet 👻 ");
            const explorerLink = await sendTransaction(price);

            const imgname = name.replace(/\s+/g, "%20");

            const cloudinaryURL = `https://res.cloudinary.com/dyalnhdcl/image/upload/l_text:Arial_128_bold:${imgname}/v1679367000/certificates/certificado_qlsxoq.png`;

            console.log("URL de Cloudinary", cloudinaryURL);

            await fetch(cloudinaryURL)
                .then((res) => res.blob())
                .then((myBlob) => {
                    console.log("Creando el Blob", myBlob);
                    // logs: Blob { size: 1024, type: "image/jpeg" }

                    myBlob.name = "certificado.png";

                    file = new File([myBlob], "image.png", {
                        type: myBlob.type,
                    });

                    console.log("Aqui ya se creo el archivo temporal", file);
                });

            const uploadUrl = await uploadToIpfs(file);
            console.log("Upload URL to IPS: ", uploadUrl);

            const mintedData = {
                name,
                explorerLink,
                imageUrl: uploadUrl,
                publicKey,
            };

            setStatusText(
                "Emitiendo tu certificado en la blockchain de Solana 🚀"
            );

            const { data } = await axios.post("/api/mintnft", mintedData);
            const { signature: newSignature } = data;

            const solanaExplorerUrl = `https://solscan.io/tx/${newSignature}?cluster=${SOLANA_NETWORK}`;
            setSolanaExplorerLink(solanaExplorerUrl);

            setStatusText(
                "¡Listo! Tu certificado ha sido emitido, revisa tu Phantom Wallet 👻"
            );
        } catch (error) {
            console.error("Error al generar el certificado", error);
            toast.error(
                "Ocurrió un error al generar el certificado, intenta de nuevo 😢"
            );
        }

        setStatusText("");
        setIsLoading(false);
    };

    return (
        <div className="sm:col-span-2">
            {publicKey ? (
                <>
                    {!isLoading && (
                        <>
                            {solanaExplorerLink ? (
                                <div className="successcontainer">
                                    <p className="text-white font-bold">
                                        Hey {name}!{" "}
                                    </p>{" "}
                                    <p className="text-white font-bold">
                                        Tu certificado ha sido emitido 🎉{" "}
                                    </p>{" "}
                                    <p className="text-white font-bold my-2">
                                        Revisa la transacción en{" "}
                                        <a
                                            href={solanaExplorerLink}
                                            target="_blank"
                                            className="text-red-600 underline"
                                        >
                                            Solana Explorer
                                        </a>
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-white font-bold">
                                        Hey {name}!{" "}
                                    </p>{" "}
                                    <p className="text-white font-bold">
                                        Tu Wallet está conectada 🙌🏼
                                    </p>{" "}
                                    <p className="text-white font-bold">
                                        {truncatePublicKey.toString()}
                                    </p>
                                </>
                            )}
                        </>
                    )}

                    <br />
                    {isLoading && statusText && (
                        <div className="wrapersin flex flex-col items-center justify-center">
                            <div className="loading flex">
                                <LoadingCircle className="m-0 p-0" />
                            </div>
                            <div className="statustextcontainer mt-4">
                                <p className="text-white font-bold mb-8">
                                    {statusText}
                                </p>
                                <p className="text-red-600 italic mb-8 text-sm">
                                    ⚠️ Por favor no cierres esta ventana hasta
                                    que se complete el proceso
                                </p>
                            </div>
                        </div>
                    )}

                    {!isLoading && !solanaExplorerLink && (
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
                            Por favor conecta tu wallet en el botón de abajo
                            para canjear tu certificado
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
