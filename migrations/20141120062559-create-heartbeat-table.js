var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('heartbeat', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    device: 'integer',
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz',
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('heartbeat', callback);
};
