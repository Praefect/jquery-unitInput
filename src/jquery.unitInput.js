/*
 * unitInput
 * https://github.com/amazingSurge/jquery-unitInput
 *
 * Copyright (c) 2013 joeylin
 * Licensed under the MIT license.
 */

(function($) {

    var UnitInput = $.unitInput = function(element, options) {
        this.element = element;
        this.$element = $element;

        this.options = $.extend({}, UnitInput.defaults, options);
        this.namespace = this.options.namespace;
        this.status = this.options.status;

        this.init();
    };

    UnitInput.prototype = {
        constructor: UnitInput,
        init: function() {
            var self = this,
                $tpl = $('<div class="' + this.namespace + '"><select></select><div class="' + this.namespace +'-bar"></di><ul></ul></div>');

            this.$select = $tpl.find('select');
            this.$ul = $tpl.find('ul');
            this.$bar = $tpl.find('div');

            $.each(this.status, function(key,value) {
                var $li = $('<li>' + value +'</li>').data('value',key),
                    $option = $('<option value="' + key +'">' + value +'</option>');

                if (self.value === key) {
                    $option.prop('selected',true);
                    $li.addClass('.' + this.namespace + '-active');
                }

                $options.appendTo(self.$select);
                $li.appendTo(self.$ul);
            });

            this.$li = this.$ul.find('li');
            this.$options = this.$select.find('option');

            this.$select.css({
                display: 'none'
            });

            // add to DOM
            $tpl.after(this.$element);

            this.$bar.on('click', function() {
                self.position.call(self);

                if (self.opened === true) {
                    self.hide.call(self);
                } else {
                    self.show.call(self);
                }

                return false;
            });
            
        },
        show: function() {
            this.$ul.css({
                display: 'none'
            });
        },
        hide: function() {
            this.$ul.css({
                display: 'block'
            });
        },
        set: function(value) {
            var self = this;

            this.$li.removeClass(this.namespace + '-active');
            this.value = value;

            $.each(this.$options, function(i, v) {
                if ($(v).attr('value') === value) {
                    $(v).prop('selected', true);
                }
            });

            $.each(this.$li, function(i, v) {
                
                if ($(v).data('value') === value) {
                    $(v).addClass(self.namespace + '-active');
                    self.$bar.find('span').text($(v).find('a').text());

                    if ($.isFunction(self.options.onChange)) {
                        self.options.onChange(self);
                    }
                    self.$select.trigger('change', self);
                }
            });

            this.hide();
        } 
    };

    UnitInput.defaults = {
        namespace: 'UnitInput',
        status: {
            px: 'px',
            em: 'em',
            rem: 'rem'
        },
        value: 'px'
    };

    $.fn.unitInput = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

            return this.each(function() {
                var api = $.data(this, 'unitInput');
                if (typeof api[method] === 'function') {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {
            return this.each(function() {
                if (!$.data(this, 'unitInput')) {
                    $.data(this, 'unitInput', new UnitInput(this, options));
                }
            });
        }
    };
}(jQuery));
