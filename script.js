const hashNode = function(key = null, value = null, next = null) {
    return { key, value, next }
}

//Create HashMap factory function with the following methods:
const hashMap = function() {

    let buckets = new Array(16).fill(null);
    //const LOAD_FACTOR = 0.75;
    let numberOfKeys = 0;

    //hash(key): takes a key and produces a hash code with it, for this project, only accept strings
    const hash = function(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for( let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }

        return hashCode;
    }
    //set(key, value): store the provided value with the given key on the hashmap. If the key already exists, adjust the value. Handles collision and bucket growth
    const set = function(key, value) {
        let hashCode = hash(key);

        if(!has(key)) {
            let newNode = hashNode(key, value);
            //if this key does not already exist in our map
            if(buckets[hashCode] === null) {
                //if this bucket is empty
                buckets[hashCode] = newNode;
            } else {
                //if the bucket is NOT empty
                let currentNode = buckets[hashCode];
                while(currentNode.next !== null) {
                    currentNode = currentNode.next;
                }
                currentNode.next = newNode;
            }
            numberOfKeys++;
            return;
        } else {
            let currentNode = buckets[hashCode];
            while (currentNode !== null) {
                if (currentNode.key === key) {
                    currentNode.value = value; // Update value if key exists
                    return; // Exit the function after updating value
                }
                currentNode = currentNode.next;
            }
        }     
    }
    //get(key): takes a key as an argument and returns the value associated with the key, or NULL if not found
    const get = function(key) {
        let hashCode = hash(key);

        if(has(key)) {
            //if the hashmap has the key
            let currentNode = buckets[hashCode];
            while(currentNode !== null) {
                if(currentNode.key === key) {
                    return currentNode.value;
                }
                currentNode = currentNode.next;
            }
        } else {
            return null;
    }
    }
    //has(key): takes a key as an argument and returns whether or not the key is in the hash map
    const has = function(key) {

        let hashCode = hash(key);

        if(buckets[hashCode] === null) {
            return false;
        } else {
            let currentNode = buckets[hashCode];
            if(currentNode.next === null && currentNode.key === key) return true;
            while(currentNode.next !== null) {
                currentNode = currentNode.next;
                if(currentNode.key === key) {
                    return true;
                }
            }

            return false
        }

    }
    //remove(key): takes a key as an argument. if the key exists in the hash map, it removes that entry and returns true, otherwise it returns false
    const remove = function(key) {

    }
    //length(): returns the number of stored keys in the hash map
    const length = function() {

    }
    //clear(): removes all entries in the hash map
    const clear = function() {

    }
    //keys(): returns an array containing all the keys in the hash map
    const keys = function() {

    }
    //values(): returns an array containing all the values
    const values = function() {

    }
    //entries(): returns an array of each key value pair
    const entries = function() {

    }

    const getBuckets = function() {
        console.log(buckets);
    }

    return { hash, set, get, has, remove, length, clear, keys, values, entries, getBuckets }
};

const myHash = hashMap();
