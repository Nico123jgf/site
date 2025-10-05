export enum Platform {
  Steam = 'steam',
  Epic = 'epic',
}

export interface GameDeal {
  id: number;
  title: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  dealUrl: string;
}