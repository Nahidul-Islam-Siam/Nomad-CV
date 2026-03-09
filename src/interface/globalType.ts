export interface TBlog {
  image: {
    url: string;
    altText: string;
  };
  _id: string;
  title: string;
  content: string;
  author: string;
  email: string;
  isPublished: boolean;
  postDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  admin: {
    name: string;
    email: string;
  };
}

export interface Property {
  id: string;
  userId: string;
  cityId: string;
  propertyTypeId: string;
  lifestyleId: string;
  title: string;
  description: string;
  address: string;
  zipCode: string;
  lat: number;
  long: number;
  bedRooms: number;
  bathRooms: number;
  price: number;
  squareFeet: number;
  area: number;
  featureNames: string[];
  listingType: "BUY" | "RENT" | "SALE";
  developmentStatus: "NEW_DEVELOPMENT" | "DEVELOPED";
  createdAt: string;
  updatedAt: string;
  images: Array<{
    id: string;
    refId: string;
    refType: "PROPERTY";
    url: string;
    alt: string;
    createdAt: string;
    updatedAt: string;
  }>;
  Lifestyle: {
    id: string;
    lifestyle: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  PropertyType: {
    id: string;
    type: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  City: {
    id: string;
    cityName: string;
    country: {
      id: string;
      countryName: string;
    };
  };
}

export interface TPropertyResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: {
    locations: Array<{
      lat: number;
      long: number;
    }>;
    results: Array<Property>;
  };
}

export interface FormData {
  phone: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  region: string;
  country: string;
  presentAddress: string;
  permanentAddress: string;
  company: string;
  registrationId: string;
  nationalId: string;
  TaxId: string;
}

export interface TArea {
  id: number;
  areaName: string;
  title: string;
  images: string[];
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

export interface ContactInformationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  streetAddress: string;
  city?: string;
  postalCode?: string;
  streetProvinceRegion?: string;
  country?: string;
  agreement?: boolean;
}
