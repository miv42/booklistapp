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

		viewCreateForm: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("createform");
		},

		viewClients: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("clients");
		},

        viewBooksCl: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("userview");
		},


		handleDelete(oEvent){
			var sBookPath = oEvent.getParameter('listItem').getBindingContext().getPath();
			this.getView().getModel().remove(sBookPath, {
				success: function(){
					MessageToast.show("Book deleted!");
				}
			});
		},
		
		onPress: function (oEvent) {
			var oCurrent = oEvent.getSource().getBindingContext().getObject();
            this.onUpdatePress(oCurrent);
		},

		onUpdatePress : function (oCurrent) {
            var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "Quickstart.view.UpdateView",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
                    oView.byId("ISBNInput").setValue(oCurrent.Isbn);
                    oView.byId("TitleInput").setValue(oCurrent.Title);
                    oView.byId("AuthorInput").setValue(oCurrent.Author);
                    oView.byId("DatePubInput").setValue(oCurrent.DatePublished);
                    oView.byId("LanguageInput").setValue(oCurrent.Language);
                    oView.byId("TotalBInput").setValue(oCurrent.TotalBooks);
                    oView.byId("AvailableBInput").setValue(oCurrent.AvailableBooks);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open(oCurrent);
			});
        },
		
		onCloseDialog : function () {
			this.byId("updetDialog").close();
		},

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

            oModel.update("/BooksSet('"+ oView.byId('ISBNInput').getValue() +"')", oData, {
                success: function (oResponseData){
                    oView.setBusy(false);
					this.onCloseDialog();
                }.bind(this),
                error: function() {
                    oView.setBusy(false);
                }
            });
		},

		onFilterBooks : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("bookList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
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