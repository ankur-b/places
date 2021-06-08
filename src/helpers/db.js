import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('test.db');
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS places(id INTEGER PRIMARY KEY NOT NULL,title TEXT NOT NULL,imageUri TEXT NOT NULL,address TEXT NOT NULL,lat REAL NOT NULL,long REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const insertPlace = (title, imageUri, address, lat, long) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO places (title,imageUri,address,lat,long) VALUES(?,?,?,?,?)',
        [title, imageUri, address, lat, long],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
