import { openDB } from 'idb';
 
const DATABASE_NAME = 'storyapp';
const DATABASE_VERSION = 2;
const OBJECT_STORE_NAME = 'saved-stories';
 
// const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
//   upgrade: (database) => {
//     if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
//       database.createObjectStore('saved-stories', {
//        keyPath: 'id', 
//       });
//     }
//   },
// });

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade: (database) => {
    if (database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      // Hapus object store yang ada
      database.deleteObjectStore(OBJECT_STORE_NAME);
    }
    // Buat ulang object store dengan keyPath
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});


const Database = {
  async putStory(story) {
  if (!story.id) throw new Error("Story must have an 'id'");
  return (await dbPromise).put(OBJECT_STORE_NAME, story); 
},

  async getStoryById(id) {
    if (!id) {
      throw new Error('`id` is required.');
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async removeStory(id) {
    if (!id) {
      throw new Error('`id` is required.');
    }
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },

};

export default Database;