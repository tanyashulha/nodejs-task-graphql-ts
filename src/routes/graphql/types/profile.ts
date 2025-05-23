import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType,} from 'graphql';
import { MemberType } from './member-type.js';
import { UUIDType } from './uuid.js';
import { MemberIdType } from './member-id-type.js';

export const Profile = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        id: {
            type: UUIDType
        },
        isMale: {
            type: GraphQLBoolean
        },
        yearOfBirth: {
            type: GraphQLInt
        },
        memberType: {
            type: MemberType,
        },
    },
});

export const CreateProfileInput = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: {
        isMale: {
            type: GraphQLBoolean
        },
        yearOfBirth: {
            type: GraphQLInt
        },
        userId: {
            type: UUIDType
        },
        memberTypeId: {
            type: MemberIdType
        },
    },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: {
        isMale: {
            type: GraphQLBoolean
        },
        yearOfBirth: {
            type: GraphQLInt
        },
        memberTypeId: {
            type: MemberIdType
        },
    },
});