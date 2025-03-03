import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <Header />
            <Toaster position="bottom-right" reverseOrder={false} />
            <Component {...pageProps} />
        </CartProvider>
    );
}
