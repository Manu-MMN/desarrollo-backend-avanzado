import createError from "http-errors"
import jwt from "jsonwebtoken"
import User from "../../models/User.js"

export async function loginJWT(req, res, next) {

    
    const { email, password } = req.body

     // buscar el usuario en la base de datos
     const user = await User.findOne({ email: email.toLowerCase() })

     // si no lo encuentro, o la contraseña no coincide --> error
     if (!user || !(await user.comparePassword(password))) {
        next(createError(401, "invalid credentials"))
        return
     }

     // si encuentro y coincide la contraseña, emitimos un JWT
    jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "2d"
     }, (err, tokenJWT) => {    //con este callback lo hacemos asíncrono
        if (err) {
            next(err)
            return
        }
        res.json({tokenJWT})
     })


}