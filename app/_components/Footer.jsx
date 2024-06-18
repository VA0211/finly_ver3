import { Facebook, Instagram, Mail, NotebookPen } from "lucide-react";
import React from "react";
import Link from "next/link";

function Footer() {
    return (
        <>
            <div className="bg-gray-200 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
                <div className="p-5 ">
                    <ul>
                        <p className="text-gray-800 font-bold text-3xl pb-6">Finly</p>
                        <div className="flex flex-row gap-2">
                            <Link
                                aria-label="Finly on Facebook"
                                href="https://www.facebook.com/profile.php?id=61559605455726&mibextid=ZbWKwL">
                                <Facebook />
                            </Link>
                            <Link
                                aria-label="Finly on Gmail"
                                href="mailto:finly.fpt.vn@gmail.com">
                                <Mail />
                            </Link>
                        </div>
                    </ul>
                </div>


                <div className="p-5">
                    <ul>
                        <p className="text-gray-800 font-bold text-2xl pb-4">Hỗ trợ</p>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                            <Link href={'https://www.facebook.com/profile.php?id=61559605455726&mibextid=ZbWKwL'}
                                className="hover:text-blue-700"> Facebook </Link>
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                            <Link href={'mailto:finly.fpt.vn@gmail.com'}
                                className="hover:text-blue-700"> Email </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
                <h1 className=" text-gray-800 font-semibold">
                    © 2024 All rights reserved
                </h1>
            </div>
        </>
    );
}

export default Footer;