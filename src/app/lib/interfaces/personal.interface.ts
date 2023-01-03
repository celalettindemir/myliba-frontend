export interface Personal {
  id?:string;
  name: string;
  surname: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}
