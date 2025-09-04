import { query } from './_generated/server';

// for testing
export const listAllQuestion = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('question').take(100);
  },
});
