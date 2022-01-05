import { gql } from "@apollo/client";
import { GraphQLScalarType } from "graphql";

export const typeDef = gql`
	scalar BigInt
`;

const BigIntScalarType = new GraphQLScalarType({
	name: 'BigInt',
	description: 'BigInt custom scalar type (for numbers greater than 32bits)',
	serialize: value => value as number,
	parseValue: value => value as number
});

export const resolvers = {
	BigInt: BigIntScalarType
};
