var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    username: {
      type: 'text',
      unique: true
    },
    email: {
      type: 'text',
      unique: true
    },
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
