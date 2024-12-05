// لیست video
const backgrounds = [
    'video/1.mp4',
    'video/2.mp4',
    'video/3.mp4',
    'video/4.mp4'
];

// تابع تغییر ویدئوی پس‌زمینه به طور تصادفی
function changeBackgroundVideo() {
    const randomVideo = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const videoElement = document.getElementById('background-video');
    videoElement.src = randomVideo;
    videoElement.play();
}

const operatorColors = [
    'rgba(128, 0, 128, 0.8)', // بنفش
    'rgba(138, 43, 226, 0.8)',   // رنگ آبی بنفش
    'rgba(75, 0, 130, 0.8)',  // نیلی
    'rgba(123, 104, 238, 0.8)' // آبی مایل به بنفش
];

function changeOperatorColors() {
    const operatorButtons = document.querySelectorAll('.operator'); // انتخاب دکمه‌های عملیات
    const randomColor = operatorColors[Math.floor(Math.random() * operatorColors.length)]; // انتخاب رنگ تصادفی

    operatorButtons.forEach(button => {
        button.style.backgroundColor = randomColor; // تغییر رنگ پس‌زمینه
        button.style.color = 'white'; // تغییر رنگ متن به سفید
        button.style.border = `2px solid ${randomColor}`; // تغییر رنگ حاشیه
    });
}

// تغییر ویدئو هنگام بارگذاری صفحه
window.onload = function() {
    changeBackgroundVideo();
    changeOperatorColors(); 
};


//کد عکس تصادفی
/*
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
};
*/


let currentInput = '';
let operator = '';
let previousInput = '';

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = currentInput;
}

function updateDisplay() {
    const display = document.getElementById('display');
    
    // اندازه عرض نمایشگر
    const displayWidth = display.offsetWidth;
    
    // اندازه عرض متن داخل نمایشگر
    const textWidth = getTextWidth(currentInput, '2.5rem Courier New'); // استفاده از فونت پیش‌فرض

    // اگر عرض متن بیشتر از عرض کادر شد، به فرمت علمی تبدیل می‌شود
    if (textWidth > displayWidth) {
        display.textContent = parseFloat(currentInput).toExponential(5);  // تبدیل به فرمت علمی
    } else {
        display.textContent = currentInput;  // اگر عرض متن کمتر از کادر باشد، متن عادی نمایش داده می‌شود
    }

    // تنظیم راست‌چین بودن متن
    display.style.textAlign = 'right';
}

// تابعی برای محاسبه عرض متن
function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
}

const resizeHandle = document.getElementById('resize-handle');
const calculator = document.getElementById('calculator');

let isResizing = false;

// زمانی که موس روی نوار کشیدن کلیک می‌شود
resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;

    // ذخیره موقعیت اولیه
    const initialX = e.clientX;
    const initialY = e.clientY;
    const initialWidth = calculator.offsetWidth;
    const initialHeight = calculator.offsetHeight;

    // زمانی که موس حرکت می‌کند
    const onMouseMove = (e) => {
        if (isResizing) {
            const deltaX = e.clientX - initialX;
            const deltaY = e.clientY - initialY;

            // تغییر ابعاد ماشین حساب
            calculator.style.width = `${initialWidth + deltaX}px`;
            calculator.style.height = `${initialHeight + deltaY}px`;
        }
    };

    // زمانی که موس رها می‌شود
    const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    // اضافه کردن رویدادهای حرکت موس و رها کردن موس
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// جلوگیری از کلیک راست
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        // اگر کلید عدد باشد
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        // اگر کلید عملگر باشد
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        // محاسبه نتیجه با Enter یا =
        event.preventDefault(); // جلوگیری از رفتار پیش‌فرض Enter
        calculate();
    } else if (key === 'Backspace') {
        // پاک کردن آخرین رقم
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else if (key === 'Escape' || key === 'c') {
        // پاک کردن صفحه
        clearDisplay();
    } else {
        // جلوگیری از رفتار پیش‌فرض برای کلیدهای دیگر
        event.preventDefault();
    }
});