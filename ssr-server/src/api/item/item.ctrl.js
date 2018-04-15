const Item = require('models/item');
const fs = require('fs');
const path = require('path');

const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = async (ctx, next) => {
    const { id } = ctx.params;

    if(!ObjectId.isValid(id)){
        ctx.status = 400;
        return;
    }

    return next();

}

exports.checkLogin = async (ctx, next) => {
    if(!ctx.session.logged) {
        ctx.status = 401;
        return null;
    }

    return next();
}

exports.writeItem = async (ctx) => {
    const { title, markdown, price, images } = ctx.request.body;
    const item = new Item({
        title,
        body: markdown,
        price,
        imageNames: images
    });
    try {
        await item.save();
        ctx.body = item;
    } catch(e){
        ctx.throw(500, e);
    }
}

exports.uploadImage = async (ctx) => {
    const file = ctx.request.body.files.file;
    const reader = fs.createReadStream(file.path);
    const fileName = Math.random().toString() + file.name;
    const stream = fs.createWriteStream(path.join(__dirname, '../../uploads', fileName));
    reader.pipe(stream);

    ctx.status = 200;
    ctx.body = {
        imageName: fileName
    };

}

exports.getItemList = async (ctx) => {
    try {
        const items = await Item.find()
                                .sort({_id: -1})
                                .exec();
        ctx.body = items;
    } catch(e){
        ctx.throw(500, e);
    }
}

exports.getItemById = async (ctx) => {
    const { id } = ctx.params;
    try {
        const item = await Item.findById(id).exec();
        if(!item) {
            ctx.status = 404;
            return;
        }
        ctx.body = item;
    } catch(e){
        ctx.throw(500, e);
    }
}

exports.removeItemById = async (ctx) => {
    const { id } = ctx.params;

    try {
        await Item.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch(e){
        ctx.throw(500, e);
    }
}

exports.updateItemById = async (ctx) => {
    const { id } = ctx.params;

    const { title, markdown, price, images } = ctx.request.body;

    try {
        const item = await Item.findByIdAndUpdate(id, {title,
            body: markdown,
            price,
            imageNames: images}, {new: true}).exec();
        if(!item) {
            ctx.status = 404;
            return;
        }

        ctx.body = post;
    } catch(e){
        ctx.throw(500, e);
    }
}