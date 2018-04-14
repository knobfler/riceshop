const Alert = require('models/alert');

const { ObjectId } = require('mongoose').Types;


exports.checkObjectId = async (ctx, next) => {
    const { id } = ctx.params;
    if(!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }

    return next();
}

exports.getAlertList = async (ctx) => {
    const page = parseInt(ctx.query.page || 1, 10);

    if(page < 1){
        ctx.status = 400;
        return;
    }

    try {
        const alerts = await Alert.find()
                                    .sort({id: -1})
                                    .limit(10)
                                    .skip((page - 1) * 10)
                                    .lean()
                                    .exec();
        const alertCount = await Alert.count().exec();
        ctx.body = alerts;
        ctx.set('Last-Page', Math.ceil(alertCount / 10));
    } catch(e) {
        ctx.throw(500, e);
    }
}

exports.writeAlert = async (ctx) => {
    const { title, body } = ctx.request.body;

    const alert = new Alert({
        title,
        body
    });
    try {
        await alert.save();
        ctx.body = alert;
    } catch(e){
        ctx.throw(500, e);
    }


}

exports.getAlertById = async (ctx) => {
    const { id } = ctx.params;
    try {
        const alert = await Alert.findById(id).exec();
        if(!alert) {
            ctx.status = 404;
            return;
        }
        ctx.body = alert;
    } catch(e){
        ctx.throw(500, e);
    }
}

exports.removeAlert = async (ctx) => {
    const { id } = ctx.params;

    try {
        await Alert.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch(e){
        ctx.throw(500, e);
    }
}

exports.updateAlert = async (ctx) => {
    const { id } = ctx.params;

    try {
        const alert = Alert.findByIdAndUpdate(id, ctx.request.body, {
            new: true
        }).exec();
        if(!alert) {
            ctx.status = 404;
            return;
        }
        ctx.body = alert;
    } catch(e){
        ctx.throw(500, e);
    }
}

