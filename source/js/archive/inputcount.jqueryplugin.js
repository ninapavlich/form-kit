/*!
 * nina@ninalp.com
 * Code from http://jsfiddle.net/deepumohanp/jZeKu/
 */

;(function ( $, window, document, undefined ) {


    // Create the defaults once
    var pluginName = "inputCount",
        defaults = {
            propertyName: "value"
        };

    function InputCount( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.renderCountFunction = this.options.renderCount || this.renderCount;
        this.renderCountTarget = this.options.renderCountTarget || this.createCountTarget();

        this._maxChars = 0;
        this._maxWord = 0;
        this._minChars = 0;
        this._maxChars = 0;
        this._totalChars = 0;
        this._totalWords = 0;


        this.init();
    }

    InputCount.prototype = {

        init: function() {
    
            this.addListeners()
          

            this.render()
        },
        setProperty: function() {
          this.render()
        },

        render: function() {
            //Update view

            var value = $(this.element).val();

            var regex = /\s+/gi;
            var wordCount = value.trim().replace(regex, ' ').split(' ').length;
            var totalChars = value.length;
            var charCount = value.trim().length;
            var charCountNoSpace = value.replace(regex, '').length;

            this._totalWords = wordCount;
            this._totalChars = charCount;
            this.renderCountFunction(this);
            
        },
        renderCount: function(){
            console.log("Render count!: "+this+" "+this._totalChars)
        },
        createCountTarget:function(){
            var inputCountContainer = $('<span class="message input-count"></span>');
            $(this.element).after(inputCountContainer);
            return inputCountContainer;
        },
        addListeners: function() {
            //bind events
            var parent = this;
            $(this.element).click(function(){ parent.render();});
            $(this.element).change(function(){ parent.render();});
            $(this.element).keydown(function(){ parent.render();});
            $(this.element).keypress(function(){ parent.render();});
            $(this.element).keyup(function(){ parent.render();});
            $(this.element).blur(function(){ parent.render();});
            $(this.element).focus(function(){ parent.render();});
        },

        removeListeners: function() {
            //unbind events           
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new InputCount( this, options ));
            }
        });
    };

})( jQuery, window, document );