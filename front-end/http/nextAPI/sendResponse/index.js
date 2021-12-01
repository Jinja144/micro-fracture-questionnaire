import axios from "axios"
export default async function sendMessage(imageSrc, modifier, passedTest, sessionId) {
  const trimmedUrl = imageSrc.replace(".png", "")
  const imageId = trimmedUrl.match(/[0-9]+$/)
  try {
    axios.post({
      url: "/api/sendResponse",
      data: {
        imageId, modifier, passedTest, sessionId
      }
    });
  } catch (err) {
    console.log(err)
  }
}