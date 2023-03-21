import { useForm } from "react-hook-form";
import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useState } from "react";

const baseURL = " https://hackathon.etherfuse.com/api/events/checker";
const eventId = "63c3713740c2442abc5ae9cf";

const EmailStep = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { updateEmailAndName } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { email } = data;

    const dataToSend = {
      eventId,
      email,
    };

    try {
      const { data } = await axios.post(baseURL, dataToSend);
      toast.success("Email Verificado");
      updateEmailAndName(data?.name, data?.email);
    } catch (error) {
      console.error("error =>", error);
      if (error?.response?.status === 404) {
        toast.error("Tu Correo no es valido 🤬");
        return;
      } else {
        toast.error(
          "Ocurrio un error inesperado, contacta a hello@etherfuse.com"
        );
      }
    }
    setIsLoading(false);
  };

  return (
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
          <label htmlFor="email" className=" text-sm font-medium text-white">
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
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {isLoading ? <LoadingCircle /> : "Verificar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailStep;
