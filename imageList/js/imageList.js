(function () {
	"use strict";

	const csInterface = new CSInterface();

	function init() {
		// 테마 매니저를 초기화하고 현재 테마를 설정.
		themeManager.init();

		// 이벤트 리스너 등록 및 기타 초기화 코드를 여기에 추가할 수 있다.
	}

	$("#load-folder").click(function () {
		// ExtendScript에서 폴더를 선택하도록 호출
		csInterface.evalScript("selectFolder()", function (folderPath) {
			if (folderPath !== "null") {
				const folderName = folderPath.split("/").pop();
				const $imageList = $("#imageList");
				const $li = $("<li>").addClass("folder").text(folderName);
				const $subList = $("<ul>").css("display", "none");
				$li.append($subList);
				$li.click(function () {
					// 폴더의 접기/펼치기 기능 구현
					if ($subList.children().length) {
						$subList.slideToggle();
					} else {
						csInterface.evalScript(
							'getImagesInFolder("' + folderPath + '")',
							function (imagesJson) {
								const images = JSON.parse(imagesJson);
								images.forEach((image) => {
									if (image.type === "file") {
										// 폴더 내의 파일만 추가
										const $subLi = $("<li>").addClass("file").text(image.name);
										$subList.append($subLi);
									}
								});
								$subList.slideDown();
							},
						);
					}
				});
				$imageList.append($li);
			}
		});
	});

	// 파일 불러오기 기능
	$("#load-file").click(function () {
		// ExtendScript에서 파일을 선택하도록 호출
		csInterface.evalScript("selectFile()", function (filePath) {
			// console.log("File path from ExtendScript:", filePath);
			if (filePath !== "null") {
				// 이미지 리스트에 선택한 파일을 추가
				updateImageList([{ type: "file", path: filePath, name: filePath.split("/").pop() }]);
			}
		});
	});

	// 오름차순/내림차순 정렬 기능
	let sortOrder = "ascending";
	$("#sort").click(function () {
		const $imageList = $("#imageList");
		const $lis = $imageList.children("li").get();
		$lis.sort(function (a, b) {
			const textA = $(a).text().toUpperCase();
			const textB = $(b).text().toUpperCase();
			if (sortOrder === "ascending") {
				return textA.localeCompare(textB);
			} else {
				return textB.localeCompare(textA);
			}
		});
		sortOrder = sortOrder === "ascending" ? "descending" : "ascending";
		$.each($lis, function (index, item) {
			$imageList.append(item);
		});
	});

	// 파일 이름 필터 기능
	$("#filter").click(function () {
		const filterText = prompt("Enter filter text:");
		if (filterText) {
			const $imageList = $("#imageList");
			$imageList.children("li").each(function () {
				const $li = $(this);
				if ($li.text().includes(filterText)) {
					$li.show();
				} else {
					$li.hide();
				}
			});
		}
	});

	// 이미지 목록을 업데이트하는 함수
	function updateImageList(images, folderPath = "") {
		const $imageList = $("#imageList");
		console.log("파일 정보 객체", images);
		// folderPath가 있는 경우에는 폴더를 추가하고 해당 폴더를 클릭하면 하위 이미지를 표시
		if (folderPath) {
			const folderName = folderPath.split("/").pop(); // 폴더 이름 추출
			// 선택한 폴더 추가
			const $folder = $("<li>").addClass("folder").text(folderName);
			const $subList = $("<ul>").css("display", "none");
			$folder.append($subList);

			// 폴더 클릭 이벤트 핸들러
			$folder.click(function () {
				// 폴더의 접기/펼치기 기능 구현
				if ($subList.children().length) {
					$subList.slideToggle();
				} else {
					// 폴더 내의 이미지 정보를 가져와서 목록에 추가
					csInterface.evalScript(
						'getImagesInFolder("' + folderPath + '")',
						function (imagesJson) {
							const subImages = JSON.parse(imagesJson);
							subImages.forEach((subImage) => {
								if (subImage.type === "file") {
									// 폴더 내의 파일만 추가
									const $subLi = $("<li>").addClass("file").text(subImage.name);
									$subList.append($subLi);
								}
							});
							$subList.slideDown(); // 하위 목록 표시
						},
					);
				}
			});
			$imageList.append($folder); // 폴더를 이미지 목록에 추가
		} else {
			// folderPath가 없는 경우 (단일 파일 추가)
			images.forEach((image) => {
				console.log("이미지 타입 확인 : ", image.type);
				if (image.type === "file") {
					// 파일인 경우만 추가
					const $li = $("<li>").addClass("file").text(image.name);
					$imageList.append($li); // 이미지 목록에 파일 추가
				  console.log("이미지 리스트 목록 : ", $imageList);
				}
			});
		}
	}

	// init 함수를 호출하여 패널 초기화를 시작합니다.
	init();
})();
