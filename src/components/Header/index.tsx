import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import NextImage from "next/image";

const Header: React.FC = () => {
    const { totalItems } = useCart();

    return (
        <header className="flex justify-between items-center !px-4 !py-5 bg-white shadow !mb-4">
            <Link href="/">
                <div className="text-2xl font-bold text-primary-500">
                    <NextImage
                        src="/images/icons/logo.svg"
                        alt="لگوی سایت دکتر دکتر"
                        width={132}
                        height={24}
                        layout="intrinsic"
                        loading="lazy"
                    />
                </div>
            </Link>

            <Link href="/cart">
                <div className="relative">
                    <NextImage
                        src="/images/icons/basket.svg"
                        alt="سبد خرید کاربر"
                        width={24}
                        height={24}
                        layout="intrinsic"
                        loading="lazy"
                    />

                    {totalItems > 0 && (
                        <span className="absolute -bottom-2 -right-2 bg-red-500 text-gray-50 rounded-full h-4 w-4 flex items-center justify-center text-xs">
                            {totalItems}
                        </span>
                    )}
                </div>
            </Link>
        </header>
    );
};

export default React.memo(Header);
