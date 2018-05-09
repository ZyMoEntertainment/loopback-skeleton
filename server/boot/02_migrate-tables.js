'use strict';

module.exports = migrateTables;

//This will need to be removed when going to production
function migrateTables(server, cb){
    if(!server.get('wipeTables') && process.env.WIPETABLES !== 'true') {
        console.log('Not wiping Tables');
        return cb();
    } else {
        console.log("Wiping Tables");
        let datasource = server.datasources['mysql'];
        if(datasource.connected){
            datasource.automigrate(function(){
                console.log("Done migrating tables");
                cb();
            });
        } else {
            datasource.once('connected', function( ){
                datasource.automigrate(function(){
                    console.log("Done migrating tables");
                    cb();
                });
            })
        }
    }


}