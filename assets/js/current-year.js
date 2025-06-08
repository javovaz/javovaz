    document.addEventListener('DOMContentLoaded', function () {
      const yearElement = document.getElementById('currentYear');
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      yearElement.textContent = year;
    });