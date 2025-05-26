import { PostQueryFields } from './queries/post-query.js';
import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserQueryFields } from './queries/user-query.js';
import { ProfileQueryFields } from './queries/profile-query.js';
import { MemeberTypeQueryFields } from './queries/member-type-query.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...UserQueryFields,
      ...ProfileQueryFields,
      ...PostQueryFields,
      ...MemeberTypeQueryFields,
    },
  }),
});