import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app';
//import { DashboardComponent } from './Component/Dashboard';
import { AccountComponent } from './Component/Account';
import { PostComponent } from './Component/Post';

//import { AddProductComponent } from './Component/AddProduct';
//import { Authorize } from './Security/Session/Authorize';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: AccountComponent },
    { path: 'post', component: PostComponent },
    //{ path: 'Dashboard', canActivate: [Authorize], component: DashboardComponent },
    //{ path: 'AddProduct', component: AddProductComponent },


    //{ path: "Sample", canActivate: [Authorize], component: SampleComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    //providers: [Authorize]

})

export class AppRoutingModule { }
export const routingComponents = [
 
    //DashboardComponent,
    AccountComponent,
    PostComponent
    //AddProductComponent
];