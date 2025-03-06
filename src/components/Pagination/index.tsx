import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const router = useRouter();
    const visiblePages = 5;

    const generatePages = () => {
        let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        let end = Math.min(totalPages, start + visiblePages - 1);

        if (end - start < visiblePages - 1) {
            start = Math.max(1, end - visiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div className="flex justify-center items-center text-sm space-x-2 my-4">
            {currentPage > 1 && (
                <Link
                    href={`/?drugs=${currentPage - 1}`}
                    legacyBehavior
                    prefetch={false}
                >
                    <a className="px-3 py-1 border border-gray-300 rounded hover:bg-primary-500 hover:text-white transition">
                        قبلی
                    </a>
                </Link>
            )}

            {generatePages().map((page) => (
                <Link
                    key={page}
                    href={`/drugs/${page}`}
                    legacyBehavior
                    prefetch={false}
                >
                    <a
                        className={`px-3 py-1 border border-gray-300 rounded transition ${
                            page === currentPage
                                ? "bg-primary-500 text-white"
                                : "hover:bg-primary-500 hover:text-white"
                        }`}
                    >
                        {page}
                    </a>
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link
                    href={`/?drugs=${currentPage + 1}`}
                    legacyBehavior
                    prefetch={false}
                >
                    <a className="px-3 py-1 border border-gray-300 rounded hover:bg-primary-500 hover:text-white transition">
                        بعدی
                    </a>
                </Link>
            )}
        </div>
    );
};

export default React.memo(Pagination);
