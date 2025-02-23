// script.js

// Reference to the "products" node in Firebase
const productsRef = database.ref("products");

// Handle form submission to add a new product
document.getElementById("addProductForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const productData = {
    product: document.getElementById("product").value,
    name_of_company1: document.getElementById("name_of_company1").value,
    item_name: document.getElementById("item_name").value,
    name_company: document.getElementById("name_company").value,
    product_name: document.getElementById("product_name").value,
    product_other_name: document.getElementById("product_other_name").value,
    product_type: document.getElementById("product_type").value,
    qty: parseInt(document.getElementById("qty").value) || 0,
    unit: document.getElementById("unit").value,
    supplier1: document.getElementById("supplier1").value,
    supplier2: document.getElementById("supplier2").value,
    supplier3: document.getElementById("supplier3").value,
    purchase_rate: parseFloat(document.getElementById("purchase_rate").value) || 0,
    sales_rate: parseFloat(document.getElementById("sales_rate").value) || 0,
    wholesale_rate: parseFloat(document.getElementById("wholesale_rate").value) || 0,
    dist_category: document.getElementById("dist_category").value,
    additional_notes: document.getElementById("additional_notes").value,
    no_of_pkg: parseInt(document.getElementById("no_of_pkg").value) || 0,
    gross_wt: parseFloat(document.getElementById("gross_wt").value) || 0,
    other_details: document.getElementById("other_details").value,
    created_at: Date.now()
  };

  // Push new product to Firebase
  productsRef.push(productData, function (error) {
    if (error) {
      displayMessage("Error adding product.", false);
    } else {
      displayMessage("Product added successfully!", true);
      document.getElementById("addProductForm").reset();
    }
  });
});

// Display messages to the user
function displayMessage(msg, success) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerHTML = `<div class="mb-4 p-4 ${success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded">${msg}</div>`;
  setTimeout(() => {
    messageDiv.innerHTML = "";
  }, 3000);
}

// Render the product list
function renderProducts(snapshot) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  snapshot.forEach(childSnapshot => {
    const key = childSnapshot.key;
    const product = childSnapshot.val();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.product_name || ""}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.dist_category || ""}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$${parseFloat(product.sales_rate).toFixed(2)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <a href="edit.html?id=${key}" class="text-custom hover:text-custom/80 mr-3"><i class="fas fa-edit"></i></a>
        <a href="#" onclick="deleteProduct('${key}')" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></a>
      </td>
    `;
    productList.appendChild(tr);
  });
}

// Listen for changes in the products node
productsRef.on("value", renderProducts);

// Delete a product from Firebase
function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    database.ref("products/" + id).remove()
      .then(() => {
        displayMessage("Product deleted successfully.", true);
      })
      .catch(() => {
        displayMessage("Error deleting product.", false);
      });
  }
}
