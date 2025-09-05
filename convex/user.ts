import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { query } from './_generated/server';

export const getMyUserInfo = query({
  args: {},
  returns: v.union(
    v.object({
      status: v.literal('Unauthenticated'),
    }),
    v.object({
      status: v.literal('InfoNotFound'),
    }),
    v.object({
      status: v.literal('Ok'),
      displayName: v.string(),
    }),
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        status: 'Unauthenticated' as const,
      };
    }

    const userInfo = await ctx.db
      .query('userInfo')
      .withIndex('byUserId', (q) => q.eq('userId', userId))
      .first();

    if (!userInfo) {
      return {
        status: 'InfoNotFound' as const,
      };
    }

    return {
      status: 'Ok' as const,
      displayName: userInfo.displayName,
    };
  },
});

export const getUserInfoById = query({
  args: {
    userId: v.id('users'),
  },
  returns: v.union(
    v.object({
      status: v.literal('InfoNotFound'),
    }),
    v.object({
      status: v.literal('Ok'),
      displayName: v.string(),
    }),
  ),
  handler: async (ctx, { userId }) => {
    const userInfo = await ctx.db
      .query('userInfo')
      .withIndex('byUserId', (q) => q.eq('userId', userId))
      .first();

    if (!userInfo) {
      return {
        status: 'InfoNotFound' as const,
      };
    }

    return {
      status: 'Ok' as const,
      displayName: userInfo.displayName,
    };
  },
});

export const listRandomUsers = query({
  args: {},
  returns: v.union(
    v.object({
      status: v.literal('Ok'),
      users: v.array(
        v.object({ userId: v.id('users'), displayName: v.string() }),
      ),
    }),
  ),
  handler: async (ctx) => {
    const users = await ctx.db.query('userInfo').take(100);

    return {
      status: 'Ok' as const,
      users: users.map((user) => ({
        userId: user.userId,
        displayName: user.displayName,
      })),
    };
  },
});
