import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { openDatabase, SQLiteDatabase } from 'expo-sqlite';

async function openDb(): Promise<SQLiteDatabase> {
  const dbName = 'ferdousi.gdb';
  const dbAsset = require('../assets/db/ferdousi.gdb');
  const dbUri = Asset.fromModule(dbAsset).uri;

  const localDbUri = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(localDbUri);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, localDbUri);
  }

  return openDatabase(dbName);
}

const db = openDb();

export interface Category {
  id: number;
  poet_id: number;
  text: string;
  parent_id: number;
  url: string;
}

export async function getCategories(): Promise<Category[]> {
  const dbInstance = await db;
  return new Promise((resolve, reject) => {
    dbInstance.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cat',
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export default db;

export interface Poem {
  id: number;
  cat_id: number;
  title: string;
  url: string;
}

export interface Verse {
  poem_id: number;
  vorder: number;
  position: number;
  text: string;
}

export async function getPoemsByCategoryId(catId: number): Promise<Poem[]> {
  const dbInstance = await db;
  return new Promise((resolve, reject) => {
    dbInstance.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM poem WHERE cat_id = ?',
        [catId],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export async function getVersesByPoemId(poemId: number): Promise<Verse[]> {
  const dbInstance = await db;
  return new Promise((resolve, reject) => {
    dbInstance.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM verse WHERE poem_id = ? ORDER BY vorder',
        [poemId],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
