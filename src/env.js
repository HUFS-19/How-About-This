import dotenv from 'dotenv';

//npm run prod: AWS 리소스 사용
//npm run dev: 로컬 리소스 사용

let envPath = '';
if (process.env.NODE_ENV === 'dev') envPath = '.env.dev';
else if (process.env.NODE_ENV === 'prod') envPath = `.env.prod`;
else envPath = '.env.dev';
dotenv.config({ path: envPath });

console.log('개발모드:', process.env.NODE_ENV);
