import { v } from 'convex/values';
import { mutationWithAuth, queryWithAuth } from './withAuth';

export const get = queryWithAuth({
  handler: async (ctx) => {
    return await ctx.db
      .query('tasks')
      .withIndex('by_user', (q) => q.eq('userId', ctx.userId))
      .order('desc')
      .collect();
  },
});

export const add = mutationWithAuth({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    tags: v.array(v.string()),
    priority: v.union(v.literal('low'), v.literal('medium'), v.literal('high')),
    deadline: v.union(v.null(), v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('tasks', {
      ...args,
      userId: ctx.userId,
      status: 'todo',
    });
  },
});

export const update = mutationWithAuth({
  args: {
    id: v.id('tasks'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    priority: v.optional(v.union(v.literal('low'), v.literal('medium'), v.literal('high'))),
    deadline: v.optional(v.union(v.null(), v.number())),
  },
  handler: async (ctx, { id, ...rest }) => {
    const task = await ctx.db.get(id);
    if (!task || task.userId !== ctx.userId) {
      throw new Error('Task not found or you do not have permission to update it.');
    }
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutationWithAuth({
  args: { id: v.id('tasks') },
  handler: async (ctx, { id }) => {
    const task = await ctx.db.get(id);
    if (!task || task.userId !== ctx.userId) {
      throw new Error('Task not found or you do not have permission to delete it.');
    }
    await ctx.db.delete(id);
  },
});

export const toggleStatus = mutationWithAuth({
  args: { id: v.id('tasks') },
  handler: async (ctx, { id }) => {
    const task = await ctx.db.get(id);
    if (!task || task.userId !== ctx.userId) {
      throw new Error('Task not found or you do not have permission to update it.');
    }
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    await ctx.db.patch(id, { status: newStatus });
  },
});
