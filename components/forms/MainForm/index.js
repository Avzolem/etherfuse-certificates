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
        </div>
    );
};

export default MainForm;
