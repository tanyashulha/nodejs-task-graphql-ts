import { PrismaClient } from '@prisma/client';
import { loader } from '../loader.js';
import { ChangeUserInput, CreateUserInput, User } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { GraphQLString } from 'graphql';

export interface Context extends ReturnType<typeof loader> {
    prisma: PrismaClient;
}

export interface ICreateUser {
    name: string;
    balance: number;
}

export interface IChangeUser {
    name?: string;
    balance?: number;
}

export const UserMutationsFields = {
    createUser: {
        type: User,
        args: { dto: { type: CreateUserInput } },
        resolve(_, { dto }: { dto: ICreateUser}, ctx: Context) {
            return ctx.prisma.user.create({ data: dto });
        },
    },
    changeUser: {
        type: User,
        args: { id: { type: UUIDType }, dto: { type: ChangeUserInput } },
        resolve(_, { id, dto }: { id: string; dto: IChangeUser}, ctx: Context) {
            return ctx.prisma.user.update({ where: { id }, data: dto });
        },
    },
    deleteUser: {
        type: GraphQLString,
        args: { id: { type: UUIDType } },
        resolve(_, { id }: { id: string }, ctx: Context) {
            return ctx.prisma.user.delete({ where: { id } });
        },
    },
};