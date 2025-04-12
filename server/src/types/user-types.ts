export interface ReqBodyRegisterUser {
    name: string;
    email: string;
    password: string;
}

export interface ReqBodyLoginUser {
    email: string;
    password: string;
}