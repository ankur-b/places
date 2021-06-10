import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('test.db');
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS places(id INTEGER PRIMARY KEY NOT NULL,title TEXT NOT NULL,imageUri TEXT NOT NULL,address TEXT NOT NULL,latitude REAL NOT NULL,longitude REAL NOT NULL);',
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
export const insertPlace = (title, imageUri, address, latitude, longitude) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO places (title,imageUri,address,lat,long) VALUES(?,?,?,?,?)',
        [title, imageUri, address, latitude, longitude],
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
