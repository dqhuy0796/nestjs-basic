export class ResponseData<D> {
  result: D | D[];
  statusCode: number;
  message: string;

  constructor(result: D | D[], message: string, statusCode: number) {
    this.result = result;
    this.message = message;
    this.statusCode = statusCode;

    return this;
  }
}
