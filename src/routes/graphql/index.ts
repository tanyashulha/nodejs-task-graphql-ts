import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import { getContext } from './utils/get-context.utils.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  const context = getContext(prisma);

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const errors = validate(gqlSchema, parse(query));

      if (errors?.length) return { errors };

      return graphql({
        source: query,
        schema: gqlSchema,
        variableValues: variables,
        contextValue: context,
      });
    },
  });
};

export default plugin;
