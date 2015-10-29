/**
 * tuSimpleTree Module
 *
 * Description
 */
(function () {
	'use strict';
	angular.module('ngCheckboxTree',[]).directive('ngCheckboxTree',function($compile) {
		// Runs during compile
		return {
			name: 'tuSimpleTree',
			scope: {
				treeData: '=',
				treeSelected: '='
			},
			// controller: function($scope, $element, $attrs) {
			// 	$scope.displayTree = function(treeData) {
			// 		// body...
			// 	}
			// },
			require: '?^ngModel',
			restrict: 'E',
			template: '<div class="ng-checkbox-tree"></div>',
			transclude: false,
			link: function(scope, ele, attrs, controller) {
				var indexTree = angular.element(ele);

				//监控treeDtata
				scope.$watch('treeData',function () {
					removeBranch(indexTree);
					createBranch(scope.treeData, indexTree);
					//
					indexTree.find('input').bind('change',function(){select($(this));});
				},true);

				//递归地创建分支
				function createBranch(data, treeNode) {
					if (data.length > 0) {
						var treeBase = treeNode.append('<ul></ul>').children('ul');
						for (var i = 0; i < data.length; i++) {
							var newTreeNode = treeBase.append('<li><input type="checkbox" value='+data[i].id+'/>' + data[i].title + '</li>').children('li:eq('+i+')');
							createBranch(data[i].nodes, newTreeNode);
						}
					}
				}
				//移除分支
				function removeBranch (treeNode) {
					treeNode.empty();
				}

				function select (checkbox) {
					var currentUl = checkbox.parent().parent();
					var currentsLi = currentUl.children('li');
					var childrenCheckbox = checkbox.parent().find('input');
					if (checkbox.is(':checked')) {
						//若一个复选框选中，它的所有子选框自动选中；
						childrenCheckbox.each(function () {
							$(this).prop('checked',true);
						});
						//
						selectParents (currentsLi);
					}else{
						//若一个复选框从选中状态切换到没有选中，则为其所有子选框取消选中状态。
						childrenCheckbox.each(function () {
							$(this).prop('checked',false);
						});

						cancelParents (currentsLi);
					}

					//check数据导出
					var checkSet = indexTree.find('input');
					scope.treeSelected = [];
					checkSet.each(function () {
						if ($(this).is(':checked')) {
							scope.treeSelected.push($(this).val());
						}
					});
					scope.$apply();
					//若一个复选框选中，且同级复选框都为选中状态，父级复选框自动选中，此行为递归至条件不满足为止
					function selectParents (currentsLi){
						var currentAllSelected = true;
						currentsLi.each(function () {
							if (!$(this).children('input').is(':checked')) {
								currentAllSelected = false;
							}
						});
						if(currentAllSelected){
							var parentLi = currentsLi.parent().parent();
							var parentsLi = currentsLi.parent().parent().parent().children('li');
							if (parentLi.length>0) {
								parentLi.children('input').prop('checked',true);
								selectParents(parentsLi);
							}
						}
					}
					function cancelParents (currentsLi) {
						//若一个复选框取消选中，父级复选框递归取消选中
						var parentLi = currentsLi.parent().parent();
						var parentsLi = currentsLi.parent().parent().parent().children('li');
						if (parentLi.length>0) {
							parentLi.children('input').prop('checked',false);
							cancelParents(parentsLi);
						}
					}

				}
			}
		};
	});
})();