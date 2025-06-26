import * as bp from '.botpress'
import { getClient } from './client'


export const channels = {
  text: {
    messages: {
      text: async ({ctx, conversation, logger, payload}) => {
        const { spaceId } = conversation.tags
        
        
        if (!spaceId) {
          logger.forBot().error('Missing composite spaceId in conversation tags')
          return
        }
        const [actualSpaceId, threadName] = spaceId.split('|')

        if (!actualSpaceId) {
          logger.forBot().error('Missing spaceId in conversation tags')
          return
        }
        if (!threadName) {
          logger.forBot().error('Missing threadName in conversation tags')
          return
        }
        try {
          const googleClient = getClient(ctx)
          await googleClient.sendMessage(actualSpaceId, payload.text, threadName)
          
          logger.forBot().debug('Message sent to Google Chat:', {
            spaceId,
            message: payload.text,
          })
        } catch (error) {
          logger.forBot().error('Failed to send message to Google Chat:', error)
        }
      }
    }
  }
} satisfies bp.IntegrationProps['channels']
