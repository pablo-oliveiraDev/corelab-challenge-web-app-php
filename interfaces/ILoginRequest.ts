import {IRequestBase} from "@/interfaces/IRequestBase";

export interface ILoginRequest extends IRequestBase {
    body: {
        email: string;
        senha: string;
    }
}
