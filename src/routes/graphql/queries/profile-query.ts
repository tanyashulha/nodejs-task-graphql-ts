import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Profile } from '../types/profile.js';

export const ProfileQueryFields = {
    profile: {
        type: Profile,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve(_, { id }: { id: string }, ctx) {
            return ctx.prisma.profile.findUnique({
                where: { id }
            });
        },
    },
    profiles: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
        resolve(_src, _, ctx) {
            return ctx.prisma.profile.findMany();
        },
    },
}