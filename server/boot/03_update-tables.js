'use strict';

module.exports = updateTables;

//This will need to be removed when going to production
function updateTables(server, cb){
    console.log("Updating Tables");
    let datasource = server.datasources['mysql'];
    if(datasource.connected){
        datasource.autoupdate(function(){
            console.log("Done updating tables");
            cb();
        });
    } else {
        datasource.once('connected', function( ){
            datasource.autoupdate(function(){
                console.log("Done updating tables");
                cb();
            });
        })
    }
}