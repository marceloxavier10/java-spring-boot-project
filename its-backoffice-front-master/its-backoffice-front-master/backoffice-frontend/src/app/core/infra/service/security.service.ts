import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SecurityConstants } from '../../model/security-constants.model';
import { User } from '../../model/user.model';
import { ToastrCustomService } from '../../toastr/toastr.service';
import { HttpConnectionBuilder } from '../http/http-connection.builder';
import { ExpirationDateService } from './expiration-date.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class SecurityService {

    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private http: HttpClient,
        private router: Router,
        private localStorageService: LocalStorageService,
        private expirationDateService: ExpirationDateService,
        private toastrService: ToastrCustomService
    ) {}

    public login(user: any) {
        return new HttpConnectionBuilder<any>(this.http)
            .addEndPoint('login')
            .addHandlerSucess((response: HttpResponse<any>) => {
                console.log(response);
                this.refreshToken(response); // Atualiza o token após login bem-sucedido
                this.router.navigate(['home']);
            })
            .addHandlerError(error => {
                console.log(error);
                this.toastrService.showWarningMessage('Login ou Senha Incorretas');
            })
            .addParameter(user)
            .buildPost();
    }

	public refreshToken(response: HttpResponse<any>): void {
		// Verifica se response.headers está definido
		if (response && response.headers) {
			// Obtém o valor do cabeçalho de autenticação
			const header = response.headers.get(SecurityConstants.AUTH_HEADER);

			if (header) {
				// Armazena o token no localStorage
				this.localStorageService.push(SecurityConstants.TOKEN_KEY, header);

				// Decodifica o token
				const user = this.decodeToken();
				if (user) {
					// Armazena o usuário no localStorage
					this.localStorageService.push(SecurityConstants.USER, user);

					// Atualiza a data de expiração do token
					this.updateExpirationDate();
				} else {
					console.warn("Falha ao decodificar o token. Usuário não será armazenado.");
				}
			} else {
				console.info("Nenhum token presente. Continuando sem autenticação.");
			}
		} else {
			console.error("Os cabeçalhos da resposta estão indefinidos ou a resposta é inválida.");
		}

		// Lógica continua normalmente
		// this.router.navigate(['home']);
	}

    public updateExpirationDate(): void {
        const expirationDate = this.getExpirationDate();
        if (expirationDate) {
            this.expirationDateService.updateDate(expirationDate);
        }
    }

    public getExpirationDate(): Date {
        const token = this.tokenKey;
        if (token) {
            return this.jwtHelper.getTokenExpirationDate(token);
        }
        return null;
    }

    public logoutExpiratedSession(): void {
        this.toastrService.showInfoMessage('Sua Sessão Expirou!');
        this.logout();
    }

    public logout(): void {
        this.expirationDateService.updateDate(null);
        this.localStorageService.clearAll();
        this.router.navigate(['']);
    }

    public hasAuthority(authority: string): boolean {
        const user = this.decodeToken();
        if (user && user.authorities) {
            return user.authorities.includes(authority);
        }
        return false;
    }

    public hasAnyAuthority(authorities: string[]): boolean {
        const user = this.decodeToken();
        if (user && user.authorities) {
            return authorities.some(authority => user.authorities.includes(authority));
        }
        return false;
    }

    public decodeToken(): User | null {
        const token = this.tokenKey;
        if (!token) {
            console.info("Nenhum token disponível para decodificação.");
            return null;
        }

        try {
            const userAuth = this.jwtHelper.decodeToken(token);
            if (!userAuth || !userAuth.sub) {
                console.warn("Token inválido ou sem o campo 'sub'.");
                return null;
            }

            const user: User = { ...userAuth, username: userAuth.sub };
            return user;
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            return null;
        }
    }

   public isTokenExpired(): boolean {
       const token = this.tokenKey;

       // Se não há token, significa que o usuário não está autenticado, não que a sessão expirou
       if (!token) {
           return false; // Retorna 'false' para permitir que o sistema continue sem token
       }

       // Se houver token, verifica se ele está expirado
       return this.jwtHelper.isTokenExpired(token);
   }


    public clearAll(): void {
        this.localStorageService.clearAll();
    }

    get tokenKey(): string | null {
        return this.localStorageService.pull(SecurityConstants.TOKEN_KEY);
    }

    get token(): any {
        const token = this.tokenKey;
        if (token) {
            return this.jwtHelper.decodeToken(token);
        }
        return null;
    }
}
