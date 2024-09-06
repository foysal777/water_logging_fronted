fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // Authentication part
    const navbarMenu = document.getElementById("navbarMenu");
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      fetch("https://water-backend-d44x.onrender.com/team/is_admin/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.is_admin) {
            navbarMenu.innerHTML += `
              <li class="nav-item">
                  <a class="dropdown-item" href="profile.html">Profile</a>
              </li>
              <li class="nav-item">
                  <a class="dropdown-item" href="dash.html">Admin Panel</a>
              </li>
              <li class="nav-item">
                  <a id="logoutLink" class="dropdown-item" href="#" onclick="handlelogOut()">Logout</a>
              </li>
            `;
          } else {
            navbarMenu.innerHTML += `
              <li class="nav-item">
                  <a class="dropdown-item" href="profile.html">Profile</a>
              </li>
              <li class="nav-item">
                  <a id="logoutLink" class="dropdown-item" href="#" onclick="handlelogOut()">Logout</a>
              </li>
            `;
          }
        })
        .catch((error) => {
          console.error("Error fetching admin status:", error);
        });
    } else {
      navbarMenu.innerHTML += `
        <li class="nav-item">
          <a id="registerLink" class="dropdown-item" href="register.html">Register</a>
        </li>
        <li class="nav-item">
          <a id="loginLink" class="dropdown-item" href="login.html">Login</a>
        </li>
      `;
    }
  })
  .catch((error) => {
    console.error("Error fetching navbar:", error);
  });

















//  fetch("navbar.html")
//  .then((res) => res.text())
//  .then ((data) => {
//      document.getElementById("navbar").innerHTML = data;
 
 
//  // Authentication part 
 
//      const navbarMenu = document.getElementById("navbarMenu");
//      const token = localStorage.getItem("token");
//      console.log(token)
 
//      if (token) {
//          // User is logged in
//          navbarMenu.innerHTML = `
//              <li class="nav-item">
//                  <a class="dropdown-item" href="profile.html">Profile</a>
//              </li>
//                <li class="nav-item">
//                  <a class="dropdown-item" href="dash.html">Admin Panel</a>
//              </li>
//              <li class="nav-item">
//                  <a id="logoutLink" class="dropdown-item" href="#" onclick="handlelogOut()">Logout</a>
//              </li>
//          `;
//      } else {
//          // User is not logged in
//          navbarMenu.innerHTML = `
//              <li class="nav-item">
//                  <a id="registerLink" class="dropdown-item" href="register.html">Register</a>
//              </li>
//              <li class="nav-item">
//                  <a id="loginLink" class="dropdown-item" href="login.html">Login</a>
//              </li>
//          `;
//      }
 
 
 
//   })
 
 
 
 
 