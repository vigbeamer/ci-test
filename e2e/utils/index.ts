import {
  MailinatorClient,
  GetInboxRequest,
  GetMessageRequest,
} from "mailinator-client";
import { MAILINATOR_TOKEN, MAILINATOR_DOMAIN } from "@/support/constants.ts";

export const getEmailVerificationLink = async (username) => {
  const mailinatorClient = new MailinatorClient(MAILINATOR_TOKEN);

  const { result } = await mailinatorClient.request(
    new GetInboxRequest(MAILINATOR_DOMAIN, username)
  );

  if (result.msgs.length === 0) {
    throw new Error("Couldn't find the email");
  }

  const msgId = result.msgs[0].id;

  const res = await mailinatorClient.request(
    new GetMessageRequest("team769733.testinator.com", msgId)
  );
  const resultBody = res.result.parts[0].body;
  console.log("resultBody", resultBody);

  const match = resultBody.match(
    /https:\/\/userflowtoolz\.com\/app\/email-registration\/([0-9a-fA-F-]{36})/
  );

  if (!match) {
    throw new Error("Couldn't find the email registration link");
  }
  return match[0];
};
