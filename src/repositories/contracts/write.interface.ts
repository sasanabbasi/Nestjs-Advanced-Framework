export interface IWrite<T> {
  create: (item: T, session?: any) => any;
  update: (_id: string, item: T, session?: any) => any;
  remove: (_id: any, session?: any) => any;
}
