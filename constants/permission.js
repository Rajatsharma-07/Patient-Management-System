const Permission = Object.freeze({
    ALL: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    READ: ['GET'],
    CREATE: ['POST'],
    UPDATE: ['PUT', 'PATCH'],
    DELETE: ['DELETE']
});

const Routes = Object.freeze({
    PATIENT: 'patient',
    USERS: 'users',
    APPOINTMENT: 'appointment'
});

const AllowedPermission = Object.freeze({
    'Admin': [
        {
            route: Routes.PATIENT,
            access: [Permission.ALL]
        },
        {
            route: Routes.APPOINTMENT,
            access: [Permission.ALL]
        },
        {
            route: Routes.USERS,
            access: [Permission.ALL]
        }
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
            access: [Permission.ALL]
        },
    ]
});

module.exports = {Routes, Permission, AllowedPermission}