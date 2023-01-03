export interface Response<Type> {
  data: Type;
  message: string;
  status: boolean;
}
