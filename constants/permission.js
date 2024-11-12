const Permission = {
    ALL: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    READ: ['GET'],
    CREATE: ['POST'],
    UPDATE: ['PUT', 'PATCH'],
    DELETE: ['DELETE']
}

const Routes = {
    PATIENT: 'patient',
    APPOINTMENT: 'appointment'
}

const AllowedPermission = {
    'Admin': [
        {
            route: Routes.PATIENT,
            access: [Permission.ALL]
        },
        {
            route: Routes.APPOINTMENT,
            access: [Permission.ALL]
        },
    ],
    'Doctor': [
        {
            route: Routes.PATIENT,
            access: [Permission.CREATE, Permission.READ, Permission.UPDATE]
        },
        {
            route: Routes.APPOINTMENT,
            access: [Permission.READ, Permission.UPDATE]
        },
    ],
    'Patient': [
        {
            route: Routes.PATIENT,
            access: [Permission.READ]
        },
        {
            route: Routes.APPOINTMENT,
            access: [Permission.CREATE]
        },
    ]
}

module.exports = {Routes, Permission, AllowedPermission}