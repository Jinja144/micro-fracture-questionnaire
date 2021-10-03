import { useState } from "react";

const usePage = (initPages) => {
  const [pages, updatePages] = useState(initPages);
  const [currentPageIndex, updateCurrentPageIndex] = useState(0);

  const addPages = (newPages) => {
    updatePages(pages.concat(newPages));
  };

  const updateCurrentPage = (newPage) => {
    pages[currentPageIndex] = newPage;
    updatePages(pages);
  };

  const getNextPage = () => {
    updateCurrentPageIndex(currentPageIndex + 1);
  };

  const getPreviousPage = () => {
    updateCurrentPageIndex(currentPageIndex - 1);
  };

  const page = {
    ...pages[currentPageIndex],
    key: currentPageIndex,
    isFirst: currentPageIndex === 0,
    isLast: currentPageIndex === pages.length - 1,
  };
  return [page, getNextPage, getPreviousPage, updateCurrentPage, addPages];
};

export default usePage;
