sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, formatter, Filter, FilterOperator, MessageToast, Fragment,History) {
	"use strict";

	return Controller.extend("Quickstart.controller.BookList", {
        formatter: formatter,
		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
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
		},

        viewBookCl: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("userview");
		},
		
		onPress: function (oEvent) {
			var oCurrent = oEvent.getSource().getBindingContext().getObject();
            this.onCheckoutPress(oCurrent);
		},


		onCheckoutPress : function (oCurrent) {
            var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "Quickstart.view.CheckoutDialog",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
                    oView.byId("ISBNInput").setValue(oCurrent.Isbn);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open(oCurrent);
			});
        },
		
		onCloseDialog : function () {
			this.byId("checkoutDialog").close();
		},

		onSubmit: function (oEvent) {
			var oData;
            var oView = this.getView(),
                oModel = oView.getModel();

            oData = {
                Id: 0,
                FirstName: oView.byId('FirstNameInput').getValue(),
                LastName: oView.byId('LastNameInput').getValue(),
                Isbn: oView.byId('ISBNInput').getValue(),
                CheckoutDate: new Date('11.11.1999'),
                ReturnDate: new Date('11.11.1999')
            };

            oView.setBusy(true);

            oModel.create("/ClientsSet", oData, {
                success: function (oResponseData){
                    oView.setBusy(false);
                    this.onCloseDialog();
                }.bind(this),
                error: function() {
                    oView.setBusy(false);
                }
            });
		},

	});
});