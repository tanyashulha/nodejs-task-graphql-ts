import { GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Post } from '../types/post.js';
import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export const PostQueryFields = {
    post: {
        type: Post,
        args: { id: { type: UUIDType } },
        resolve(_, { id }: { id: string }, ctx: Context) {
            return ctx.prisma.post.findUnique({
                where: { id }
            });
        },
    },
    posts: {
        type: new GraphQLList(Post),
        resolve(_src, _, ctx: Context) {
            return ctx.prisma.post.findMany();
        },
    },
}