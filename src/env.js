import dotenv from 'dotenv';

//// terminal-개발환경세팅

// $env:NODE_ENV='prod';
// $env:NODE_ENV='dev';

let envPath = '';
if (process.env.NODE_ENV === 'dev') envPath = '.env.dev';
else if (process.env.NODE_ENV === 'prod') envPath = `.env.prod`;
else envPath = '.env.dev';
dotenv.config({ path: envPath });

console.log('개발모드:', process.env.NODE_ENV);
