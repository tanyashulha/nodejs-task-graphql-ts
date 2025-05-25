import { GraphQLList, GraphQLNonNull } from 'graphql';
import { User } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';

export const UserQueryFields = {
    user: {
        type: User,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve(_, { id }: {id: string}, ctx) {
            return ctx.user.load(id);
        },
    },
    users: {
        type: new GraphQLList(User),
        async resolve(_src, _, ctx, info) {
            const { fields } = simplifyParsedResolveInfoFragmentWithType(parseResolveInfo(info) as ResolveTree, new GraphQLList(User));

            const users = await ctx.prisma.user.findMany({ include: {
                userSubscribedTo: 'userSubscribedTo' in fields && !!fields.userSubscribedTo,
                subscribedToUser: 'subscribedToUser' in fields && !!fields.subscribedToUser,
            }});

            return users.forEach((user) => ctx.user.prime(user.id, user));
        },
    },
}