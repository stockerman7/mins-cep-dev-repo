// 1. 다른 JSX 파일을 평가하고 실행하는 evalFile() 및 evalFiles() 함수
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

// 2. 사용자가 폴더를 선택하고 해당 폴더 경로를 반환하는 selectFolder() 함수
function selectFolder() {
  var folder = Folder.selectDialog("Select a folder");
  return folder ? folder.fsName : null;
}

// 3. 사용자가 파일을 선택하고 해당 파일 경로를 반환하는 selectFile() 함수
function selectFile() {
  var file = File.openDialog("Select an image file", "*.jpg;*.jpeg;*.png;*.gif");
  return file ? file.fsName : null;
}

// 4. 특정 폴더에서 이미지 파일 및 하위 폴더를 가져오는 getImagesInFolder() 함수
function getImagesInFolder(folderPath) {
  var folder = new Folder(folderPath);
  var files = folder.getFiles();
  var images = [];

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (file instanceof Folder) {
      images.push({ type: "folder", path: file.fsName, name: file.name });
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
      images.push({ type: "file", path: file.fsName, name: file.name });
    }
  }
  return JSON.stringify(images);
}