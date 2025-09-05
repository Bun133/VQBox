import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  ...authTables,

  question: defineTable({
    text: v.string(),
    sendInfo: v.object({
      to: v.id('users'),
    }),
    isReadByRecipient: v.boolean(),
  })
    .index('bySendTo', ['sendInfo.to'])
    .index('unreadByRecipient', ['sendInfo.to', 'isReadByRecipient']),

  response: defineTable({
    questionId: v.id('question'),
    text: v.string(),
    responder: v.id('users'),
  }).index('byQuestion', ['questionId']),

  userInfo: defineTable({
    userId: v.id('users'),
    displayName: v.string(),
  }).index('byUserId', ['userId']),
});
