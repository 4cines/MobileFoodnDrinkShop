const selectUserDataQuery = require("../../db/queries/users/selectUserDataQuery");
const {generateError} = require("../../helpers");

const getUserInfo = async (req, res, next) => {
    try {

        const user = await selectUserDataQuery(req.user.id);


        if(!user) generateError("Usuario no encontrado", 404);

        res.send({
            status: 'ok',
            data: 
                user,
            
        });
    } catch (err) {
        next(err);
    }
}

module.exports = getUserInfo