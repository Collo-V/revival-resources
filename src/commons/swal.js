import Swal from "sweetalert2";

async function message({icon,title}){
    const Toast = Swal.mixin({
        toast: true,
        timer:3000,
        position: 'top',
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    Toast.fire({
        icon: icon,
        title: title
    })
}
async function confirmAction(action){
    let c = await Swal.fire({
        title: `Are you sure you want to ${action}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, ' + action,
        showClass:{
            title:'text-4 dark:bg-slate-700 dark:text-white'
        }
    })
    if (c.isConfirmed){
        return true
    }
}
export {
    message,confirmAction
}
