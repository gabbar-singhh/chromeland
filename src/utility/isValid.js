import { isEmpty } from 'lodash'

export function isValid(input_string) {

    if (isEmpty(input_string) && isEmpty(input_string.trim())) {
        return true;
    }

}