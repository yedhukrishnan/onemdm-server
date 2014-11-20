var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('script', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    device: 'integer',
    name: 'text',
    content: 'text',
    status: 'text',
    output: 'text',
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('script', callback);
};
