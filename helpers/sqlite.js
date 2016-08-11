'use strict';

const dsn = process.env.SQLITE || ':memory:';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dsn);

/**
 * Queries to run on Startup
 *
 */
db.startup = function (fn) {
  process.nextTick(function () {
    db.serialize(function() {
      db.run(
        "CREATE TABLE IF NOT EXISTS settings (" +
        "  name TEXT," +
        "  value TEXT," +
        "  created_at INTEGER," +
        "  updated_at INTEGER" +
        ");"
      );

      db.run(
        "CREATE TABLE IF NOT EXISTS users (" +
        "  email TEXT," +
        "  name TEXT," +
        "  password TEXT," +
        "  created_at INTEGER," +
        "  updated_at INTEGER" +
        ");"
      );

      db.run(
        "CREATE TABLE IF NOT EXISTS links (" +
        "  slug TEXT," +
        "  dest TEXT," +
        "  is_enabled INTEGER," +
        "  user_rowid INTEGER," +
        "  created_at INTEGER," +
        "  updated_at INTEGER" +
        ");"
      );

      db.run(
        "CREATE TABLE IF NOT EXISTS clicks (" +
        "  link_rowid INTEGER," +
        "  ip_addr TEXT," +
        "  http_lang TEXT," +
        "  http_agent TEXT," +
        "  http_referer TEXT," +
        "  user_id INTEGER," +
        "  created_at INTEGER" +
        ");"
      );

      fn();
    });
  });
};

module.exports = db;
