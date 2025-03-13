


while (navObj.querySelectorAll('li').length > state.pageLength) {
    navObj.querySelectorAll('li').forEach((element) => {
        if(navObj.querySelectorAll('li').length < state.pageLength){
            return;
        }else{
            element.remove()
        }
        
    })
}


