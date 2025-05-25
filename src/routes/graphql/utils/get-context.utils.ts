import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export const getContext = (prisma: PrismaClient): Context => ({
    prisma,
    ...loader(prisma),
});