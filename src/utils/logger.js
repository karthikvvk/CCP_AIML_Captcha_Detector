export const saveLogsToFile = (logs) => {
    const logBlob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(logBlob);
    link.download = "logs.json";
    link.click();
};
