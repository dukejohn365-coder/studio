import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tasks: defineTable({
    userId: v.optional(v.string()),
    title: v.string(),
    description: v.optional(v.string()),
    tags: v.array(v.string()),
    priority: v.union(v.literal('low'), v.literal('medium'), v.literal('high')),
    deadline: v.union(v.null(), v.number()),
    status: v.union(v.literal('todo'), v.literal('in-progress'), v.literal('done')),
  }).index('by_user', ['userId']),
});
