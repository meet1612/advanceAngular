import { LoginService } from "../login.service";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from 'rxjs/operators';
import { Customer } from "../login/customer";
import { Observable } from "rxjs";
export class CheckEmail {
  static emailcheck(x: LoginService): AsyncValidatorFn {

    return (c: AbstractControl): Observable<{ [s: string]: boolean } | null> => {
      return x.getCustomerById(c.value).pipe(
        map((res: Customer[]) => {
          if (res.length != 0) {
            return { 'invalidEmail': true };
          }
        })
      );
    }
  }
}
