function handleSwitchChange(event, id) {
  const isActive = event.target.checked;
  console.log("my id ,", id , isActive)
  fetch(`cat/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Failed to update category status");
      }
    })
    .catch((error) => console.error("Error:", error));
}
function handleAction(event, cats) {
  event.preventDefault();
  const action = event.target.value;
  const cat = JSON.parse(cats);
  console.log(cat);
  if (action === "edit") {
    document.querySelector('#event-modal input[name="title"]').value = cat.name;
    document.querySelector('#event-modal input[name="category"]').value =
      cat.description;
    document.querySelector(
      "#event-modal form"
    ).action = `cat/update/${cat._id}`;
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById("event-modal"));
    modal.show();
  } else if (action === "delete") {
    fetch(`/app/cat/delete/${cat._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cat }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          console.log("categoryRow${id}");
          console.log(document.getElementById(`categoryRow${cat._id}`));
          document.getElementById(`categoryRow${cat._id}`).remove();
        } else {
          alert("Failed to delete category");
        }
      })
      .catch((err) => console.log("err000 :", err));
  }
}
