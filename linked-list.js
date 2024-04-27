//Node factory
function createNode(value = null, next = null) {
    return { value, next };
}


//Linked list factory
const linkedList = function() {
    let listHead = null;
//Contains following functions:
//append(value): adds a new node with value set to value at end of the list
    const append = function(value) {
        if(listHead === null) {
            listHead = createNode(value);
            return;
        }
        let currentNode = listHead;
        while(currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        currentNode.next = createNode(value);
        return;
    }
//prepend(value): adds a new node with value set to value at the beginning of the list
    const prepend = function(value) {
        let newNode = createNode(value, listHead);
        listHead = newNode;
    }
//size: returns total number of nodes in the list
    const size = function() {
        let sum = 1;
        if(listHead === null) {
            return 0;
        } else if(listHead.value !== null && listHead.next === null) {
            return sum;
        }

        let currentNode = listHead;
        while(currentNode.next !== null) {
            currentNode = currentNode.next;
            sum++
        }
     return sum;    
    }
//head: returns the first node in the list
    const head = function() {
        return listHead;
    }
//tail: returns the last node in the list
    const tail = function() {
        let currentNode = listHead;
        if(currentNode.next === null) {
            return currentNode;
        }

        while(currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
//at(index): returns the node at the given index
    const at = function(index) {
        if(!listHead) {
            return null;
        }
        let currentNode = listHead;
        for(let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
//pop: removes the last element from the list
    const pop = function() {
        if(!listHead) {
            return null;
        } else if(listHead.next === null) {
            listHead = null;
        }

        at(size() - 2).next = null;
    }
//contains(value): returns true if the given value is present in the list, otherwise returns false
    const contains = function(value) {
        if(!listHead) {
            return false;
        }

        let currentNode = listHead;

        while(currentNode !== null) {
            if(currentNode.value === value) {
                return true;
            }

            currentNode = currentNode.next;
        }
        return false;
    }
//find(value): returns the index of the node containing value, or NULL if not found
    const find = function(value) {
        let index = 0;
        let currentNode = listHead;

        if(!currentNode) {
            return null
        }

        while(currentNode !== null) {
            index++;
            if(currentNode.value === value) {
                return index;
            }
            currentNode = currentNode.next;
        }
        return null;
    }
//toString: represents your linked list object as strings. The format should be ( value ) -> ( value ) -> ( null )
    const toString = function() {
        let listString = ""
        if(!listHead) {
            return null;
        }

        let currentNode = listHead;
        while(currentNode.next !== null) {
            listString = listString.concat(`( ${currentNode.value} ) ->`);
            currentNode = currentNode.next;
        }
        listString = listString.concat(`( ${currentNode.value} ) -> ( null )`);
        console.log(listString);
        return listString;
    }
//insertAt(value, index): Inserts a new node with value at index
    const insertAt = function(value, index) {
        if (!listHead) {
            return null;
        }
        const newNode = createNode(value);
        let currentNode = listHead;
        for(let i = 0; i < index - 1; i++) {
            currentNode = currentNode.next;
        }
        let indexNode = currentNode.next;
        currentNode.next = newNode;
        newNode.next = indexNode;
    }
//removeAt(index): removes a node at a certain index
    const removeAt = function(index) {
        if (!listHead) {
            return null;
        }
        if (index > size() || index < 0) {
            return;
        }
        if (index === 0) {
            listHead = listHead.next;
            return;
        } else {
            const myNode = at(index - 1);
            myNode.next = myNode.next.next;
        }

    }
return { append, prepend, size, head, tail, at, pop, contains, find, toString, insertAt, removeAt}
}