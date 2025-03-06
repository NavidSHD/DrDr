import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `document.documentElement.classList.add('js')`,
                    }}
                />
                <noscript>
                    <style>{`        :root { --js-enabled: 0; }
                    .no-js .drugs-grid {
                        display: grid !important;
`}</style>
                </noscript>
            </Head>

            <Header />
            <Toaster position="bottom-right" reverseOrder={false} />
            <Component {...pageProps} />
        </CartProvider>
    );
}
