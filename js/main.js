window.onload = function(){
    // 获取拖拽相关的元素
    var drag = document.getElementById('drag');
    var moveElement = drag.parentNode;
    // 实例化拖拽对象
    var dragBox = new DragBox();
    dragBox.move(drag, moveElement);


    //创建实例对象(计算功能的)
    var calc = new Calculator();
    //获取对应的元素值，经处理之后放入到计算器屏幕中显示
    $('td').each(function(){
        $(this).click(function(){
            $('.show').text( calc.logic($(this).text()) );
        });

        $(this).mouseover(function(){
            this.style.background = '#2B9193';
        });
        $(this).mouseout(function(){
            this.style.background = '';
        })
    });
}