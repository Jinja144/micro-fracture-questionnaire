import { SQSClient } from "@aws-sdk/client-sqs";
import { SendMessageCommand } from "@aws-sdk/client-sqs";

export default async function handler(req, res) {
  const {
    body: { imageId, modifier, passedTest, sessionId },
  } = req;

  const {
    AWS_QUEUE_REGION: region,
    AWS_QUEUE_URL: url,
  } = process.env;

  const sqsClient = new SQSClient({ region });

  const params = {
    DelaySeconds: 0,
    MessageAttributes: {
      Author: {
        DataType: "String",
        StringValue: "Fontend app",
      },
    },
    MessageBody: JSON.stringify({ imageId, modifier, passedTest, sessionId }),
    MessageDeduplicationId: new UUID,
    MessageGroupId: sessionId,
    QueueUrl: url
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    res.status(200);
  } catch (err) {
    res.status(400);
  }

  res.end();
}