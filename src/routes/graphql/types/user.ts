import { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
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
    fields: () => ({
        id: {
            type: UUIDType
        },
        name: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        },
        posts: {
            type: new GraphQLList(Post),
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
            type: new GraphQLList(User),
            resolve(user, _, ctx: Context) {
                if (user?.userSubscribedTo) {
                    return ctx.user.loadMany(
                        user.userSubscribedTo.map(({ authorId }) => authorId),
                    );
                }
               return null;
            },
        },
        subscribedToUser: {
            type: new GraphQLList(User),
            resolve(user, _, ctx: Context) {
                if (user?.subscribedToUser) {
                    return ctx.user.loadMany(
                        user.subscribedToUser.map(({ subscriberId }) => subscriberId),
                    );
                }
                return null;
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