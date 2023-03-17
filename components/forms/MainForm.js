import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";

const baseURL = " https://hackathon.etherfuse.com/api/events/checker";
const eventId = "63c3713740c2442abc5ae9cf";

const MainForm = () => {
    const { publicKey, signIn, sendTransaction, signOut } =
        useContext(AuthContext);

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
        const dataToSend = {
            eventId,
            ...data,
        };

        console.log("Este es el dataToSend", dataToSend);
        try {
            const response = await axios.post(baseURL, dataToSend);
            setResponse(response);
            console.log("Este es el response", response);
            console.log("Este es el nombre ", response.data.name);

            if (response.status === 200) {
                toast.success("Email Verificado");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("error =>", error);
            toast.error("Something went wrong, please try again");
        }
    };

    return (
        <div className="wrapper">
            <div className="overflow-hidden py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
                <div className="relative mx-auto max-w-xl">
                    {response ? (
                        publicKey ? (
                            <>
                                <p className="text-white font-bold">
                                    Your Wallet is connected 🙌🏼
                                </p>{" "}
                                <p className="text-white font-bold">
                                    {publicKey.toString()}
                                </p>
                                <br />
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                        disabled={isLoading}
                                        onClick={() => {}}
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
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                        disabled={isLoading}
                                        onClick={() => {
                                            signIn();
                                        }}
                                    >
                                        Connect your wallet 👻
                                    </button>
                                </div>
                            </>
                        )
                    ) : (
                        <div>
                            <div>
                                <span className="text-center text-3xl text-white font-extrabold  sm:text-4xl">
                                    Primero que nada, verifica tu correo{" "}
                                </span>
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
                                                    message:
                                                        "Este Campo es Requerido",
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
