import { createRouter } from './context';

export const leaderboardRouter = createRouter().query('getMonth', {
	async resolve({ ctx }) {
		return await ctx.prisma.murph.findMany({
			where: {
				start: {
					gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
				},
			},
			select: {
				user: true,
				start: true,
				firstSprintEndTime: true,
				exerciseEndTime: true,
				lastSprintEndTime: true,
			},
		});
	},
});
