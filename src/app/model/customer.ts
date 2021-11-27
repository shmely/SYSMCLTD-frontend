

export interface Customer {
    id: number | null;
    isDeleted: Boolean;
    created: Date;
    name: string;
    customerNumber: number;
    contacts: Contact[];
    addresses: Address[];
}


export interface Address {
    id: number | null;
    isDeleted: Boolean;
    created: Date | null;
    customerId: number;
    city: string;
    street: string;
    
}

export interface Contact {
    id: number | null;
    isDeleted: Boolean;
    created: Date;
    customerId: number;
    fullName: string;
    officeNumber: string;

}