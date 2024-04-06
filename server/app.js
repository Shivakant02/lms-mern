import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middleware/error.middleware.js';
import morgan from 'morgan';
import courseRoutes from './routes/course.routes.js'
const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(morgan('dev'))

app.use(cookieParser());


app.use('/ping', (req, res) => {
    res.send('pong')
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/courses', courseRoutes)

app.use('/', (req,res) => {
    res.status(201).json({
        success: true,
        message:'Hello Ji kaise ho?'
    }
        
    );
})
app.all('*', (req,res) => {
    res.status(404).send('OOPS! 404 page not found')
})

app.use(errorMiddleware);

export default app;