import $ from 'jquery'

$('.mobile-menu-icon').click(function() {
    $(this).toggleClass('open');
});

$('.dropbtn').hover(function () {
    $('.dropdown').toggleClass('dropdown-display');
});

$(".site-header__navigation a").each(function() {
    if (this.href == window.location.href) {
        $(this).addClass("selected");
    }
    $('.main-content').addClass("page-effect");
});