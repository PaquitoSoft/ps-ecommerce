import type { Repository } from "@ps-ecommerce/shared-server";
import type { LinksList } from "@ps-ecommerce/types";

interface FooterLinkRepository extends Repository {
	findAll(): Promise<LinksList[]>;
};

export default FooterLinkRepository;
