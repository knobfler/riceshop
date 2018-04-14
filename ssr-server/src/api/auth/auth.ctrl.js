const { ADMIN_PASS: adminPass } = process.env;


exports.adminLogin = (ctx) => {
    const { password } = ctx.request.body;

    if(adminPass === password) {
        ctx.body = { 
            success: true
        };
        ctx.session.logged = true;
    } else {
        ctx.body = {
            success: false
        };
        ctx.status = 401;
    }
}

exports.checkAdminLogin = async (ctx) => {
    ctx.body = {
        logged: !!ctx.session.logged
    }
}

exports.adminLogout = (ctx) => {
    ctx.session = null;
    ctx.status = 204;
}