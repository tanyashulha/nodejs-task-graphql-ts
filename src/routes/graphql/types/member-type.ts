import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberIdType } from './member-id-type.js';

export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: {
        id: { 
            type: MemberIdType
        },
        discount: {
            type: GraphQLFloat
        },
        postsLimitPerMonth: {
            type: GraphQLInt
        },
    },
});