import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
};

export type Category = {
  __typename?: 'Category';
  code: Scalars['String'];
  id: Scalars['ID'];
  isHidden?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  subcategories?: Maybe<Array<Maybe<Category>>>;
};

export type ClosedCart = {
  __typename?: 'ClosedCart';
  code: Scalars['String'];
  deliveryCost?: Maybe<Scalars['Float']>;
  estimatedDeliveryDate: Scalars['BigInt'];
  id: Scalars['String'];
  items: Array<Maybe<ClosedCartItem>>;
  paymentData: PaymentData;
  placedDate: Scalars['BigInt'];
  shippingAddress: ShippingAddress;
  totalAmount: Scalars['Float'];
  totalUnits: Scalars['Int'];
  userId: Scalars['String'];
};

export type ClosedCartItem = {
  __typename?: 'ClosedCartItem';
  id: Scalars['ID'];
  product: ClosedCartItemProduct;
  quantity: Scalars['Int'];
};

export type ClosedCartItemProduct = {
  __typename?: 'ClosedCartItemProduct';
  code: Scalars['String'];
  colorName: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  sizeCode: Scalars['String'];
  sizeName: Scalars['String'];
};

export type Color = {
  __typename?: 'Color';
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
};

export type CreditCard = {
  __typename?: 'CreditCard';
  cardholder: Scalars['String'];
  pan: Scalars['String'];
};

export type FeaturedProducts = {
  __typename?: 'FeaturedProducts';
  newArrivals: Array<Maybe<Product>>;
  topSellers: Array<Maybe<Product>>;
  trending: Array<Maybe<Product>>;
};

export type FooterLink = {
  __typename?: 'FooterLink';
  links: Array<Maybe<LinkInfo>>;
  title: Scalars['String'];
};

export type LinkInfo = {
  __typename?: 'LinkInfo';
  href: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToShopCart?: Maybe<ShopCart>;
  addToWishlist?: Maybe<Wishlist>;
  checkout?: Maybe<ClosedCart>;
  removeFromShopCart?: Maybe<ShopCart>;
  removeFromWishlist?: Maybe<Wishlist>;
  saveShippingAddress?: Maybe<ShopCart>;
  updateInShopCart?: Maybe<ShopCart>;
};


export type MutationAddToShopCartArgs = {
  productCode: Scalars['String'];
  sizeCode: Scalars['String'];
};


export type MutationAddToWishlistArgs = {
  productId: Scalars['ID'];
};


export type MutationCheckoutArgs = {
  paymentData?: InputMaybe<NewPaymentData>;
};


export type MutationRemoveFromShopCartArgs = {
  orderItemId: Scalars['ID'];
};


export type MutationRemoveFromWishlistArgs = {
  productId: Scalars['ID'];
};


export type MutationSaveShippingAddressArgs = {
  shippingAddress?: InputMaybe<NewShippingAddress>;
};


