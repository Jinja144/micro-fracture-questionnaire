import axios from "axios"
export default async function sendMessage(imageSrc, modifier, passedTest, sessionId) {
  const trimmedUrl = imageSrc.replace(".png", "")
  const imageId = trimmedUrl.match(/[0-9]+$/)[0]
  console.log("sending message: ", imageId, modifier, passedTest, sessionId)
  try {
    axios.post("/api/sendResponse",
      {
        imageId, modifier, passedTest, sessionId
      }
    );
  } catch (err) {
    console.log(err)
  }
}