/*
 * eZmodal
 * doc: http://markusslima.github.io/ezmodal/
 * github: https://github.com/markusslima/ezmodal
 *
 * Copyright (c) 2015 Markus Vinicius da Silva Lima
 * Version 0.1.0
 * Licensed under the MIT license.
 */
(function ($) {
    "use strict";
    
    $(window).on('keyup', function (event) {
        if (event.keyCode === 27) {
            var data = $('.popup').data('popup');
            if (data.options.closable) {
                $('.popup').popup('hide');
            }
        }
    });

    $(document).on('click', '.popup', function () {
        var data = $(this).data('popup');
        if (data.options.closable) {
            $(this).popup('hide');
        }
    });

    $(document).on('click', '.popup .popup-container', function (event) {
        event.stopPropagation();
    });
    
    $(document).on('click', '[data-dismiss="popup"]', function () {
        $(this).parent().parent().parent().popup('hide');
    });

    $(document).on('click', '[popup-target]', function () {
        $($(this).attr('popup-target')).popup('show');
    });

    var popup = function (element, options) {
        this.options = options;
        this.$element = $(element);
    };

    popup.prototype = {
        width: function () {

            
        },
        
        show: function () {
            this.$element.show();
            this.options.onShow();
        },
        
        hide: function () {
            this.$element.hide();
            this.options.onClose();
        },

        isVisible: function () {
            return this.$element.css('visibility') === 'visible' ? true : false;
        },
        
        constructor: function () {
            var _this = this,
                container = this.$element.find('.popup-container');
                
            if (this.options.autoOpen) {
                this.show();
            }
            
            if (Number(this.options.width)) {
                container.css({
                    'width':  _this.options.width+'px'
                });
            } else {
                switch (_this.options.width) {
                    case 'small':
                        container.css({'width': '40%'});
                        break;
                    case 'medium':
                        container.css({'width': '75%'});
                        break;
                    case 'full':
                        container.css({'width': '95%'});
                        break;
                }
            }
        }
    };

    var old = $.fn.popup;

    $.fn.popup = function (option, value) {
        var get = '',
            element = this.each(function () {
                var $this = $(this),
                    data = $this.data('popup'),
                    options = $.extend({}, $.fn.popup.defaults, option, typeof option === 'object' && option);

                if (!data) {
                    $this.data('popup', (data = new popup(this, options)));
                    data.constructor();
                }

                if (typeof option === 'string') {
                    get = data[option](value);
                }
            });

        if (typeof get !== 'undefined') {
            return get;
        } else {
            return element;
        }
    };

    $.fn.popup.defaults = {
        'width': 500,
        'closable': true,
        'autoOpen': false,
        'onShow': function () {},
        'onClose': function () {}
    };

    $.fn.popup.noConflict = function () {
        $.fn.popup = old;
        return this;
    };
})(window.jQuery);
