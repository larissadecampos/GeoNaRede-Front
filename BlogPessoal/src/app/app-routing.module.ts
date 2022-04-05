import {TemaComponent} from './tema/tema.component';
import { InicioComponent} from './inicio/inicio.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

import { EntrarComponent } from './entrar/entrar.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';


//criando as rotas

const routes: Routes = [ 

  {path:'',redirectTo:'entrar', pathMatch:'full'},

  {path:'entrar', component: EntrarComponent},
 
  {path:'cadastrar', component: CadastrarComponent},

  {path: 'inicio', component:InicioComponent},

  {path: 'tema', component: TemaComponent},

  {path: 'tema-edit/:id', component:TemaEditComponent}, //parâmetro por rota

  {path: 'tema-delete/:id', component: TemaDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
