import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/products/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { authGuard } from './core/guards/auth-guard.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { blankGuardGuard } from './core/guards/blank-guard.guard';

export const routes: Routes = [

    {path:"" ,redirectTo:'auth/login',pathMatch:"full"},

    {path:'auth',component:AuthLayoutComponent,canActivate:[blankGuardGuard],children:[
        {path:" " ,redirectTo:'login',pathMatch:"full"},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent},
        {path:'forget',component:ForgetPassComponent},
    ]},
    
    {path:'allorders',component:AllOrdersComponent},
    {path:'blank',component:BlankLayoutComponent,canActivate:[authGuard] ,children:[
        {path:" " ,redirectTo:'home',pathMatch:"full"},
        {path:'home',component:HomeComponent },
        {path:'details/:id',component:DetailsProductComponent },
        {path:'products',component:ProductComponent},
        {path:'cart',component:CartComponent},
        {path:'categories',component:CategoriesComponent},
        {path:'brands',component:BrandsComponent},
        {path:'wishList',component:WishListComponent},
        {path:'orders/:id',component:OrdersComponent},
       
       
    ]},

    

{path:'**',component:NotfoundComponent}
];
