export interface Response<T> {
    data: T;
    success: Boolean;
    message: string;
}