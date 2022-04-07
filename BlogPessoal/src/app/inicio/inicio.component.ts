import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string
  themePost: string



  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  userId = environment.id
  usuario: Usuario = new Usuario()

  key = 'data'
  reverse = true



  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()


  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })

  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(this.userId).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }


  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.userId
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagens(this.postagem).subscribe(
      (resp: Postagem) => {
        this.postagem = resp
        this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
        this.postagem = new Postagem()
        this.getAllPostagens()
      })
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.getAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]
       )=> {
        this.listaPostagens = resp
      })
    }
  }
}