import {
  customCtx,
  customMutation,
  customQuery,
} from 'convex-helpers/server/customFunctions';
import {
  query as baseQuery,
  mutation as baseMutation,
} from './_generated/server';
import type { Auth } from 'convex/server';

async function getUserId(ctx: { auth: Auth }) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error('Not authenticated');
  }
  return identity.subject;
}

const authCtx = customCtx(async (ctx) => {
  const userId = await getUserId(ctx);
  return { userId };
});

export const queryWithAuth = customQuery(baseQuery, authCtx);
export const mutationWithAuth = customMutation(baseMutation, authCtx);
