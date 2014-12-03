var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('passport', 'accessToken', {
    type: 'text'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('passport', 'accessToken', callback);
};
