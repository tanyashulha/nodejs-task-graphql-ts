import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';
import { UUIDType } from '../types/uuid.js';
import { GraphQLString } from 'graphql';
import { ChangeProfileInput, CreateProfileInput, Profile } from '../types/profile.js';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export interface ICreateProfile {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
}

export interface IChangeProfile {
    isMale?: boolean;
    yearOfBirth?: number;
    userId?: string;
    memberTypeId?: string;
}

export const ProfileMutationsFields = {
    createProfile: {
        type: Profile,
        args: { dto: { type: CreateProfileInput } },
        resolve(_, { dto }: { dto: ICreateProfile }, ctx: Context) {
           return ctx.prisma.profile.create({ data: dto });
        },
    },
    changeProfile: {
        type: Profile,
        args: { id: { type: UUIDType }, dto: { type: ChangeProfileInput } },
        resolve(_, { id, dto }: { id: string, dto: IChangeProfile }, ctx: Context) {
           return ctx.prisma.profile.update({ where: { id }, data: dto });
        },
    },
    deleteProfile: {
        type: GraphQLString,
        args: { id: { type: UUIDType }},
        resolve(_, { id }: { id: string }, ctx: Context) {
           return ctx.prisma.profile.delete({ where: { id } });
        },
    },
};