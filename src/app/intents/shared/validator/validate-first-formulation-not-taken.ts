import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IntentsService } from '../services/intents.service';

export class ValidateFirstFormulationNotTaken {

  static createValidator(service: IntentsService) {
    return (control: AbstractControl) => {
      const value = control.value.split(/\n+/)[0];
      return service.findAll().pipe(
        map(intents => {
          return intents && intents.filter(intent => intent.formulations[0] === value).length > 0
            ? {'firstFormulationTaken': true} : null;
        })
      );
    };
  }
}
