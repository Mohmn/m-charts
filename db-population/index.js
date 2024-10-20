import pg from "pg";
import data from './bar.json' assert { type: 'json' };

async function insertData() {
    const client = new pg.Client({
      user: 'user',
      host: 'localhost',
      database: 'mydatabase',
      password: 'password',
      port: 5435,
    });
  
    try {
      await client.connect();

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS demographics (
            id SERIAL PRIMARY KEY,
            day DATE NOT NULL,
            min_age INTEGER,
            max_age INTEGER,
            gender TEXT,
            A INTEGER,
            B INTEGER,
            C INTEGER,
            D INTEGER,
            E INTEGER,
            F INTEGER
            );
        `;
        await client.query(createTableQuery);
  
      for (const item of data) {
        const [day, month, year] = item.Day.split('-');
        const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // 'YYYY-MM-DD'
  
        let min_age = null;
        let max_age = null;
  
        if (item.Age.includes('-')) {
          const [min, max] = item.Age.split('-').map(Number);
          min_age = min;
          max_age = max;
        } else if (item.Age.startsWith('>')) {
          min_age = Number(item.Age.slice(1)) + 1;
          max_age = null;
        } else if (item.Age.startsWith('<')) {
          min_age = null;
          max_age = Number(item.Age.slice(1)) - 1;
        }
  
        const query = `
          INSERT INTO demographics (day, min_age, max_age, gender, A, B, C, D, E, F)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
  
        const values = [
          date,
          min_age,
          max_age,
          item.Gender,
          item.A,
          item.B,
          item.C,
          item.D,
          item.E,
          item.F
        ];
  
        await client.query(query, values);
      }
  
      console.log('Data inserted successfully.');
    } catch (err) {
      console.error('Error inserting data', err.stack);
    } finally {
      await client.end();
    }
  }
  
  insertData();