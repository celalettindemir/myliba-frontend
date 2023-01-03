import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: async () => (await import('./pages/home/home.routes')).ROUTES,
  },
  {
    path: '**',
    loadComponent: async () => (await import('./pages/screens/not-found/not-found.page')).NotFoundPage,
  },
];
