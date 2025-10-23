const swal = require("sweetalert");

const showSwal = (title, icon, buttons, text, confirmButtonText) => {
  swal({ title, icon, buttons, text, confirmButtonText });
};
export { showSwal };
