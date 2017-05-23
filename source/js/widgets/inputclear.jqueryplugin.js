/*!
 * nina@ninalp.com
 */

;(function ( $, window, document, undefined ) {


    // Create the defaults once
    var pluginName = "inputClear",
        defaults = {
            parentSelector: '.form-field',
        };

    function InputClear( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    InputClear.prototype = {

        init: function() {
              

            //bind events
            var self = this;

            $(this.options.parentSelector).find('.input-clear').bind('touch click', function(event){
                $(event.target).parents('.form-field').find('input, select, textarea').attr('value', '').val('');
                $(event.target).parents('.form-field').find('input, select, textarea').each(function( index, item ) {
                    self.renderInputChange(item);
                });
            })
            $(this.options.parentSelector).find('input, select, textarea').bind('change', function(event){
                var input = event.target;
                setTimeout(function(){
                    self.renderInputChange(input);
                }, 10);
            })
            //'input, select, textarea'
            $(this.options.parentSelector).find('select').each(function( index, item ) {
                self.renderInputChange(item);
                
            });
  
            $(document).bind('keydown keypress keyup', function(event){
                var input = event.target;
                setTimeout(function(){
                    self.renderInputChange(input);
                }, 10);
            });
            
            $(this.options.parentSelector).find('input, select, textarea').bind('focusin', function(event){
                var input = event.target;
                $(event.target).parents('.form-field').addClass('focused');
            })
            $(this.options.parentSelector).find('input, select, textarea').bind('focusout', function(event){
                var input = event.target;
                $(event.target).parents('.form-field').removeClass('focused');
            })
            


        },
        renderInputChange: function(input){
            var has_value = $(input).val() != "";
            
            if(has_value){
                $(input).parents('.form-field').addClass('has-value');
            }else{
                $(input).parents('.form-field').removeClass('has-value');
            }
        },
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new InputClear( this, options ));
            }
        });
    };

})( jQuery, window, document );