import type { ToolFn } from '../../types'
import fetch from 'node-fetch'
import { z } from 'zod'

export const redditToolDefintion = {
  name: 'reddit',
  parameters: z.object({}),
  description: 'Get the latest posts from Reddit',
}

type Args = z.infer<(typeof redditToolDefintion)['parameters']>

export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { data } = await fetch('https://www.reddit.com/r/nhl/.json').then(
    (res) => res.json()
  )

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}