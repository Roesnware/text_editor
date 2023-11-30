import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // log for debug
  console.log('PUT to the database');

  // create connection db 
  const db = await openDB('jate', 1);

  // create new transaction in jate db 
  const tx = db.transaction('jate', 'readwrite');

  // open up object store
  const store = tx.objectStore('jate');

  // use the .put() method on the store and update in the content
  const req = store.put({ id: 1, value: content });

  // wait for request to finish 
  const res = await req;

  // log for debug
  console.log('Data saved to the database', res.value);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // log for debug 
  console.log('GET from the database');

  // connection to db
  const db = await openDB('jate', 1);

  // create new transaction in jate db 
  const tx = db.transaction('jate', 'readonly');

  // open up object store
  const store = tx.objectStore('jate');

  // use the .get() method on the store and get the content
  const req = store.get(1);

  // wait for request to finish 
  const res = await req;

  // check if theres data
  if (res) {
    console.log('Data found in database!', res.value)
    return res.value;
  } else {
    console.log('Data not found in database!');
    return;
  }
}

initdb();