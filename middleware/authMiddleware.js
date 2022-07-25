module.exports = function(req, res, next) {
    try {
        if(!req.session.user_id) {
            return res.redirect('/auth');
        }
        next()
    } catch (e) {
        return res.status(401).json({message:"Не авторизован"})
    }
}