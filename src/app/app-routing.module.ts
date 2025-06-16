import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientesPage } from './clientes/clientes.page';
import { EmpresasPage } from './empresas/empresas.page';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { EmpresasCadastroComponent } from './cadastro-empresa/cadastro-empresa.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesPage },
  { path: 'empresas', component: EmpresasPage },
  { path: 'cadastro-clientes', component: CadastroClienteComponent },
  { path: 'editar-cliente/:index', component: CadastroClienteComponent },
  { path: 'cadastro-empresas', component: EmpresasCadastroComponent },
  { path: 'editar-empresa/:index', component: EmpresasCadastroComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}