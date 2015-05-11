/*!
 * nina@ninalp.com
 */

;(function ( $, window, document, undefined ) {


    // Create the defaults once
    var pluginName = "inputPrefix",
        defaults = {
            parentSelector: '.form-field',
            dataPrefixSelector: 'data-inset-prefix',
            dataSuffixSelector: 'data-inset-suffix'
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
              

            var inputs = $(this.element).find("input, textarea");
            var parent = this;
            $(inputs).each(function(index, item) {
                var prefix = $(item).attr(parent.options.dataPrefixSelector);
                var suffix = $(item).attr(parent.options.dataSuffixSelector);
                var hasPrefix = (typeof prefix !== typeof undefined && prefix !== false);
                var hasSuffix = (typeof suffix !== typeof undefined && suffix !== false);

                var elementHeight = $(item).height();
                var elementWidth = $(item).width();

                
             
                var originalPaddingRight = parseInt($(item).css("padding-right"));
                var originalPaddingLeft = parseInt($(item).css("padding-left"));
            
                $(item).attr('data-original-padding-right', originalPaddingRight);
                $(item).attr('data-original-padding-left', originalPaddingLeft);
                
                if(hasPrefix){
                    var prefixContainer = $('<div class="icon prefix"><div class="center-outer"><div class="center-middle"><div class="center-inner">'+prefix+'</div></div></div></div>');
                    $(item).after(prefixContainer);                    
                }

                if(hasSuffix){
                    var suffixContainer = $('<div class="icon suffix"><div class="center-outer"><div class="center-middle"><div class="center-inner">'+suffix+'</div></div></div></div>');
                    $(item).after(suffixContainer);                    
                }



                

                $( item ).bind("mouseup", function(){
                    var newElementHeight = $(item).height();
                    var newElementWidth = $(item).width();

                    if(newElementHeight != elementHeight || newElementWidth != elementWidth){
                        parent.resize();
                    }
                    elementHeight = newElementHeight;
                    elementWidth = newElementWidth;
                });
                


            });

            parent.resize();
    
            $( window ).bind("resize", function(){
                parent.resize();
            });
            
        },
        resize: function(){

            var inputs = $(this.element).find("input, textarea");
            var parent = this;
            $(inputs).each(function(index, item) {
                var hasIcon = $(item).parent(parent.options.parentSelector).find('.icon').length > 0;
                if(hasIcon){

                    var originalPaddingRight = parseInt($(item).attr('data-original-padding-right'));
                    var originalPaddingLeft = parseInt($(item).attr('data-original-padding-left'));

                    
                    
                    var prefix = $(item).parent(parent.options.parentSelector).find('.prefix');
                    if(prefix.length){
                        var prefix_width = originalPaddingLeft + $(prefix).outerWidth();
                        $(item).css("padding-left", prefix_width+"px");
                    }
                    
                    var suffix = $(item).parent(parent.options.parentSelector).find('.suffix');
                    if(suffix.length > 0){
                        var suffix_width = originalPaddingRight + $(suffix).outerWidth();
                        $(item).css("padding-right", suffix_width+"px");    
                    }
                    


                    var icon = $(item).parent(parent.options.parentSelector).find('.icon');
                    var topBorder = parseInt($(item).css("border-top-width"));
                    var bottomBorder = parseInt($(item).css("border-bottom-width"));

                    var item_height = $(item).outerHeight() - topBorder - bottomBorder;
                    var icon_height = $(icon).outerHeight();
                    var inputY = $(item).offset().top - $(item).parent().offset().top + topBorder;
                    //var top = inputY + (0.5*item_height) - (0.5*icon_height)
                    $(icon).css("top", inputY+"px");
                    $(icon).css("height", item_height);

                    $(icon).addClass('inited');
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