sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			
				if(sStatus < 10){
					return resourceBundle.getText("bookStatusA");
                }
				else if (10 <= sStatus && sStatus < 30){
					return resourceBundle.getText("bookStatusB");
                }
				else if( sStatus >= 30){
					return resourceBundle.getText("bookStatusC");
                }
                else{
                    return sStatus;
                }	
		}
	};
});