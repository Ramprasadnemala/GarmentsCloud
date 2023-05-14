import { FromNode as FromNodeFetchFuncsQrCodes } from "../../../../PullData/FetchFuncsQrCodes.js";
import { StartFunc as StartFuncShowOtherQrCodes } from "../../../../ToDom/ShowOtherQrCodes.js";
import { StartFunc as StartFuncChangeRowColour } from "../../../../ToDom/PurchaseTabs/PurchaseQrCodesTab/ChangeRowColour.js";
import { FromNode as FromNodeFetchFuncForSales } from "../../../../PullData/FetchFuncForSales.js";

let StartFunc = ({ inProjectName }) => {
    let ShowOtherQrCodesButtonId = document.getElementById("ShowOtherQrCodesButtonId");

    ShowOtherQrCodesButtonId.addEventListener("click", async () => {
        jVarLocalButtonClickFunc({ inProjectName });
    });
};

let jVarLocalButtonClickFunc = async ({ inProjectName }) => {
    let jVarLocalPurchasePk = document.getElementById("PurchasePkId");

    let jVarFromStartFuncFromShowQrCode = await FromNodeFetchFuncsQrCodes({
        inProjectName,
        inValueToCheck: jVarLocalPurchasePk.innerHTML
    });

    let jVarSaleData = await FromNodeFetchFuncForSales({
        inProjectName,
        inValueToCheck: jVarLocalPurchasePk.innerHTML
    });
    console.log("jVarSaleData : ", jVarSaleData);
    if (jVarFromStartFuncFromShowQrCode.KTF) {
        let jVarLocalClubbedData = jFLocalClubSaleData({
            inQrCodeData: jVarFromStartFuncFromShowQrCode.JsonData,
            inSaleData: jVarSaleData.JsonData
        });

        await StartFuncShowOtherQrCodes({ inData: jVarLocalClubbedData });
        StartFuncChangeRowColour();
    };
};

let jFLocalClubSaleData = ({ inQrCodeData, inSaleData }) => {
    let jVarLocalReturnData = inQrCodeData.map(element => {
        element.isSold = true;
        return element;
    });

    return jVarLocalReturnData;
};

export { StartFunc };