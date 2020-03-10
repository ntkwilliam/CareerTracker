detectChanges = function(existingRecord, updatedRecord)  {

    changesFound = false;

    changedFieldValues = {};
    queryString = '';
    for (let prop in updatedRecord) {
        if (Object.prototype.hasOwnProperty.call(updatedRecord, prop)) {
            if (!existingRecord && updatedRecord[prop] != '' || existingRecord &&  existingRecord[prop] != updatedRecord[prop]) {
                changesFound = true;
                changedFieldValues[prop] = updatedRecord[prop];
            }

        }

    }
   

   return [changesFound, changedFieldValues]





}


modules.export = function (app) {

    require('./records-alumni')(app, detectChanges);


 

    app.use('/', express.static('authentication'));

    app.use('/main', express.static('frontend/src'))
    
    
    app.post('/login', passport.authenticate(
        'local', { 
            successRedirect: '/main',
            failureRedirect: '/',
         
        }
    ) );
    







};