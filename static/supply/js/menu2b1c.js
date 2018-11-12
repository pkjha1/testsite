var menuCtrl = {
    init: function(){

        var ctrl = menuCtrl;

        ctrl.events();

    },
    open: function() {
        $(".menu").addClass('menu_active');
        $("body").addClass('menu_open');

        if($(window).innerWidth() < 1200){ $(".block-1__close").trigger('click'); }
    },

    close: function() {
        $(".menu").removeClass('menu_active');
        $("body").removeClass('menu_open');

        if($(window).innerWidth() < 1200){
            $(".block-1__close").trigger('click');
        }

    },
    events: function(){

        $('.header__menu').on('click', function() {
            menuCtrl.open();
        });

        $('.menu__close').on('click', function() {
            menuCtrl.close();
        });
    }
}


modules.add('menuCtrl');
