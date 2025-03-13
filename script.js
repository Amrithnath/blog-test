
const state = {
    page:0,
    offset:20,
    pageLength:100
}
const navObj = document.getElementById("navObj")
const blogPost = document.getElementById("blogPost")
const loader = document.getElementById("loader")



window.onload = function(){
    loadNav();
    registerServiceWorker();
}
 function renderPost(post,user){
    blogPost.innerHTML=''
    loader.style.display='block'
    const postTemplate = document.querySelector("#itemTemplate").content.cloneNode(true)
    let h2 = postTemplate.querySelector('h2')
    h2.textContent = post.title
    let p = postTemplate.querySelector('p')
    p.textContent = post.body
    let a = postTemplate.querySelector('a')
    a.textContent = user.firstName
    a.href = "mailto:"+user.email
    let img = postTemplate.querySelector('img')
    img.src = user.image
    // console.log(postTemplate)
    blogPost.append(postTemplate)
    loader.style.display='none'

}

async function loadNav(){
    let response = await fetch(`https://dummyjson.com/posts?limit=${state.offset}&skip=${state.offset*state.page}&select=title,views,userId`)
    state.page=state.page+1
    let jsonObj = await response.json()
    // console.log(jsonObj)
    jsonObj.posts.forEach(element => {
        var navelement = document.querySelector("#navList")
        navelement.innerHTML += `<li style="padding: 5px;"><div class='blogItem' data-attr='${element.id}' onclick=loadPost(${element.id}) cursor> ${element.title} <div style="font-size:10px">views:${element.views}</div> </div></li>`
      });
}
navObj.onscrollend = (event)=>{
    console.log(navObj.scrollTop);
    console.log(navObj.scrollHeight - navObj.offsetHeight);
    if((navObj.scrollTop)-(navObj.scrollHeight - navObj.offsetHeight)<10){
        loadNav()
    }
    
}
async function loadPost(id){

    let blogResponse = await (await fetch(`https://dummyjson.com/posts/${id}`)).json()
    let userResponse = await (await fetch(`https://dummyjson.com/users/${blogResponse.userId}`)).json()

    renderPost(blogResponse,userResponse)

}

// https://dummyjson.com/posts/1
// https://dummyjson.com/posts/1/comments
// https://dummyjson.com/users/1
// https://dummyjson.com/users
// https://dummyjson.com/posts/1
// https://dummyjson.com/posts?limit=20&skip=0&select=title,views,userId

const registerServiceWorker = async () => {
if ("serviceWorker" in navigator) {
    try {
    const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    if (registration.installing) {
        console.log("Service worker installing");
    } else if (registration.waiting) {
        console.log("Service worker installed");
    } else if (registration.active) {
        console.log("Service worker active");
    }
    } catch (error) {
    console.error(`Registration failed with ${error}`);
    }
}
};