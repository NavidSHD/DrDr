import React from "react";
import { useCart } from "@/context/CartContext";
import NextImage from "next/image";
import Head from "next/head";

const CartPage: React.FC = () => {
    const { cart, updateQuantity, totalPrice } = useCart();

    return (
        <>
            <Head>
                <title>دکتر دکتر - سبد خرید</title>
                <meta
                    name="description"
                    content="خرید دارو از سایت دکتر دکتر"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>
                {cart?.length === 0 ? (
                    <p>سبد خرید شما خالی است.</p>
                ) : (
                    <div className="space-y-4">
                        {cart?.map((item) => (
                            <div
                                key={item?.id}
                                className="flex items-center justify-between flex-col lg:flex-row border p-4 rounded shadow"
                            >
                                <div className="flex items-center">
                                    <div className="relative w-24 h-24 mr-4">
                                        {item?.image ? (
                                            <NextImage
                                                src={item?.image}
                                                alt={item?.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                                                تصویر موجود نیست
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold">
                                            {item?.name}
                                        </h2>
                                        <p>
                                            قیمت واحد:{" "}
                                            {item?.price?.toLocaleString()}{" "}
                                            تومان
                                        </p>
                                        <div className="flex items-center my-4">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item?.id,
                                                        item?.quantity - 1
                                                    )
                                                }
                                                className="px-3 py-1 cursor-pointer w-8 h-8 border rounded hover:bg-primary-500 hover:text-white transition"
                                            >
                                                -
                                            </button>
                                            <span className="mx-2 text-nowrap">
                                                {item?.quantity} عدد
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item?.id,
                                                        item?.quantity + 1
                                                    )
                                                }
                                                className="px-3 py-1 cursor-pointer w-8 h-8 border rounded hover:bg-primary-500 hover:text-white transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-lg font-bold text-left w-full lg:w-auto">
                                    {(
                                        item?.price * item?.quantity
                                    )?.toLocaleString()}{" "}
                                    تومان
                                </div>
                            </div>
                        ))}
                        <div className="text-right mt-4">
                            <h2 className="text-xl font-bold">
                                مجموع: {totalPrice?.toLocaleString()} تومان
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;
