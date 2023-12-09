async function onSubmit(event) {
    event.preventDefault();
    let prod = event.target.product.value;
    let price = event.target.price.value;
    let category = event.target.category.value;
  
    let obj = {prod, price, category};
    try {
      const res = await axios.post(
        "https://crudcrud.com/api/b414992624a7437fb16c0c5e7be86cbd/order",obj);
      displayDetails(res.data, res.data.category);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function displayDetails(obj, catId) {
    const parentElement = document.getElementById(catId);
    const childElement = document.createElement("li");
    childElement.textContent = `Item:-${obj.prod}, Price:-${obj.price}`;
    parentElement.appendChild(childElement);
  
  
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = "delete";
    childElement.appendChild(btn);
  
    btn.onclick = async () => {
      try {
        const res = await axios.delete(
          `https://crudcrud.com/api/b414992624a7437fb16c0c5e7be86cbd/order/${obj._id}`
        );
        console.log("we have deleted", res);
      } catch (err) {
        console.log(err);
      }
      parentElement.removeChild(childElement);
    };
  
    const edt = document.createElement("input");
      edt.type = "button";
      edt.value = "edit";
      childElement.appendChild(edt);
      edt.onclick=async () => {
        try {
          const resp = await axios.delete(
            `https://crudcrud.com/api/b414992624a7437fb16c0c5e7be86cbd/order/${obj._id}`
          );
          console.log("we have deleted", resp);
        } catch (err) {
          console.log(err);
        }
        parentElement.removeChild(childElement);
      document.getElementById('product').value=obj.prod;
      document.getElementById('price').value=obj.price;
      document.getElementById('category').value=obj.category;
      }
  }
  
  async function fetchAndDisplayData() {
    try {
      const res = await axios.get(
        "https://crudcrud.com/api/b414992624a7437fb16c0c5e7be86cbd/order"
      );
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].category === "Electronics") {
          displayDetails(res.data[i], "Electronics");
        } else if (res.data[i].category === "Food Item") {
          displayDetails(res.data[i], "Food Item");
        } else {
          displayDetails(res.data[i], "Skin Care");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayData();
  });