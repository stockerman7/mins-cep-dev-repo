(function () {
	"use strict";

	const csInterface = new CSInterface();

	function init() {
		// 테마 매니저를 초기화하고 현재 테마를 설정.
		themeManager.init();

		// 이벤트 리스너 등록 및 기타 초기화 코드를 여기에 추가할 수 있다.
	}

	// 폴더 불러오기 기능
	$("#load-folder").click(function () {
		// ExtendScript에서 폴더를 선택하도록 호출
		csInterface.evalScript("selectFolder()", function (folderPath) {
			if (folderPath !== "null") {
				// 폴더에서 이미지를 가져온 후 리스트를 업데이트
				csInterface.evalScript(
					`getImagesInFolder("${folderPath}")`,
					function (imagesJson) {
						const images = JSON.parse(imagesJson);
						updateImageList(images);
					},
				);
			}
		});
	});

	// 파일 불러오기 기능
	$("#load-file").click(function () {
		// ExtendScript에서 파일을 선택하도록 호출
		csInterface.evalScript("selectFile()", function (filePath) {
			if (filePath !== "null") {
				// 이미지 리스트에 선택한 파일을 추가
				updateImageList([{ path: filePath, name: filePath.split("/").pop() }]);
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
	function updateImageList(images) {
		const $imageList = $("#imageList");
		$imageList.empty();

		images.forEach((image) => {
			const $li = $("<li>").text(image.name);

			if (image.type === "folder") {
				$li.addClass("folder");
				$li.click(function () {
					// 폴더의 접기/펼치기 기능 구현
					const $subList = $li.next("ul");
					if ($subList.length) {
						$subList.slideToggle();
					} else {
						csInterface.evalScript(
							`getImagesInFolder("${image.path}")`,
							function (imagesJson) {
								const subImages = JSON.parse(imagesJson);
								const $subList = $("<ul>").css("display", "none");
								subImages.forEach((subImage) => {
									const $subLi = $("<li>").addClass("file").text(subImage.name);
									$subList.append($subLi);
								});
								$li.after($subList);
								$subList.slideDown();
							},
						);
					}
				});
			} else {
				$li.addClass("file");
			}
			$imageList.append($li);
		});
	}

	// init 함수를 호출하여 패널 초기화를 시작합니다.
	init();
})();