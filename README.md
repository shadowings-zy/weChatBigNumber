# 这是一个十分轻量级的用于微信小程序的大数运算库

它的功能有：

- **2进制-32进制数运算**
- **大整数加（正负均可）**
- **大整数减（正负均可）**
- **大整数乘（正负均可）**
- **大整数除（正负均可，得出的结果为整数，抹去小数部分）**
- **大整数取余（得出的结果恒为正数）**
-  **大整数随机数生成**

-------------------

## 使用方法：
首先把下载好的weChatBigNumber.js文件放入微信小程序的 项目根目录/utils 文件夹下。
之后在需要的页面添加此语句： 

``` javascript
var bigNum = require('../../utils/weChatBigNumber.js')
```
然后调整进制：
在weChatBigNumber.js文件中，有一个名为radix的用十进制表示的变量。我们通过修改它的值，来达到更改进制的目的。
``` javascript
var radix = 16;
```

之后就可以调用大数运算库中的方法了：

函数 	|	实例	|	说明	|
---  	| 	---	|	---	|
add(x,y) 			| bigNum.add(x,y) 				|将x,y两个字符串相加，返回值为x+y的结果字符串。
subtract(x,y)		| bigNum.subtract(x,y) 			|将x,y两个字符串相减，返回值为x-y的结果字符串。
multiply(x,y) 		| bigNum.multiply(x,y) 			|将x,y两个字符串相乘，返回值为x*y的结果字符串。
divide(x,y)			| bigNum.divide(x,y) 			|将x,y两个字符串相除，返回值为x/y的结果字符串。注意：结果只保留整数部分。
mod(x,y) 			| bigNum.mod(x,y) 				|将x,y两个字符串取余，返回值为x%y的结果字符串。注意：y必须为正，结果恒为整数。
randomNum(x)	| bigNum.randomNum(x) 		|生成0-x的随机大整数。


注：
- **小程序大数运算库由山东大学“小程序区块链轻节点开发团队”开发**
- **感谢团队中孔兰菊副教授和闵新平博士的大力支持！**
- **商业用途请与我们联系，邮箱：shadowingszy@outlook.com**

