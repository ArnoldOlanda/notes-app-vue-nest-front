export const swal = ({ title, text, icon = 'info' }) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton: true,
    confirmButtonText: 'Ok',
    customClass: {
      confirmButton: 'btn btn-info text-white',
    },
  });
};

export const confirm = ({
  title,
  text,
  icon = 'warning',
  confirmButtonText = 'Si',
  cancelButtonText = 'No',
}) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    customClass: {
      confirmButton: 'btn btn-info text-white',
      cancelButton: 'btn',
    },
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });
};
