interface User {
  id: number;
}

interface DateParam {
  ISOFormat: string;
}

declare namespace Express {
  export interface Request {
    adminId?: number;
    user?: User;
    dateParam?: DateParam;
  }
}
