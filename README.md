# ng-checkbox-tree
一个用于展现包含checkbox的无限树形结构的angular指令,功能正常需引入jquery。


##用法如下：

引入模块：
```html
	angular.module('trial', ['ngCheckboxTree']);
```
html中:
```html
	<ng-checkbox-tree tree-data = 'treeData' tree-selected= "treeSelected" tree-linkage="on"></ng-checkbox-tree>
```

##treeData
treeData是传入指令的数据，与外界$scope绑定。数据类型为数组，数组所包含的对象需要有id,title,nodes三个属性，其中nodes也是个treeData数组，可以为空。定义如下：
```html
	$scope.treeData = [{
	    "id": 1,
	    "title": "node1",
	    "nodes": [{
	        "id": 11,
	        "title": "node1.1",
	        "nodes": [{
	            "id": 111,
	            "title": "node1.1.1",
	            "nodes": [{
	                "id": 1110,
	                "title": "node1.1.1.1",
	                "nodes": [{
	                    "id": 11100,
	                    "title": "node1.1.1.1.1",
	                    "nodes": []
	                }]
	            }]
	        }]
	    }, {
	        "id": 12,
	        "title": "node1.2",
	        "nodes": []
	    }]
	}, {
	    "id": 2,
	    "title": "node2",
	    "nodrop": true,
	    "nodes": [{
	        "id": 22,
	        "title": "node2.2",
	        "nodes": []
	    }, {
	        "id": 21,
	        "title": "node2.2",
	        "nodes": []
	    }, {
	        "id": 22,
	        "title": "node2.3",
	        "nodes": []
	    }, {
	        "id": 23,
	        "title": "node2.4",
	        "nodes": []
	    }]
	}];
```

##treeSelected
treeSelected是一个数组，数组里的元素为选中的checkbox所在的node的id值，与外界$scope绑定。

##tree-linkage
tree-linkage是一个属性，取值类型为字符串。当它的值为"on",nodes父子层级间的选定状态呈联动相关，否则取消联动。

##leaf-only
leaf-only是一个属性，取值类型为字符串。当它的值为"on"，只有tree的末梢节点有checkbox。

##指令HTML结构
整个tree最终被包含在一个class="ng-checkbox-tree"的div中。每个node都是一个&lt;li&gt;&lt;/li&gt;，可以据此自定义它的样式。