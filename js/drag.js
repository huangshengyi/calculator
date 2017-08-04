/**
 * 鼠标拖拽盒子的封装函数
 * 该函数需要具备以下两个参数
 * ele {鼠标按下发生事件的那个元素}
 * moveElement {要移动的那个元素}
 * 出口方法是move()
 */
(function (window, document) {
    // 构造函数
    function DragBox() {
        this.pageX = 0;
        this.pageY = 0;
        this.x = 0;
        this.y = 0;
        this.xx = 0;
        this.yy = 0;
    }

    // 给构造函数和原型添加方法
    DragBox.extend = DragBox.prototype.extend = function (obj) {
        for (var key in obj) {
            this[key] = obj[key];
        }
    }

    // 原型的方法
    DragBox.prototype.extend({
        /**
         * ele {鼠标按下发生事件的元素}
         * moveElement {要移动的那个元素}
         */
        move: function (ele, moveElement) {
            var self = this;
            // 1.鼠标按下目标元素
            ele.onmousedown = function (event) {
                // 获取鼠标在该元素中的坐标
                self.pageX = event.pageX || DragBox.scroll().left + event.clientX;
                self.pageY = event.pageY || DragBox.scroll().top + event.clientY;
                // 计算出鼠标在这个事件元素身上的坐标位置
                self.x = self.pageX - moveElement.offsetLeft;
                self.y = self.pageY - moveElement.offsetTop;

                // 2.鼠标拖拽目标元素
                document.onmousemove = function (event) {
                    self.xx = event.pageX || DragBox.scroll().left + event.clientX;
                    self.yy = event.pageY || DragBox.scroll().top + event.clientY;

                    // 算出准确的移动距离
                    self.xx = self.xx - self.x;
                    self.yy = self.yy - self.y;
                    // 移动元素
                    moveElement.style.left = self.xx + 'px';
                    moveElement.style.top = self.yy + 'px';

                    //禁止文本选中（原理是，选中之后自动取消）,前者是主流浏览器包括ie9，后者是兼容于IE678的
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                }
            }

            // 3.鼠标松开，解绑事件
            ele.onmouseup = function (event) {
                document.onmousemove = null;
            }
        }
    })

    // 构造函数静态方法
    DragBox.extend({
        // 获取页面滚动的距离的兼容性封装
        scroll: function () {
            if (window.pageY !== undefined) {
                return {
                    left: window.pageX,
                    top: window.pageY
                }
            } else if (document.documentMode === "CSS1Compat") {
                return {
                    left: document.documentElement.scrollLeft,
                    top: document.documentElement.scrollTop
                }
            }
            return {
                left: document.body.scrollLeft,
                top: document.body.scrollTop
            }
        }
    })

    // 将构造函数暴露到全局
    window.DragBox = DragBox;
}(window, document))