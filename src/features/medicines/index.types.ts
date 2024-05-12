export interface MedicineType {
  _id: string;
  name: string;
  expire: Date | string;
  code: number;
  quantity: number;
  price: number;
  type: string;
  isHide: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
}

export interface MedicinesApiParamsType {
  page: number;
  limit: number;
  search: string;
  expire: string;
  price: string;
  quantity: string;
  code: string;
}
