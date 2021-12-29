import React, { useEffect, useState } from "react";
import Page from "../components/page";
import usePage from "../hooks/usePage";
import { v4 as uuidv4 } from 'uuid';
import createQuestionPages from "../factories/questionPages";

export default function Home() {
  const app = {
    pages: [
      {
        text: "Endoresed by\n![British Institute of Non-destructuve Testing](logo.png)\nWelcome!\nThank you for participating in this questionnaire.It will take less that 5 minutes and no personal data is collected.",
      },
      {
        text: "Instructions\nYou will be shown various real images of inspections performed on welds.\nPlease identify in which image the flaws appear the **strongest** and in which they appear the **weakest**.",
      },
      {
        text: "Instructions\nPlease identify in which image the flaws appear the **strongest** and in which they appear the **weakest**.\nBy strongest, this means the image in which you think the flaws stand out the most (i.e.have the highest signal- to - noise ratio).",
      },
      {
        text: "Example\nThe flaws in Image B appear the strongest. The flaws in Image C appear the weakest.",
        images: [
          "https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/Qualification1.png",
          "https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/Qualification2.png",
          "https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/Qualification3.png",
        ],
        expectedOrder: { 0: 1, 1: 0, 2: -1 },
      },
    ],
    isTestPassed: false,
  };
  const [
    currentPage,
    isTestPassed,
    nextPage,
    previousPage,
    updatePage,
    updateIsTestPassed,
    addPages,
    progress
  ] = usePage(app);
  const [areQuestionsAdded, setAreQuestionsAdded] = useState(false);
  const [sessionId,] = useState(uuidv4());

  const createQuestionsAndUpdatePages = async () => {
    setAreQuestionsAdded(true);
    const questionPages = createQuestionPages();
    addPages([
      ...questionPages,
      {
        text: "Endoresed by\n![British Institute of Non-destructuve Testing](logo.png)\nThank you for participating!\nYour response will be used to help develop our understanding of human vision within NDT and how humans interpret flaw responses.No personal data was collected.\nPlease share this with your NDT colleagues. The more responses we have, the more confident our findings will be.",
      },
    ]);
  };

  useEffect(() => {
    if (!areQuestionsAdded) createQuestionsAndUpdatePages();
  });
  return (
    <Page
      key={currentPage.key}
      nextPage={nextPage}
      previousPage={previousPage}
      updatePage={updatePage}
      updateIsTestPassed={updateIsTestPassed}
      isTestPassed={isTestPassed}
      text={currentPage.text}
      images={currentPage.images}
      expectedOrder={currentPage.expectedOrder}
      isAnswered={currentPage.isAnswered}
      isFirst={currentPage.isFirst}
      isLast={currentPage.isLast}
      sessionId={sessionId}
      progress={areQuestionsAdded ? progress : 0}
    />
  );
}
