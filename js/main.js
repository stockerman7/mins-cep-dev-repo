/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    
    function init() {        

        themeManager.init();

        // 확장 경로 설정
        
		var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
        console.log("The JSX path is: " + extensionRoot);

        // 모든 JS를 이용해 모든 JSX 파일 호출
        csInterface.evalScript('evalFiles("' + extensionRoot + '")', function(res) {
            console.log(res)
        });  

        // manifest.xml에 먼저 지정된 hostscript.jsx 파일 호출 #1
        $("#firstJSXButton").click(function () {
            csInterface.evalScript('firstJSXFunction()', function (res) {
            	console.dir(res);
            });
        });

        // evalFiles로 미리 계산된 나머지 jsx 파일 함수 호출 #2
        $("#secondJSXButton").click(function () {
            csInterface.evalScript('secondJSXFunction()', function (res) {
                console.dir("Second Button: " + res);
            });
        });
    }
        
    init();

}());
    
