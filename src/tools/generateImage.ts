import type { ToolFn } from '../../types'
import fetch from 'node-fetch'
import { z } from 'zod'
import { openai } from '../ai'

export const generateImageToolDefintion = {
  name: 'generate_image',
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        'The prompt to use to generate the image with a diffusion model image generator like Dall-E'
      ),
  }),
  description: 'Generate an image',
}

type Args = z.infer<(typeof generateImageToolDefintion)['parameters']>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1,
    size: '1024x1024',
  })

  const imageUrl = response.data[0].url!

  return imageUrl
}
