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
        this.$element = $(element);

        this.options = $.extend({}, UnitInput.defaults, options);
        this.namespace = this.options.namespace;
        this.status = this.options.status;
        this.value = this.options.value;

        // flag
        this.opened = false;

        this.init();
    };

    UnitInput.prototype = {
        constructor: UnitInput,
        init: function() {
            var self = this,
                $tpl = $('<div class="'+ this.options.skin + ' ' + this.namespace + '-unit"><select></select><div class="' + this.namespace +'-bar"></div><ul class="' + this.namespace + '-list"></ul></div>');

            this.$tpl = $tpl;
            this.$select = $tpl.find('select');
            this.$ul = $tpl.find('ul');
            this.$bar = $tpl.find('.' + this.namespace + '-bar');

            $.each(this.status, function(key,value) {
                var $li = $('<li>' + value +'</li>').data('value',key),
                    $option = $('<option value="' + key +'">' + value +'</option>');

                if (self.value === key) {
                    $option.prop('selected',true);
                    $li.addClass(self.namespace + '-active');
                }

                $option.appendTo(self.$select);
                $li.appendTo(self.$ul);
            });

            this.$li = this.$ul.find('li');
            this.$options = this.$select.find('option');

            this.$element.addClass(this.namespace + '-input ' + this.options.skin);
            this.$select.css({
                display: 'none'
            });
            this.$ul.css({
                display: 'none'
            });


            // add to DOM
            this.$element.after($tpl);

            // attach event
            this.$bar.on('click', function() {
                self.position.call(self);

                if (self.opened === true) {
                    self.hide.call(self);
                } else {
                    self.show.call(self);
                }

                return false;
            });

            this.$ul.delegate('li', 'click', function() {
                var value = $(this).data('value');
                self.set.call(self, value);
                return false;
            });


            // initial
            this.set(this.value);     
        },
        show: function() {
            this.$ul.css({
                display: 'block'
            });
            $(document).on('click.select', $.proxy(this.hide, this));
            this.opened = true;
        },
        hide: function() {
            this.$ul.css({
                display: 'none'
            });
            $(document).off('click.select');
            this.opened = false;
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
                    self.$bar.text($(v).text());

                    if ($.isFunction(self.options.onChange)) {
                        self.options.onChange(self);
                    }
                    self.$select.trigger('change', self);
                }
            });

            this.hide();
        },
        get: function() {
            return (this.$element.val() + this.value);
        },
        position: function() {
            var height = this.$bar.outerHeight(true),
                offset = this.$bar.offset(),
                contentHeight = this.$ul.height(),
                top;

            if (contentHeight + offset.top > $(window).height() + $(window).scrollTop()) {
                top = -contentHeight;
            } else {
                top = height;
            }

            this.$ul.css({
                position: 'absolute',
                top: top,
                left: 0
            });
        }
    };

    UnitInput.defaults = {
        namespace: 'unitInput',
        skin: 'simple',
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
