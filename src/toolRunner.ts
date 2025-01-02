import type OpenAI from 'openai'
import {
  generateImage,
  generateImageToolDefintion,
} from './tools/generateImage'
import { dadJoke, dadJokeToolDefintion } from './tools/dadJoke'
import { reddit, redditToolDefintion } from './tools/reddit'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case generateImageToolDefintion.name:
      return generateImage(input)

    case dadJokeToolDefintion.name:
      return dadJoke(input)

    case redditToolDefintion.name:
      return reddit(input)

    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
