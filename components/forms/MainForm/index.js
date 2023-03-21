import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";

const baseURL = " https://hackathon.etherfuse.com/api/events/checker";
const eventId = "63c3713740c2442abc5ae9cf";
const price = process.env.NEXT_PUBLIC_MINTING_PRICE;

const MainForm = () => {
  const {
    publicKey,
    signIn,
    sendTransaction,
    signOut,
    updateEmailAndName,
    contextName,
    contextEmail,
  } = useContext(AuthContext);

  const [response, setResponse] = useState(null);
  const [dataToPost, setDataToPost] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [solanaExplorerLink, setSolanaExplorerLink] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { email } = data;

    const dataToSend = {
      eventId,
      email,
    };

    try {
      const { data } = await axios.post(baseURL, dataToSend);
      setResponse(data);
      toast.success("Email Verificado");
      updateEmailAndName(data?.name, data?.email);

      setIsLoading(false);
    } catch (error) {
      console.error("error =>", error);
      if (error?.response?.status === 404) {
        toast.error("Tu Correo no es valido 🤬");
        setIsLoading(false);
        return;
      } else {
        toast.error(
          "Ocurrio un error inesperado, contacta a hello@etherfuse.com"
        );
      }
    }
  };

  const generateCertificate = async () => {
    console.log("Preparamos response", response);

    setIsLoading(true);

    try {
      const explorerLink = await sendTransaction(price);
      setSolanaExplorerLink(explorerLink);
      setStatusText("Aproving your certificate 🤓... ");
      setIsLoading(true);

      try {
        //Aqui anidamos el nombre
        const imgname = response.data.name.replace(/\s+/g, "%20");
        const name = response.data.name;

        console.log("Nombre para certificado", name);

        //Generamos la imagen con Cloudinary

        setStatusText("Generating your certificate 🧾 ... ");

        const outputCloudinary = `https://res.cloudinary.com/dyalnhdcl/image/upload/l_text:Arial_128_bold:${imgname}/v1679367000/certificates/certificado_qlsxoq.png`;

        console.log("outputUrl =>", outputCloudinary);
        setIsLoading(true);
        setStatusText("You certificated is being minted 🐱‍👤... ");

        const mintedData = {
          name,
          explorerLink,
          imageUrl: outputCloudinary,
          publicKey,
        };

        console.log("Este es el mintedData =>", mintedData);

        const mintresponse = await axios.post("/api/mintnft", mintedData);
        console.log("mintresponse =>", mintresponse);
        setStatusText(
          "You certificate is minted 🎉, check your phantom wallet 👻 "
        );
        setIsLoading(false);
      } catch (error) {
        console.error("error =>", error);
        toast.error("Something went wrong on minting, please try again");
      }
    } catch (error) {
      console.error("error =>", error);
      toast.error(
        "Something went wrong on sending transaction, please try again"
      );
    }
  };

  return (
    <div className="wrapper">
      <div className="overflow-hidden py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
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
                <div className="sm:col-span-2">
                  <div className="labellegend">
                    <p className="text-white mb-4 uppercase font-bold">
                      Hola {contextName} 👋🏼
                    </p>
                    <p className="text-white italic text-sm mb-4">
                      Por favor conecta tu wallet en el botón de abajo para
                      canjear tu certificado
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
                </div>
              </>
            )
          ) : (
            // Este es el useState del response, verificar correo
            <div>
              <div className="text-center text-3xl text-white font-extrabold  sm:text-4xl">
                <span>Primero que nada, verifica tu correo </span>
              </div>

              <br />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className=" text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Correo Electronico"
                      autoComplete="email"
                      className="  rounded-md border-purple-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Este Campo es Requerido",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="mt-3 text-sm text-red-600">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Verificar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainForm;
