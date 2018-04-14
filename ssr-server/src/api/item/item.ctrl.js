const Item = require('models/item');
const fs = require('fs');
const path = require('path');
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