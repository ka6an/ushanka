$(document).ready(function() {
    /*==========
    going to mobile version
    ==========*/
    if ($(window).width() < 860)
        $('.desktop').removeClass('desktop').addClass('mobile');

    if ($(window).width() > 860) {
        // $(function() {
        //     $.scrollify({
        //         section: ".block",
        //         standardScrollElements: ".slider-reviews"
        //     });
        // });
    }

    /*==========
    left-side
    ==========*/
    $('.left-side__wrap').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");
        $('.nav__item .link').each(function() {
            $(this).removeClass('active, nav__item_prev');
        })

        $(this).addClass('active');
        target = $(this).attr('data-hrefForm');

        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top - 80
        }, 1000, 'linear', function() {
            $(".left-side__wrap").delay(1000).queue(function() { // через 1с после скроkла ракета встаёт на своё место и только тогда убирается класс active
                $(this).removeClass("active").dequeue();
            });
            $(document).on("scroll", onScroll);
        });
    });

    /*==========
    navigation
    ==========*/
    $(document).on("scroll", onScroll);

    // click on navigation item and scroll to anchor
    $('a[href^="#"], *[data-href^="#"]').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");
        $('.nav__item .link').each(function() {
            $(this).removeClass('active, nav__item_prev');
        })

        $(this).addClass('active').prev('.nav__item').addClass('nav__item_prev');
        target = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');

        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top - 80
        }, 500, 'swing', function() {
            $(document).on("scroll", onScroll);
        });
    });


    /*==========
    create services__option
    ==========*/
    $(".block-services__option-wrap").each(function(i, el) {
        if ($(el).parent().parent().hasClass('desktop')) {
            $(el).css({
                '-webkit-transform': 'rotate(' + $(el).data('deg') + ')',
                '-moz-transform': 'rotate(' + $(el).data('deg') + ')',
                '-ms-transform': 'rotate(' + $(el).data('deg') + ')',
                '-o-transform': 'rotate(' + $(el).data('deg') + ')',
                'transform': 'rotate(' + $(el).data('deg') + ')',
                width: $(el).data('width')
            });
            $(el).children().css({ // services__option
                '-webkit-transform': 'rotate(-' + $(el).data('deg') + ')',
                '-moz-transform': 'rotate(-' + $(el).data('deg') + ')',
                '-ms-transform': 'rotate(-' + $(el).data('deg') + ')',
                '-o-transform': 'rotate(-' + $(el).data('deg') + ')',
                'transform': 'rotate(-' + $(el).data('deg') + ')'
            });
            if (i === 0)
                $(el).children().css({ // services__option
                    '-webkit-transform': 'rotate(-' + $(el).data('deg') + ') translate(-50%)',
                    '-moz-transform': 'rotate(-' + $(el).data('deg') + ') translate(-50%)',
                    '-ms-transform': 'rotate(-' + $(el).data('deg') + ') translate(-50%)',
                    '-o-transform': 'rotate(-' + $(el).data('deg') + ') translate(-50%)',
                    'transform': 'rotate(-' + $(el).data('deg') + ') translate(-50%)',
                    'text-align': 'center'
                });
            if (i > 4) // вторая половина круга
                $(el).children().css({ // services__option
                    '-webkit-transform': 'rotate(-' + $(el).data('deg') + ') translate(-100%)',
                    '-moz-transform': 'rotate(-' + $(el).data('deg') + ') translate(-100%)',
                    '-ms-transform': 'rotate(-' + $(el).data('deg') + ') translate(-100%)',
                    '-o-transform': 'rotate(-' + $(el).data('deg') + ') translate(-100%)',
                    'transform': 'rotate(-' + $(el).data('deg') + ') translate(-100%)',
                    'text-align': 'right'
                });
        }
        $(el).children().prepend('<i class="block-services__option_before"></i>');
        $(el).children().append('<i class="block-services__option_after"></i>');
        $(el).children().children().css({ // services__option_before / services__option_after
            background: $(el).data('color')
        });
    });


    /*==========
    hover on services__option
    ==========*/
    $(".desktop .block-services__option").hover(function() {
        var deg = $(this).parent().data('deg'),
            color = $(this).parent().data('color');

        $(this).addClass('block-services__option_active');
        $("#ball").css({
            '-webkit-transform': 'rotate(' + deg + ')',
            '-moz-transform': 'rotate(' + deg + ')',
            '-ms-transform': 'rotate(' + deg + ')',
            '-o-transform': 'rotate(' + deg + ')',
            'transform': 'rotate(' + deg + ')',
            background: color
        });
    }, function() {
        $(this).removeClass('block-services__option_active');
        $("#ball").css({
            background: '#fff'
        });
    });


    /*==========
    click on services__option
    ==========*/
    $(".block-services__option").on('click', function() {
        var title = $("#portfolio > .portfolio__title"),
            slide = $(".slider-portfolio-item"),
            option_text = $(this).text(),
            option_data = $(this).data('type');

        $(title).text(option_text);

        $(slide).each(function() {
            if ($(this).data('type') == option_data) {
                refreshPortfolio($(slide), $(this));
                return false;
            }
        });
    });


    /*==========
    slider in portfolio
    ==========*/
    $('.slider-portfolio-item').click(function() { moveToSelectedPortfolio($(this)); });

    $("#portfolio").swipe()
        .on('swipeEnd', function(e) {
            if (e.swipe.distance)
                switch (e.swipe.direction) {
                    case "right":
                        moveToSelectedPortfolio('prev');
                        break;
                    case "left":
                        moveToSelectedPortfolio('next');
                        break;
                    default:
                        break;
                }
        });


    /*==========
    slider in reviews
    ==========*/
    sliderReviews();

    $("#reviews").swipe()
        .on('swipeEnd', function(e) {
            if (e.swipe.distance)
                switch (e.swipe.direction) {
                    case "right":
                        $('#reviews .button__prev').trigger('click');
                        break;
                    case "left":
                        $('#reviews .button__next').trigger('click');
                        break;
                    default:
                        break;
                }
        });


    /*==========
    block form
    ==========*/
    $('.phone').inputmask("+79999999999");

    $("#form_bot").submit(function() {
        var form_data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "send.php",
            data: form_data,
            success: function() {
                $("#form_bot")[0].reset();
            }
        });
    });
    // постепенное появление полей
    $(".form__input").on('keyup', function(e) {
        e.preventDefault();
        if ($(this).val().length > 0)
            $(this).next('.form__input').removeClass('visible').addClass('visible');
    });


    /*==========
    bottom-side
    ==========*/
    $('.bottom-side').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");

        $('html, body').stop().animate({
            'scrollTop': $(this).offset().top - 80
        }, 500, 'swing', function() {
            $(document).on("scroll", onScroll);
        });
    });
});


