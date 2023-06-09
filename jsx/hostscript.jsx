// 다른 JSX 파일을 평가하고 실행하는 evalFile() 및 evalFiles() 함수
function evalFile(path) {
  try {
    $.evalFile(path);
  } catch (e) {
    alert("Exception:" + e);
  }
}

function evalFiles(jsxFolderPath) {
  var folder = new Folder(jsxFolderPath);
  if (folder.exists) {
    var jsxFiles = folder.getFiles("*.jsx");
    for (var i = 0; i < jsxFiles.length; i++) {
      var jsxFile = jsxFiles[i];
      try {
        $.evalFile(jsxFile);
      } catch (e) { 
        alert(e.message + "\n" + jsxFile);
      }
    }
  }
}