import mongoose, { Schema, Model } from 'mongoose';
import { LinksList } from '@ps-ecommerce/types';

export type IFooterLinksModel = Model<LinksList>

const FooterLinksSchema = new Schema<LinksList, IFooterLinksModel>({
	title: String,
	links: [{
		name: String,
		href: String
	}]
});

const FooterLinksModel = mongoose.models.FooterLinks as IFooterLinksModel ||
	mongoose.model<LinksList, IFooterLinksModel>('FooterLinks', FooterLinksSchema);

export default FooterLinksModel;
