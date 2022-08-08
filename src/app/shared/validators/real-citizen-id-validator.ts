import { AbstractControl } from '@angular/forms';

export function realCitizenIdValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value.length < 13) {
        return { 'minLength' : true };
    }

    if (control.value.length > 13) {
        return { 'maxLength': true };
    }

    if (control.value.length == 13) {
        let citizenId = control.value as string
        let reOrderIndex  = citizenId.split('').map((value, index) => { return [13 - index,(13  - index) * +value]}).map(vale => vale[1])
        let index13 = reOrderIndex.splice(12,1)
        let totalCal = reOrderIndex.reduce((acc,cur) => acc + cur,0)
        let fraction = totalCal % 11
        let conditionNumber = 11 - fraction
        if (conditionNumber > 9) {
            let firstDigi = conditionNumber.toString().split('')[1]
            if (+firstDigi == index13[0]) {
                return null;
            }
        }

        if (conditionNumber === index13[0]) {
            // console.log('1digi')
            return null;
        }

        if (conditionNumber !== index13[0]) {
            return { 'notReal': true }
        }
    }

    return { 'notReal': true }
}