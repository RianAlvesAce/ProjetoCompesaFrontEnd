import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Teste1Component } from "./teste1/teste1.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teste1', component: Teste1Component }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}