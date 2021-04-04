import { ErrorEnums } from './../errors/enums';
import { BadRequest } from '../errors';

export function TakeCare () {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
        const method = descriptor.value;
        descriptor.value = async function ( ...args ) {            
            try {                
                return await method.apply(this, args);                
            } catch (e) {                
                console.log("ERROR TakeCare[line:11] :: ", e.message);
                if (e.code === ErrorEnums.DUP_KEY_ERR) {
                    return BadRequest('Product with this itemCode has already existed in the system.')
                }

                if (e.message && e.message.includes('Cast to ObjectId failed')) {
                    return BadRequest('Product Id is invalid.')
                }

                return e;
            }
        }
    }
}