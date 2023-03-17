import MainLayout from "@/components/layouts/MainLayout";
import MainForm from "@/components/forms/MainForm";

export default function Index() {
    return (
        <MainLayout>
            <div className="w-full">
                <div className="mx-auto max-w-2xl py-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Etherfuse Certificates
                    </h1>

                    <div className="formcontainer my-4 w-full flex flex-col justify-center items-center ">
                        <div className="max-w-md w-full px-4">
                            <MainForm />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
