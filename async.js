let myCard = document.querySelector('.card');
let searchCountry = document.querySelector('.searchCountry');
let searchCity = document.querySelector('.searchCity');
let box1_select = document.querySelector('.box1_select');
let box2_select = document.querySelector('.box2_select');

async function fetchURL(url){

    let x = await fetch(url);

    let y = await x.json();

    // console.log(y);

    // getWeatherInfo(y.weather[0]);
  
    getWeatherInfo(y);


}



async function fetchCityCo(url){

    let newArr=[];

    let a = await fetch(url);

    let b =  await a.json();

    newArr.push(Math.floor(+b.data[0].latitude));
    newArr.push(Math.floor(+b.data[0].longitude));

  

    // console.log(newArr);

    return newArr;

}



function temperatureConverter(t){

    t = parseFloat(t);
    return (Math.floor((t - 32) / 5 / 9));
}

function getWeatherInfo(obj){

   let temp = temperatureConverter(obj.main.temp);
   

    myCard.innerHTML =`
    
        <ul class="weatherDetails">


            <li><img src = 'http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png' class = "wIcon"></li>
            <li>Temperature : ${obj.main.temp}&#x2109;</li>   
            <li>Status: ${obj.weather[0].description}</li>
            <li>Wind speed: ${obj.wind.speed}m/s</li>
            
           

        </ul>
    
    `

    
}



function rotunjire(arr){

    let altArray=[];

    altArray.push(Math.floor(arr[0]));
    altArray.push(Math.floor(arr[1]));

    console.log(altArray);

    return altArray;

}





async function fetchCountry(urlco){

    let m = await fetch(urlco);

    let n = await m.json();

    let p = await n.data;

    let q = await n.data.cities;

   getAllCountries(p);

    
}

async function fetchCity(urlci){

    let k = await fetch(urlci);
    let l = await k.json();
    let j = l.data;
    // console.log(j);
    getAllCities(j);

}

function getAllCountries(arr){

    let text="";

    arr.forEach((element) => {

        text+= `

             <option value="${element.country}">${element.country}</option>
        
       
        `
    });

    
   
    box1_select.innerHTML = text;
}

function getAllCities(arr){

    let text="";

    arr.forEach((element) => {

        text+= `

             <option value=${element}>${element}</option>
        
       
        `
    });

   
   
    box2_select.innerHTML = text;
}

box1_select.addEventListener('change',async (e)=>{

    let coValue = await box1_select.value;
  
    await fetchCity(`https://countriesnow.space/api/v0.1/countries/cities/q?country=${coValue}`);
   

    
    console.log(box1_select.value);
    console.log(box2_select.value);

    try{


        let coord = await fetchCityCo(`http://api.positionstack.com/v1/forward?access_key=74bc88f7a8bafb27c37e90ccbac200b2&query=${box2_select.value},%20${box1_select.value}`);

        (await coord).toString();
        console.log(coord[0]);
        console.log(coord[1]);

        await fetchURL(`https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=c4c8ca21cffb8f29e1c79e7739d52979`);
        
        
    }catch(e){

        console.log(e);
    }

    

       


});








fetchCountry("https://countriesnow.space/api/v0.1/countries");



// fetchCityCo(`http://api.positionstack.com/v1/forward?access_key=74bc88f7a8bafb27c37e90ccbac200b2&query=deva,%20romania`);


// ------------------
// coordonate initiale
// fetchURL("https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c4c8ca21cffb8f29e1c79e7739d52979");
//-------------------



