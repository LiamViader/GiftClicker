const  createGiftObject = (name,img,onOpen) =>{
    return {
        name,
        img,
        onOpen,
    };
}

function getRandomInt(a, b) {
    if (a > b) {
        [a, b] = [b, a];
    }
    
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

const createDamageObject = (name,img,baseDamage) =>{
    return createGiftObject(name, img, (playerStats) => {
        damage=getRandomInt(baseDamage,baseDamage*3)
        return {
            ...playerStats,
            clickDamage: playerStats.clickDamage + damage,
        };
    });
}

const createCoinsObject = (name,img,baseCoins) =>{
    return createGiftObject(name, img, (playerStats) => {
        coins=getRandomInt(baseCoins,baseCoins*5)
        return {
            ...playerStats,
            coins: playerStats.coins + coins,
        };
    });
}


const giftObjects = [
    [
        createDamageObject('Knife', require('../assets/knife.png'), 1), 
        createCoinsObject('Silver coin', require('../assets/silverCoin.png'), 1),
    ],
    [
        createDamageObject('Dagger', require('../assets/dagger.png'), 10),
        createCoinsObject('Gold Coin', require('../assets/goldCoin.png'), 10),
    ],
    [
        createDamageObject('Small Sword', require('../assets/smallSword.png'), 100),
        createCoinsObject('Money Bag', require('../assets/moneyBag.png'), 100),
    ],
    [
        createDamageObject('Katana', require('../assets/katana.png'), 1000),
        createCoinsObject('Diamond', require('../assets/diamond.png'), 1000),
    ],
    [
        createDamageObject('Long Sword', require('../assets/greatSword.png'), 10000),
        createCoinsObject('Treasure Chest', require('../assets/treasure.png'), 10000),
    ],
];

export const getRandomObject = (tier) =>{
    lowerTierChance= 0.15;
    higherTierChance = 0.05;
    reandomNumber=Math.random();
    if (reandomNumber<lowerTierChance){
        finalTier=tier-1;
    }
    else if (reandomNumber<lowerTierChance+higherTierChance){
        finalTier=tier+1;
    }
    else {
        finalTier=tier;
    }
    finalTier=Math.min(Math.max(finalTier,0),giftObjects.length-1);
    idx=getRandomInt(0,giftObjects[finalTier].length-1);
    return giftObjects[finalTier][idx];
    
}