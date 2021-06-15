const { response } = require("express");


const isAdminRole = (req, res = response, next) => {

    if( !req.user){
        return  res.status(500).json({
            msg: "the role cannot be verified without first verifying the auth token"
        })
    }

    const { role, name } =  req.user;
    if (role!=='ADMIN_ROLE'){
        res.status(401).json({
            msg: `${name} is not an administrator `
        })
    }
    
    next();
}

const haveARole = ( ...roles ) => {
    return (req, res = response, next) => {
        if( !req.user){
            return  res.status(500).json({
                msg: "the role cannot be verified without first verifying the auth token"
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `this service requires at least one of these roles: ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    haveARole
}