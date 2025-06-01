import cors from 'cors';

const whitelist = [
  'http://localhost:5173',
  'https://example.com', // Add your production domain here
];

const corsOptions = {
    origin : ( origin : string | undefined , callback : ( error : Error | null , success? : boolean ) => void ) =>   {
        console.log('CORS request from origin:', origin); // Debug log
        if (!origin || whitelist.indexOf( origin ) !== -1) {
            callback( null , true );
        } else {
            callback( new Error( 'Not allowed by CORS' ));
        }
    },
    methods : [ 'GET' , 'POST' , 'PUT' , 'DELETE' , 'OPTIONS' ] ,
    allowedHeaders : [
        'Content-Type' ,
        'Authorization',
        'X-Requested-With',
    ] ,
    exposedHeaders : [
        'X-Total-Count',
        'Content-Range',
    ],
    credentials : true,
    maxAge : 600 ,
    preflightContinue : false,
    optionsSuccessStatus : 204 ,
};

export default cors( corsOptions );