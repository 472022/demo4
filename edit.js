// edit.js

// Helper: Get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  const productId = getQueryParam("id");
  if (!productId) {
    alert("No product ID provided.");
    window.location.href = "index.html";
  }
  
  // Reference to the specific product in Firebase
  const productRef = database.ref("products/" + productId);
  
  // Populate form fields with product data
  productRef.once("value", snapshot => {
    const productData = snapshot.val();
    if (productData) {
      document.getElementById("product").value = productData.product || "";
      document.getElementById("name_of_company1").value = productData.name_of_company1 || "";
      document.getElementById("item_name").value = productData.item_name || "";
      document.getElementById("name_company").value = productData.name_company || "";
      document.getElementById("product_name").value = productData.product_name || "";
      document.getElementById("product_other_name").value = productData.product_other_name || "";
      document.getElementById("product_type").value = productData.product_type || "";
      document.getElementById("qty").value = productData.qty || 0;
      document.getElementById("unit").value = productData.unit || "";
      document.getElementById("supplier1").value = productData.supplier1 || "";
      document.getElementById("supplier2").value = productData.supplier2 || "";
      document.getElementById("supplier3").value = productData.supplier3 || "";
      document.getElementById("purchase_rate").value = productData.purchase_rate || 0;
      document.getElementById("sales_rate").value = productData.sales_rate || 0;
      document.getElementById("wholesale_rate").value = productData.wholesale_rate || 0;
      document.getElementById("dist_category").value = productData.dist_category || "";
      document.getElementById("additional_notes").value = productData.additional_notes || "";
      document.getElementById("no_of_pkg").value = productData.no_of_pkg || 0;
      document.getElementById("gross_wt").value = productData.gross_wt || 0;
      document.getElementById("other_details").value = productData.other_details || "";
    } else {
      alert("Product not found.");
      window.location.href = "index.html";
    }
  });
  
  // Handle form submission for update
  document.getElementById("editProductForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const updatedData = {
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
  
    productRef.set(updatedData, function (error) {
      const messageDiv = document.getElementById("message");
      if (error) {
        messageDiv.innerHTML = `<div class="mb-4 p-4 bg-red-100 text-red-700 rounded">Error updating product.</div>`;
      } else {
        messageDiv.innerHTML = `<div class="mb-4 p-4 bg-green-100 text-green-700 rounded">Product updated successfully!</div>`;
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      }
    });
  });
  