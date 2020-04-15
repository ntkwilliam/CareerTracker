


module.exports = function (app, express, passport) {

    require('./records-alumni')(app);
    require('./records-employers')(app);
    require('./records-graduateSchools')(app);
    require('./imports')(app);
    require('./admin')(app);

    
    app.post('/login', passport.authenticate(
        'local', { 
            successRedirect: '/',
            failureRedirect: '/login'

         
        }
    ) );
    

  
    
    app.use('/login',express.static('authentication'));

    app.get('/logout', function(req, res)  { 
        req.logout();
        res.redirect('/');

    });

    app.get('/currentUser',(req,res) => {
        res.send(req.user);
    });
        
    app.use('/', function(req, res, next)  {
        if (req.user == null) {
            res.redirect('/login');
        } else {
           next();
        }

    });
    
    app.use('/',express.static('frontend/dist/career-tracker'));

        app.all('/*', function(req, res) {
            res.sendFile('index.html', { root: 'frontend/dist/career-tracker'});
        });






};