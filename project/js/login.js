var data = {username: "",password: ""};
var jwt;

document.getElementById("login-button").addEventListener("click",login);

    async function login(){
        data.username=document.getElementById("email-input").value;
        data.password=document.getElementById("password-input").value;
        if(data.username == "" || data.password == ""){
            alert("Insert username and password");
            return;
        }
        /*
        fetch("http://localhost:8080/api/authenticate",
    {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => obj = data)
        .then(() => storeJwt(obj));
        */
        try{
            const response = await fetch("http://localhost:8080/api/authenticate",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            if(!response.ok){
                throw new Error('status: ' + response.status);
            }

            response.json().then(data => obj = data)
                .then(() => storeJwt(obj));
        }catch(err){
            console.log(err);
        }
        
    }
    

    function storeJwt(success){
        // Store jwt somehow.

        /**
         * 
         * Works as to accessing websites with authentication required.
         * 
        fetch("http://localhost:8080/user",
            {
                method: "GET",
                headers: {'Authorization': "Bearer "+success['jwt'], 'Content-Type': 'application/x-www-form-urlencoded'},
            });
            */
        // document.cookie = "jwt_cookie="+success['jwt'];

        console.log(success);
    }

