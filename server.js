import Koa from 'koa';
import logger from 'koa-logger';
import bodyparser from 'koa-better-body';
import serve from 'koa-static';
import convert from 'koa-convert';
import session from 'koa-generic-session';
import MongoStore from 'koa-generic-session-mongo';
import './lib/auth.js';
import passport from 'koa-passport';
import IO from 'koa-socket';
import routes from './routes';
import { resolve } from 'path';
import { keys, db } from './config';

const app = new Koa();
const io = new IO();

io.attach(app);


app.use(convert(bodyparser({
  uploadDir: 'public/uploads',
})));

app.keys = keys;
app.use(convert(session({ store: new MongoStore({ db }) })));

app.use(logger());
app.use(convert(serve(resolve(__dirname, './public'))));
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

export default app;
