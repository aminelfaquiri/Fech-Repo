// get inpute 
// convert to api 
// get api and get name repo and url 
// set this nAME AND URL IN HTML 


///////

let GithubUserName = document.querySelector(".get-repos input");
let submit = document.querySelector(".get-repos button");
let showData = document.querySelector(".containers .show-data");

// repo Api :
    let githubUser
// get inpute value :
submit.onclick = function (){
    if(GithubUserName.value){
        // my method :
        // apiRequest(GithubUserName.value);
        // method ready in js Api :
        fetch(`https://api.github.com/users/${GithubUserName.value}/repos`)
        .then((response) => response.json())
        .then((data) =>setReboToPage(data));

        GithubUserName.value = "";
    }
    else{
        showData.innerHTML = "Please enter UserName";
    }
}


function apiRequest(username){
    let githubApi = `https://api.github.com/users/${username}/repos` ;
    let request = new XMLHttpRequest();
    request.open("GET",githubApi,true);
    request.send();


    
           request.onreadystatechange = function () {
            if(this.status === 200 && this.readyState === 4){
                if(JSON.parse(this.responseText).length >= 0){
                    setReboToPage(JSON.parse(this.responseText))
                }
                else{
                    showData.innerHTML = "This User Not Hase Eny Repo";
                }
            }

            if(request.status === 404 && this.readyState === 4){

                 failedRequest(username);
            }
        }
}


function setReboToPage(obj){
        showData.innerHTML = "" ;
        for(let i in obj){
            let repo = document.createElement("a");
            repo.target = "_blank";
            repo.appendChild(document.createTextNode(obj[i].name));
            repo.href = obj[i].html_url ;
            showData.appendChild(repo);
        }
}


function failedRequest(username){
    let boxFaild = document.createElement("div");
    boxFaild.className = "box-faild";

    let faildMessage = document.createElement("div");
    faildMessage.className = "faild";
    faildMessage.appendChild(document.createTextNode(`${username} : Not Mutch!`));
    boxFaild.appendChild(faildMessage);

    let close = document.createElement("span");
    close.appendChild(document.createTextNode("X"));
    faildMessage.appendChild(close);

    close.onclick = () => {
        close.parentElement.parentElement.remove();

    }

    // add to body :
    document.body.prepend(boxFaild);
}
