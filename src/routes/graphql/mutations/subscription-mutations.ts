import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';
import { UUIDType } from '../types/uuid.js';
import { GraphQLString } from 'graphql';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export const SubscriptionMutationsFields = {
    subscribeTo: {
        type: GraphQLString,
        args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
        resolve(_, { userId, authorId }: { userId: string, authorId: string }, ctx: Context) {
            return ctx.prisma.user.update({ where: { id: userId }, data: {
                userSubscribedTo: { create: { authorId } }
            }});
        },
    },
    unsubscribeFrom: {
        type: GraphQLString,
        args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
        resolve(_, { userId, authorId }: { userId: string, authorId: string }, ctx: Context) {
            return ctx.prisma.subscribersOnAuthors.delete({  where: {
                subscriberId_authorId: { subscriberId: userId, authorId: authorId },
            }});
        },
    },
};