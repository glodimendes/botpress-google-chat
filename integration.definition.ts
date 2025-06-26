import { IntegrationDefinition, z } from '@botpress/sdk'
import { integrationName } from './package.json'

export default new IntegrationDefinition({
  name: integrationName,
  title: 'ANYbotics Google Chat Integration',
  description: 'Google chat integration with standard in-thread replies.',
  version: '0.7.2',
  readme: 'hub.md',
  icon: 'file.svg',
  configuration: {
    schema: z.object({
      serviceAccountJson: z
        .string()
        .describe('Google service-account key (JSON) — store as a Secret'),
      defaultSpace: z
        .string()
        .describe('Default Google Chat space to post in')
    })
  },
  channels: {
    text: {
      conversation: {
        tags: {
          spaceId: { title: 'Space ID', description: 'The ID of the Google Chat space' },
          threadName: { title: 'Thread Name', description: 'The thread resource name for replies' }
        }
      },
      messages: {
        text: {
          schema: z.object({
            text: z.string(),

            thread: z.object({
              name: z.string()
                }).optional()
            })
        }
      }
    }
  },
  user: {
    tags: {
      id: { title: 'User ID', description: 'The ID of the user in Google Chat' }
    }
  }
})