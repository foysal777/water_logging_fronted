// Registration part 

const handleRegister = (event) => {
    event.preventDefault();

    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const role = getValue("user_type");


    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        role, 
    };

    console.log(JSON.stringify(info));

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if (passwordPattern.test(password)) {
            fetch("http://127.0.0.1:8000/account/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.error) {
                        document.getElementById("error").innerText = data.error;
                    } else {
                        alert("Check your email.");
                        document.getElementById("error").innerText = "Registration Successful. Check your email.";
                        window.location.href = 'login.html';
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            document.getElementById("error").innerText = "Password must contain eight characters, at least one letter, one number, and one special character.";
        }
    } else {
        document.getElementById("error").innerText = "Password and Confirm Password Doesn't Match.";
    }
};


const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};


// Log in Part 


const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    const errorElement = document.getElementById("error2");
    console.log(username, password);
    if ((username, password)) {
        fetch("http://127.0.0.1:8000/account/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.token && data.user_id) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user_id);


                    const NameElement = document.getElementById("current_users");
                    NameElement.innerHTML = `<span> Current User : ${username}</span>`;

                    errorElement.innerText = "Login Successfully Completed";
                    window.location.href = 'index.html';

                } else {

                    errorElement.innerText = "Login Failed , Give Valid Information or Check Email Conformation";
                }

            });
    }
};









//   // Authentication Part 

const handlelogOut = () => {
    const token = localStorage.getItem("token");
  
    fetch("http://127.0.0.1:8000/account/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(" log out ?")
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "login.html";
      });
  };