export type MutationUpdateInShopCartArgs = {
  orderItemId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type NewCreditCard = {
  cardholder: Scalars['String'];
  cvv: Scalars['String'];
  expirationDate: Scalars['String'];
  pan: Scalars['String'];
};

export type NewPaymentData = {
  paymentDetails: NewCreditCard;
  paymentMethod: Scalars['String'];
};

export type NewShippingAddress = {
  addressLine: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  surname: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  code: Scalars['String'];
  deliveryCost?: Maybe<Scalars['Float']>;
  estimatedDeliveryDate: Scalars['BigInt'];
  id: Scalars['String'];
  items: Array<Maybe<OrderItem>>;
  paymentData: OrderPaymentData;
  placedDate: Scalars['BigInt'];
  shippingAddress: OrderShippingAddress;
  totalAmount: Scalars['Float'];
  totalUnits: Scalars['Int'];
  userId: Scalars['String'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID'];
  product: OrderItemProduct;
  quantity: Scalars['Int'];
};

export type OrderItemProduct = {
  __typename?: 'OrderItemProduct';
  code: Scalars['String'];
  colorName: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  sizeCode: Scalars['String'];
  sizeName: Scalars['String'];
};

export type OrderPaymentData = {
  __typename?: 'OrderPaymentData';
  paymentDetails: PaymentCreditCard;
  paymentMethod: Scalars['String'];
};

export type OrderShippingAddress = {
  __typename?: 'OrderShippingAddress';
  addressLine: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  surname: Scalars['String'];
};

export type PaginatedProductsResult = {
  __typename?: 'PaginatedProductsResult';
  products: Array<Maybe<Product>>;
  totalCount: Scalars['Int'];
};

export type PaymentCreditCard = {
  __typename?: 'PaymentCreditCard';
  cardholder: Scalars['String'];
  pan: Scalars['String'];
};

export type PaymentData = {
  __typename?: 'PaymentData';
  paymentDetails: CreditCard;
  paymentMethod: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  altName: Scalars['String'];
  categoryName: Scalars['String'];
  code: Scalars['String'];
  colorName: Scalars['String'];
  colors: Array<Maybe<Color>>;
  description?: Maybe<ProductDescription>;
  detailImages?: Maybe<Array<Maybe<Scalars['String']>>>;
  gridImages: Array<Maybe<Scalars['String']>>;
  id: Scalars['ID'];
  isPopular: Scalars['Boolean'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  seo?: Maybe<SeoInfo>;
  sizes?: Maybe<Array<Maybe<Size>>>;
  specs: Array<Maybe<Scalars['String']>>;
};

export type ProductDescription = {
  __typename?: 'ProductDescription';
  assetUrl?: Maybe<Scalars['String']>;
  subtitle: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  categoriesTree?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  featuredProducts: FeaturedProducts;
  footerLinks?: Maybe<Array<Maybe<FooterLink>>>;
  order?: Maybe<Order>;
  product?: Maybe<Product>;
  productsByCategory: PaginatedProductsResult;
  shopCart?: Maybe<ShopCart>;
  userLastOrder?: Maybe<Order>;
  userOrders: Array<Maybe<Order>>;
  wishlist?: Maybe<Wishlist>;
};


export type QueryCategoryArgs = {
  categoryCode: Scalars['String'];
};


export type QueryFeaturedProductsArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type QueryOrderArgs = {
  orderCode: Scalars['String'];
};


export type QueryProductArgs = {
  productCode: Scalars['String'];
};


export type QueryProductsByCategoryArgs = {
  categoryCode: Scalars['String'];
  count?: InputMaybe<Scalars['Int']>;
  randomValues?: InputMaybe<Scalars['Boolean']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type SeoInfo = {
  __typename?: 'SeoInfo';
  description: Scalars['String'];
  keywords: Scalars['String'];
  title: Scalars['String'];
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  addressLine: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  surname: Scalars['String'];
};

export type ShopCart = {
  __typename?: 'ShopCart';
  estimatedDeliveryCost: Scalars['Int'];
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<ShopCartItem>>>;
  shippingAddress?: Maybe<ShippingAddress>;
  totalAmount: Scalars['Int'];
  totalUnits: Scalars['Int'];
  userId: Scalars['String'];
};

export type ShopCartItem = {
  __typename?: 'ShopCartItem';
  id: Scalars['ID'];
  product: ShopCartProduct;
  quantity: Scalars['Int'];
};

export type ShopCartProduct = {
  __typename?: 'ShopCartProduct';
  code: Scalars['String'];
  colorName: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  sizeCode: Scalars['String'];
  sizeName: Scalars['String'];
};

export type Size = {
  __typename?: 'Size';
  availability: Scalars['String'];
  code: Scalars['String'];
  name: Scalars['String'];
};

export type Wishlist = {
  __typename?: 'Wishlist';
  id: Scalars['ID'];
  name: Scalars['String'];
  products?: Maybe<Array<Maybe<Product>>>;
  userId: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  ClosedCart: ResolverTypeWrapper<ClosedCart>;
  ClosedCartItem: ResolverTypeWrapper<ClosedCartItem>;
  ClosedCartItemProduct: ResolverTypeWrapper<ClosedCartItemProduct>;
  Color: ResolverTypeWrapper<Color>;
  CreditCard: ResolverTypeWrapper<CreditCard>;
  FeaturedProducts: ResolverTypeWrapper<FeaturedProducts>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  FooterLink: ResolverTypeWrapper<FooterLink>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LinkInfo: ResolverTypeWrapper<LinkInfo>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCreditCard: NewCreditCard;
  NewPaymentData: NewPaymentData;
  NewShippingAddress: NewShippingAddress;
  Order: ResolverTypeWrapper<Order>;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  OrderItemProduct: ResolverTypeWrapper<OrderItemProduct>;
  OrderPaymentData: ResolverTypeWrapper<OrderPaymentData>;
  OrderShippingAddress: ResolverTypeWrapper<OrderShippingAddress>;
  PaginatedProductsResult: ResolverTypeWrapper<PaginatedProductsResult>;
  PaymentCreditCard: ResolverTypeWrapper<PaymentCreditCard>;
  PaymentData: ResolverTypeWrapper<PaymentData>;
  Product: ResolverTypeWrapper<Product>;
  ProductDescription: ResolverTypeWrapper<ProductDescription>;
  Query: ResolverTypeWrapper<{}>;
  SeoInfo: ResolverTypeWrapper<SeoInfo>;
  ShippingAddress: ResolverTypeWrapper<ShippingAddress>;
  ShopCart: ResolverTypeWrapper<ShopCart>;
  ShopCartItem: ResolverTypeWrapper<ShopCartItem>;
  ShopCartProduct: ResolverTypeWrapper<ShopCartProduct>;
  Size: ResolverTypeWrapper<Size>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Wishlist: ResolverTypeWrapper<Wishlist>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  Category: Category;
  ClosedCart: ClosedCart;
  ClosedCartItem: ClosedCartItem;
  ClosedCartItemProduct: ClosedCartItemProduct;
  Color: Color;
  CreditCard: CreditCard;
  FeaturedProducts: FeaturedProducts;
  Float: Scalars['Float'];
  FooterLink: FooterLink;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LinkInfo: LinkInfo;
  Mutation: {};
  NewCreditCard: NewCreditCard;
  NewPaymentData: NewPaymentData;
  NewShippingAddress: NewShippingAddress;
  Order: Order;
  OrderItem: OrderItem;
  OrderItemProduct: OrderItemProduct;
  OrderPaymentData: OrderPaymentData;
  OrderShippingAddress: OrderShippingAddress;
  PaginatedProductsResult: PaginatedProductsResult;
  PaymentCreditCard: PaymentCreditCard;
  PaymentData: PaymentData;
  Product: Product;
  ProductDescription: ProductDescription;
  Query: {};
  SeoInfo: SeoInfo;
  ShippingAddress: ShippingAddress;
  ShopCart: ShopCart;
  ShopCartItem: ShopCartItem;
  ShopCartProduct: ShopCartProduct;
  Size: Size;
  String: Scalars['String'];
  Wishlist: Wishlist;
};

export type DeferDirectiveArgs = {
  if?: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
};

export type DeferDirectiveResolver<Result, Parent, ContextType = any, Args = DeferDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isHidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subcategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClosedCartResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClosedCart'] = ResolversParentTypes['ClosedCart']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  estimatedDeliveryDate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Array<Maybe<ResolversTypes['ClosedCartItem']>>, ParentType, ContextType>;
  paymentData?: Resolver<ResolversTypes['PaymentData'], ParentType, ContextType>;
  placedDate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  shippingAddress?: Resolver<ResolversTypes['ShippingAddress'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalUnits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClosedCartItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClosedCartItem'] = ResolversParentTypes['ClosedCartItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['ClosedCartItemProduct'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClosedCartItemProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClosedCartItemProduct'] = ResolversParentTypes['ClosedCartItemProduct']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sizeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sizeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Color'] = ResolversParentTypes['Color']> = {
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreditCard'] = ResolversParentTypes['CreditCard']> = {
  cardholder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pan?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeaturedProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeaturedProducts'] = ResolversParentTypes['FeaturedProducts']> = {
  newArrivals?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  topSellers?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  trending?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FooterLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['FooterLink'] = ResolversParentTypes['FooterLink']> = {
  links?: Resolver<Array<Maybe<ResolversTypes['LinkInfo']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkInfo'] = ResolversParentTypes['LinkInfo']> = {
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addToShopCart?: Resolver<Maybe<ResolversTypes['ShopCart']>, ParentType, ContextType, RequireFields<MutationAddToShopCartArgs, 'productCode' | 'sizeCode'>>;
  addToWishlist?: Resolver<Maybe<ResolversTypes['Wishlist']>, ParentType, ContextType, RequireFields<MutationAddToWishlistArgs, 'productId'>>;
  checkout?: Resolver<Maybe<ResolversTypes['ClosedCart']>, ParentType, ContextType, Partial<MutationCheckoutArgs>>;
  removeFromShopCart?: Resolver<Maybe<ResolversTypes['ShopCart']>, ParentType, ContextType, RequireFields<MutationRemoveFromShopCartArgs, 'orderItemId'>>;
  removeFromWishlist?: Resolver<Maybe<ResolversTypes['Wishlist']>, ParentType, ContextType, RequireFields<MutationRemoveFromWishlistArgs, 'productId'>>;
  saveShippingAddress?: Resolver<Maybe<ResolversTypes['ShopCart']>, ParentType, ContextType, Partial<MutationSaveShippingAddressArgs>>;
  updateInShopCart?: Resolver<Maybe<ResolversTypes['ShopCart']>, ParentType, ContextType, RequireFields<MutationUpdateInShopCartArgs, 'orderItemId' | 'quantity'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  estimatedDeliveryDate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType>;
  paymentData?: Resolver<ResolversTypes['OrderPaymentData'], ParentType, ContextType>;
  placedDate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  shippingAddress?: Resolver<ResolversTypes['OrderShippingAddress'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalUnits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['OrderItemProduct'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItemProduct'] = ResolversParentTypes['OrderItemProduct']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sizeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sizeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderPaymentDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderPaymentData'] = ResolversParentTypes['OrderPaymentData']> = {
  paymentDetails?: Resolver<ResolversTypes['PaymentCreditCard'], ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderShippingAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderShippingAddress'] = ResolversParentTypes['OrderShippingAddress']> = {
  addressLine?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedProductsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedProductsResult'] = ResolversParentTypes['PaginatedProductsResult']> = {
  products?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentCreditCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentCreditCard'] = ResolversParentTypes['PaymentCreditCard']> = {
  cardholder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pan?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentData'] = ResolversParentTypes['PaymentData']> = {
  paymentDetails?: Resolver<ResolversTypes['CreditCard'], ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  altName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categoryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colors?: Resolver<Array<Maybe<ResolversTypes['Color']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['ProductDescription']>, ParentType, ContextType>;
  detailImages?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  gridImages?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPopular?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seo?: Resolver<Maybe<ResolversTypes['SeoInfo']>, ParentType, ContextType>;
  sizes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Size']>>>, ParentType, ContextType>;
  specs?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductDescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductDescription'] = ResolversParentTypes['ProductDescription']> = {
  assetUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subtitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categoriesTree?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'categoryCode'>>;
  featuredProducts?: Resolver<ResolversTypes['FeaturedProducts'], ParentType, ContextType, Partial<QueryFeaturedProductsArgs>>;
  footerLinks?: Resolver<Maybe<Array<Maybe<ResolversTypes['FooterLink']>>>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderArgs, 'orderCode'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'productCode'>>;
  productsByCategory?: Resolver<ResolversTypes['PaginatedProductsResult'], ParentType, ContextType, RequireFields<QueryProductsByCategoryArgs, 'categoryCode'>>;
  shopCart?: Resolver<Maybe<ResolversTypes['ShopCart']>, ParentType, ContextType>;
  userLastOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  userOrders?: Resolver<Array<Maybe<ResolversTypes['Order']>>, ParentType, ContextType>;
  wishlist?: Resolver<Maybe<ResolversTypes['Wishlist']>, ParentType, ContextType>;
};

export type SeoInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeoInfo'] = ResolversParentTypes['SeoInfo']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  keywords?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingAddress'] = ResolversParentTypes['ShippingAddress']> = {
  addressLine?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopCartResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShopCart'] = ResolversParentTypes['ShopCart']> = {
  estimatedDeliveryCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShopCartItem']>>>, ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['ShippingAddress']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalUnits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopCartItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShopCartItem'] = ResolversParentTypes['ShopCartItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['ShopCartProduct'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopCartProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShopCartProduct'] = ResolversParentTypes['ShopCartProduct']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sizeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sizeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Size'] = ResolversParentTypes['Size']> = {
  availability?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WishlistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wishlist'] = ResolversParentTypes['Wishlist']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType;
  Category?: CategoryResolvers<ContextType>;
  ClosedCart?: ClosedCartResolvers<ContextType>;
  ClosedCartItem?: ClosedCartItemResolvers<ContextType>;
  ClosedCartItemProduct?: ClosedCartItemProductResolvers<ContextType>;
  Color?: ColorResolvers<ContextType>;
  CreditCard?: CreditCardResolvers<ContextType>;
  FeaturedProducts?: FeaturedProductsResolvers<ContextType>;
  FooterLink?: FooterLinkResolvers<ContextType>;
  LinkInfo?: LinkInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  OrderItemProduct?: OrderItemProductResolvers<ContextType>;
  OrderPaymentData?: OrderPaymentDataResolvers<ContextType>;
  OrderShippingAddress?: OrderShippingAddressResolvers<ContextType>;
  PaginatedProductsResult?: PaginatedProductsResultResolvers<ContextType>;
  PaymentCreditCard?: PaymentCreditCardResolvers<ContextType>;
  PaymentData?: PaymentDataResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductDescription?: ProductDescriptionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SeoInfo?: SeoInfoResolvers<ContextType>;
  ShippingAddress?: ShippingAddressResolvers<ContextType>;
  ShopCart?: ShopCartResolvers<ContextType>;
  ShopCartItem?: ShopCartItemResolvers<ContextType>;
  ShopCartProduct?: ShopCartProductResolvers<ContextType>;
  Size?: SizeResolvers<ContextType>;
  Wishlist?: WishlistResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  defer?: DeferDirectiveResolver<any, any, ContextType>;
};
