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
    }
        
    init();

}());
    
