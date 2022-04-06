import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    usuario: Usuario = new Usuario()
    idUser: number
    confirmarSenha: string
    tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
  }

  this,this.idUser = this.route.snapshot.params['id']
  this.findByIdUser(this.idUser)

  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario)=>{
      this.usuario=resp
    })
  }

  confirmeSenha(event:any){ //criando evento para pegar o valor das senhas
    this.confirmarSenha = event.target.value
    }
  
  tipoUser(event: any){
      this.tipoUsuario = event.target.value
    
  }

  atualizar(){

    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmarSenha){
      alert('As senhas precisam ser iguais!')
    }
    else{
      this.authService.Cadastrar(this.usuario).subscribe((resp:Usuario)=>{
        this.usuario=resp
        this.router.navigate(['/inicio'])
        alert("Atualização realizada com sucesso, faça o login novamente.")
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
      })

    }

  }
}