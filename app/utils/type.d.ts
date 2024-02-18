import { ReactElement } from "react";

type carouselItem = {
  id: string | number;
  element: ReactElement;
};

type carouselItems = carouselItem[];

type image = {
  url: string;
  width: number;
  height: number;
};

type artwork = {
  image: image;
  href: string;
  name: string;
  id: string | number;
  filters?: string[];
};

type artworks = artwork[];

type artist = {
  id: string | number;
  name: string;
  profileImageUrl: image;
  coverImageUrl?: image;
  otherImages?: image[];
  products: artwork[];
  bio?: string;
  href?: string;
};

type artsists = artist[];

type filter = {
  type: string;
  values: {
    id: string | number;
    value: string;
  }[];
};

type filters = filter[];

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type singularFilter = {
  type: string;
  value: string;
};

type detailArtwork = {
  id: string | number;
  name: string;
  description: string;
  artist: {
    id: string | number;
    name: string;
  };
  images: image[];
  filters: singularFilter[];
};

type blogPost = {
  id: string | number;
  title: string;
  subtitle?: string;
  content: string;
  coverImage: image;
  thumbnail: image;
  images?: image[];
}
