export type Attribute = {
  visible: boolean;
  name: string;
  options: string;
};

export type Product = {
  type: 'simple' | 'variable';
  description: string;
  price: number;
  categories: {
    id: number;
  }[];
  images: {
    src: string;
  }[];
  atttibutes: Attribute[];
};
