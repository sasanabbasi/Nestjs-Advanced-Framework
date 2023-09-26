export interface IRead<T> {
    findAll: (session?: any) => any;
    findOne: (id: string, session?: any) => any;
}
