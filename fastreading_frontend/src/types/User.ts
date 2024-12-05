export interface UserSignUpInputDTO {
    username: string;
    email: string;
    password: string;
}

export interface UserLoginInputDTO {
    email: string;
    password: string;
}