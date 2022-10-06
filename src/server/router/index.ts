import { createRouter } from './context';
import { protectedExampleRouter } from './protected-example-router';
import { protectedMurphRouter } from './murph';
// src/server/router/index.ts
import superjson from 'superjson';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('murph.', protectedMurphRouter)
	.merge('auth.', protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
