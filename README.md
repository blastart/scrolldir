<figure align="center">
  <img alt="scrolldir banner" src="https://cloud.githubusercontent.com/assets/1074042/22093384/09f3c2a6-ddba-11e6-8706-7e63be185448.jpg" />
</figure>
<p align="center">Leverage Vertical Scroll Direction with CSS 😎</p>

<hr>

<h1 align="center">ScrollDir ⬆⬇</h1>

ScrollDir, short for Scroll Direction, is a 0 dependency, ~1kb micro Javascript plugin to easily leverage vertical scroll direction in CSS via a data attribute. 💪

### ScrollDir is perfect for:

-  showing or hiding sticky elements based on scroll direction 🐥
-  only changing its direction attribute when scrolled a significant amount 🔥
-  **ignoring small scroll movements** that cause unwanted jitters 😎

<hr>

## Usage

ScrollDir will set the `data-scrolldir` attribute on the `<html>` element to `up` or `down`:

```html
<html data-scrolldir="up">
```
or
```html
<html data-scrolldir="down">
```

Now it’s easy to change styles based on the direction the user is scrolling!

```css
[data-scrolldir="down"] .my-fixed-header { display: none; }
```

## In Action 🎥

<p align="center">
  <a href="https://dollarshaveclub.github.io/scrolldir/">
    <img src="https://cloud.githubusercontent.com/assets/1074042/22451992/ebe879b0-e727-11e6-8799-511209695e26.gif" alt="Scrolldir gif"  width="100%" />
  </a>
</p>

<hr>

## Install 📦

npm
```sh
npm install scrolldir --save
```
bower
```sh
bower install scrolldir --save
```
yarn
```sh
yarn add scrolldir
```

## Setup 📤

### Easy Mode
Add **dist/scrolldir.auto.min.js** and you’re done. There is nothing more to do! Scrolldir will **just work**.

Now go write some styles using `[data-scrolldir="down"]` and `[data-scrolldir="up"]`.

### Custom Mode 🛠
Add **dist/scrolldir.min.js**. You have access to the API options below and must invoke scrollDir.

```javascript
const scrollDir = new ScrollDir({  
  onChange: function(dir, enabled) {
    console.log('direction: ', dir, 'enabled: ', enabled);
  }
});
```

To use an attribute besides `data-scrolldir`:
```javascript
const scrollDir = new ScrollDir({ attribute: 'new-attribute-name' });
```

To add the Scrolldir attribute to a different element:
```javascript
const scrollDir = new ScrollDir({ el: 'your-new-selector' });
```

To turn Scrolldir off:
```javascript
const scrollDir = new ScrollDir();

scrollDir.setOptions({ off: true });
```

To turn provide a different scroll direction on page load (or app start):
```javascript
const scrollDir = new ScrollDir({ dir: 'up' }); // the default is 'down'
```


## Example 🌴

- [scrolldir](http://codepen.io/yowainwright/pen/9d5a6c6dcf2c17e351dcccfe98158e8b) on codepen.

This is a modular version of [pwfisher](https://github.com/pwfisher)'s [scroll-intent](https://github.com/pwfisher/scroll-intent.js). If you'd like to use scrolldir with jQuery—use Scroll Intent. Scrolldir should work easily within any front-end framework so it ditches library dependencies. ~TY!
