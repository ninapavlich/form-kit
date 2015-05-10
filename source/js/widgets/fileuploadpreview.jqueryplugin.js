/*!
 * nina@ninalp.com
 * THANK YOU: http://stackoverflow.com/questions/14069421/in-html5-how-to-show-preview-of-image-before-upload
 */


;(function ( $, window, document, undefined ) {

    
    var pluginName = "fileUploadPreview",
        defaults = {};

    // The actual plugin constructor
    function FileUploadPreview( element, options ) {
        this.element = element;

      this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;
        this.previewContainer = this.options.previewContainer || this.createPreviewContainer();


        this.init();
    }

    FileUploadPreview.prototype = {

        init: function() {
    
            this.oFReader = new FileReader();
            this.addListeners();         
            this.renderInitialValue();
        },
        
        renderInitialValue: function() {
            //Update view
            var value = $(this.element).attr("value");
            var hasValue = (typeof value !== typeof undefined);
            if(hasValue){
                var filePath = $(this.element).attr("data-file-path");
                var full_source = filePath+value;
                this.loadAndPreview(full_source);
            }            
        },
        loadAndPreview: function(url){
            var parent = this;
            var xhr = $.ajax({
                url: url, 
                type: 'get',
                success: function(data, textStatus, request) {
                    
                    //Block invalid header response types
                    var content_type = request.getResponseHeader('content-type');
                    parent.renderPreview(url, content_type);
                },
                error: function (xhr, ajaxOptions, thrownError) {}
            });
        },
        renderNewValue: function(src){
            var content_type = this.element.files[0].type;
            this.renderPreview(src, content_type);
        },
        renderPreview: function(src, content_type){
            var isImage = content_type.indexOf('image') >= 0;
            var isData = src.indexOf('data:') >= 0;
            var filename = this.getCurrentFilename()

            if(isImage){
                if(isData){                
                    var preview = '<img src="'+src+'" alt="file upload preview" />';
                }else{                
                    var preview = '<a href="'+src+'"><img src="'+src+'" alt="file upload preview" /></a>';
                }
            }else if(isData){                
                var preview = filename;
            }else{                
                var preview = '<a href="'+src+'">'+filename+'</a>';
            }

            $(this.previewContainer).html(preview);

        },
        createPreviewContainer: function(){
            var previewContainer = $('<div class="preview"></div>');
            $(this.element).after(previewContainer);
            return previewContainer;
        },
        getCurrentFilename: function(){
            var filename = $(this.element).attr("value");
            if(filename.indexOf('\\') >= 0){
                var pieces = filename.split("\\");    
            }else{
                var pieces = filename.split("/");
            }            
            return pieces[pieces.length-1]
        },
        addListeners: function() {
            //bind events
            var parent = this;
            $(this.element).bind("change", function(event){
                var currentPath = parent.element.files[0];
                parent.oFReader.readAsDataURL(currentPath);
            });
            this.oFReader.onload = function (event) {
                var result_src = event.target.result;
                parent.renderNewValue(result_src);
            };
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
                new FileUploadPreview( this, options ));
            }
        });
    };

})( jQuery, window, document );

//$( document ).ready(function() {
//  $(".selector").pluginName();
//});


