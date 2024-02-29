import { CanActivateFn, CanDeactivateFn, Router } from "@angular/router";
import { RouteService } from "./route.service";
import { inject } from "@angular/core";
import { FormComponent } from "./components/form.component";

export const canProceed: CanActivateFn = 
(_route, _state) => {
    const routeSvc = inject(RouteService);
    const router = inject(Router);
    if (routeSvc.proceed) return true;
    return router.parseUrl('/notice'); //direct to notice component

}

export const canLeave: CanDeactivateFn<FormComponent> = 
(comp, _route, _state) => {
    if (comp.hasProcessed && comp.form.valid) return true;
    //IF the form is valid, we DONT open the notif
    return confirm('You have not saved your data.\nAre you sure you want to leave?')
}


//if we have keyed in the form, we get to proceed to successpage. if not. 
export const canSuccess:CanActivateFn = 
(_route, _state) => {
    const routeSvc = inject(RouteService);
    const router = inject(Router);
    console.log("routevsc registered: ", routeSvc.registered);
    if (routeSvc.registered) return true;
    return router.parseUrl('/form');
}