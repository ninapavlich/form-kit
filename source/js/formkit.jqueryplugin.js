/*!
 * nin@ninalp.com
 */

 
;(function ( $, window, document, undefined ) {

   
    var pluginName = "formKit",
        defaults = {
            imageWidgetSelector: "option[data-img-src]",
            horizontalSelector:"field-type-select-multiple-horizontal",
            buttonSelector: "field-type-select-multiple-buttons",
            datePickerSelector:"field-type-date",
            dateTimePickerSelector:"field-type-date-time",
            timePickerSelector:"field-type-time",
            listSelector:"field-type-comma-separated-list",
        };


    function FormKit( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;


        this.init();
    }

    FormKit.prototype = {

        init: function() {
            // console.log("Hello form kit.")
            this.initValidation(); 
            this.initFiles();
            this.initRangeSliders();
            this.initDates();
            this.initSelects();  
            this.initListWidget();
            this.initClearWidget();
            
            $(this.element).inputPrefix();
            
            this.addListeners();



            this.render()
        },
        initValidation: function(){
            // $(this.element).parsley();
            // console.log("initialize parsley")
            try{
                $(this.element).garlic();    
            }catch(error){
                console.warn("Error initializing Garlic: "+error)
            }
            
        },
        // initTexts: function(){
        //     var texts = $("textarea, input[type=text]");
        //     var parent = this;
        //     $(texts).each(function(index, item) {
        //         parent.initText(item);
        //     });
        // },
        // initText:function(input){

        //     console.log("init text...")
            
        // },
        initFiles: function(){
            var files = $("input[type=file]");
            var parent = this;
            $(files).each(function(index, item) {
                $(item).fileUploadPreview();
            });
        },
        initRangeSliders: function(){
            $('input[type="range"]').rangeslider({polyfill: false});
            $('.form-field-type-number-slider input[type="number"]').rangeslider({polyfill: false});
            $('.form-field-type-score input[type="number"]').rangeslider({polyfill: false});
            

        },
        initDates: function(){
            var inputs = $(this.element).find("input");
            var parent = this;
            $(inputs).each(function(index, item) {
                parent.initDate(item);
            });
        },
        initDate:function(input){

            var isDatePicker = $(input).hasClass(this.options.datePickerSelector);
            var isDateTimePicker = $(input).hasClass(this.options.dateTimePickerSelector);
            var isTimePicker = $(input).hasClass(this.options.timePickerSelector);

            var maxDate = $(input).attr('data-max-date');
            var startDate = $(input).attr('data-min-date');
            var minDate = $(input).attr('data-min-date');

            if(isDatePicker){
                console.log("use date picker")
                // $(input).datetimepicker({
                //     timepicker:false,
                //     format:'Y-m-d',
                //     minDate:minDate,
                //     maxDate:maxDate,
                //     startDate:startDate
                // });
            }else if(isDateTimePicker){
                console.log("use date time picker")
                // $(input).datetimepicker({
                //     format:'Y-m-d H:i',
                //     minDate:minDate,
                //     maxDate:maxDate,
                //     startDate:startDate
                // });
            }else if(isTimePicker){
                console.log("use time picker")
                // $(input).datetimepicker({
                //     datepicker:false,
                //     format:'H:i'
                // });
            }
        },
        initSelects: function(){
            var selects = $(this.element).find("select");
            var parent = this;
            $(selects).each(function(index, item) {
                parent.initSelect(item);
            });
        },
        initSelect: function(select){

            //Is Touch?
            //YES
            //-- Is Image?
            //-- YES --> Image widget
            //-- NO --> Use Native

            //NO
            //-- Is MultiSelect?
            //-- YES
            //---- Is Image?
            //---- YES -> Image
            //---- NO
            //------ Is Horizontal?
            //------ YES --> Loudev multi select
            //------ NO --> Harvest Chosen
            //-- NO
            //---- Is Image?
            //---- YES -> Image
            //---- NO --> Harvest Chosen


            var multiAttr = $(select).attr('multiple');
            var dataImgSrc = $(select).find(this.options.imageWidgetSelector);           

            var isMultiple = (typeof multiAttr !== typeof undefined && multiAttr !== false);
            var isImage = (typeof dataImgSrc !== typeof undefined && dataImgSrc !== false && dataImgSrc.length != 0);
            var isHorizontal = $(select).hasClass(this.options.horizontalSelector);
            var isButtons = $(select).hasClass(this.options.buttonSelector);
            var isTouch = $(".touch").length >= 1;            
            
            // var hasEnoughItems = $(select).find('option').size() > 15;

            if(isTouch){
                if(isImage){
                    this.debug("use image select widget")
                }else{
                    //Use Native
                    this.debug("use native select widget")
                }
            }else{

                if(isMultiple){
                    if(isImage){
                        this.debug("use image select widget")
                        $(select).imagepicker();
                    }else if(isHorizontal){
                        this.debug("use horizontal widget")
                        $(select).multiSelect();
                    }else if(isButtons){
                        this.debug("use buttons")
                    }else{
                        this.debug("use harvest widget")
                        var placeholder_text = $(select).attr('data-placeholder') || '';
                        $(select).chosen({'placeholder_text_multiple': placeholder_text}); 
                    }
                }else{
                    if(isImage){
                        this.debug("use image select widget")
                        $(select).imagepicker();
                    }else{
                        this.debug("use harvest widget")
                        var placeholder_text = $(select).attr('data-placeholder') || '';
                        $(select).chosen({
                          'placeholder_text_single': placeholder_text
                        }); 
                    }
                }
            }
            
        },
        initListWidget: function(){
            var inputs = $(this.element).find("input, textarea");
            var parent = this;
            $(inputs).each(function(index, item) {

                var isList = $(item).hasClass(parent.options.listSelector);
                if(isList){
                    $(item).tagEditor();
                }
                
            });
            
        },
        initAjaxForm:function(){
            if($(this.element).hasClass('ajax')){
                var parent = this;
                $(this.element).submit(function(event) {
                    event.preventDefault();

                    console.log($(parent.element).attr('method')+" to "+$(parent.element).attr('action'));
                    var parent_ajax_target = $(parent.element).attr("data-ajax-target");
                    $(parent.element).addClass("loading");
                    $.ajax({
                        type: $(parent.element).attr('method'),
                        url: $(parent.element).attr('action'),
                        data: $(parent.element).serialize(), // serializes the form's elements.
                        success: function(data){

                            var loaded_div = $(data);
                            var new_inner_html = $(loaded_div).find(parent_ajax_target).html();

                            $(parent.element).removeClass("loading");

                            $(parent_ajax_target).html(new_inner_html);
                            
                            if( $(new_inner_html).find('form').length > 0 ){
                                $(new_inner_html).find('form').formKit();
                            }else{
                                $(new_inner_html).formKit();
                            }
                        }
                    });

                    
                });
            }
            
        },

        initClearWidget: function() {
            // try{
                $(this.element).inputClear();    
            // }catch(error){
            //     console.warn("Error with clear widget: "+error)
            // }
        },

        

        
        render: function() {
            //Update view
        },

        addListeners: function() {
            
        },

        removeListeners: function() {
            //unbind events           
        },

        
        debug:function(message){
            // console.log(message);
        }

    };

    FormKit.VERSION = '2.0';
    console.log("FormKit.VERSION: "+FormKit.VERSION)

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new FormKit( this, options ));
            }
        });
    };

})( jQuery, window, document );

//$( document ).ready(function() {
//  $(".selector").pluginName();
//});


