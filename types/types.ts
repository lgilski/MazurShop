// const initialState = {
//   items: [],
//   products: [],
//   totalCost: 0,
//   showCart: false,
// };

export type WholeState = {
  cart: CartState;
  product: {
    products: ProductType[];
  };
};

export type CartState = {
  items: ItemType[];
  showCart: boolean;
};

export type ProductState = {
  products: ProductType[];
};

export type ItemType = {
  product: ProductType;
  quantity: number;
};

export type ProductType = {
  _id: string;
  name: string;
  slug: {
    current: string;
    _type: string;
  };
  price: number;
  discount: number;
  shouldBeOnTheBest: boolean;
  leftInStock: number;
  details: string;
  categories: { _ref: string; _type: string; _key: string }[];
  image: {
    _key: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }[];
};
