import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  ...authTables,

  question: defineTable({
    text: v.string(),
    sendInfo: v.object({
      to: v.id('user'),
    }),
    isReadByRecipient: v.boolean(),
  })
    .index('bySendTo', ['sendInfo.to'])
    .index('unreadByRecipient', ['sendInfo.to', 'isReadByRecipient']),

  user: defineTable({
    displayName: v.string(),
    authInfo: v.object({
      provider: v.string(),
      id: v.string(),
    }),
  }).index('byProviderAndId', ['authInfo.provider', 'authInfo.id']),
});
