
const Account = require('models/account');
const Joi = require('joi');

const {ObjectId} = require('mongoose').Types;

exports.signup = async(ctx) => {

    
    const schema = new Joi.object().keys({
        userID: Joi.string().alphanum().min(4).max(15).required(),
        userName: Joi.string().regex(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,}/gi),
        userEmail: Joi.string().email(),
        userPassword: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=.,_-]{6,}$/g),
        userPasswordCheck: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=.,_-]{6,}$/g),
        userPostAddress: Joi.string().regex(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9\s!@#\$%\^\&*\)\(+=,._-]{1,}$/gi),
        userPostCode: Joi.number().integer().min(0).max(99999),
        userDetailAddress: Joi.string().regex(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9\s!@#\$%\^\&*\)\(+=,._-]{1,}$/gi)
    });




    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        const errorMessage = result.error.details[0].message;
        if(errorMessage.includes("userID")) {
            ctx.body = {
                errorCode: 100,
                errorLog: '아이디는 4자 이상 15자 이하로 가능합니다. 특수문자는 사용할수 없습니다.'
            }
            ctx.status = 400;
            return;
        }
        if(errorMessage.includes("userName")) {
            ctx.body = {
                errorCode: 100,
                errorLog: '이름은 한글로 해주세요.'
            }
            ctx.status = 400;
            return;
        }
        if(errorMessage.includes("userEmail")) {
            ctx.body = {
                errorCode: 100,
                errorLog: '이메일 양식에 맞지 않습니다.'
            }
            ctx.status = 400;
            return;
        }
        if(errorMessage.includes("userPassword")) {
            ctx.body = {
                errorCode: 100,
                errorLog: '패스워드는 6자 이상으로 해주세요.'
            }
            ctx.status = 400;
            return;
        }
        
        ctx.status = 400;
        ctx.body = {
            errorCode: 100,
            errorLog: '입력되지 않은 사항이 있습니다.'
        }
        
        
        return;
    }

    if(ctx.request.body.userPassword !== ctx.request.body.userPasswordCheck) {

        ctx.body = {
            errorCode: 100,
            errorLog: '두 비밀번호가 일치하지 않습니다.'
        }
        ctx.status = 400;
        return;
    }

    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body);

    } catch (e) {
        ctx.throw(500, e);
    }
    account.userPassword = null;

    ctx.body = account;

}

exports.checkId = async (ctx) => {
    

    const schema = Joi.object().keys({
        userID: Joi.string().alphanum().min(4).max(15).required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        ctx.body = {
            errorCode: 100,
            errorLog: '부적절한 아이디 입니다.'
        }
        return;
    }

    const { userID } = ctx.request.body;

    let existing = null;

    try {
        existing = await Account.findByUserID(userID);
    } catch(e){
        ctx.throw(500, e);
    }

    if(existing) {
        ctx.status = 409;
        ctx.body = {
            errorCode: 600,
            errorLog: '이미 존재하는 아이디입니다.'
        };
        return;
    }

    ctx.status = 200;


}

exports.memberLogin = async (ctx) => {

    const schema = new Joi.object().keys({
        userID: Joi.string().alphanum().min(4).max(15).required(),
        userPassword: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=.,_-]{6,}$/g)
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        ctx.body = {
            errorCode: 100,
            errorLog: '부적절한 아이디 혹은 비밀번호입니다.'
        }
        return;
    }

    const { userID, userPassword } = ctx.request.body;


    let account = null;

    try {
        account = await Account.findByUserID(userID);
    } catch(e){
        ctx.throw(500, e);
    }

    if(!account || !account.validatePassword(userPassword)) {
        ctx.status = 403;
        ctx.body = {
            errorCode: 100,
            errorLog: '아이디 혹은 비밀번호가 일치하지 않습니다.'
        }
        return;
    }

    let token = null;
    try {
        token = await account.generateToken();
    } catch(e){
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 
    });

    account.userPassword = null;

    ctx.body = account;
}

exports.memberLoginCheck = async(ctx) => {
    const {user} = ctx.request;

    if (!user) {
        ctx.status = 403;
        return;
    }

    ctx.body = user;

}

exports.memberLogout = async(ctx) => {
    ctx
        .cookies
        .set('access_token', null, {
            maxAge: 0,
            httpOnly: true
        });
    ctx.status = 204;
}

exports.getMemberInfo = async (ctx) => {
    const { userID } = ctx.request.body;

    let account = null;
    try {
        account = await Account.findByUserID(userID);
        
    } catch(e){
        ctx.throw(500, e);
    }

    if(!account) {
        ctx.status = 500;
        return;
    }

    account.userPassword = null;
    ctx.body = {
        account
    };
}