document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:3000/api/categories');
  const categories = await response.json();

  const content = document.querySelector('#content');
  const categoriesList = document.createElement('ul');
  content.appendChild(categoriesList);
  categoriesList.innerHTML = categories.map((category) => `<li>${category.label}</li>`).join('');
});
