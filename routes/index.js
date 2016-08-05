import Router from 'koa-router';
import Upload from '../models/Upload';
import { createReadStream } from 'fs';


function isAuth(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next();
  }
  ctx.status = 401;
}


function routes(app, passport) {
  const router = new Router();

  app.io.on('connection', (ctx, data) => {
  });
  app.io.on('uploadFile', (ctx) => {
    app.io.broadcast('uploadFile', ctx.data);
  });

  router.post('/upload', ctx => {
    const path = ctx.request.files.file.path;
    const comment = ctx.request.fields.comment;
    const uploadedAt = new Date();
    const upload = new Upload({
      uploadedAt,
      path,
      comment,
    });

    ctx.type = 'json';

    upload
      .save()
      .then((data) => {
        ctx.status = 200;
        ctx.body = { data };
      })
      .catch(err => {
        ctx.status = 500;
        ctx.body = err;
      });
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/feed',
    failureRedirect: '/login',
  }));

  router.get('/logout', ctx => {
    ctx.logout();
    ctx.redirect('/');
  });

  router.get('/login', ctx => {
    ctx.type = 'html';
    ctx.body = createReadStream('views/login.html');
  });

  router.get('/feed', isAuth, ctx => {
    ctx.type = 'html';
    ctx.body = createReadStream('views/feed.html');
  });

  router.get('/feed/last', async ctx => {
    ctx.type = 'json';
    const upload = await Upload.find().sort('-uploadedAt').limit(10).exec();
    ctx.body = upload;
  });

  app.use(router.routes());
}

export default routes;

