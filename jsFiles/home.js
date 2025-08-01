// home.js
const select = document.querySelector(".select-button");
let selectedEl = document.querySelector(".selected-coin h2");
let currencyItems = [...document.querySelectorAll(".currency-list li")];
let prices = [];
let time =[];
let ctx = document.getElementById('currencyChart');
let intervalId;
let user = localStorage.getItem("loggedInUser") ? localStorage.getItem("loggedInUser") : "Guest";
document.querySelector(".header-title span").textContent = ('"' + user + '"').toLocaleUpperCase();

let chart = new Chart(ctx,{
    type:'line',
    data:{
        labels:time,
        datasets:[{
            label:'the price of the currency',
            data:prices,
            borderWidth:1,
            backgroundColor:`rgba(140, 31, 230,0.6)`,
            borderColor:`rgba(140, 31, 230,0.6)`
        }] 
    },
    options:{
        responsive:true,
        animation:false,
        scales:{
            y:{
                beginAtZero:false,
                suggestedMin:Math.min(...prices) - 100,
                suggestedMax:Math.max(...prices) + 100
            }
        },
        elements:{
            line:{
                fill: true,
                tension:0.3,
            }
            
        }
    }
})
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-api-key': 'CG-c7txJ54Xz6TV17MdKEV4awLh'}
};
select.addEventListener("click", () => {
    let currencyList = document.querySelector(".currency-list");
    let currencyItems = [...currencyList.children];
    currencyList.style.height = currencyList.style.height === "0px" ? `${currencyItems.length * currencyItems[0].getBoundingClientRect().height}px` : "0px";
    let icon = select.querySelector(".select-button i");
    icon.classList.toggle("rotate");
})

const getPrice = async (currency)=>{
    try{
        
        let resp= await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`, options)
        let data = await resp.json();
        let priceElement = document.querySelector("#currency-price");
        priceElement.textContent = `Price of ${currency}: $${data[currency].usd}`;
        prices.push(data[currency].usd);
        time.push(new Date().toLocaleTimeString())
        if(prices.length>100) {prices.shift(); time.shift();}
        console.log(`Price of ${currency}: $${data[currency].usd}`);

        // updating the chart
        chart.data.datasets[0].label = currency;
        chart.data.labels = time;
        chart.data.datasets[0].data = prices;
        chart.options.scales.y.suggestedMin = Math.min(...prices) - 50;
        chart.options.scales.y.suggestedMax = Math.max(...prices) + 50;
        chart.update();
        
        

    }catch(err){
        console.error('Error fetching price:', err);
    }
}

currencyItems.forEach(item =>{
    item.addEventListener("click", () => {
        let checked = false;
        
        currencyItems.forEach(el => {
            if(el.classList.contains("checked")){
                checked = true;
                el.classList.remove("checked");
            }
        });
        if(checked){
            prices = [];
            clearInterval(intervalId);
        }
        item.classList.add("checked");
        selectedEl.innerHTML = 'Selected Coin: ' + item.innerHTML;
        console.log(item.textContent.toLocaleLowerCase().trim());
        getPrice(item.textContent.toLocaleLowerCase().trim());
        intervalId = setInterval(() => {
            getPrice(item.textContent.toLocaleLowerCase().trim());
        },10000);
        
    })
})

localStorage.removeItem("loggedInUser"); // clear the logged in user on home page load
