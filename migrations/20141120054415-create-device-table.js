var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('device', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: 'text',
    lastSeen: 'timestamptz',
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('device', callback);
};
