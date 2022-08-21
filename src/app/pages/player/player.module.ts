import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { playerRoutes } from './player.routes';
import { PainelEsquerdoComponent } from './painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from './painel-esquerdo/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeUsuarioComponent } from './painel-esquerdo/rodape-usuario/rodape-usuario.component';
import { HomeComponent } from './home/home.component';
import { TopArtistaComponent } from './home/top-artista/top-artista.component';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(playerRoutes),
    FontAwesomeModule
  ]
})
export class PlayerModule { }
