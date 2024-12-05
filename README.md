# Web Calculator 🧮

Welcome to the Web Calculator! A sleek, user-friendly online calculator designed to make your calculations easier and more enjoyable.

## Features

- ➗ **Basic Arithmetic Operations**: Perform addition, subtraction, multiplication, and division seamlessly.
- 🌌 **Live Wallpaper**: Enjoy dynamic and stunning background effects that change as you use the calculator.
- 🖱️ **Custom Cursor**: Add a touch of personality with a fun, interactive cursor.
- 🔲 **Resizable Calculator**: Easily adjust the calculator’s size for the perfect fit on your screen.
![Calculator GIF](./other/1.gif)

## How to Replace the Wallpaper with a Picture

1. **Update the JavaScript code** to use Picture as the background instead of video. Replace the previous background video code with the following code:

This code is in script.js

```javascript
const backgrounds = [
    '4.jpg',
    '1.jpg',
    '2.jpg',
    '3.jpg'
];

function changeBackground() {
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url(${randomBackground})`;
}

window.onload = function() {
    changeBackground();
    changeOperatorColors();
};