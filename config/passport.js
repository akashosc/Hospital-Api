const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/doctors');
passport.use(new LocalStrategy({
    usernameField: 'email'
},async (email,password,done)=>{
    try{
     const user=await User.findOne({email:email});
     console.log(user);
     if(!user){return done(null,false);}
     if(user.password!=password){return done(null,false);}

     return done(null,user);

    }catch(err){
      return done(err,false);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(async function(id, done) {
    try{
       const user=await User.findById(id);
        done(null,user);
    }catch(err){
     done(err,false);
    }
});
passport.isAuthonticate=(req,res,next)=>{
    if(req.user) return next();

    res.redirect('/doctors/login');
};


module.exports=passport;