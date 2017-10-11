import $ from 'jquery';

class MobileMenu {
    constructor() {
        this.mobileMenu = $('.mobile-menu-icon');
        this.mobileNav = $('.mobile-nav');
        this.events();
    }

    events() {
        this.mobileMenu.click(this.toggleTheMenu.bind(this));
    }

    toggleTheMenu() {
        this.mobileNav.toggleClass('mobile-nav--is-expanded');
    }
}

export default MobileMenu;