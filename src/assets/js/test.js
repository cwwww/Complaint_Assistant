function debounce(fn) {   //默认300毫秒
    var timer;
    return function() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
// 　　　　　　　　定时器必须要更改this指向，可以用apply、bind、或者上面用变量转换等方式来进行更改this指向
　　
            fn.apply(this);   // this 指向vue
        }, 1000);
    };
}