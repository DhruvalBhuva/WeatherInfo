console.log("File linked");

const getInfo = async (e) => {
  const historyAPI = "http://localhost:8000/historyInfo";
  const response = await fetch(historyAPI);
  const data = await response.json();
  let history = [...data];
  //   console.log(history)

  let html = "";
  history.forEach((element, index) => {
    html += `<tr>
    <td>${element.city}</td>
    <td>${element.time}</td>
    <td>${element.day}</td>
    <td>${element.temp}</td>
    <td>${element.condition}</td>
    <td><button class="btn btn-danger" id="${element._id}"onclick="deleteNode(this.id)">Delete</button></td>
    </tr>`;
  });

  if (history.length != 0) {
    document.getElementById("tableBody").innerHTML = html;
  } else {
    document.querySelector(".table").innerHTML = "History Clear!";
  }
};
getInfo();

const deleteNode = async (id) => {
  console.log("Button clickd");
  console.log(id);
  const deleteAPI = `http://localhost:8000/delete/${id}`;
  await fetch(deleteAPI, { method: "DELETE" }).catch((error) =>
    console.log(error)
  );
  getInfo();
};

const deleteall = async () => {
  const clearAPI = `http://localhost:8000/clear`;
  await fetch(clearAPI, { method: "DELETE" }).catch((error) =>
    console.log(error)
  );
  getInfo();
};