/*==========
navigation
==========*/
function changeNav(link) {
    $(link).parent().siblings('.active').removeClass('active');
    $(link).parent().siblings('.nav__item_prev').removeClass('nav__item_prev');
    $(link).parent().addClass('active');
    $(link).parent().prev().addClass('nav__item_prev');
}

// change navigation item on scroll
function onScroll() {
    var scrollPos = $(document).scrollTop() + 80;
    $('.nav__item .link').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.innerHeight() > scrollPos) {
            $('.nav__item').removeClass("active");
            currLink.parent().addClass("active").prev('.nav__item').addClass('nav__item_prev');
        } else
            currLink.parent().removeClass("active nav__item_prev");
    });

    //Пользователь долистал до низа страницы
    if ($(window).scrollTop() == $(document).height() - $(window).height())
        $(".bottom-side").addClass('hidden');
    else
        $(".bottom-side").removeClass('hidden');
}


/*==========
slider in portfolio
==========*/
function refreshPortfolio(slides, el) {
    $(slides).removeClass();

    var cur = $(el).addClass('slider-portfolio-item slider-portfolio-item__cur'),
        next = $(cur).next(),
        prev = $(cur).prev(),
        prevSecond = $(prev).prev(),
        nextSecond = $(next).next(),
        cur_text = $(cur).data('type'),
        text = $(".portfolio-text");

    $(prev).removeClass().addClass("slider-portfolio-item slider-portfolio-item__prev");
    $(next).removeClass().addClass("slider-portfolio-item slider-portfolio-item__next");

    $(nextSecond).removeClass().addClass("slider-portfolio-item slider-portfolio-item__nextRightSecond");
    $(prevSecond).removeClass().addClass("slider-portfolio-item slider-portfolio-item__prevLeftSecond");

    $(nextSecond).nextAll().removeClass().addClass('slider-portfolio-item slider-portfolio-item__hideRight');
    $(prevSecond).prevAll().removeClass().addClass('slider-portfolio-item slider-portfolio-item__hideLeft');

    $(text).each(function() {
        $(this).removeClass('portfolio-text_cur');
        if ($(this).data('type') == cur_text)
            $(this).removeClass('portfolio-text_cur').addClass('portfolio-text_cur');
    });
}

