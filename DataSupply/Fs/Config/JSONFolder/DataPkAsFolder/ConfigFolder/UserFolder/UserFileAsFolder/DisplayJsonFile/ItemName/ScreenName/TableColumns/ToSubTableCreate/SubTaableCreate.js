let CommonPullDataFromConfig = require("../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../PushData/FromFoldFile");
let CommonColumnJsonFuncs = require("../../../../../../../../../../../../Fix/Json/SupplyJson");


let StartFunc = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, columnName }) => {
    let localDataPK = DataPK;
    let localFolderName = FolderName;
    let localFileName = FileName;
    let localItemName = ItemName;
    let localScreenName = ScreenName;
    let localcolumnName = columnName;
    let LocalFromUpdate;
    let localsubtableColumnArray;
    let LocalReturnObject = { KTF: false, JsonData: {}, KReason: "" };

    let LocalFromPullData = await CommonPullDataFromConfig.StartFunc({ inFolderName: localFolderName, inFileNameOnly: localFileName, inDataPK: localDataPK });
    if (LocalFromPullData.KTF === false) {
        LocalReturnObject.KReason = LocalFromPullData.KReason
        return await LocalReturnObject;

    };
    let LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();
    let LocalNewTableInfoObject = CommonColumnJsonFuncs.TableInfo();

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (localItemName in LocalNewData) {
        if (localScreenName in LocalNewData[localItemName]) {

            if (("SubTableColumns" in LocalNewData[localItemName][localScreenName]) == false) {
                LocalNewData[localItemName][localScreenName].SubTableColumns = {};

            };
            if (localcolumnName in LocalNewData[localItemName][localScreenName].SubTableColumns) {
                LocalReturnObject.KReason = `${localcolumnName} Aldready found !`;
                return await LocalReturnObject;

            };

            if ((localcolumnName in LocalNewData[localItemName][localScreenName].SubTableColumns) === false) {
                LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName] = {};

            };

            if (("TableColumns" in LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName]) === false) {
                LocalNewColumnObject.DisplayName = "FK"
                LocalNewColumnObject.DataAttribute = "FK"
                localsubtableColumnArray = LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName].TableColumns = [];
                localsubtableColumnArray.push(LocalNewColumnObject);

            };
            if (("TableInfo" in LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName]) === false) {
                LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName].TableInfo = LocalNewTableInfoObject;

            };

            LocalFromUpdate = await CommonFromPushData.StartFunc({
                inFolderName: localFolderName,
                inFileNameWithExtension: localFileName,
                inDataPK: localDataPK,
                inDataToUpdate: LocalNewData,
                inOriginalData: LocalFromPullData.JsonData
            });

            if (LocalFromUpdate.KTF) {
                LocalReturnObject.KTF = true;
            };

            return await LocalReturnObject;

        };

    };

    return await LocalReturnObject;
};

let mockFunc = () => {
    StartFunc({ DataPK: "1024", FolderName: "TransActions", FileName: "GST-PURCHASES", ItemName: "GST-PURCHASE", ScreenName: "Create", columnName: "VoucherName" });
};
// mockFunc();

module.exports = { StartFunc };