import {IRequestBase} from "@/interfaces/IRequestBase";

export interface IRegisterRequest extends IRequestBase {
    body: {
        email: string;
        senha: string;
        senha_confirmation: string;
        nomeUser: string;
    }
}