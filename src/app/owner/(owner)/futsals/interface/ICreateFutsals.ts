// error respose
export interface ICreateFutsalError {
 data: {
  message: string;
  errors: {
   [key: string]: string;
  };
 };
}
// success response
export interface ICreateFutsalSuccess {
 message: string;
}
