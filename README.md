# mongooseFriendlyKeys
Mongoose does not allow . (dot) in keys, so this async function can be used to make object keys of any depth, mongoose friendly keys.

mongooseFriendly = async (obj,replacementSymbol='_')=>{
    if(replacementSymbol==='.')
        throw "Cannot use . (dot) as replacement symbol use _ or __ etc";

    if(typeof obj === "object"){
        //get all object keys
        const keys = Object.keys(obj);
        var newObj = {};
        for(var i=0;i<keys.length;i++){                                                                                
            let key = keys[i];         
            //since mongoose does not allow . (dot) in keys, replace . with another symbol  
            let newKey = key.toString().replace('.',replacementSymbol);
            //send value of current object as the paramenter with the same replacement symbol
            newObj[newKey] = await mongooseFriendly(obj[keys[i]],replacementSymbol);
        }
        //return the new object with mongoose friendly keys
        return newObj;
    }
    
    //in case the parameter is not an object return the value
    return obj;
}