function moveToSelectedPortfolio(el) {
    var cur = el;

    if (el == "next") cur = $(".slider-portfolio-item__cur").next();
    if (el == "prev") cur = $(".slider-portfolio-item__cur").prev();

    var next = $(cur).next(),
        prev = $(cur).prev(),
        prevSecond = $(prev).prev(),
        nextSecond = $(next).next(),
        title = $("#portfolio__title"),
        cur_title = $(cur).data('type'),
        cur_text = $(cur).data('type'),
        text = $(".portfolio-text");

    if (cur[0]) {
        title.text(cur_title);
        console.log(cur_title);
        $(cur).removeClass().addClass("slider-portfolio-item slider-portfolio-item__cur");

        $(prev).removeClass().addClass("slider-portfolio-item slider-portfolio-item__prev");
        $(next).removeClass().addClass("slider-portfolio-item slider-portfolio-item__next");

        $(nextSecond).removeClass().addClass("slider-portfolio-item slider-portfolio-item__nextRightSecond");
        $(prevSecond).removeClass().addClass("slider-portfolio-item slider-portfolio-item__prevLeftSecond");

        $(nextSecond).nextAll().removeClass().addClass('slider-portfolio-item slider-portfolio-item__hideRight');
        $(prevSecond).prevAll().removeClass().addClass('slider-portfolio-item slider-portfolio-item__hideLeft');

        $(text).each(function() {
            $(this).removeClass('portfolio-text_cur');
            if ($(this).data('type') == cur_text)
                $(this).removeClass('portfolio-text_cur').addClass('portfolio-text_cur');
        });
    }
}


