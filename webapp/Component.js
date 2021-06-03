sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
	"./controller/HelloDialog"
    
 ], function (UIComponent, JSONModel, HelloDialog) {
    "use strict";

    return UIComponent.extend("Quickstart.Component", {
        metadata : {
            manifest: "json"
        },
        
        metadata : {
            "rootView": {
               "viewName": "Quickstart.view.App",
               "type": "XML",
               "async": true,
               "id": "app"
            }
        },

        init : function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            // set data model
            // var oData = {
            //     recipient : {
            //     name : "World"
            //     }
            // };
            // var oModel = new JSONModel(oData);
            // this.setModel(oModel);

            // set dialog
            this._helloDialog = new HelloDialog(this.getRootControl());
            // create the views based on the url/hash
			this.getRouter().initialize();
        },


		exit : function() {
			this._helloDialog.destroy();
			delete this._helloDialog;
		},

		openHelloDialog : function () {
			this._helloDialog.open();
		}

    });
 });