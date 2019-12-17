const data = [{ 
    'Home/Away - FT including OT':{ 
        '1':{    
                '10Bet': '1.91',
                '188BET': '2.00',
                'bet-at-home': '1.90',
                bet365: '2.00',
                'bet365.it': '2.00',
                Betclic: '1.95'
        },
        '2':{ 
                '10Bet': '1.80',
                '188BET': '1.77',
                'bet-at-home': '1.81',
                bet365: '1.80',
                'bet365.it': '1.80',
                Betclic: '1.85',
                Betfred: '1.80',
                Bethard: '1.80',
                BetVictor: '1.83'
        } 
    },
    'Home/Away - Full Time':[{ 
        '1': { '888sport': '1.91', Unibet: '1.91' },
        '2': { '888sport': '1.91', Unibet: '1.91' } 
    },{ 
        '3': { '888sport': '1.91', Unibet: '1.91' },
        '4': { '888sport': '1.91', Unibet: '1.91' } 
    }]
}];

const response = await mongooseFriendly(data,' ');
console.log(response);

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
