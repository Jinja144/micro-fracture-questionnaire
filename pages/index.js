import React, { useEffect, useState } from "react";
import Page from "../components/page";
import usePage from "../hooks/usePage";

export default function Home() {
  const app = {
    pages: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac lorem vestibulum, convallis tellus id, fringilla tellus. Aenean eget varius est. Nulla facilisi. Quisque vehicula id lacus in consequat. Praesent vel porta urna. Donec vitae nulla ut sem faucibus vehicula. Suspendisse vitae facilisis mauris, vel aliquet enim. Nunc sodales, metus vitae pellentesque fermentum, tortor ex molestie elit, a pulvinar ante elit id ipsum. Curabitur venenatis et eros eu vestibulum. Maecenas vitae leo non risus varius eleifend. In quis aliquet neque. Mauris sagittis mi vel sagittis placerat.",
      },
      {
        text: "Vivamus quis magna tellus. Sed pellentesque mattis lorem, sit amet sagittis ligula ultrices ut. Maecenas ut enim cursus, tincidunt nisi eu, lacinia ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer sed turpis lobortis, placerat dui a, pulvinar nisi. Fusce in porta felis. Sed porta nunc et ex cursus, sed suscipit tortor placerat. Duis finibus tempus maximus. Maecenas nec tincidunt turpis. Aliquam erat volutpat. Integer nec nibh quis velit ullamcorper convallis.",
      },
      {
        text: "Vestibulum ultricies tempus porta. In nisi elit, lacinia id efficitur ut, tristique eu quam. Donec ultrices sodales quam ut viverra. In quis risus hendrerit urna ullamcorper suscipit sit amet a est. Curabitur nisl metus, convallis vel erat ut, eleifend tincidunt metus. Aenean non enim vitae neque pulvinar tempus ut at lectus. Nam egestas tempor turpis sed laoreet.",
      },
      {
        text: "Test images",
        images: [
          "https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/Qualification1.png",
          "https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/Qualification2.png",
          "https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/Qualification3.png",
        ],
        expectedOrder: { 0: 2, 1: 1, 2: 0 }, // no idea if this is correct, check against images
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
  ] = usePage(app);
  const [isApiCalled, setIsApiCalled] = useState(false);

  const getQuestionPages = async () => [{ text: "test page" }];

  const callApiAndUpdatePages = async () => {
    setIsApiCalled(true);
    const newPages = await getQuestionPages();
    addPages(newPages);
  };

  useEffect(() => {
    if (!isApiCalled) callApiAndUpdatePages();
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
    />
  );
}
