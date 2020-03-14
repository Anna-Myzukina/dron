$('.price-btn').click(function () {
    getCart($(this));
    $(this).children('span').text('Added');
    $(this).addClass('disabled');
});
$(document).on('click', '.closerow', function () {
    removeRow($(this));
});
$(document).on('click', '.cart-count>button', function () {
    var el = $(this);
    var row = el.parents('.cart-row');
    getCount(el);
    getRowTotal(row);
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 540 && !$('#menu').hasClass('fixed')) {
        $('#menu').fadeOut(function () { 
            $(this).addClass('fixed')
                   .fadeIn();
         });
    } else if ($(this).scrollTop() < 540 && $('#menu').hasClass('fixed')) {
        $('#menu').fadeOut(function () { 
            $(this).removeClass('fixed')
                   .fadeIn();
         });
    }
});
$('#offer-btn').click(function () { 
    getOfferInfo();
    $('#cart-content').removeClass('active');
    $('#offer-content').addClass('active');
 });
 $('#back-btn').click(function () { 
    $('#offer-content').removeClass('active');
    $('#cart-content').addClass('active');
 });

function getCart(elem) {
    var img = elem.siblings('img');
    var imgSrc = img.attr('src');
    var imgAlt = img.attr('alt');
    var title = elem.siblings('h4').text();
    var price = elem.siblings('h3').attr('data-price');
    var code = elem.attr('data-code');
    getRow(imgSrc, imgAlt, title, price, code);
};

function getRow(imgSrc, imgAlt, title, price, code) {
    var row = '<div class="cart-row"><p class="num">1</p><div><img class="img-fluid" src="' + imgSrc + '" alt="' + imgAlt + '"></div><div><p class="title">' + title + '</p><p>Code: <span class="code">' + code + '</span></p></div><div class="cart-count"><button class="fa fa-minus" data-minus="true"></button><div>1</div><button class="fa fa-plus" data-plus="true"></button></div><p><span class="row-price">' + price + '</span>$</p><p><span class="row-total"></span>$</p><span class="fa fa-close closerow"></span></div>';
    var rowDone = $(row);
    getRowTotal(rowDone);
    addRow(rowDone);
};

function addRow(row) {
    var modal = $('#ModalCart');
    modal.find('.cart-body').append(row);
    getTotal();
    getNumRow();
    cartCount();
};

function getCount(el) {
    var div = el.siblings('div');
    var val = div.text();
    val = +val;
    if (el.attr('data-minus') == 'true' && val !== 1) {
        val = val - 1;
        div.text(val);
    } else if (el.attr('data-plus') == 'true' && val !== 10) {
        val = val + 1;
        div.text(val);
    }
};
function getRowTotal(row) { 
    var count = row.find('.cart-count>div').text();
    count = +count;
    var price = row.find('.row-price').text();
    price = +price;
    var totalRowPrice = count * price;
    var rowTotal = row.find('.row-total');
    rowTotal.text(totalRowPrice);
    getTotal();
    return row;
 };
function getTotal() { 
    var modal = $('#ModalCart');
    var body = modal.find('.cart-body')
    var rows = body.children('.cart-row');
    var val = 0;
    rows.each(function (index, element) { 
        element = $(element);
        var _val = element.find('.row-total').text();
        val = val + +_val;
     });
     var TOTAL = modal.find('.total>span').first();
     TOTAL.text(val);
 };
function removeRow(r_btn) { 
    var parent = r_btn.parents('.cart-row');
    var code = parent.find('.code').text();
    $('.price-btn[data-code='+ code +']').removeClass('disabled')
                                         .children('span').text('Add to cart');
    parent.fadeOut(function () { 
        $(this).remove();
        getTotal();
        getNumRow();
        cartCount();
     });
 };
function getNumRow () {
    var modal = $('#ModalCart');
    var body = modal.find('.cart-body');
    var rows = body.children('.cart-row');
    rows.each(function (index, element) { 
        element = $(element);
        element.find('.num').text(index + 1);
     });
}
function cartCount () {
    var modal = $('#ModalCart');
    var body = modal.find('.cart-body')
    var rowsLen = body.children('.cart-row').length;
    if (rowsLen != 0) {
        $('.navbar-cart>span').text(rowsLen).addClass('active');
    } else {
        $('.navbar-cart>span').removeClass('active');
    };
}
function getOfferInfo () {
    var modal = $('#ModalCart');
    var body = modal.find('.cart-body');
    var totalPrice = modal.find('.total>span').first().text();
    var offesCount = body.children('.cart-row').length;
    var rows = body.children('.cart-row');
    var offerStr = '';
    rows.each(function (index, element) { 
        element = $(element);
        var title = element.find('.title').text();
        var code = element.find('.code').text();
        var count = element.find('.cart-count>div').text();
        var price = element.find('.row-price').text();
        var totalRowPrice = element.find('.row-total').text();
        var str = index + 1 + ') ' + title + ', ' + code + ', ' + count + 'x' + price + '$ = ' + totalRowPrice + '$;';
        offerStr = offerStr + ' ' + str;
     });
    offerStr = offerStr + ' Total: ' + totalPrice + '$.';
    $('#offer-content input[name=order]').val(offerStr);
}


 
// $(window).mousemove(function (e) { 
//     console.log(e.pageY+'px');
//     if (e.pageY <= 4) {
//         alert('dsjfhj')
//     }
//  });