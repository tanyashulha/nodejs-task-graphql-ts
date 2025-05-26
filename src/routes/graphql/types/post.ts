import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

export const Post = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {
            type: UUIDType
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
    },
});

export const CreatePostInput = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: {
        title: {
            type: GraphQLString,
        },
        content: {
            type: GraphQLString,
        },
        authorId: {
            type: UUIDType,
        },
    },
});

export const ChangePostInput = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: {
        title: {
            type: GraphQLString,
        },
        content: {
            type: GraphQLString,
        },
    },
});