fetch("navbar.html")
.then((res) => res.text())
.then ((data) => {
    document.getElementById("navbar").innerHTML = data;


// Authentication part 




    const navbarMenu = document.getElementById("navbarMenu");
    const token = localStorage.getItem("token");
    console.log(token)

    if (token) {
        // User is logged in
        navbarMenu.innerHTML = `
            <li class="nav-item">
                <a class="dropdown-item" href="wishlist.html">Profile</a>
            </li>
            <li class="nav-item">
                <a id="logoutLink" class="dropdown-item" href="#" onclick="handlelogOut()">Logout</a>
            </li>
        `;
    } else {
        // User is not logged in
        navbarMenu.innerHTML = `
            <li class="nav-item">
                <a id="registerLink" class="dropdown-item" href="register.html">Register</a>
            </li>
            <li class="nav-item">
                <a id="loginLink" class="dropdown-item" href="login.html">Login</a>
            </li>
        `;
    }



 })




