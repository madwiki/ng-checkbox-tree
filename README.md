# ng-checkbox-tree
一个用于展现包含checkbox的无限树形结构的angular指令,需引入jquery

##用法如下：

```html
	<ng-checkbox-tree tree-data = 'treeData' tree-selected= "treeSelected"></ng-checkbox-tree>
```

##treeData
treeData是传入指令的数据，数据类型为数组，数组所包含的对象需要有id,title,nodes三个属性，可定义如下：
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
treeSelected是一个数组，数组里的元素为选中的checkbox所在的node的id值

##structure
整个tree最终被包含在一个class="ng-checkbox-tree"的div中。每个node都是一个<li></li>，可以据此自定义它的样式。