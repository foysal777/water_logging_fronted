

// const handlelogOut = () => {
//     const token = localStorage.getItem("token");
  
//     fetch("http://127.0.0.1:8000/account/logout/", {
//       method: "POST",
//       headers: {
//         Authorization: `Token ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         alert(" Do You want Log out ?")
//         localStorage.removeItem("token");
//         localStorage.removeItem("user_id");
//         window.location.href = "login.html";
//       });
//   };