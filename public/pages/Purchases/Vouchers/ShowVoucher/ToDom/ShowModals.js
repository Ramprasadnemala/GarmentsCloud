import { StartFunc as StartFuncShowDataOnQrModal } from "./ShowDataOnQrModal.js";

let StartFunc = async () => {
    jVarLocalImageModalAddFuncs();
    jVarLocalModalForQrCodeOnlyFuncs();
};

let jVarLocalImageModalAddFuncs = () => {
    const exampleModal = document.getElementById('exampleModal');

    if (exampleModal) {
        exampleModal.addEventListener('show.bs.modal', event => {
            // Button that triggered the modal
            const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            const recipient = button.getAttribute('data-rowpk')
            // If necessary, you could initiate an Ajax request here
            // and then do the updating in a callback.

            // Update the modal's content.
            const modalTitle = exampleModal.querySelector('.modal-title')
            const modalBodyInput = exampleModal.querySelector('.modal-body input')
            let jVarLocalmodalfooter = exampleModal.querySelector(".modal-footer button.ModalButtonForImageClass");

            modalTitle.textContent = `QrCode : ${recipient}`;
            jVarLocalmodalfooter.dataset.rowpk = recipient;
        })
    };
};

let jVarLocalModalForQrCodeOnlyFuncs = () => {
    const exampleModal = document.getElementById('ModalForQrCodeOnly');

    if (exampleModal) {
        exampleModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget
            StartFuncShowDataOnQrModal({ inbutton: button });
        })
    };
};

let jVarLocalModalForQrCodeOnlyFuncs_Keshav_6Apr = () => {
    const exampleModal = document.getElementById('ModalForQrCodeOnly');

    if (exampleModal) {
        exampleModal.addEventListener('show.bs.modal', event => {
            // Button that triggered the modal
            const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            const recipientKSno = button.getAttribute('data-ksno')
            const recipient = button.getAttribute('data-rowpk')
            const jVarLocalproductname = button.getAttribute("data-productname");
            const jVarLocalSalePrice = button.getAttribute("data-saleprice");
            const jVarLocalUserdescription = button.getAttribute("data-Userdescription");
            const jVarLocalpurchasepk = button.getAttribute("data-purchasepk");
            const jVarLocalinventoryserial = button.getAttribute("data-inventoryserial");
            const jVarLocalAliesName = document.getElementById("AliesNameId").innerHTML;

            // Update the modal's content.
            const modalTitle = exampleModal.querySelector('.modal-title')
            const modalBodyInput = exampleModal.querySelector('.modal-body input')
            let jVarLocalmodalfooter = exampleModal.querySelector(".modal-footer button.ModalButtonForImageClass");
            let jVarOnModalQrCodeOnModalId = exampleModal.querySelector('#QrCodeOnModalId');
            let jVarOnModalProductNameModalId = exampleModal.querySelector('#ProductNameModalId');
            let jVarOnModalSalePriceModalModalId = exampleModal.querySelector('#SalePriceModalId');
            let jVarOnModalUserDescriptionModalId = exampleModal.querySelector('#UserDescriptionModalId');

            modalTitle.textContent = `QrCode : ${recipient}`;

            GenerateQrCodeOnModal({
                inQrData: `M-${recipient}/${jVarLocalproductname}/${jVarLocalAliesName}-${jVarLocalpurchasepk}-${jVarLocalinventoryserial}/${jVarLocalSalePrice}`,
                inCanvasId: document.getElementById("CanvasId")
            });

            jVarOnModalQrCodeOnModalId.innerHTML = `M-${recipient}`;
            jVarOnModalProductNameModalId.innerHTML = jVarLocalproductname;
            jVarOnModalSalePriceModalModalId.innerHTML = jVarLocalSalePrice;
            jVarOnModalUserDescriptionModalId.innerHTML = `${jVarLocalAliesName}-${jVarLocalpurchasepk}-${jVarLocalinventoryserial}`;

            //  jVarLocalmodalfooter.dataset.rowpk = recipient;
        })
    };
};

let GenerateQrCodeOnModal = ({ inQrData = "", inCanvasId }) => {
    var canvas = inCanvasId;
    canvas.height = 1;
    canvas.width = 1;
    canvas.style.visibility = 'hidden';

    // Convert the options to an object.
    let opts = {};

    // Finish up the options
    opts.text = inQrData;
    opts.bcid = "qrcode";
    opts.scaleX = 1;
    opts.scaleY = 1;
    opts.rotate = "N";

    // Draw the bar code to the canvas
    try {
        let ts0 = new Date;
        bwipjs.toCanvas(canvas, opts);
        show(ts0, new Date);
    } catch (e) {
        console.log("error : ", e);

        return;
    }

    function show(ts0, ts1) {
        canvas.style.visibility = 'visible';
    }
};

export { StartFunc, GenerateQrCodeOnModal };