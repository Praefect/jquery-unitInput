# jQuery unitInput

The powerful jQuery plugin that creates a input unit. <a href="http://amazingsurge.github.io/jquery-unitInput/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-unitInput/archive/master.zip">jquery-unitInput-master.zip</a>

***

## Features

* **Different options** — unitInput provides 3 different options of unit
* **Lightweight size** — 1 kb gzipped

## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>

## Usage

Import this libraries:
* jQuery
* jquery-unitInput.min.js

And CSS:
* unitInput.css - desirable if you have not yet connected one


Create base html element:
```html
	<div class="example">
		<input class="custom" type="text" />
	</div>
```

Initialize tabs:
```javascript
$(".custom").unitInput();
```

Or initialize tabs with custom settings:
```javascript
$(".custom").unitInput({
	namespace: 'unitInput',
    skin: 'simple',
    status: {
        px: 'px',
        em: 'em',
        rem: 'rem'
    },
    value: 'px'
});
```



## Settings

```javascript
{   
    // Optional property, Set a namespace for css class
    namespace: 'unitInput',

    // Optional property, choose tooltip skin, more skins is coming soon
    skin: simple,

    //Optional property, set the value of the drop-down options
	status: {
		px: 'px',
		em: 'em',
		rem: 'rem'
	},

	//Optional property, set the default value
	value: 'px'

   

}
```

## Public methods

jquery unitInput has different methods , we can use it as below :
```javascript

// show the drop-down list
$(".custom").unitInput("show");

// hide the drop-down list
$(".custom").unitInput("hide");

// set value, use the selected value as current value
$(".custom").unitInput("set");

// get current value 
$(".custom").unitInput("get");

// add a enable class to unitInput element
$(".custom").unitInput("enable");

// remove enable class
$(".custom").unitInput("disable");

// remove unitInput Dom element and unbound all events
$(".custom").tabs("destroy");
```

## Event / Callback

* <code>change</code>: trigger when the value of bar is changed


## Browser support
jquery-unitInput is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|     ... | ...                                                              |


## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-unitInput plugin is released under the <a href="https://github.com/amazingSurge/jquery-unitInput/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


