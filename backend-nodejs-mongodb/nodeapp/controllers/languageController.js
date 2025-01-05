//CONTROLADOR DE LA FUNCIONALIDAD DE LOS LINKS/BANDERTAS QUE CAMBIAN LOS IDIOMAS

export function changeLocale(req, res, next){   //al ser un middleware, le ponemos el req, res, next
    const locale = req.params.locale   //al llamarlo locale, tenemos que registrarlo en app.js
    //const locale = req-query.locale (esto sería con query string y luego habría que adaptarlo en app.js)
    //ponemos una coockie en la respuesta que forzará al idioma que queremos y no al que nos indica el header por defecto
    res.cookie('nodeapp-locale', locale, {  //el nombre 'nodeapp-locale' se lo ponemos nosotros
        maxAge:1000 * 60 * 24 * 30 //30 dias de duración de la cookie
    }) 
    
    //redirigimos a la misma página en la que estamos

    res.redirect('back')

}
