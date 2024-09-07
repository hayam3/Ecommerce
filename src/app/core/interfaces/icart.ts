
export interface Icart {
  _id: string;
  cartOwner: string;
  products: Product2[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface Product2 {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

 export interface Product {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}

export  interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export  interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}


export interface wishList {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  
  data:data2[];
 
  slug: string;
  description: string;
  quantity: number;
 
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
 
}

export interface data2 {
  imageCover: string;
  title: string;
  price: number;
  id: string;
  _id: string;
}

