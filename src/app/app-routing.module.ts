import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'libros',
    loadChildren: () =>
      import('./module/books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'prestamos',
    loadChildren: () =>
      import('./module/loan/loan.module').then((m) => m.LoanModule),
  },
  { path: '', redirectTo: 'libros', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
