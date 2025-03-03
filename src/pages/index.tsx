import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Pagination from "../components/Pagination";
import React from "react";
import Head from "next/head";
const DrugCard = dynamic(() => import("../components/DrugCard"));

export interface Drug {
    id: number;
    name: string;
    price: number;
    image?: string;
}

interface HomeProps {
    drugs: Drug[];
}

const Home: React.FC<HomeProps> = ({ drugs }) => {
    const router = useRouter();
    const { page } = router.query;
    const currentPage = page ? parseInt(page as string) : 1;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(drugs.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentDrugs = drugs.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <Head>
                <title>دکتر دکتر</title>
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
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentDrugs.map((drug) => (
                        <DrugCard key={drug?.id} drug={drug} />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("http://localhost:3001/drugs");
    const data = await res.json();
    const drugs = data.drugs ? data.drugs : data;

    return {
        props: {
            drugs,
        },
        revalidate: 300,
    };
};

export default Home;
