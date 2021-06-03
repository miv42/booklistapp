sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

 ], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("Quickstart.controller.App", {
      onOpenDialog : function () {
			this.getOwnerComponent().openHelloDialog();
		}
   });
 });