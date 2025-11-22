import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { ListaEstudiantes } from './lista-estudiantes/lista-estudiantes';

export const routes: Routes = [
    { path: '', component: Inicio},
    { path: 'lista-estudiantes', component: ListaEstudiantes },
    { path: '**', redirectTo: '' }
];
