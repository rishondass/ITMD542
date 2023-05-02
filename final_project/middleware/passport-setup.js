const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {userDB} = require('../model/model.js');

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
});


passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,username,password,done){
        userDB.findOne({username:username})
        .then(async user=>{
            
            if(user == null){
                return done(null,false,{message: 'No employee with that username or password'});
            }
            try{
                if(await bcrypt.compare(password, user.password)){
                    console.log('sucess login');
                    return done(null,{
                        username: user.username,
                    });
                }else{
                    return done(null,false,{message: 'Incorrect Password'});
                }
            }catch(e){
                return done(null,false,{message:e})
            }

            return done(null,user);
        })
    }
));