export type ErrorType = {
  code: string;
  message: string;
  response: {
    data: {
      error: string;
    },
    status: number
  }
}