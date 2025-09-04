import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { query } from './_generated/server';

export const listMyQuestion = query({
  args: {},
  returns: v.union(
    v.object({
      status: v.literal('Unauthenticated'),
    }),
    v.object({
      status: v.literal('Ok'),
      questions: v.array(v.object({ _id: v.id('question'), text: v.string() })),
    }),
  ),
  handler: async (ctx) => {
    const user = await getAuthUserId(ctx);
    if (!user) {
      return {
        status: 'Unauthenticated' as const,
      };
    }

    const questions = await ctx.db
      .query('question')
      .withIndex('bySendTo', (q) => q.eq('sendInfo.to', user))
      .collect();

    return {
      status: 'Ok' as const,
      questions: questions.map((q) => ({ _id: q._id, text: q.text })),
    };
  },
});
