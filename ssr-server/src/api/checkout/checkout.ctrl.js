const Checkout = require('models/checkout');

exports.checkoutComplete = async(ctx) => {
    const {
        imp_uid, 
        merchant_uid,
        paid_amount,
        apply_num,
        buyer_email,
        buyer_name,
        buyer_tel,
        buyer_addr,
        buyer_postcode,
        buyer_request_message
    } = ctx.request.body;


    const checkout = new Checkout({
        imp_uid, 
        merchant_uid,
        paid_amount,
        apply_num,
        buyer_email,
        buyer_name,
        buyer_tel,
        buyer_addr,
        buyer_postcode,
        buyer_request_message
    });

    try {
        await checkout.save();
        ctx.body = {
            checkout
        }
    } catch(e){
        ctx.throw(500, e);
    }
}