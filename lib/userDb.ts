// import { openDatabase, SQLiteDatabase } from 'expo-sqlite';

// const dbName = 'user.db';

// async function openUserDb(): Promise<SQLiteDatabase> {
//   const db = openDatabase(dbName);

//   return new Promise((resolve, reject) => {
//     db.transaction(
//       tx => {
//         tx.executeSql(
//           `CREATE TABLE IF NOT EXISTS user_progress (
//             poem_id INTEGER PRIMARY KEY,
//             read_at TEXT NOT NULL,
//             points INTEGER NOT NULL
//           );`
//         );
//       },
//       error => {
//         reject(error);
//       },
//       () => {
//         resolve(db);
//       }
//     );
//   });
// }

// const userDb = openUserDb();

// export default userDb;

// export async function markPoemAsRead(poemId: number, points: number): Promise<void> {
//   const dbInstance = await userDb;
//   return new Promise((resolve, reject) => {
//     dbInstance.transaction(tx => {
//       tx.executeSql(
//         'INSERT INTO user_progress (poem_id, read_at, points) VALUES (?, ?, ?)',
//         [poemId, new Date().toISOString(), points],
//         () => {
//           resolve();
//         },
//         (_, error) => {
//           reject(error);
//           return false;
//         }
//       );
//     });
//   });
// }

// export async function getTotalPoints(): Promise<number> {
//   const dbInstance = await userDb;
//   return new Promise((resolve, reject) => {
//     dbInstance.transaction(tx => {
//       tx.executeSql(
//         'SELECT SUM(points) as total_points FROM user_progress',
//         [],
//         (_, { rows }) => {
//           resolve(rows._array[0].total_points || 0);
//         },
//         (_, error) => {
//           reject(error);
//           return false;
//         }
//       );
//     });
//   });
// }


// This is a mocked version of the user database module.

export async function markPoemAsRead(poemId: number, points: number): Promise<void> {
  console.log(`--- MOCK USER DB: Marking poem ${poemId} as read with ${points} points ---`);
  return Promise.resolve();
}

export async function getTotalPoints(): Promise<number> {
  console.log('--- MOCK USER DB: Getting total points ---');
  return Promise.resolve(1337); // Return a mock value
}

// The original file has a default export which is a promise.
// We can mock it like this.
const userDb = Promise.resolve(null);
export default userDb;