/*==========
slider in reviews
==========*/
function sliderReviews() {
    var slideWrap = $('.slider-reviews-wrap'),
        nextLink = $('#reviews .button__next'),
        prevLink = $('#reviews .button__prev'),
        slideWidth = $('.slider-reviews-item').outerWidth(true),
        newLeftPos,
        cur = $('.slider-reviews-item__cur'),
        last;

    nextLink.on('click', function() {
        cur = $('.slider-reviews-item__cur');
        last = cur.next('.slider-reviews-item').next('.slider-reviews-item').next('.slider-reviews-item');

        if ($(window).width() <= 486)
            last = cur;
        else if ($(window).width() <= 741)
            last = cur.next('.slider-reviews-item');
        else if ($(window).width() <= 1190)
            last = cur.next('.slider-reviews-item').next('.slider-reviews-item');

        if (last.next('.slider-reviews-item')[0]) {
            cur.removeClass('slider-reviews-item__cur');
            last.next().addClass('slider-reviews-item__cur');

            if ($(window).width() <= 486)
                newLeftPos = parseInt($('.slider-reviews-wrap').css('transform').split(',')[4]) - slideWidth;
            else if ($(window).width() <= 741)
                newLeftPos = parseInt($('.slider-reviews-wrap').css('transform').split(',')[4]) - slideWidth * 2;
            else if ($(window).width() <= 1190)
                newLeftPos = parseInt($('.slider-reviews-wrap').css('transform').split(',')[4]) - slideWidth * 3;
            else if ($(window).width() > 1190)
                newLeftPos = parseInt($('.slider-reviews-wrap').css('transform').split(',')[4]) - slideWidth * 4;

            slideWrap.css({
                '-webkit-transform': 'translateX(' + newLeftPos + 'px)',
                '-moz-transform': 'translateX(' + newLeftPos + 'px)',
                '-ms-transform': 'translateX(' + newLeftPos + 'px)',
                '-o-transform': 'translateX(' + newLeftPos + 'px)',
                'transform': 'translateX(' + newLeftPos + 'px)'
            })
        }

        cur = $('.slider-reviews-item__cur');
        last = cur.next('.slider-reviews-item').next('.slider-reviews-item').next('.slider-reviews-item');

        if ($(window).width() <= 486)
            last = cur;
        else if ($(window).width() <= 741)
            last = cur.next('.slider-reviews-item');
        else if ($(window).width() <= 1190)
            last = cur.next('.slider-reviews-item').next('.slider-reviews-item');

        if (!last.next('.slider-reviews-item')[0])
            $(nextLink).hide(100);
        else
            $(nextLink).show(100);

        $(prevLink).show(100);

        // избежание повторного нажатия
        $("#reviews").addClass("disable").delay(1000).queue(function() {
            $(this).removeClass("disable").dequeue();
        });
    });

    prevLink.on('click', function() {
        cur = $('.slider-reviews-item__cur');
        if (cur.prev('.slider-reviews-item')[0]) {
            cur.removeClass('slider-reviews-item__cur');

            if ($(window).width() <= 486) {
                cur.prev().addClass('slider-reviews-item__cur');
                newLeftPos = parseInt($('.slider-reviews-wrap').css('transform').split(',')[4]) + slideWidth;
            } else if ($(window).width() <= 741) {
                cur.prev().prev().addClass('slider-reviews-item__cur');
                newLeftPos = parseInt($('.slider-reviews-wrap').css('transform').split(',')[4]) + slideWidth * 2;
            } else if ($(window).width() <= 1190) {
                cur.prev().prev().prev().addClass('slider-reviews-item__cur');
                newLeftPos = parseInt($('.slider-reviews-wrap').css('transform').split(',')[4]) + slideWidth * 3;
            } else if ($(window).width() > 1190) {
                cur.prev().prev().prev().prev().addClass('slider-reviews-item__cur');
                newLeftPos = parseInt($('.slider-reviews-wrap').css('transform').split(',')[4]) + slideWidth * 4;
            }

            slideWrap.css({
                '-webkit-transform': 'translateX(' + newLeftPos + 'px)',
                '-moz-transform': 'translateX(' + newLeftPos + 'px)',
                '-ms-transform': 'translateX(' + newLeftPos + 'px)',
                '-o-transform': 'translateX(' + newLeftPos + 'px)',
                'transform': 'translateX(' + newLeftPos + 'px)'
            })
        }

        cur = $('.slider-reviews-item__cur');
        if (!cur.prev('.slider-reviews-item')[0])
            $(prevLink).hide(100);
        $(nextLink).show(100);

        // избежание повторного нажатия
        prevLink.addClass("disable").delay(1000).queue(function() {
            $(this).removeClass("disable").dequeue();
        });
    });
}


/*==========
preloader
==========*/
$(window).load(function() {
    setTimeout(function() {
        // $('#preloader').fadeOut('slow', function() {});
    }, 2000);

});