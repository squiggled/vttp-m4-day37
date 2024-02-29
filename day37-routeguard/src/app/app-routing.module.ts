import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form.component';
import { NoticeComponent } from './components/notice.component';
import { MainComponent } from './components/main.component';
import { canLeave, canProceed, canSuccess } from './guards';
import { SuccessComponent } from './components/success.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'notice', component: NoticeComponent },
  {
    path: 'form', component: FormComponent,
    canActivate: [canProceed],
    canDeactivate: [canLeave]
  },
  {path: 'success', component: SuccessComponent,
  canActivate: [canSuccess]
},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
