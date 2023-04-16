let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");
let CommonCheckKDataFolder = require("../CheckKDataFolder");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.JSONFolderPath = GlobalDataPath;

    try {
        if (fs.statSync(LocalReturnData.JSONFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};

let ForJSONFolderExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalCommonCheckDataPK = CommonCheckKDataFolder.ForExistence();
    LocalReturnData.KDataPath = LocalCommonCheckDataPK.KDataPath;
    LocalReturnData.KDataJSONFolderPath = `${LocalReturnData.KDataPath}/JSON`;

    try {
        if (fs.statSync(LocalReturnData.KDataJSONFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};

// let LocalMockForExistence = ForJSONFolderExistence();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = {
    ForExistence,
    ForJSONFolderExistence
};
