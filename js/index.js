const scanButton = document.getElementById("nfc-read-button");
const content = document.getElementById("content");

scanButton.addEventListener("click", async () => {
  content.innerHTML = "Aproxime a TAG NFC, e o conteudo será mostrado.";
  console.log("User clicked scan button");

  const ndef = new NDEFReader();
  await ndef
    .scan()
    .then(() => {
      ndef.onreading = (event) => {
        const message = event.message;
        console.log(message);
        for (const record of message.records) {
          readUrlRecord(record);
        }
      };
    })
    .catch((error) => {
      console.log("Argh! " + error);
    });
});

const readUrlRecord = (record) => {
  console.assert(record.recordType === "url");
  const textDecoder = new TextDecoder();
  content.innerHTML = textDecoder.decode(record.data);
};
