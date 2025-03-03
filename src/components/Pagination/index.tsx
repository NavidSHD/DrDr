import React from "react";
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return (
        <div className="flex justify-center items-center text-sm space-x-2 my-4">
            {currentPage > 1 && (
                <Link href={`/?page=${currentPage - 1}`}>
                    <div className="px-3 py-1 border border-gray-300 rounded hover:bg-primary-500 hover:text-white transition">
                        قبلی
                    </div>
                </Link>
            )}
            {pages.map((page) => (
                <Link key={page} href={`/?page=${page}`}>
                    <div
                        className={`px-3 py-1 border border-gray-300 rounded transition ${
                            page === currentPage
                                ? "bg-primary-500 text-white"
                                : "hover:bg-primary-500 hover:text-white"
                        }`}
                    >
                        {page}
                    </div>
                </Link>
            ))}
            {currentPage < totalPages && (
                <Link href={`/?page=${currentPage + 1}`}>
                    <div className="px-3 py-1 border border-gray-300 rounded hover:bg-primary-500 hover:text-white transition">
                        بعدی
                    </div>
                </Link>
            )}
        </div>
    );
};

export default React.memo(Pagination);
