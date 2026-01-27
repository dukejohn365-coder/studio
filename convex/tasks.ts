import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query('tasks').order('desc').collect();
  },
});

export const add = mutation({
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
      status: 'todo',
    });
  },
});

export const update = mutation({
  args: {
    id: v.id('tasks'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    priority: v.optional(v.union(v.literal('low'), v.literal('medium'), v.literal('high'))),
    deadline: v.optional(v.union(v.null(), v.number())),
  },
  handler: async (ctx, { id, ...rest }) => {
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const toggleStatus = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, { id }) => {
    const task = await ctx.db.get(id);
    if (task) {
      const newStatus = task.status === 'done' ? 'todo' : 'done';
      await ctx.db.patch(id, { status: newStatus });
    }
  },
});
