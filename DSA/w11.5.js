function minCoins (coins, amount) {
    coins.sort((a, b)=> b-a);
    let coinCount
    if(amount<0)return -1;
    for(let i=0;i<coins.length;i++){           
        while (amount >= coins[i]){
            amount -= coins[i];
            coinCount++;
        }
        if(amount === 0)break;
    }
    return amount>0 ? -1:coinCount;

}
(function () {
console.log(minCoins (eval (process.argv[2]), parseInt(process.argv[3])));
})();
    