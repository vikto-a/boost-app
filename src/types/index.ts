import { User } from '@prisma/client';

export type Color = 'red' | 'green' | 'yellow' | 'blue' | 'purple';
export type MurphWithUser = {
	user: User;
	start: Date;
	firstSprintEndTime: Date;
	exerciseEndTime: Date;
	lastSprintEndTime: Date;
};
