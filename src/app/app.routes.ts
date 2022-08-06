import { Routes } from "@angular/router";

export const appRotas: Routes =[
    {
        path:'login', loadChildren: ()=> import('./pages/login/login.module').then(x =>x.LoginModule)
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    }
]