import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType,} from 'graphql';
import { MemberType } from './member-type.js';
import { UUIDType } from './uuid.js';
import { MemberIdType } from './member-id-type.js';
import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';
import { profileSchema } from '../../profiles/schemas.js';
import { Static } from '@sinclair/typebox';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export type ProfileType = Static<typeof profileSchema>;

export const Profile = new GraphQLObjectType<ProfileType, Context>({
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
            type: new GraphQLNonNull(MemberType),
            resolve(profile, _, ctx: Context) {
                return ctx.memeberType.load(profile.memberTypeId);
            },
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