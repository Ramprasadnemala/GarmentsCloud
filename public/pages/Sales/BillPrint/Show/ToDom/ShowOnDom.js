import { FromNode } from "../PullData/FetchFuncs.js";
import { FromNode as FetchFuncForBillsQrCode } from "../PullData/FetchFuncForBillsQrCode.js";
import { ReturnRowPK } from "../urlSearchParams.js";
import { StartFunc as InvGridStartFunc } from "./InvGrid.js";
import { StartFunc as TableFootSuccessStartFunc } from "../FetchFuncs/HtmlPull/TableFootSuccess.js";
import { StartFunc as FetchFuncsForMasters } from "../PullData/FetchFuncsForMasters.js";
import { StartFunc as StartFuncInventoryGrid } from "./InventoryGrid/PrepareData.js";

let StartFunc = async ({ inFolderName, inFileName, inItemName, inProjectName, inShowSuccess }) => {
    let jVarLocalRowPk = ReturnRowPK();

    let jVarLocalData = await FromNode({
        inFolderName,
        inFileName,
        inItemName,
        inRowPK: jVarLocalRowPk.RowPK,
        inProjectName
    });

    if (jVarLocalData.KTF) {
        let localindataJson = jVarLocalData.JsonData
        ShowOnDom({ inData: localindataJson, inShowSuccess });

        // await localInventeryShow({ inFolderName, inFileName, inItemName, inProjectName, inShowSuccess, inRowPk: jVarLocalRowPk.RowPK })

        await StartFuncInventoryGrid({ inFolderName, inFileName, inItemName, inProjectName, inShowSuccess, inRowPk: jVarLocalRowPk.RowPK })
    };
};

let localInventeryShow = async ({ inFolderName, inFileName, inItemName, inProjectName, inRowPk }) => {
    let localpk = inRowPk

    let jVarLocalDataToShow = await FetchFuncForBillsQrCode({
        inFolderName,
        inFileName,
        inItemName,
        inRowPK: localpk,
        inProjectName
    });

    if (jVarLocalDataToShow.KTF) {
        let localdata = jVarLocalDataToShow.JsonData

        await FetchFuncsForMasters({ inProjectName });

        await InvGridStartFunc({ inData: localdata });
    };
};

let ShowOnDom = ({ inData, inShowSuccess }) => {
    let jVarLocalVoucherNameId = document.getElementById("VoucherNameId");
    let jVarLocalCustomerNameId = document.getElementById("CustomerNameId");

    let jVarLocalBillNumberId = document.getElementById("BillNumberId");
    let jVarLocalDateId = document.getElementById("DateId");

    if (jVarLocalCustomerNameId !== null) {
        jVarLocalCustomerNameId.innerHTML = inData.CustomerName;
    };

    if (jVarLocalVoucherNameId !== null) {
        jVarLocalVoucherNameId.innerHTML = inData.Date;
    };


    if (jVarLocalBillNumberId !== null) {
        jVarLocalBillNumberId.innerHTML = inData.BillNumber;
    };

    if (jVarLocalDateId !== null) {
        jVarLocalDateId.innerHTML = inData.Date;
    };

    ShowSuccessFunc({ inShowSuccess });
};

let ShowSuccessFunc = ({ inShowSuccess }) => {
    if (inShowSuccess) {
        let LocalFromHtml = TableFootSuccessStartFunc();
        let LocalTableFooterSuccessId = document.getElementById("TableFooterSuccessId");

        if (LocalFromHtml.KTF) {
            LocalTableFooterSuccessId.innerHTML = LocalFromHtml.HtmlString;
        };
    };
};

export { StartFunc };