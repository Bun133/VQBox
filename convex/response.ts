import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const addResponse = mutation({
  args: {
    questionId: v.id('question'),
    text: v.string(),
  },
  returns: v.union(
    v.object({
      status: v.literal('Unauthenticated'),
    }),
    v.object({
      status: v.literal('QuestionNotFound'),
    }),
    v.object({
      status: v.literal('AlreadyAnswered'),
    }),
    v.object({
      status: v.literal('Ok'),
      responseId: v.id('response'),
    }),
  ),
  handler: async (ctx, { questionId, text }) => {
    const user = await getAuthUserId(ctx);
    if (!user) {
      return {
        status: 'Unauthenticated' as const,
      };
    }

    const question = await ctx.db.get(questionId);
    if (!question) {
      return {
        status: 'QuestionNotFound' as const,
      };
    }

    // Check if the question has already been answered
    const existingResponses = await ctx.db
      .query('response')
      .withIndex('byQuestion', (q) => q.eq('questionId', questionId))
      .collect();

    if (existingResponses.length > 0) {
      return {
        status: 'AlreadyAnswered' as const,
      };
    }

    const responseId = await ctx.db.insert('response', {
      questionId,
      text,
      responder: user,
    });

    return {
      status: 'Ok' as const,
      responseId,
    };
  },
});
0;
