import { Routes } from "@angular/router";
import { AutenticadoGuard } from "./guards/autenticado.guard";

export const appRotas: Routes =[
    {
        path:'login', loadChildren: ()=> import('./pages/login/login.module').then(x =>x.LoginModule)
    },
    {
        path:'player', loadChildren: ()=> import('./pages/player/player.module').then(x =>x.PlayerModule),
        canLoad: [AutenticadoGuard]
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    }
]