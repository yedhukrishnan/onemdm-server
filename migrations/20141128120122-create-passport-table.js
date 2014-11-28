var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('passport', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    protocol: 'text',
    password: 'text',
    provider: 'text',
    identifier: 'text',
    tokens: 'json',
    user: 'integer',
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('passport', callback);
};
