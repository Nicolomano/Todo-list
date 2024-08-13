import passport from "passport";
import passportLocal from "passport-local";
import userModel from '../services/models/users.js';
import { PRIVATE_KEY, hashPassword, comparePasswords } from "../utils.js";
import passportJWT from "passport-jwt";

const JWTstrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTstrategy(
      {
        jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  // passport registration
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const exists = await userModel.findOne({ email });
          if (exists) {
            return done(null, false, { message: "Email already exists" });
          }
          const user = {
            first_name,
            last_name,
            email,
            age,
            password: hashPassword(password),
            loggedBy: "local",
          };
          const result = await userModel.create(user);
          return done(null, result);
        } catch (error) {
          return done("error registrando al usuario" + error);
        }
      }
    )
  );
  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.warn("User not found");
            return done(null, false);
          }
          if (!comparePasswords(user, password)) {
            console.warn("invalid credentials for user:" + username);
          }
          return done(null, user);
        } catch (error) {
          return done("error logging in user" + error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("error:" + error);
    }
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

export default initializePassport;