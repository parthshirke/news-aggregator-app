// API key is: d502a0b5890d4fccba29a91c891fb670
require('../styles/index.css');

var base_url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=d502a0b5890d4fccba29a91c891fb670";

let prepareHTMLfromData = function(DataArr){
    // console.log(DataArr.length);
    let finalHTMLstring= '';
    if(DataArr.length == 0)
    {
        let finalHTMLstring= `<h1 style="color : white;text-align:center;">No Articles Found</h1>`;
        document.getElementById('news-articles').innerHTML=finalHTMLstring;
    }
    //console.log(typeof(DataArr));
    else{
    for(let i=0;i<DataArr.length;i++)
    {
        // console.log(DataArr[i]);
        let htmlstring =    `<li class="article">
                            <div class="art_body card card-body">
                            <img class="article-img" src="${DataArr[i]["urlToImage"]}">     
                            <h2 class="article-title" style= "font-size:15px; color: white;">${DataArr[i]["title"]}</h2>
                            <p class="article-description">${DataArr[i]["description"]}</p>
                            <span class="article-author" id="author">${DataArr[i]["author"]}</span>
                            <a href="${DataArr[i]["url"]}" class="article-link">${DataArr[i]["url"]}</a>
                            </div>
                            </li>`;
        
        finalHTMLstring = finalHTMLstring + htmlstring ;
        // console.log(finalHTMLstring);
        document.getElementById('news-articles').innerHTML=finalHTMLstring;
    }
} 
};



// shortuct for instant calling function() (); instead of getnews();

async function getdata(searchInput){
    console.log(searchInput);
    let query = base_url;

    if(searchInput !== null){
        query += `&q=${searchInput}`;
        console.log(query);
    }

    const news = fetch(query);
    await news.then(response => response.json())
    .then((data) =>{
        // console.log(data);                             - the json is showed in console tab
        // var x=data.articles;                           - contains articles
        // console.log(x);
        if(data.articles){  
            // the articles is passed Through parameters                                
            prepareHTMLfromData(data.articles);             
        }
    } )
    .catch(error => console.log(error));
}

const input = document.getElementById('search');
document.addEventListener('keypress', (event) => {
    //keycode value of ENTER tab is euqal to 13
    if(event.keyCode == 13){ 
        let searchInput = document.getElementById("search").value;
        // console.log(searchInput);                                   - gives the text value ehen hit the enter tab
        if(searchInput!=null){
            getdata(searchInput);
        }
    }
});

getdata(null);

// let query = function (searchterm){
//     //Updating the url by adding the q parameter  
//     var updateurl = url + `&q=${searchterm}`;
//     // console.log(url);                                                -Updated URL
//     getdata(updateurl);
    
// };