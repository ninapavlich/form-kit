/*!
 * nina@ninalp.com
 */

;(function ( $, window, document, undefined ) {


    // Create the defaults once
    var pluginName = "inputPrefix",
        defaults = {
            iconPadding: 10,
            parentSelector: '.form-field'
        };

    function InputPrefix( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    InputPrefix.prototype = {

        init: function() {
              

            var inputs = $(this.element).find("input");
            var parent = this;
            $(inputs).each(function(index, item) {
                var prefix = $(item).attr('data-prefix');
                var hasPrefix = (typeof prefix !== typeof undefined && prefix !== false);
                
                if(hasPrefix){
                    var prefixContainer = $('<span class="icon prefix">'+prefix+'</span>');
                    $(item).after(prefixContainer);                    
                }

                var hasIcon = $(item).parent(parent.options.parentSelector).find('.icon').length > 0;
                if(hasIcon){

                    var icon = $(item).parent(parent.options.parentSelector).find('.icon');

                    var icon_width = $(icon).outerWidth();
                    var item_height = $(item).outerHeight();
                    var icon_height = $(icon).outerHeight();

                    var w = icon_width+parent.options.iconPadding;
                    $(item).css("padding-left", w+"px");
                                        
                    var top = 0 - (0.5*item_height) - (0.5*icon_height)
                    $(icon).css("top", top+"px");
                }
                
            });
            
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new InputPrefix( this, options ));
            }
        });
    };

})( jQuery, window, document );