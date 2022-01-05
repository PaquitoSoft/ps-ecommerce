import FooterLinksModel from "../../orm/mongoose/models/footer-link-model";

import { LinksList } from "@ps-ecommerce/types";
import FooterLinkRepository from "../../../domain/footer-link/footer-link-repo";

const MongoFooterLinkRepository: FooterLinkRepository = {
	async findAll(): Promise<LinksList[]> {
		return FooterLinksModel.find();
	}
};

export default MongoFooterLinkRepository;
