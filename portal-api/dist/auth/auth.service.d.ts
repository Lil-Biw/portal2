import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
export declare class AuthService {
    private usuarioModel;
    private jwtService;
    constructor(usuarioModel: Model<any>, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        access_token: string;
        usuario: {
            id: any;
            nombre: any;
            email: any;
            rol: any;
        };
    }>;
}
