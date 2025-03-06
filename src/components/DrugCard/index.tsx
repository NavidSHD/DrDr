import React, { useCallback } from "react";
import NextImage from "next/image";
import { useCart } from "@/context/CartContext";

interface Drug {
    id: number;
    name: string;
    price: number;
    image?: string;
}

interface DrugCardProps {
    drug: Drug;
}

const DrugCard: React.FC<DrugCardProps> = ({ drug }) => {
    const { addToCart } = useCart();

    const handleAddToCart = useCallback(
        () => addToCart(drug),
        [drug, addToCart]
    );

    return (
        <div className="border border-gray-200 rounded box-border shadowy transition h-auto duration-300">
            <div className="rounded rounded-bl-none rounded-br-none bg-gray-200 w-full py-4">
                {drug?.image && (
                    <NextImage
                        src={drug?.image}
                        alt={drug?.name}
                        width={124}
                        height={124}
                        objectFit="cover"
                        className="mix-blend-multiply mx-auto"
                        layout="intrinsic"
                        loading="lazy"
                    />
                )}
            </div>

            <div className="flex justify-between items-center gap-x-2 mt-2 px-2">
                <h2 className="text-sm font-semibold">{drug?.name}</h2>

                <div className="text-gray-700 text-nowrap">
                    {drug?.price?.toLocaleString()} تومان
                </div>
            </div>
            <button
                onClick={handleAddToCart}
                disabled={!process.browser}
                className="bg-primary-500 hover:bg-[#1475d1] text-gray-50 w-full text-lg py-2 px-2 rounded rounded-tl-none rounded-tr-none mt-6 p-4 cursor-pointer transition duration-300"
            >
                <span className="ml-1 font-bold">+</span>
                <span>افزودن</span>
            </button>
        </div>
    );
};

export default React.memo(DrugCard);
