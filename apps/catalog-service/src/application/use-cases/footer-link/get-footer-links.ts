import FooterLinkRepository from "../../../domain/footer-link-repo";

function getFooterLinksAction(
	{ footerLinkRepository }: { footerLinkRepository: FooterLinkRepository }
) {
	return footerLinkRepository.findAll();
}

export default getFooterLinksAction;
