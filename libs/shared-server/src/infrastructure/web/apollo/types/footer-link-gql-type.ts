import { gql } from "@apollo/client";
import FooterLinkRepository from "../../../../domain/footer-link/footer-link-repo";
import { repositoryFactory, repositoryTypes } from '../../../../index';
import getFooterLinksAction from "../../../../application/use-cases/footer-link/get-footer-links";

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

const getFooterLinks = async () => {
	const footerLinkRepository = await repositoryFactory.build<FooterLinkRepository>(repositoryTypes.FooterLink);
	const footerLinks = await getFooterLinksAction({ footerLinkRepository });

	return footerLinks;
};

export const resolvers = {
	Query: { footerLinks: getFooterLinks }
};
