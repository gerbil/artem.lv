;(function () {

    'use strict';

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // iPad and iPod detection
    var isiPad = function () {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function () {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };


    var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });

    };

    var burgerMenu = function () {

        $('.js-colorlib-nav-toggle').on('click', function (event) {
            event.preventDefault();
            var $this = $(this);
            if ($('body').hasClass('menu-show')) {
                $('body').removeClass('menu-show');
                $('#colorlib-main-nav > .js-colorlib-nav-toggle').removeClass('show');
            } else {
                $('body').addClass('menu-show');
                setTimeout(function () {
                    $('#colorlib-main-nav > .js-colorlib-nav-toggle').addClass('show');
                }, 900);
            }
        })
    };

    // Animations

    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function () {

                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }

                            el.removeClass('item-animate');
                        }, k * 20, 'easeInOutExpo');
                    });

                }, 10);

            }

        }, {offset: '85%'});
    };


    var counter = function () {
        $('.js-counter').countTo({
            formatter: function (value, options) {
                return value.toFixed(options.decimals);
            },
        });
    };

    var counterWayPoint = function () {
        if ($('#colorlib-counter').length > 0) {
            $('#colorlib-counter').waypoint(function (direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {
                    setTimeout(counter, 400);
                    $(this.element).addClass('animated');
                }
            }, {offset: '90%'});
        }
    };

    var sliderMain = function () {

        $('#colorlib-hero .flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 5000,
            directionNav: true,
            start: function () {
                setTimeout(function () {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            },
            before: function () {
                setTimeout(function () {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }

        });

    };

    var parallax = function () {

        if (!isMobile.any()) {
            $(window).stellar({
                horizontalScrolling: false,
                hideDistantElements: false,
                responsive: true
            });
        }
    };

    // Owl Carousel
    var owlCarouselFeatureSlide = function () {
        var owl2 = $('.owl-carousel');
        owl2.owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplay: false,
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            autoHeight: true,
            items: 1,
            navText: [
                "<i class='icon-arrow-left3 owl-direction'></i>",
                "<i class='icon-arrow-right3 owl-direction'></i>"
            ]
        });
    };

    var goHere = function () {

        $('.mouse-icon').on('click', function (event) {

            event.preventDefault();

            $('html,body').animate({
                scrollTop: $('.goto-here').offset().top
            }, 500, 'easeInOutExpo');

            return false;
        });
    };

    var datePicker = function () {
        jQuery('.date').datepicker({
            'format': 'd/m/yyyy',
            'maxViewMode': 2,
            'autoclose': true,
            'todayHighlight': true
        });
    };


    // Document on load.
    $(function () {
        fullHeight();
        burgerMenu();
        counterWayPoint();
        contentWayPoint();
        parallax();
        sliderMain();
        owlCarouselFeatureSlide();
        goHere();
        datePicker();
    });

    // ===== Scroll to Top ====
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });

    // browser window scroll (in pixels) after which the "menu" link is shown
    var offset = 300;
    var navigationContainer = $('#cd-nav'),
        mainNavigation = navigationContainer.find('#cd-main-nav ul');

    $(window).scroll(function () {
        checkMenu();
    });

    function checkMenu() {
        if ($(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
            //add .is-fixed class to #cd-nav
            //wait for the animation to end
            //add the .has-transitions class to main navigation (used to bring back transitions)
        } else if ($(window).scrollTop() <= offset) {
            //check if the menu is open when scrolling up - for browser that supports transition
            if (mainNavigation.hasClass('is-visible') && !$('html').hasClass('no-csstransitions')) {
                //close the menu
                //wait for the transition to end
                //remove the .is-fixed class from the #cd-nav and the .has-transitions class from main navigation
            }
            //check if the menu is open when scrolling up - fallback if transitions are not supported
            else if (mainNavigation.hasClass('is-visible') && $('html').hasClass('no-csstransitions')) {
                //no need to wait for the end of transition - close the menu and remove the .is-fixed class from the #cd-nav
            }
            //scrolling up with menu closed
            else {
                //remove the .is-fixed class from the #cd-nav and the .has-transitions class from main navigation
            }
        }
    }

    // MAIN MENU
    $(".submenu").hide();
    $(".toggle-menu").hover(function (e) {
        e.preventDefault(); // If you need to stop default action
        $(".submenu", this).toggle(); // OR $(this).find(".submenu").toggle();
    });

    // CONTACT FORM JS
    $("#contact-form").submit(function (event) {

        $('#contact-form input[type="submit"]')[0].disabled = true;
        $('.intro-email-success').removeClass('hidden');

        var name = $('#form').find('input[name="name"]').val();
        var email = $('#form').find('input[name="email"]').val();
        var tel = $('#form').find('input[name="tel"]').val();
        var service = $('#form select').val();

        console.log(name, email, tel, service);

        var templateParams = {
            from_name: name,
            reply_to: email,
            service_text: service,
            telephone: tel
        };

        emailjs.send('default_service', 'template_YrhHYqua', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                gtag('event', 'email_sent', {'method': 'contact_form'});
            }, function (error) {
                console.log('FAILED...', error);
            });

        event.preventDefault();
    });

}());