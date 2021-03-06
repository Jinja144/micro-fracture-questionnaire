import { useState } from "react";

const usePage = (appInit) => {
  const [app, updateApp] = useState(appInit);
  const [currentPageIndex, updateCurrentPageIndex] = useState(0);

  const addPages = (newPages) => {
    updateApp({
      ...app,
      pages: app.pages.concat(newPages),
    });
  };

  const updateCurrentPage = (newPage) => {
    app.pages[currentPageIndex] = {
      ...app.pages[currentPageIndex],
      ...newPage,
    };
    updateApp(app);
  };

  const updateTestPassed = (isTestPassed) => {
    app.isTestPassed = isTestPassed;
    updateApp(app);
  };

  const getNextPage = () => {
    updateCurrentPageIndex(currentPageIndex + 1);
  };

  const getPreviousPage = () => {
    updateCurrentPageIndex(currentPageIndex - 1);
  };

  const getProgress = () => {
    return (currentPageIndex + 1) / app.pages.length
  }

  const page = {
    ...app.pages[currentPageIndex],
    key: currentPageIndex,
    isFirst: currentPageIndex === 0,
    isLast: currentPageIndex === app.pages.length - 1,
  };

  const progress = getProgress()
  return [
    page,
    app.isTestPassed,
    getNextPage,
    getPreviousPage,
    updateCurrentPage,
    updateTestPassed,
    addPages,
    progress
  ];
};

export default usePage;
