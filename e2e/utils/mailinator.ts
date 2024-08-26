import {
  MailinatorClient,
  GetInboxRequest,
  GetMessageRequest,
  DeleteInboxMessagesRequest
} from 'mailinator-client'
import {MAILINATOR_TOKEN, MAILINATOR_DOMAIN} from '@/support/constants'

export const getEmailVerificationLink = async (username: string) => {
  try {
    const mailinatorClient = new MailinatorClient(MAILINATOR_TOKEN)

    const {result} = await mailinatorClient.request(
      new GetInboxRequest(MAILINATOR_DOMAIN, username)
    )

    if (result.msgs.length === 0) {
      throw new Error("Couldn't find the registration mail")
    }

    const msgId = result.msgs[0].id

    const res = await mailinatorClient.request(
      new GetMessageRequest(MAILINATOR_DOMAIN, msgId)
    )
    const resultBody = res.result.parts[0].body
    const match = resultBody.match(
      /https:\/\/userflowtoolz\.com\/app\/email-registration\/([0-9a-fA-F-]{36})/
    )
    if (!match || match.length === 0) {
      throw new Error("Couldn't find the email registration link")
    }
    return match[0]
  } catch (e) {
    console.error(`Error fetching verification link from  inbox:`, e)
    throw new Error(
      'Mailinator: Could not fetch email verification link due to an unexpected error'
    )
  }
}

export const clearInbox = async (inboxName: string) => {
  try {
    const mailinatorClient = new MailinatorClient(MAILINATOR_TOKEN)

    const {statusCode} = await mailinatorClient.request(
      new DeleteInboxMessagesRequest(MAILINATOR_DOMAIN, inboxName)
    )
    if (statusCode !== 200) throw new Error('Mailinator: Couldnt clear inbox')
  } catch (e) {
    console.error(`Error clearing inbox ${inboxName}:`, e)
    throw new Error(
      'Mailinator: Could not clear inbox due to an unexpected error'
    )
  }
}
