// const { getCookie } = require('lib/cookie');



function getCookie(cname, cookie){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(unescape(cookie));
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookieHour(name, value, hours, cookies){   
    var now = new Date();
	var time = now.getTime();
	time += 3600 * 1000 * hours;
	now.setTime(time);
	cookies.set('cartList', escape(value) + "; path=/; expires=" + now.toUTCString() + ";");  
}
let cartList = [];
exports.addCart = (ctx) => {
    const { id, title, amount, thumbnailImage, totalPrice } = ctx.request.body;
    // console.log(ctx.request.body);
    
    if(parseInt(amount, 10) === 0 || parseInt(amount, 10) <= 0) {
        ctx.status = 500;
        ctx.body = {
            errorCode: 100,
            errorLog: '수량이 제대로 선택되지 않았습니다.'
        };
        return;
    }


    if(getCookie('cartList', ctx.cookies)) {
        cartList = JSON.parse(getCookie('cartList', ctx.cookies));
    }

    




    // cartList[id] = {
    //     title: title,
    //     amount: amount,
    //     thumbnailImage: thumbnailImage,
    //     totalPrice: totalPrice
    // };
    
    setCookieHour('cartList', JSON.stringify(cartList), 3, ctx.cookies);
    // console.log(getCookie('cartList', ctx.cookies));
    // let decodedCookie = decodeURIComponent(ctx.cookies);
    // console.log(decodedCookie);

    // if(ctx.cookies.get('cartList')) {
    //     cartList = JSON.parse(ctx.cookies.get('cartList'));
    // }

    // cartList[id] = {
    //     title: title,
    //     amount: amount,
    //     thumbnailImage: thumbnailImage,
    //     totalPrice: totalPrice
    // };

    // ctx.cookies.set('cartList', JSON.stringify(cartList));


}

exports.getCartList = async (ctx) => {
    if(typeof(ctx.cookies.get('cartList')) !== undefined) {
        let cartTotalPrice = 0;
        let cartList = JSON.parse(unescape(ctx.cookies.get('cartList')));

        for(let key in cartList) {
            cartTotalPrice += parseInt(cartList[key].totalPrice);
        }

        ctx.body = {
            cartList,
            cartTotalPrice
        };
    }


}