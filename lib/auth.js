import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

User.findOne({ username: 'root' }).exec()
  .then(user => {
    if (!user) {
      console.log('User not found! Creating new... Use "root/nopass" to login');
      const newUser = new User({
        username: 'root',
        password: 'nopass',
      });
      newUser.save();
    }
    console.log('Use "root/nopass" to /login');
  })
  .catch(console.error);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = User.findById(id);
    done(null, user);
  } catch (e) { done(e); }
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username, password }, done);
}));
