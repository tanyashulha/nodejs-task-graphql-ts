import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { memberTypeSchema } from '../member-types/schemas.js';
import { Static } from '@sinclair/typebox';
import { profileSchema } from '../profiles/schemas.js';
import { postSchema } from '../posts/schemas.js';
import { UserType } from './types/user.js';

export type PostType = Static<typeof postSchema>;

export const loader = (prisma: PrismaClient) => ({
    user: new DataLoader<string, UserType>(async (ids) => {
        const users = (await prisma.user.findMany({
            where: { id: { in: [...ids] } },
            include: { userSubscribedTo: true, subscribedToUser: true },
        })).reduce<Record<string, UserType>>((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});

        return ids.map((id) => users[id]);
    }),

    post: new DataLoader<string, Array<PostType>>(async (ids) => {
        const posts = (await prisma.post.findMany({
            where: { authorId: { in: [...ids] } }
        })).reduce<Record<string, Array<PostType>>>((acc, curr) => {
            acc[curr.authorId] = acc[curr.authorId] || [];
            acc[curr.authorId].push(curr);

            return acc;
        }, {});

        return ids.map((id) => posts[id]);
    }),

    profile: new DataLoader<string, Static<typeof profileSchema>>(async (ids) => {
        const profiles = (await prisma.profile.findMany({
            where: { userId: { in: [...ids] } },
        })).reduce<Record<string, Static<typeof profileSchema>>>((acc, curr) => {
            acc[curr.userId] = curr;
            return acc;
        }, {});

        return ids.map((id) => profiles[id]);
    }),

    memeberType: new DataLoader<string, Static<typeof memberTypeSchema>>(async (ids) => {
        const members = (await prisma.memberType.findMany({
            where: { profiles: { some: { memberTypeId: { in: [...ids] } }}}
        })).reduce<Record<string, Static<typeof memberTypeSchema>>>((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});

        return ids.map((id) => members[id]);
    }),
});