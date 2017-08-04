//---------------计算器构造函数---------------
function Calculator(){
    //初始化所有数据
    this.init();
}

//给Calculator 和 原型分别添加extend方法
Calculator.extend = Calculator.prototype.extend = function(obj){
    for(var key in obj){
        this[key] = obj[key];
    }
};

//给原型添加方法
Calculator.prototype.extend({
    //初始化
    init:function(){
        this.prev_num = ''; //记录运算符前面的值
        this.next_num = ''; //记录运算符后面的值(也就是当前输入的值)
        this.operator = ''; //记录运算符号
        this.text = '0'; //保存计算过程的值
        this.equal = false; //记录是否点击了=号
    },

    //对每次输入的值进行判断
    logic:function(param){
        //如果值 等于‘c’,则清空数据
        if(param == 'c'){
            this.init();
        }
        //如果值 等于‘del’,删除倒数第一位的值
        if(param == 'del'){
            this.text = this.text.slice(0,-1);
            this.text = this.text=='' ? '0' : this.text;
            if(this.text == 0){
                this.prev_num = '';
                this.next_num = '';
            }
        }
        //如果值 在于0-9之间
        if(param>=0 && param<=9){
            this.next_num += param;

            //判断是否点击过=号
            if(this.equal){
                this.prev_num = '';
                this.text = param;
                this.equal = false;
            }else{
                if(this.text.indexOf(0) == 0 && this.text.indexOf('.') == -1){
                    this.text = this.text.slice(1)
                }
                this.text += param;
            }
        }

        //如果值 等于‘+’
        if(param == '+'){
            if(this.next_num == ''){
                this.next_num = 0;
            }
            this.operator = this.operator == '' ? param : this.operator;
            this.common(this.operator);
            this.operator = param;
        }
        //如果值 等于‘-’
        if(param == '-'){
            if(this.next_num == ''){
                this.next_num = 0;
            }
            this.operator = this.operator == '' ? param : this.operator;
            this.common(this.operator);
            this.operator = param;
        }
        //如果值 等于‘×’
        if(param == '×'){
            if(this.next_num == ''){
                this.next_num = 0;
            }
            this.operator = this.operator == '' ? param : this.operator;
            this.common(this.operator);
            this.operator = param;
        }
        //如果值 等于‘÷’
        if(param == '÷'){
            if(this.next_num == ''){
                this.next_num = 0;
            }
            this.operator = this.operator == '' ? param : this.operator;
            this.common(this.operator);
            this.operator = param;
        }

        //如果值 等于‘.’
        if(param == '.'){
            //如果是第一次单击‘.’时,在小数点前拼接上0
            if(this.next_num == ''){
                this.next_num = 0 + param;
            }

            //如果运算符左边的值为空
            if(this.prev_num == '' ){
                this.text = this.next_num = (this.next_num).indexOf(param)>-1 ? (this.next_num) : (this.next_num + param);
            }else{
                if(this.operator != '' && this.next_num !=''){
                    this.next_num = (this.next_num).indexOf(param)>-1 ? (this.next_num) : (this.next_num + param);
                    this.text = this.prev_num + this.operator + this.next_num;
                }
            }
        }

        //如果值 等于‘=’
        if(param == '='){
            this.equal = true; //点击了=，值改为true

            if(this.operator != ''){
                this.operator = this.operator;

                //如果三者都有值就进行计算
                if(this.operator != '' && this.prev_num !='' && this.next_num != ''){
                    this.main(this.operator);
                    this.text = this.text.slice(0, -1);
                }
            }
        }
        //把处理的结果返回
        return this.text;
    },

    //如果按了运算符号（+ - × ÷），则进行进一步处理
    common:function(param){
        this.operator = param;
        //如果this.prev_num为空，则把运算符右边的值赋值到运算符左边，并且删除右边的值
        if(this.prev_num == ''){
            this.prev_num = this.next_num;
            this.next_num = '';
        }

        //拼接运算表达式
        this.text = this.prev_num.toString() + this.operator;
        //如果三者都有值就进行计算
        if(this.operator != '' && this.prev_num !='' && this.next_num != ''){
            this.main(this.operator);
        }
    },

    //该方法用于+、-、×、÷的计算
    main:function(param){
        if(this.prev_num == ''){
            console.log(this.next_num);
            this.prev_num = parseFloat(this.next_num);
            this.text = this.next_num + param;
            this.next_num = '';
            this.operator = param;
        }else{
            if(this.operator == ''){
                this.prev_num += parseFloat(this.next_num);
            }else{
                //调用构造函数的静态方法进行结果运算
                this.prev_num = Calculator.Operation(this.operator, this.prev_num, this.next_num);
                this.operator = param;
            }
            this.text = this.prev_num.toString() + param;
            this.next_num = '';

        }
    }

});

//给Calculator添加静态的方法
Calculator.extend({
    //最终处理计算结果的方法
    Operation:function(operator, prev_num, next_num){
        switch(operator){
            case '+':
                return parseFloat(prev_num) + parseFloat(next_num);
            case '-':
                return parseFloat(prev_num) - parseFloat(next_num);
            case '×':
                return parseFloat(prev_num) * parseFloat(next_num);
            case '÷':
                return parseFloat(prev_num) / parseFloat(next_num);
        }
    }
});