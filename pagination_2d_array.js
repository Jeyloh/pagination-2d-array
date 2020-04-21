
/**
 * EXPLANATION
 * 
 * Initially starts with a switch checking on the sortParameter: getSortedArray()
 * Based on what we want to sort on, sort the items array with handleSort()
 *      handleSort(index: The index of sortParameter in each item in items)
 * When .sort is invoked, check if sortOrder is 0 or 1, that makes it ascending or descending.
 * When an array of sorted items are returned, the pagination function is called: getLastItemofLastPage()
 *      It takes a sorted array and returns a 2D array of arrays split up by itemsPerPage
 * return the last item of the last page
 */
function fetchItemsToDisplay(items, sortParameter, sortOrder, itemsPerPage, pageNumber) {
    // Write your code here
    console.log(items);

    function sortBySortOrder(a, b) {
        let ascending = !sortOrder;

        if (a > b) {
            return ascending ? 1 : -1;
        }
        if (b > a) {
            return  ascending ? -1 : 1;
        }
        return 0;
    }

    function handleSort (index) {
        let sorted = [];
        let temp=[];
        temp = items.map( (item) => {
           return item[index];
        }).sort(sortBySortOrder);

        temp.forEach((tempItem) => {
            items.forEach(item => {
                if (item[index] === tempItem) {
                    sorted.push(item)
                }
            })
        })
        return sorted;
    }

    function sortByName() {
        console.log("sort by name")
        return handleSort(0);
    }

    // motsatt av price
    function sortByRelevance() {
        console.log("sort by relevance")
        return handleSort(1);
    }

    function sortByPrice() {
        console.log("sort by price")
        return handleSort(2);

    }

    
    function getSortedArray () {
        switch (sortParameter) {
            case 0: return sortByName(items);
            case 1: return sortByRelevance(items);
            case 2: return sortByPrice(items);
            default: return sortByName(items);
        }
    }

    function getLastItemofLastPage(sortedArr) {
        let currentPage = pageNumber;
        let pages2Darray = [];
    
        while (sortedArr.length) {
        
            if (typeof pages2Darray[currentPage] === "undefined") {
                pages2Darray[currentPage] = [];
            }
    
            // Move item from sortedArr to currentPage 3D ARR
            pages2Darray[currentPage].push(sortedArr.shift())
    
            if ((pages2Darray[currentPage].length) === itemsPerPage) {
                currentPage += 1;
            }
        }

        pages2Darray.forEach( (item, i ) => {
            console.log(`Current page: ${i}`);
            console.log(item);
        })

        // Return last item of the last page
        const arr = pages2Darray[pages2Darray.length - 1]
        return arr[arr.length - 1];
    }

   
    // return the last page name
    return getLastItemofLastPage(getSortedArray())
}


// Assert that 2 arrays are the same
function assertArrays(expectedArray, assertArray) {
    console.log("Expected array", expectedArray, "Assert array: ", assertArray);
    if (expectedArray.length !== assertArray.length) return false;

    for (var i = 0; i < expectedArray.length; i++) {
        if (expectedArray[i] !== assertArray[i]) return false;
    }
    return true;
    
}


// Run test cases to test that fetchItemsToDisplay() returns the correct last item of each page.
function test () {

    const item1 = [ "abc", 1, 99 ];
    const item2 = [ "def", 2, 39 ];
    const item3 = [ "xyz", 3, 49 ];

    const nameAsc = fetchItemsToDisplay(
        [ item3, item1, item2 ], 
        0, // 0 = name, 1 = relevance, 2 = price
        0, // 0 = ascending, 1 = decending
        2, // itemsPerPage  
        0, // pagenumber  
    );

    if (!assertArrays(item3, nameAsc)) {
        console.log("fail name sort ascending")
        return false;
    }
    const nameDesc = fetchItemsToDisplay(
        [ item3, item1, item2 ], 
        0, // 0 = name, 1 = relevance, 2 = price
        1, // 0 = ascending, 1 = decending
        2, // itemsPerPage  
        0, // pagenumber  
    );

    if (!assertArrays(item1, nameDesc)) {
        console.log("fail name sort descending")
        return false;
    }

    const relAsc = fetchItemsToDisplay(
        [ item3, item1, item2 ], 
        1, // 0 = name, 1 = relevance, 2 = price
        0, // 0 = ascending, 1 = decending
        2, // itemsPerPage  
        0, // pagenumber  
    );

    if (!assertArrays(item3, relAsc)) {
        console.log("fail relevance sort ascending")
        return false;
    }


    const relDesc = fetchItemsToDisplay(
        [ item1, item3, item2 ], 
        1, // 0 = name, 1 = relevance, 2 = price
        1, // 0 = ascending, 1 = decending
        2, // itemsPerPage  
        0, // pagenumber  
    );

    if (!assertArrays(item1, relDesc)) {
        console.log("fail relevance sort descending")
        return false;
    }

    const priceAsc = fetchItemsToDisplay(
        [ item1, item2, item3 ], 
        2, // 0 = name, 1 = relevance, 2 = price
        0, // 0 = ascending, 1 = decending
        2, // itemsPerPage  
        0, // pagenumber  
    );

    if (!assertArrays(item1, priceAsc)) {
        console.log("fail price sort ascending")
        return false;
    }

    const priceDesc = fetchItemsToDisplay(
        [ item1, item2, item3 ], 
        2, // 0 = name, 1 = relevance, 2 = price
        1, // 0 = ascending, 1 = decending
        2, // itemsPerPage  
        0, // pagenumber  
    );

    if (!assertArrays(item2, priceDesc)) {
        console.log("fail price sort descending")
        return false;
    }

    
    const moreItems = fetchItemsToDisplay(
        [ item3, item1, item2, [ "jlh", 4, 999], [ "ajlh", 3, 105], [ "ljlh", 5, 1000], ], 
        2, // 0 = name, 1 = relevance, 2 = price
        0, // 0 = ascending, 1 = decending
        3, // itemsPerPage  
        0, // pagenumber  
    );

    if (!assertArrays([ "ljlh", 5, 1000], moreItems)) {
        console.log("fail more items paginating")
        return false;
    }

    
    const moreItems2 = fetchItemsToDisplay(
        [ item3, item1, item2, [ "jlh", 4, 999], [ "ajlh", 3, 105], [ "ljlh", 5, 1000], ], 
        1, // 0 = name, 1 = relevance, 2 = price
        1, // 0 = ascending, 1 = decending
        3, // itemsPerPage 
        0, // pagenumber  
    );

    if (!assertArrays(item1, moreItems2)) {
        console.log("fail more items paginating")
        return false;
    }

    return true;
    
}

console.log("Test criterias fulfilled: ", test());