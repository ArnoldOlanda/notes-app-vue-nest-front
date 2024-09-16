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

export const mixin = ({ 
  title, 
  icon = 'success', 
  position = "top-end", 
  timer = 3000 
}) => {
  Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  }).fire({ icon: icon, title: title })
}
