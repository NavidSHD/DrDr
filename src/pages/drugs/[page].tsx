import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
const DrugCard = dynamic(() => import("../../components/DrugCard"));
const Pagination = dynamic(() => import("../../components/Pagination"), {
    ssr: false,
});

export interface Drug {
    id: number;
    name: string;
    price: number;
    image?: string;
}

interface HomeProps {
    drugs: Drug[];
    totalPages: number;
    currentPage: number;
}

const ITEMS_PER_PAGE = 10;

const Home: React.FC<HomeProps> = ({ drugs, totalPages, currentPage }) => {
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
                <div className="drugs-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {drugs?.length &&
                        drugs?.map((drug) => (
                            <DrugCard key={drug.id} drug={drug} />
                        ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { page: "1" } }],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const page = parseInt((context.params?.page as string) || "1");

    const res = await fetch(
        `http://localhost:3001/drugs?_page=${page}&_per_page=${ITEMS_PER_PAGE}`
    );

    const totalCount = parseInt(res.headers.get("X-Total-Count") || "0");
    const drugs = await res.json();

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    if (page < 1 || page > totalPages) {
        return { notFound: true };
    }

    return {
        props: {
            drugs,
            totalPages,
            currentPage: page,
        },
        revalidate: 60,
    };
};

export default Home;
