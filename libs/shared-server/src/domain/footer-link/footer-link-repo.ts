import { LinksList } from "@ps-ecommerce/types";
import Repository from '../repository';

interface FooterLinkRepository extends Repository {
	findAll(): Promise<LinksList[]>;
};

export default FooterLinkRepository;
