
function queryPromise(queryString, queryVars=[]) {
    return new Promise( (resolve, reject) => {
        dbPool.getConnection(function(err, connection) {
            connection.query(queryString, queryVars, (err, rows) => {
                if(err) return reject(err);
                resolve(rows);
            })
        connection.release();
        });
    });
};

export {queryPromise};
