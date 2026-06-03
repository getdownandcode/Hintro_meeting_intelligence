declare namespace Express {
  export interface Request {
    traceId: string;
    user?: {
      id: string;
      email: string;
    };
  }
}
