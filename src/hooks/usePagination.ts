// ============================================================
// CUSTOM HOOK - src/hooks/usePagination.ts
// ============================================================

import { useState, useMemo } from 'react';

interface UsePaginationResult<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const usePagination = <T,>(
  data: T[],
  pageSize: number = 12
): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const { totalPages, paginatedData } = useMemo(() => {
    const total = Math.ceil(data.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const paginated = data.slice(start, start + pageSize);

    return { totalPages: total, paginatedData: paginated };
  }, [data, pageSize, currentPage]);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
  };
};