export {};

declare global {
    namespace Express {
        export interface Request {
            user?: User;
            dateParam?: DateParam
        }
    }
}

interface User {
    id: number;
}

interface DateParam {
  ISOFormat: string;
}
