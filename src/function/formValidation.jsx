export const handleEmailValidation=(email)=>
    {
        if(email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        {
            return true
        }
        return false
    }
    /**********error Display ***********/
    export const handleErrorShow = (add)=>{

        let xx = true
        for (const [key,val] of Object.entries(add)){
            const x = document.getElementById(key);
            console.log(x)
        if(val ===''){
            xx = false
            x.parentElement.setAttribute('data-error',`${key} should not be blank`)
            x.parentElement.classList.add('error')
            console.log(key,'false1',x)
        }else if(key === 'email' && handleEmailValidation(val)===false){
            x.parentElement.setAttribute('data-error',` invalid email try xxx@xxx.xxx`)
            x.parentElement.classList.add('error')
            xx=false
            console.log(key,'false2')
        }else if (key === 'tel' && handleTelValidation(val) ===false){
            x.parentElement.setAttribute('data-error',` invalid tel try 11-111-111`)
            x.parentElement.classList.add('error')
            xx=false
            console.log(key,'false3')
        }
    }
    let select = document.getElementsByClassName('market');
    console.log(select)
    if(select){
        for(let i = 0; i < select.length;i++){
            if(select[i].value === ""){
            select[i].parentElement.classList.add('error')
            select[i].parentElement.setAttribute('data-error',`select should not be blank`)
            xx=false
            }
        }
    }
        return xx
    }
    /*************phone validation***********/
    export const handleTelValidation =(tt)=>{
        if(tt.match(/^[0-9]*$/)){
            return true
        }
    return false
    }