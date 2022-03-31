import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor
  (private html: HttpClient) { //métodos html

  }

  Entrar (userLogin: UserLogin): Observable<UserLogin>{
       
    return this.html.post<UserLogin>('http://localhost:8080/usuarios/logar', userLogin)

  }

  Cadastrar(usuario:Usuario):Observable<Usuario> { //model usuário
    
    return this.html.post<Usuario>('http://localhost:8080/usuarios/cadastrar',usuario);//variável usuário
    //heroko
  }

  logado(){
    let ok: boolean = false

    if (environment.token != ''){
      ok=true

    }

    return ok
  }

}
