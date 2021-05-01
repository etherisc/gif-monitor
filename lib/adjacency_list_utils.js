/*

## sortTree

Tree structure is given as array in "flat" format:
```
[
    { id: "A", parentId: "" , title: "Item A" },
    { id: "B", parentId: "A", title: "Item B" },
    { id: "C", parentId: "A", title: "Item C" },
    { id: "D", parentId: "B", title: "Item D" }
]
```

Graphically it looks like this:
```
- Item A
    - Item B
        - Item D
    - Item C
```

This function will return array with items sorted - each item appears just after it's parent.

In this example output is:
```
[
    { id: "A", parentId: "" , title: "Item A", depth: 0 },
    { id: "B", parentId: "A", title: "Item B", depth: 1 },
    { id: "D", parentId: "B", title: "Item D", depth: 2 },
    { id: "C", parentId: "A", title: "Item C", depth: 1 }
]
```

### Arguments

* **input** array (can be in any order)
* **idFieldName** string name of the property containing object's id
* **parentFieldName** string name of the property containing object parent's id

### Notes:

Not optimized for speed.

*/

var sortTree = function(input, idFieldName, parentFieldName) {
	var output = [];
	var depth = 0;

	function addChilds(parentId) {
		input.map(item => {
			if(item[parentFieldName] == parentId) {
				item['depth'] = ++depth;
				output.push(item);
				addChilds(item[idFieldName]);
				depth--;
			}
		});
	}

	input.map(function(item) {
		// is this item first level (root) item?
		var isRoot = !item[parentFieldName] || input.findIndex(o => item[parentFieldName] == o[idFieldName]) < 0;
		if(isRoot) {
			// item doesn't have parent - it's first level item, add it to the output and then all his childs
			item['depth'] = (depth = 0);	// reset root depth to 0
			output.push(item);
			addChilds(item[idFieldName]);

		}
	});

	return output;
};


/*

## getSubTree

Returns item with id given as `itemId` argument and all it's childs

*/

var getSubTree = function(input, idFieldName, parentFieldName, itemId) {
	var output = [];
	var depth = 0;

	function addChilds(parentId) {
		input.map(item => {
			if(item[parentFieldName] == parentId) {
				item['depth'] = ++depth;
				output.push(item);
				addChilds(item[idFieldName]);
				depth--;
			}
		});
	}

	var item = input.find(x => x[idFieldName] == itemId);
	if(!item) {
		return [];
	}

	// item is first level item, add it to the output and then all his childs
	item['depth'] = (depth = 0);	// reset root depth to 0
	addChilds(item[idFieldName]);
	return output;
};


/*

	Returns item's direct childs

*/

var getChilds = function(input, idFieldName, parentFieldName, itemId) {
	return input.filter(function(item) {
		return (item[parentFieldName] && item[parentFieldName]) == itemId;
	});
};


/*

	Returns array containing only nodes without parent (root nodes). Item is returned even if it has parent property set but parent is not found in the list.

*/

var getTreeRoot = function(input, idFieldName, parentFieldName) {
	return input.filter(function(item) {
		return !item[parentFieldName] || input.findIndex(o => item[parentFieldName] == o[idFieldName]) < 0;
	});
};


/*

	Returns item given by childId argument, but only if it is child of item given as itemId

*/

var findChild = function(input, idFieldName, parentFieldName, itemId, childId) {
	var subtree = getSubTree(input, idFieldName, parentFieldName, itemId);
	return subtree.find(item => item[idFieldName] == childId);
};


/*

	Function will return given childs and their parents. Nodes not related to given childs will be removed

*/

var filterTree = function(input, idFieldName, parentFieldName, childs) {
	var output = [];
	input.map(item => {
		var itemOk = false;
		if(childs.indexOf(item[idFieldName]) >= 0) {
			itemOk = true;
		} else {
			for(var i = 0; i < childs.length; i++) {
				if(!!findChild(input, idFieldName, parentFieldName, item[idFieldName], childs[i])) {
					itemOk = true;
					break;
				}
			}
		}

		if(itemOk) {
			output.push(item);
		}
	});
	return output;
};

this.adjacencyListUtils = {
	sortTree: sortTree,
	getSubTree: getSubTree,
	getChilds: getChilds,
	getTreeRoot: getTreeRoot,
	findChild: findChild,
	filterTree: filterTree
};
