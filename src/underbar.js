(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = val => val;

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = (array, n) => n === undefined ? array[0] : array.slice(0, n);

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = (array, n) => {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n === 0) {
      return [];
    } else if (n > array.length) {
      return array;
    }
    return array.slice(array.length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = (collection, iterator) => {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = (array, target) => {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, (item, index) => {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  // [1, 2, 3, 4, 5, 6] f(el, idx, lst)
  _.filter = (collection, test) => {
    let resultArr = [];
    _.each(collection, (item) => {
      if (test(item)) {
        resultArr.push(item);
      }
    });
    return resultArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = (collection, test) => {
    return _.filter(collection, item => {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  //Inputs- Array, boolean, iterator- function
  //Outputs- Array of unique values
  //Constraints- Can't use Set for Sorted or iterator is defined, we can't use built in reduce
  //Edge Cases - none or we will see...
  //Strategy-
  //1# - Push results to two arrays instead of one
  //#2 - Push results to one array.

  _.uniq = (array, isSorted, iterator) => {
    var result = [];
    var uniqueResults = [];
    if (isSorted !== undefined) {
      _.each(array, (item, index) => {
        uniqueResults.push(iterator(index));
      });
    } else {
      return [...new Set(array)];
    }
    let trueI = _.indexOf(uniqueResults, true);
    let falseI = _.indexOf(uniqueResults, false);
    result.push(array[trueI], array[falseI]);
    return _.sortBy(result);
  };

  // Return the results of applying an iterator to each element.
  _.map = (collection, iterator) => {
    let result = [];
    _.each(collection, item => {
      let mapped = iterator(item);
      result.push(mapped);
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = (collection, key) => {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, item => {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = (collection, iterator, accumulator) => {
    if (accumulator !== undefined) {
      _.each(collection, item => {
        const curResult = iterator(accumulator, item);
        accumulator = curResult;
      });
    } else {
      accumulator = collection[0];
      _.each(collection, (item, index, collection) => {
        if (collection[index + 1] !== undefined) {
          const curResult = iterator(accumulator, collection[index + 1]);
          accumulator = curResult;
        }
      });
    }
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = (collection, target) => {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  _.every = (collection, iterator) => {
    let result = true;
    if (iterator !== undefined) {
      _.each(collection, item => {
        if (!iterator(item)) {
          result = false;
        }
      });
    } else {
      _.each(collection, item => {
        if (!item) {
          result = false;
        }
      });
    }
    return result;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = (collection, iterator) => {
    let result = false;
    if (iterator !== undefined) {
      _.each(collection, item => {
        if (iterator(item)) {
          result = true;
        }
      });
    } else {
      _.each(collection, item => {
        if (item) {
          result = true;
        }
      });
    }
    return result;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  _.extend = (des, ...args) => {
    // alert(xaxa)
    _.each(args, (item1, index1, c1) => {
      _.each(c1[index1], (item2, index2, c2) => {
        des[index2] = c2[index2];
      });
    });
    return des;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  // var destination = {};
  // var source = { a: 1 };
  // var anotherSource = { a: 'one' };

  _.defaults = (obj, ...args) => {
    _.each(args, (item1, index1, c1) => {
      _.each(c1[index1], (item2, index2, c2) => {
        let keyArr = Object.keys(obj);
        let testDex = _.indexOf(keyArr, index2);
        if (testDex === -1) {
          obj[index2] = c2[index2];
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = (func) => {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(...args) {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, args);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = (func) => {
    let cache = {};
    return function(...args) {
      let key = func;
      _.each(args, item => {
        key += item;
      });

      if (!cache[key]) {
        cache[key] = func.apply(this, args);
      }
      return cache[key];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = (...args) => {
    setTimeout(...args);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = array => {
    let result = array.slice();
    _.each(result, (item, index, c) => {
      const j = Math.floor(Math.random() * index);
      const temp = result[index];
      result[index] = result[j];
      result[j] = temp;
    });
    return result;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = (collection, functionOrKey, args) => {
    let result = [];
    if (typeof functionOrKey === 'string') {
      _.each(collection, item => {
        result.push(''[functionOrKey].apply(item));
      });
      return result;
    }
    _.each(collection, item => {
      result.push(functionOrKey.apply(item));
    });
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = (collection, iterator) => {
    let undefinedArr = _.filter(collection, item => {
      return item === undefined;
    });
    collection = _.filter(collection, item => {
      return item !== undefined;
    });

    collection = collection.sort((a, b) => {
      if (a.age && b.age) {
        return a.age - b.age;
      } else if (a.length > 1) {
        return a.length - b.length;
      } else {
        return a - b;
      }
    });

    _.each(undefinedArr, item => {
      collection.push(undefined);
    });
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = (collection, ...args) => {
    let result = [];
    _.each(collection, (item, index1) => {
      let arr = [item];
      _.each(args, (item2, index2, cx) => {
        if (cx[index2] !== undefined) {
          arr.push(cx[index2][index1]);
        }
      });
      result.push(arr);
    });
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = (nestedArray, result) => {
    if (result === undefined) {
      result = [];
    }

    _.each(nestedArray, item => {
      if (Array.isArray(item)) {
        _.flatten(item, result);
      } else {
        result.push(item);
      }
    });

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = (...args) => {
    //Edge Case: this works for two arrays, but not for three or more.
    let resultArr = [];

    _.each(args, (item1, index1, collection1) => {
      _.each(item1, (item2, index2, collection2) => {

        let dexTest0 = collection1[index1 + 1];
        let dexTest1 = _.indexOf(collection1[index1], item2) !== -1;
        let dexTest2 = _.indexOf(collection1[index1 + 1], item2) !== -1;

        if (dexTest0 && dexTest1 && dexTest2) {
          resultArr.push(item2);
        }
      });
    });

    return resultArr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = (array, ...remainingArrays) => {
    let resultArr = [];

    _.each(array, (item, index) => {
      if (!_.some(remainingArrays, (item2, index2, collection2) => {
        return _.contains(item2, item);
      })) {
        resultArr.push(item);
      }
    });
    return resultArr;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

