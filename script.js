const hashNode = function(key = null, value = null, next = null) {
    return { key, value, next }
}

//Create HashMap factory function with the following methods:
const hashMap = function() {

    const LOAD_FACTOR = 0.75;
    let buckets = new Array(16).fill(null);
    let capacity = buckets.length;
    let numberOfKeys = 0;

    //hash(key): takes a key and produces a hash code with it, for this project, only accept strings
    const hash = function(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for( let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }

        return hashCode;
    }

    const resize = function() {
        let previousMap = buckets;
        capacity *= 2;
        buckets = new Array(capacity).fill(null);
        numberOfKeys = 0;

        previousMap.forEach((bucket) => {
            let currentBucket = bucket;
            while(currentBucket !== null) {
                set(currentBucket.key, currentBucket.value);
                currentBucket = currentBucket.next;
            }
        })
    }

    //set(key, value): store the provided value with the given key on the hashmap. If the key already exists, adjust the value. Handles collision and bucket growth
    const set = function(key, value) {
        let hashCode = hash(key);


        if(length() / capacity >= LOAD_FACTOR) {
            resize();
        }
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
                if(currentNode.key === key) {
                    return true;
                }
                currentNode = currentNode.next;
            }

            return false;
        }

    }
    //remove(key): takes a key as an argument. if the key exists in the hash map, it removes that entry and returns true, otherwise it returns false
    const remove = function(key) {
        let hashCode = hash(key);

        if(has(key)) {
            let currentNode = buckets[hashCode];
            let previousNode = null;
            while(currentNode !== null) {
                if(currentNode.key === key && previousNode !== null) {
                    previousNode.next = currentNode.next;
                } else if(currentNode.key === key && previousNode === null) {
                    buckets[hashCode] = currentNode.next;
                    numberOfKeys--;
                    return true;
                }
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            numberOfKeys--;
            return true;
        } else {
            return false;
        }
    }
    //length(): returns the number of stored keys in the hash map
    const length = function() {
        return numberOfKeys;
    }
    //clear(): removes all entries in the hash map
    const clear = function() {
        buckets = new Array(16).fill(null);
        numberOfKeys = 0;
    }
    //keys(): returns an array containing all the keys in the hash map
    const keys = function() {
        let keyArray = [];
        for(let i = 0; i < buckets.length; i++) {
            if(buckets[i] !== null) {
                //if there is a value in the bucket
               /* if(buckets[i].next === null) {
                    keyArray.push(buckets[i].key);
                }*/
                let currentNode = buckets[i];
                while(currentNode !== null) {
                    keyArray.push(currentNode.key);
                    currentNode = currentNode.next;
                }
            }
        }
        return keyArray;
    }
    //values(): returns an array containing all the values
    const values = function() {
        let valueArray = [];
        for(let i = o; i < buckets.length; i++) {
            if(buckets[i] !== null) {
                let currentNode = buckets[i];
                while(currentNode !== null) {
                    valueArray.push(currentNode.value);
                    currentNode = currentNode.next;
                }
            }
        }
        return valueArray;
    }
    //entries(): returns an array of each key value pair
    const entries = function() {
        let entriesArray = [];
        buckets.forEach((bucket) => {
            let currentBucket = bucket;
            while( currentBucket !== null) {
                entriesArray.push([currentBucket.key, currentBucket.value]);
                currentBucket = currentBucket.next;
            }
        })
        return entriesArray;
    }

    const getBuckets = function() {
        console.log(buckets);
    }

    return { hash, set, get, has, remove, length, clear, keys, values, entries, getBuckets, resize }
};

const myHash = hashMap();
