import { google } from 'googleapis'
import * as bp from '.botpress'

export class GoogleChatClient {
  private chat: ReturnType<typeof google.chat>
  private ctx: bp.Context

  constructor(ctx: bp.Context) {
    const serviceAccount = JSON.parse(ctx.configuration.serviceAccountJson)
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/chat.bot']
    })

    this.chat = google.chat({ version: 'v1', auth })
    this.ctx = ctx
  }

  async listSpaces() {
    const response = await this.chat.spaces.list()
    return response.data
  }

  // create message to Google Chat API
  async sendMessage(spaceId: string, text: string, threadName?:string) {
    const cleanSpaceId = spaceId.replace(/^spaces\//, '')
    
    let requestBody: any = { text }
    let params: any = { parent: `spaces/${cleanSpaceId}`, requestBody }

    if (threadName){
    requestBody.thread = { name: threadName } // threadName should be full resource name
    params.messageReplyOption = 'REPLY_MESSAGE_OR_FAIL'
    }

  const response = await this.chat.spaces.messages.create(params)

  return response.data
  }
}

export const getClient = (ctx: bp.Context) => {
  return new GoogleChatClient(ctx)
}
