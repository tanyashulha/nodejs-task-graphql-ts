import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Post } from '../types/post.js';

export const PostQueryFields = {
    post: {
        type: Post,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve(_, { id }: { id: string }, ctx) {
            return ctx.prisma.post.findUnique({
                where: { id }
            });
        },
    },
    posts: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
        resolve(_src, _, ctx) {
            return ctx.prisma.post.findMany();
        },
    },
}