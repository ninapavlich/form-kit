/*!
 * nina@ninalp.com
 */

 
;(function ( $, window, document, undefined ) {

 
    // Create the defaults once
    var pluginName = "inputSlider",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function InputSlider( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;
        this.sliderContainer = this.options.sliderContainer || this.createSliderContainer();



        this.init();
    }

    InputSlider.prototype = {

        init: function() {
            
            this.value = $(this.element).val();

            var parent = this;
            $(this.sliderContainer).slider({
                min: parseInt($(this.element).attr('min'), 10) || 0,
                max: parseInt($(this.element).attr('max'), 10) || 100,
                value: parseInt($(this.element).attr('value'), 10) || 0,
                step: parseInt($(this.element).attr('step'), 10) || 1,
                slide: function(event, ui) {
                    //Keep the value of the input[type=range] in sync with the slider.

                    parent.value = ui.value;
                    parent.render();
                }
            });

            // $(this.element).hide();


            this.slider = $(this.sliderContainer).data("ui-slider");
            console.log("SLIDER: "+this.slider)

            this.addListeners();          

            this.render()
        },

        render: function() {
            //Update view
            console.log("REnder value: "+this.value)
            this.slider.value = this.value;
            $(this.element).val(this.value);
            $(this.element).attr("value", this.value);
        },
        createSliderContainer: function(){
            var sliderContainer = $('<div class="slider"></div>');
            $(this.element).after(sliderContainer);
            return sliderContainer;
        },
        addListeners: function() {
            //bind events
            var parent = this;
            $(this.element).bind("change", function () {
                var value = this.value.substring(1);

            });
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
                new InputSlider( this, options ));
            }
        });
    };

})( jQuery, window, document );

//$( document ).ready(function() {
//  $(".selector").pluginName();
//});


