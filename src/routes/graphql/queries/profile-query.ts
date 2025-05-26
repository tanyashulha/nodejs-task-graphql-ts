import { GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Profile } from '../types/profile.js';
import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export const ProfileQueryFields = {
    profile: {
        type: Profile,
        args: { id: { type: UUIDType } },
        resolve(_, { id }: { id: string }, ctx: Context) {
            return ctx.prisma.profile.findUnique({
                where: { id }
            });
        },
    },
    profiles: {
        type: new GraphQLList(Profile),
        resolve(_src, _, ctx: Context) {
            return ctx.prisma.profile.findMany();
        },
    },
}