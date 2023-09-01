import express from 'express';
import questionRoutes from './routes/questions.js'; 
import userRoutes from './routes/users.js'
import './config.js';
import logger from 'morgan'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './passport-config.js';


const app = express();

const corsOptions = {
  origin: 'https://paper-genie-client.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(logger('dev'));

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: true, // Set to true in production with HTTPS
      sameSite: 'none',
    }
  })
)

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/questions', questionRoutes);
app.use('/auth', userRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
