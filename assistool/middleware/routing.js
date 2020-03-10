module.exports = (req, res, next) => {
    
    // Get the session ID:
    console.log(req.session.id);
 
    // Assign some value to session:
    req.session.loggedIn = false;
    
    // Get some value:
    const someOtherValue = req.session.someOtherKey;
    
    
    next();
}