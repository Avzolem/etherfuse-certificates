import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";
import ParticlesBackground from "@/components/common/ParticlesBackground";

import React, { useState } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Ticket() {
    return (
        <div>
            <ParticlesBackground />
            <MainLayout
                className="relative"
                title="Etherfuse Hackathon"
                description="Compra boletos para Hackathon Etherfuse"
            >
                <div className="content my-16 flex w-full items-center justify-center">
                    <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                            <Link href="/eventos/evento1" passHref>
                                <div className="thumbitem  mx-4 mb-4 cursor-pointer  shadow-md">
                                    <div className="photocontainer">
                                        <Image
                                            src="/images/evento1.png"
                                            alt=""
                                            width={512}
                                            height={512}
                                            className="object-cover"
                                        />
                                    </div>
                                    <br />

                                    <div className="textcontainer text-justify-center bg-white px-6 py-4 ">
                                        <p className="mt-4 flex h-6 w-28 rounded-md bg-purple-700 px-2 text-sm text-white">
                                            Active Event
                                        </p>
                                        <h2 className="title my-2 text-lg font-bold text-black">
                                            etherfuse Hackathon{" "}
                                        </h2>
                                        <p className="text-happy-pink-600 mb-4 text-sm font-bold capitalize text-gray-700">
                                            24/02/2023
                                        </p>

                                        <div className="rounded-md shadow">
                                            <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 px-8 py-3 text-base font-medium text-white  md:py-4 md:px-10 md:text-lg">
                                                <button onClick={addMovie}>
                                                    Comprar EzTicket
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mt-2 text-sm text-black">
                                                <span className="font-bold">
                                                    Starting Price:
                                                </span>{" "}
                                                0.00141 SOL
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mt-2 text-sm text-black">
                                                <span className="font-bold">
                                                    Actual Price:
                                                </span>{" "}
                                                0.59 MXN
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
            {/* //
            ...................................................................... */}
        </div>
    );
}
