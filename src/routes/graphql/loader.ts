import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const loader = (prisma: PrismaClient) => ({
    user: new DataLoader<string, User>(async (ids) => {
        const users = (await prisma.user.findMany({
            where: { id: { in: [...ids] } },
            include: { userSubscribedTo: true, subscribedToUser: true },
        })).reduce<Record<string, User>>((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});

        return ids.map((id) => users[id]);
    }),

    post: new DataLoader<string, Array<Post>>(async (ids) => {
        const posts = (await prisma.post.findMany({
            where: { authorId: { in: [...ids] } }
        })).reduce<Record<string, Array<Post>>>((acc, curr) => {
            acc[curr.authorId] = acc[curr.authorId] || [];
            acc[curr.authorId].push(curr);

            return acc;
        }, {});

        return ids.map((id) => posts[id]);
    }),

    profile: new DataLoader<string, Profile>(async (ids) => {
        const profiles = (await prisma.profile.findMany({
            where: { userId: { in: [...ids] } },
        })).reduce<Record<string, Profile>>((acc, curr) => {
            acc[curr.userId] = curr;
            return acc;
        }, {});

        return ids.map((id) => profiles[id]);
    }),

    memeberType: new DataLoader<string, MemberType>(async (ids) => {
        const members = (await prisma.memberType.findMany({
            where: { profiles: { some: { memberTypeId: { in: [...ids] } }}}
        })).reduce<Record<string, MemberType>>((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});

        return ids.map((id) => members[id]);
    }),
});