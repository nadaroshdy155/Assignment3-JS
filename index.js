var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");


var websites = [];

if(localStorage.getItem("websites")!=null){
  websites=JSON.parse(localStorage.getItem("websites"))
  displayWebsites();
}


function addURL() {
    var website = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
  
    websites.push(website);
    localStorage.setItem("websites",JSON.stringify(websites))
    displayWebsites();
    clearForm();
}


function deleteWebsite(index)
{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-danger mx-2",
        cancelButton: "btn btn-success mx-2"
    },
    buttonsStyling: false
});

swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
}).then((result) => {
    if (result.isConfirmed) {
        websites.splice(index, 1)
        displayWebsites()
        localStorage.setItem("websites", JSON.stringify(websites))
        swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
        });
    } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {
        swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your URL is safe :)",
            icon: "error"
        });
    }
});

}



function displayWebsites() 
{
    
var trs = "";
  for (var i = 0; i < websites.length; i++) {
    trs += `<tr>
    <td>${i}</td>
    <td>${websites[i].name}</td>
    <td>
    <a href="https://${websites[i].url}">
    <button class="btn btn-outline-success">Visit</button></a>
    </td>
    
<td>
  <button class="btn btn-outline-danger" onClick="deleteWebsite(${i})">Delete</button>
</td>
</tr>`;
  }

  document.getElementById("tBody").innerHTML=trs
}


function clearForm() {
  siteNameInput.value = ""
  siteUrlInput.value = ""
}
