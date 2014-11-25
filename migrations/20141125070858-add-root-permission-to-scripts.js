var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('script', 'rootPermission', {
    type: 'boolean'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('script', 'rootPermission', callback);
};
