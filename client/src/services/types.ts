export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends LoginFormData {
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Storage {
  id: string;
  user: string;
  name: string;
  createdAt: string;
}

export type Unit = 'g' | 'ml' | 'pcs';

export interface Amount {
  total: number;
  unused: number;
  unit: Unit;
}

export interface Food {
  id: string;
  user: string;
  name: string;
  brand?: string;
  icon: string;
  amount: Amount;
  purchasedDate: string;
  expiredDate: string;
  storage: Omit<Storage, 'createdAt'>;
  createdAt: string;
  updatedAt: string;
  throwed?: boolean;
}

export interface FoodFormData {
  name: string;
  brand?: string;
  icon: string;
  amount: Amount;
  purchasedDate: string;
  expiredDate: string;
  storage: string;
  throwed?: boolean;
}
