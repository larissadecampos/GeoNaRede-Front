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
       
    return this.html.post<UserLogin>('https://geonarede.herokuapp.com/usuarios/logar', userLogin);

  }

  Atualizar(usuario:Usuario):Observable<Usuario> { //model usuário
    
    return this.html.put<Usuario>('https://geonarede.herokuapp.com/usuarios/atualizar',usuario); 
  }

  Cadastrar(usuario:Usuario):Observable<Usuario> { //model usuário
    
    return this.html.post<Usuario>('https://geonarede.herokuapp.com/usuarios/cadastrar',usuario);//variável usuário
    //heroko
  }

 getByIdUser(id:number): Observable<Usuario> {
    return this.html.get<Usuario>(`https://geonarede.herokuapp.com/usuarios/${id}`)
  }

  logado(){
    let ok: boolean = false

    if (environment.token != ''){
      ok=true

    }

    return ok
  }

  

}
