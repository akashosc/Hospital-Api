const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/doctors');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'akashion'
}


passport.use(new JWTStrategy(opts, async function(jwtPayLoad, done){

    const doc=await User.findById(jwtPayLoad._id);
    
        if (!doc){console.log('Error in finding user from JWT'); return;}

        if (doc){
            return done(null,doc);
        }else{
            return done(null, false);
        }
    }

));

module.exports = passport;