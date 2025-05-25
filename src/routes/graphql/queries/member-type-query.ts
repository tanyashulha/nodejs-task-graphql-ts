import { GraphQLList, GraphQLNonNull } from 'graphql';
import { MemberType } from '../types/member-type.js';
import { MemberIdType } from '../types/member-id-type.js';

export const MemeberTypeQueryFields = {
    memberType: {
        type: MemberType,
        args: { id: { type: new GraphQLNonNull(MemberIdType) } },
        resolve(_, { id }: { id: string }, ctx) {
            return ctx.prisma.memberType.findUnique({
                where: { id } 
            });
        },
    },
    memberTypes: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
        resolve(_src, _, ctx) {
            return ctx.prisma.memberType.findMany();
        },
    },
}