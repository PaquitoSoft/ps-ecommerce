import { DataSource } from "apollo-datasource";
import { LinksList } from "@ps-ecommerce/types";
import FooterLinkRepository from "../../domain/footer-link-repo";
import FooterLinksModel from "../orm/mongoose/models/footer-link-model";

class MongoFooterLinkRepository extends DataSource implements FooterLinkRepository {
	async findAll(): Promise<LinksList[]> {
		return FooterLinksModel.find();
	}
};

export default MongoFooterLinkRepository;
