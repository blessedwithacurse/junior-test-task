export type AdType = {
  id: number;
  user: number;
  title: string;
  views: string;
  price: number;
  city_name: string;
  created_at: Date;
  description: string;
  district_name: string;
  images: [
    {
      id: number;
      thumbnail: string;
      image: string;
      user: number;
    }
  ]
}