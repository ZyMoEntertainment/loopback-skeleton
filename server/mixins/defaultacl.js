module.exports = function(Model, options) {
    //These will allow authenticated users to do stuff, and deny any non-users from doing stuffz
    let acls = [
        {
            accessType: '*',
            principalType: 'ROLE',
            principalId: '$everyone',
            permission: 'DENY'
        },
        {
            accessType: '*',
            principalType: 'ROLE',
            principalId: '$authenticated',
            permission: 'ALLOW'
        }, {
            accessType: 'READ',
            principalType: 'ROLE',
            principalId: 'superadmin',
            permission: 'ALLOW'
        }, {
            accessType: 'WRITE',
            principalType: 'ROLE',
            principalId: 'superadmin',
            permission: 'ALLOW'
        }, {
            accessType: 'EXECUTE',
            principalType: 'ROLE',
            principalId: 'superadmin',
            permission: 'ALLOW'
        }];

    Model.settings.acls = Model.settings.acls.concat(acls);

    if (process.env.TRACE_ACL && process.env.TRACE_ACL.toLowerCase() === Model.definition.name.toLowerCase()) {
        console.log(Model.definition.name, 'acls:', JSON.stringify(Model.settings.acls, null, 2));
    }
};

