import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  usuario:Usuario = new Usuario //construtor (objeto que recebe as variáveis)

  confirmarSenha: string

  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() { //responsável por iniciar a página
  }

  confirmeSenha(event:any){ //criando evento para pegar o valor das senhas
  this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  
 }
  cadastrarUsuario(){
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas precisam ser iguais!')
    }
    else{
      this.authService.Cadastrar(this.usuario).subscribe((resp:Usuario)=>{
        this.usuario=resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess("Cadastro realizado com sucesso!")
      })
        
    }

  }

}
