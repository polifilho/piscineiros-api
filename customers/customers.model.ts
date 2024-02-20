import * as mongoose from 'mongoose';
import { validateCPF } from '../common/validators';

export interface ICustomer extends mongoose.Document {
    providerId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    gender: string;
    cpf: string;
    address: string;
    phone: string;
}

const customersSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Provider'
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    cpf: {
        type: String,
        required: true,
        validate: {
            validator: validateCPF,
            message: 'invalid CPF ({VALUE})'
        }
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/
    },
}, 
{
    versionKey: false
})

export const Customers = mongoose.model<ICustomer>('Customers', customersSchema)
