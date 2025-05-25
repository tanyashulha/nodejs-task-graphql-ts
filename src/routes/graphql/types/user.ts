import { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { Post } from './post.js';
import { Profile } from './profile.js';

export const User = new GraphQLObjectType({
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
            resolve(user, _, ctx) {
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
            resolve(user, _, ctx) {
                if (user.userSubscribedTo) {
                    return ctx.user.loadMany(
                        user.userSubscribedTo.map(({ authorId }) => authorId),
                    );
                }
               return null;
            },
        },
        subscribedToUser: {
            type: new GraphQLList(User),
            resolve(user, _, ctx) {
                if (user.subscribedToUser) {
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