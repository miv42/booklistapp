sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/core/routing/History"

 ], function (Controller, MessageToast, History) {
    "use strict";

    return Controller.extend("Quickstart.controller.CreateForm",{
        onSubmit: function (oEvent) {
			var oData;
            var oView = this.getView(),
                oModel = oView.getModel();

            oData = {
                Isbn: oView.byId('ISBNInput').getValue(),
                Author: oView.byId('AuthorInput').getValue(),
                Title: oView.byId('TitleInput').getValue(),
                DatePublished: new Date(oView.byId('DatePubInput').getValue()),
                Language: oView.byId('LanguageInput').getValue(),
                AvailableBooks: parseInt(oView.byId('AvailableBInput').getValue()),
                TotalBooks: parseInt(oView.byId('TotalBInput').getValue())
            };

            oView.setBusy(true);

            oModel.create("/BooksSet", oData, {
                success: function (oResponseData){
                    oView.setBusy(false);
                }.bind(this),
                error: function() {
                    oView.setBusy(false);
                }
            });
		},
        
        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		}
    });
 });