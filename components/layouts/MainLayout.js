import Head from "next/head";

import Footer from "@/components/common/Footer";

import { Toaster } from "react-hot-toast";

const Layout = ({
    title,
    description,
    children,
    childrenClassName,
    ...rest
}) => {
    return (
        <div className="">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div
                className="flex min-h-screen w-full flex-col bg-black"
                {...rest}
            >
                <Toaster position="bottom-center" reverseOrder={false} />
                <div className={`my-0 ${childrenClassName}`}>{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
