// eslint-disable-next-line import/prefer-default-export
export enum Status {
    INIT,
    BUSY,
    DONE,
}

export interface ErrorInfo {
    title: string;
    message: string;
}
