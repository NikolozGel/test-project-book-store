interface IBook {
  id: number;
  name: string;
  description: string;
  author: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface IFilter {
  name: string;
  description: string;
  author: string;
  category: string;
  price: number;
}

type TBooks = IBook[];
