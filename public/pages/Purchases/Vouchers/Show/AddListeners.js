import { StartFunc as SaveFuncsStartFunc } from "./ButtonFuncs/InvTable/Footer/SaveFuncs.js";
import { StartFunc as ShowOnDomStartFunc } from "./ToDom/ShowOnDom.js";
import { StartFunc as StartFuncKeyPressFuncs } from "./Pages/Pricing/KeyPressFuncs.js";
import { ShowOnDom as ShowOnDomShowQrCode } from "../Show/ToDom/ShowQrCode.js";


let StartFunc = ({ inFolderName, inFileName, inItemName, inProjectName }) => {

    let jVarLocalInvTableFooterSaveButtonId = document.getElementById("InvTableFooterSaveButtonId");
    let jVarLocalSowDataID = document.getElementById("SowDataID");

    if (jVarLocalInvTableFooterSaveButtonId !== null) {
        jVarLocalInvTableFooterSaveButtonId.addEventListener("click", async (event) => {
            event.preventdefault()

            let LocalFromSave = await SaveFuncsStartFunc({
                inFolderName, inFileName, inItemName, inProjectName,
                inEvent: event
            });

            if (LocalFromSave.KTF) {
                await ShowOnDomStartFunc({
                    inFolderName, inFileName, inItemName, inProjectName,
                    inShowSuccess: true
                });
            };
        });
    };

    if (jVarLocalSowDataID !== null) {
        jVarLocalSowDataID.addEventListener("click", async (event) => {
            let localDatd = jVarGlobalData;

            await ShowOnDomShowQrCode({ inData: localDatd });

        });
    };
    StartFuncKeyPressFuncs();
};

export { StartFunc };