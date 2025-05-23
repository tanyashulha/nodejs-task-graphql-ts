import { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLInputObjectType } from 'graphql';
import { UUIDType } from './uuid.js'

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