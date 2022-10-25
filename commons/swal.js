import Swal from "sweetalert2";

async function confirmAction(action) {
    action = action??'delete'
    let c = await Swal.fire({
        title: 'Confirm '+ action,
        text: 'Do you want to continue',
        // icon: 'error',
        confirmButtonText: 'Yes',
        showCancelButton:true,
        cancelButtonText:'cancel'
    })
    if (c.isConfirmed){
        return true
    }
    if (c.isDenied){
        return false
    }

}

async function report({icon,title}){
    const Toast = Swal.mixin({
        toast: true,
        timer:3000,
        position: 'top',
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInUP'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    })

    await Toast.fire({
        icon,
        title
    })
}

export {
    confirmAction,report
}
