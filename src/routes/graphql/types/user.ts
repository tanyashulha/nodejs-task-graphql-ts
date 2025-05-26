import { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLInputObjectType, GraphQLList, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';
import { Post } from './post.js';
import { Profile } from './profile.js';
import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';
import { userSchema } from '../../users/schemas.js';
import { Static } from '@sinclair/typebox';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export type UserType = Static<typeof userSchema> & {
    userSubscribedTo?: {
        authorId: string;
        subscriberId: string;
    }[];
    subscribedToUser?: {
        authorId: string;
        subscriberId: string;
    }[];
};

export const User = new GraphQLObjectType<UserType, Context>({
    name: 'User',
    fields: (): Record<string, GraphQLFieldConfig<UserType, Context>>  => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
            resolve(user, _, ctx: Context) {
                return ctx.post.load(user.id);
            },
        },
        profile: {
            type: Profile,
            resolve(user, _, ctx) {
                return ctx.profile.load(user.id);
            },
        },
        userSubscribedTo: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
            resolve(user, _, ctx: Context) {
                if (!user?.userSubscribedTo) return null;
                return ctx.user.loadMany(
                    user.userSubscribedTo.map(({ authorId }) => authorId),
                );
            },
        },
        subscribedToUser: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
            resolve(user, _, ctx: Context) {
                if (!user?.subscribedToUser) return null;
                return ctx.user.loadMany(
                    user.subscribedToUser.map(({ subscriberId }) => subscriberId),
                );
            },
        },
    }),
});

export const CreateUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: {
        name: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        },
    },
});

export const ChangeUserInput = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: {
        name: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        },
    },
});