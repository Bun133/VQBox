import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

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

export const getQuestionById = query({
  args: {
    id: v.id('question'),
  },
  returns: v.union(
    v.object({
      status: v.literal('NotFound'),
    }),
    v.object({
      status: v.literal('Ok'),
      question: v.object({
        _id: v.id('question'),
        text: v.string(),
      }),
    }),
  ),
  handler: async (ctx, { id }) => {
    const question = await ctx.db.get(id);
    if (!question) {
      return {
        status: 'NotFound' as const,
      };
    }
    return {
      status: 'Ok' as const,
      question: { _id: question._id, text: question.text },
    };
  },
});

export const createQuestion = mutation({
  args: {
    sendTo: v.id('users'),
    text: v.string(),
  },
  returns: v.union(
    v.object({ status: v.literal('RecipientNotFound') }),
    v.object({
      status: v.literal('Ok'),
      questionId: v.id('question'),
    }),
  ),
  handler: async (ctx, { sendTo, text }) => {
    // Check if the recipient exists
    const questionRecipient = await ctx.db.get(sendTo);
    if (!questionRecipient) {
      return {
        status: 'RecipientNotFound' as const,
      };
    }

    const questionId = await ctx.db.insert('question', {
      text,
      sendInfo: { to: sendTo },
      isReadByRecipient: false,
    });

    return {
      status: 'Ok' as const,
      questionId,
    };
  },
});
