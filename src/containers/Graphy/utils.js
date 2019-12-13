
//-------GENERATES A NEW UNIQUE ID--------
// the reason of this functions is because of not depending only on an index
// use of bitwise << and & ... 1 << 3 is 1000(base2) = 8 (decimal)
// 12 & 10 is 1100 & 1010 = 1000(base2) = 8(decimal)
export const makeHashId = str => {
    let hash = 0;
    if (str.length === 0){
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
};

/*
*
*   Returns the distance between A and B
*
*/
export const distance = ( x1, y1, x2, y2 ) => {
    const offset = {x: x2 - x1, y: y2 - y1 }
    return Math.sqrt(Math.pow(offset.x, 2) + Math.pow(offset.y, 2));
}