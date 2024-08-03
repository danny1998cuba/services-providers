export interface Provider {
    servicio: string;
    categoria: string;
    contacto: string;
    telefono: string;
    email: string;
    direccion: string;
}

export const providersMock: Provider[] = [
    {
        servicio: 'Seguros La Previsora',
        categoria: 'Categoria',
        contacto: 'John Doe',
        telefono: '+123 456 789 234',
        email: 'john.dow@mail.com',
        direccion: 'Caracas'
    },
    {
        servicio: 'Medicina General Ernesto',
        categoria: 'Categoria',
        contacto: 'John Doe',
        telefono: '+123 456 789 234',
        email: 'john.dow@mail.com',
        direccion: 'Miranda'
    },
    {
        servicio: 'Otro proveedor',
        categoria: 'Categoria',
        contacto: 'John Doe',
        telefono: '+123 456 789 234',
        email: 'john.dow@mail.com',
        direccion: 'Ubicacion'
    },
    {
        servicio: 'Name of the place',
        categoria: 'Categoria',
        contacto: 'John Doe',
        telefono: '+123 456 789 234',
        email: 'john.dow@mail.com',
        direccion: 'Location'
    },
    {
        servicio: 'Name of the place',
        categoria: 'Categoria',
        contacto: 'John Doe',
        telefono: '+123 456 789 234',
        email: 'john.dow@mail.com',
        direccion: 'Location'
    },
]