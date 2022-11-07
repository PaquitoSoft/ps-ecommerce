import { gql } from "@apollo/client";

import getFooterLinksAction from "../../../../application/use-cases/footer-link/get-footer-links";

import ApolloContext from '../apollo-context';

export const typeDef = gql`
	type LinkInfo {
		name: String!
		href: String!
	}

	type FooterLink {
		title: String!
		links: [LinkInfo]!
	}

	extend type Query {
		footerLinks: [FooterLink]
	}
`;

const getFooterLinks = async (
	_root: unknown,
	_args: unknown,
	context: ApolloContext
) => {
	const footerLinks = await getFooterLinksAction({
		footerLinkRepository: context.dataSources.footerLink
	});

	return footerLinks;
};

export const resolvers = {
	Query: { footerLinks: getFooterLinks }
};
