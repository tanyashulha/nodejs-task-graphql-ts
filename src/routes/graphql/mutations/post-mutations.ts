import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';
import { UUIDType } from '../types/uuid.js';
import { GraphQLString } from 'graphql';
import { ChangePostInput, CreatePostInput, Post } from '../types/post.js';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export interface ICreatePost {
    title: string;
    content: string;
    authorId: string;
}

export interface IChangePost {
    title?: string;
    content?: string;
    authorId?: string;
}

export const PostMutationsFields = {
    createPost: {
        type: Post,
        args: { dto: { type: CreatePostInput } },
        resolve(_, { dto }: { dto: ICreatePost }, ctx: Context) {
            return ctx.prisma.post.create({ data: dto });
        },
    },
    changePost: {
        type: Post,
        args: { id: { type: UUIDType }, dto: { type: ChangePostInput } },
        resolve(_, { id, dto }: { id: string, dto: IChangePost }, ctx: Context) {
            return ctx.prisma.post.update({ where: { id }, data: dto });
        },
    },
    deletePost: {
        type: GraphQLString,
        args: { id: { type: UUIDType } },
        async resolve(_, { id }: { id: string }, ctx: Context) {
            await ctx.prisma.post.delete({ where: { id } });
             return ''
        },
    },
};