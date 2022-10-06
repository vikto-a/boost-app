import { createProtectedRouter } from './context';
import { z } from 'zod';

export const protectedMurphRouter = createProtectedRouter()
	.mutation('create', {
		input: z.object({
			start: z.date(),
			firstSprintEndTime: z.date(),
			exerciseEndTime: z.date(),
			lastSprintEndTime: z.date(),
		}),
		async resolve({ input, ctx }) {
			return await ctx.prisma.murph.create({
				data: {
					...input,
					userId: ctx.session.user.id,
				},
			});
		},
	})
	.query('getMurphs', {
		async resolve({ ctx }) {
			return await ctx.prisma.murph.findMany({
				where: {
					userId: ctx.session.user.id,
				},
			});
		},
	})
	.query('getCount', {
		async resolve({ ctx }) {
			return await ctx.prisma.murph.aggregate({
				_count: true,
				where: {
					userId: ctx.session.user.id,
				},
			});
		},
	})
	.query('getTimes', {
		async resolve({ ctx }) {
			return await ctx.prisma.murph.findMany({
				where: {
					userId: ctx.session.user.id,
				},
				select: {
					start: true,
					lastSprintEndTime: true,
				},
			});
		},
	});
