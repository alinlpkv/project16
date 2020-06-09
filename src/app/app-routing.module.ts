import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { WorkersModule } from './workers/workers.module';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path:'workers',
    loadChildren: ()=> 
    import('./workers/workers.module').then(m => m.WorkersModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
