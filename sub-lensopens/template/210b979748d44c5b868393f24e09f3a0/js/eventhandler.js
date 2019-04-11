
function removeClass(element, className) {
	element.className = element.className.replace(className,'');
}
function addClass(element, className) {
	element.classList.add(className);
}
function addToCartSuccess (e) {

	var prodId = e.detail.target.getAttribute("data-zs-product-id");

	var addcartButton = e.detail.target;
	var cartDetailsIconButton = addcartButton.querySelectorAll('[data-theme-cart-button-icon="data-theme-cart-button-icon"]')[0];
	var cartButtonText = addcartButton.querySelectorAll('[data-theme-cart-button-text="theme-cart-button-text"]')[0];
	var cartButtonLoading = addcartButton.querySelectorAll('[data-theme-cart-button-loading="theme-cart-button-loading"]')[0];

	var thumbnailImages = document.querySelectorAll('[data-thumbnail]');
	var thumbanailcontainer = document.querySelectorAll('[data-theme-thumbnail-container="theme-thumbnail-container-'+prodId+'"]')[0];
	var detailImage = document.querySelectorAll('[data-detail-image="theme-detail-image"]')[0];

	var thumbcontainerProdId = document.querySelectorAll('[data-thumbnail-prod-id="'+prodId+'"]')[0];

	if(thumbcontainerProdId){
		var detailImageUrl = thumbcontainerProdId.querySelectorAll('[data-thumbnail-active]');
	}
	var firstImgUrl;

	if(thumbcontainerProdId){
		for(iurl=0;iurl<detailImageUrl.length;iurl++){
			var imgUrl = detailImageUrl[iurl].getAttribute('data-thumbnail-active');
			if (iurl == 0) {
				detailImageUrl[iurl].click();
			}
		}
	}
	for(ti=0;ti<thumbnailImages.length;ti++){
		if(thumbnailImages[ti]){
			thumbnailImages[ti].style.display = 'flex';
		}
	}
	if(thumbanailcontainer){
		thumbanailcontainer.style.display = "flex";
	}
	if(thumbanailcontainer){
		activeThumbnail();
	}

	if(cartButtonText){
		cartButtonText.style.display = "block";
		removeClass(addcartButton,'theme-cart-loading-container');
	}
	if(cartDetailsIconButton){
		cartDetailsIconButton.style.display = "block";
	}
	if(cartButtonLoading){
		cartButtonLoading.style.display = "none";
	}

	var prodId = e.detail.target.getAttribute("data-zs-product-id");
	var errorContainer = document.querySelectorAll('[data-theme-error="theme-error-message-'+prodId+'"]')[0];

	var nameContainer = document.querySelectorAll('[data-cart-add-success-prod-name="theme-cart-add-success-prod-name"]')[0];

	if(errorContainer){
		errorContainer.style.display = "none";
		errorContainer.innerHTML = "";
	}

	var nameContianer = document.querySelectorAll('[data-cart-add-success-prod-name="theme-cart-add-success-prod-name"]')[0];
	var cartAddSuccess = document.querySelectorAll('[data-cart-add-success="theme-cart-add-success"]')[0];
	var cartAddSuccessDetail = document.querySelectorAll('[data-cart-add-success="theme-cart-add-success-detail"]')[0];
	var quickLookContainer = document.getElementById("product_quick_look");

	if(cartAddSuccess){
		addClass(cartAddSuccess,'theme-cart-success');
		removeClass(cartAddSuccess,'theme-cart-success-remove');
	}
	if(cartAddSuccessDetail){
		addClass(cartAddSuccessDetail,'theme-cart-success');
		removeClass(cartAddSuccessDetail,'theme-cart-success-remove');
		if(cartAddSuccess){
			addClass(cartAddSuccess,'theme-cart-success-remove');
			setTimeout(function() {
				removeClass(cartAddSuccess,'theme-cart-success-remove');
			},3100);
		}
	}



	var detail = e.detail;
	var variantId = detail.target.getAttribute("data-zs-product-variant-id");
	var lineItems = detail.cart.items;
	var currentLineItem;
	resetSelect();

	for (var lineItem of lineItems) {
		if (lineItem.variant_id == variantId) {
			currentLineItem = lineItem;
			break;
		}
	}

	nameContainer.innerHTML = currentLineItem.name;

	cart.init();

}
function closemessage(){
	var cartAddSuccess = document.querySelectorAll('[data-cart-add-success="theme-cart-add-success"]')[0];
	var cartAddSuccessDetail = document.querySelectorAll('[data-cart-add-success="theme-cart-add-success-detail"]')[0];
	var quickLookContainer = document.getElementById("product_quick_look");
	if(cartAddSuccess){
		addClass(cartAddSuccess,'theme-cart-success-remove');
		removeClass(cartAddSuccess,'theme-cart-success');
	}
	if(cartAddSuccessDetail){
		addClass(cartAddSuccessDetail,'theme-cart-success-remove');
		removeClass(cartAddSuccessDetail,'theme-cart-success');
	}
	if(quickLookContainer){
		closeProductQuickLook();
	}
}

function resetSelect(e){
	var VariantRadio = document.querySelectorAll('[data-zs-attribute-option]');
	var productIds = new Set();
	for(vr=0;vr<VariantRadio.length;vr++){
		VariantRadio[vr].checked = false;
		var productId = VariantRadio[vr].getAttribute("data-zs-product-id");
		productIds.add(productId);
	}
	if(typeof product_option != "undefined"){
		productIds.forEach(product_option.resetAddToCart);
	}
	var allStocks = document.querySelectorAll("[data-variant-id-stock]");
	for(sa=0;sa<allStocks.length;sa++){
		allStocks[sa].style.display = 'none';
	}
	var dataResetQuantity = document.querySelectorAll("[data-theme-quantity]");
	for(qr=0;qr<dataResetQuantity.length;qr++){
		dataResetQuantity[qr].value = 1 ;
	}
}
window.onload = function(){
	resetSelect();
}

function addToCartFailure (e) {

	var addcartButton = e.detail.target;
	var cartDetailsIconButton = addcartButton.querySelectorAll('[data-theme-cart-button-icon="data-theme-cart-button-icon"]')[0];
	var cartButtonText = addcartButton.querySelectorAll('[data-theme-cart-button-text="theme-cart-button-text"]')[0];
	var cartButtonLoading = addcartButton.querySelectorAll('[data-theme-cart-button-loading="theme-cart-button-loading"]')[0];
	if(cartButtonText){
		cartButtonText.style.display = "block";
		removeClass(addcartButton,'theme-cart-loading-container');
	}
	if(cartDetailsIconButton){
		cartDetailsIconButton.style.display = "block";
	}
	if(cartButtonLoading){
		cartButtonLoading.style.display = "none";
	}

	var cartAddFailure = document.querySelectorAll('[data-cart-add-failure="theme-cart-add-failure"]')[0];
	var cartAddFailureDetail = document.querySelectorAll('[data-cart-add-failure="theme-cart-add-failure-detail"]')[0];

	var cartResponse = e.detail.response.cart_details.message;
	var cartFailureDetail = document.querySelectorAll('[data-theme-failure-reason="theme-failure-reason"]')[0];
  cartFailureDetail.innerHTML = cartResponse;

	if(cartAddFailure){
		addClass(cartAddFailure,'theme-cart-failure');
		removeClass(cartAddFailure,'theme-cart-failure-remove');
	}
	if(cartAddFailureDetail){
		addClass(cartAddFailureDetail,'theme-cart-failure');
		removeClass(cartAddFailureDetail,'theme-cart-failure-remove');
		if(cartAddFailure){
			addClass(cartAddFailure,'theme-cart-failure-remove');
			setTimeout(function() {
				removeClass(cartAddFailure,'theme-cart-failure-remove');
			},3100);
		}
	}
	setTimeout(function() {
		if(cartAddFailure){
			addClass(cartAddFailure,'theme-cart-failure-remove');
			removeClass(cartAddFailure,'theme-cart-failure');
		}
		if(cartAddFailureDetail){
			addClass(cartAddFailureDetail,'theme-cart-failure-remove');
			removeClass(cartAddFailureDetail,'theme-cart-failure');
		}
	}, 3000);
}

function updateToCartSuccess (e) {
	var cartUpdateSuccess = document.querySelectorAll('[data-cart-update-success="theme-cart-update-success"]')[0];
	var cartNameContainer = document.querySelectorAll('[data-cart-update-success-product-name="theme-cart-update-success-product-name"]')[0];
	addClass(cartUpdateSuccess,'theme-cart-success');
	removeClass(cartUpdateSuccess,'theme-cart-success-remove');

	var errorflagId = e.detail.target.getAttribute('data-zs-product-variant-id');
  var errorContainerCart = document.querySelectorAll('[data-quantity-error-cart="'+errorflagId+'"]')[0];
  errorContainerCart.style.display = 'none';

	setTimeout(function() {
		addClass(cartUpdateSuccess,'theme-cart-success-remove');
		removeClass(cartUpdateSuccess,'theme-cart-success');
	}, 3000);


	var updateCartButton = e.detail.target;
	removeClass(updateCartButton,'theme-cart-updating');

	var detail = e.detail;
	var variantId = detail.target.getAttribute("data-zs-product-variant-id");
	var lineItems = detail.cart.line_items;

	var currentLineItem;

	for (var lineItem of lineItems) {
		if (lineItem.item_id == variantId) {
			currentLineItem = lineItem;
			break;
		}
	}

	cartNameContainer.innerHTML = currentLineItem.name;

	cart.init();
}

function showUpdate(cartitem){
	var updateButton =  document.querySelectorAll('[data-theme-update="'+cartitem+'"]')[0];
	updateButton.style.display = 'block';
}

function updateToCartFailure (e) {
	var cartUpdateFailure = document.querySelectorAll('[data-cart-update-failure="theme-cart-update-failure"]')[0];

	var cartResponse = e.detail.response.cart_details.message;
	var cartFailureDetail = document.querySelectorAll('[data-theme-update-failure-reason="theme-update-failure-reason"]')[0];
  cartFailureDetail.innerHTML = cartResponse;

	addClass(cartUpdateFailure,'theme-cart-failure');
	removeClass(cartUpdateFailure,'theme-cart-failure-remove');
	setTimeout(function() {
		addClass(cartUpdateFailure,'theme-cart-failure-remove');
		removeClass(cartUpdateFailure,'theme-cart-failure')
	}, 3000);

	var updateCartButton = e.detail.target;
	removeClass(updateCartButton,'theme-cart-updating');
	updateCartButton.style.display = 'block';
}

function deleteFromCartSuccess (e) {
	var cartDeleteSuccess = document.querySelectorAll('[data-cart-delete-success="theme-cart-delete-success"]')[0];
	addClass(cartDeleteSuccess,'theme-cart-success');
	removeClass(cartDeleteSuccess,'theme-cart-success-remove');
	setTimeout(function() {
		addClass(cartDeleteSuccess,'theme-cart-success-remove');
		removeClass(cartDeleteSuccess,'theme-cart-success');
	}, 3000);

	var deleteButtonElem = e.detail.target;
	removeClass(deleteButtonElem,'theme-cart-item-removing');

	var lineItemCount = parseInt(document.querySelectorAll('[data-zs-view-cart-count]')[0].textContent);
	var cartTableHead = document.querySelectorAll('[data-cart-table]');
	var cartNotEmptyMessage = document.querySelectorAll('[data-cart-empty-message]');
	var cartEmptyShoppingButton = document.querySelectorAll('[data-cart-empty-shopping-button]');
	var cartEmptyCheckoutButton = document.querySelectorAll('[data-cart-empty-checkout-button]');

	if (lineItemCount == 0) {
		addClass(cartTableHead[0],'theme-cart-empty')
		removeClass(cartNotEmptyMessage[0],'theme-cart-error-message-not-empty');
		addClass(cartNotEmptyMessage[0],'theme-cart-error-empty-message');
		addClass(cartEmptyShoppingButton[0],'theme-cart-empty-shopping-button');
		addClass(cartEmptyCheckoutButton[0],'theme-cart-empty-checkout-buton');
	}
}

function deleteFromCartFailure (e) {

	var deleteButtonElem = e.detail.target;

	var cartResponse = e.detail.response.cart_details.message;
	var cartFailureDetail = document.querySelectorAll('[data-theme-delete-failure-reason="theme-delete-failure-reason"]')[0];
  cartFailureDetail.innerHTML = cartResponse;

	removeClass(deleteButtonElem,'theme-cart-item-removing');

	var cartDeleteFailure = document.querySelectorAll('[data-cart-delete-failure="theme-cart-delete-failure"]')[0];
	addClass(cartDeleteFailure,'theme-cart-failure');
	removeClass(cartDeleteFailure,'theme-cart-failure-remove');
	setTimeout(function() {
		addClass(cartDeleteFailure,'theme-cart-failure-remove');
		removeClass(cartDeleteFailure,'theme-cart-failure');
	}, 3000);
}

function addToCartWithInvalidVariant (e) {

	var prodId = e.detail.target.getAttribute("data-zs-product-id");

	var attributes = document.querySelectorAll("[data-zs-attribute-select][data-zs-product-id='" + prodId + "']");
	attributesLength = attributes.length;

	for (atr=0;atr<attributesLength;atr++) {

		var attribute = attributes[atr];

		var attributeTagName = attribute.tagName;

		var errorAttr = document.querySelectorAll("[data-error-select-flag='" + prodId + "']");

		var errorAttrVal = attribute.getAttribute("data-zs-attribute-name") + attribute.getAttribute("data-zs-product-id");
		var errorContainer = document.querySelector('[data-variant-error="theme-data-error-'+errorAttrVal+'"]');

		errorContainer.style.display = "none";
		if (attributes[atr].selectedIndex === 0 && attributeTagName == 'SELECT') {
			errorContainer.style.display = "block";
		}
		if(attributeTagName != 'SELECT'){
			var radioSelect = attributes[atr].querySelectorAll('[data-zs-attribute-option]');
			radioSelectLength = radioSelect.length;
			for(rs=0;rs<radioSelectLength;rs++){
				radioSelected = radioSelect[rs].checked;
				if(radioSelected){
					errorContainer.style.display = "none";
					break;
				}
			}
			if(!radioSelected){
				errorContainer.style.display = "block";
			}
		}

	}
	var errorContainerCommon = document.querySelectorAll('[data-theme-error="theme-error-message-'+prodId+'"]')[0];
	errorContainerCommon.className = ' theme-variant-select-error';
	errorContainerCommon.style.display = 'inline-block';
	errorContainerCommon.innerHTML = i18n.get("product.message.error.select_variant");
}

function invalidProductQuantity (e) {

	var prodId = e.detail.quantityElement.getAttribute("data-zs-product-id");

	if(e.detail.view != 'cart'){
		var errorContainer = document.querySelectorAll('[data-theme-error="theme-error-message-'+prodId+'"]')[0];
		errorContainer.style.display = 'block';
		errorContainer.className = ' theme-variant-select-error';
		errorContainer.innerHTML = i18n.get("product.message.error.invalid_quantity");
	}
	if(e.detail.view == 'cart'){
    var errorFlagInput = e.detail.quantityElement;
    errorFlagInputId = errorFlagInput.getAttribute('data-zs-product-variant-id');
    var errorContainerCart = document.querySelectorAll('[data-quantity-error-cart="'+errorFlagInputId+'"]')[0];
    errorContainerCart.style.display = 'block';
  }
	var cartDetailsIconButton = document.querySelectorAll('[data-theme-cart-button-icon="data-theme-cart-button-icon"]');
	cartDetailsIconButtonLength = cartDetailsIconButton.length;
	var cartButtonText = document.querySelectorAll('[data-theme-cart-button-text="theme-cart-button-text"]');
	cartButtonTextLength = cartButtonText.length;
	var cartButtonLoading = document.querySelectorAll('[data-theme-cart-button-loading="theme-cart-button-loading"]');
	cartButtonLoadingLength = cartButtonLoading.length;
  for(ct=0;ct<cartButtonTextLength;ct++){
		if(cartButtonText[ct]){
			cartButtonText[ct].style.display = "block";
		}
	}
	for(cdl=0;cdl<cartDetailsIconButtonLength;cdl++){
		if(cartDetailsIconButton[cdl]){
			cartDetailsIconButton[cdl].style.display = "block";
		}
	}
	for(cl=0;cl<cartButtonLoadingLength;cl++){
		if(cartButtonLoading[cl]){
			cartButtonLoading[cl].style.display = "none";
		}
	}

}

function selectAttribute (e) {

	var productId = e.detail.currentOption.getAttribute("data-zs-product-id");

	var errorContainer = document.querySelectorAll('[data-theme-error="theme-error-message-'+productId+'"]')[0];

	errorContainer.style.display = 'none';
	errorContainer.innerHTML = "";

	var attributes = document.querySelectorAll("[data-zs-attribute-select][data-zs-product-id='" + productId + "']");
	attributesLength = attributes.length;

	for (atr=0;atr<attributesLength;atr++) {

		var attributeTagName = attributes[atr].tagName;

		var attribute = attributes[atr];

		var errorAttrVal = attribute.getAttribute("data-zs-attribute-name") + attribute.getAttribute("data-zs-product-id");
		var errorVariantContainer = document.querySelector('[data-variant-error="theme-data-error-'+errorAttrVal+'"]');

		if (attributes[atr].selectedIndex != 0 && attributeTagName == 'SELECT') {
			errorVariantContainer.style.display = "none";
		}
		if(attributeTagName != 'SELECT'){
			var radioSelect = attributes[atr].querySelectorAll('[data-zs-attribute-option]');
			radioSelectLength = radioSelect.length;
			for(rs=0;rs<radioSelectLength;rs++){
				radioSelected = radioSelect[rs].checked;
				if(radioSelected){
					errorVariantContainer.style.display = "none";
				}
			}
		}

	}

}

function invalidAttributeGroup (e) {

	var prodId = e.detail.target.getAttribute("data-zs-product-id");
	var errorContainer = document.querySelectorAll('[data-theme-error="theme-error-message-'+prodId+'"]')[0];

	errorContainer.className = ' theme-variant-select-error';
	errorContainer.style.display = 'inline-block';
	errorContainer.innerHTML = i18n.get("product.message.error.selected_invalid_group");

	var stockCartAttribute = document.querySelectorAll('[data-nostock-cart-add="theme-nostock-cart-add"]');
		for (sa=0;sa<stockCartAttribute.length;sa++){
			var cartButtonDisplay = stockCartAttribute[sa].style.display;
			if(cartButtonDisplay == 'none'){
				stockCartAttribute[sa].style.display = 'flex';
			}
		}
}

function addToCartLoading (e) {
	var addcartButton = e.detail.target;
	var cartDetailsIconButton = addcartButton.querySelectorAll('[data-theme-cart-button-icon="data-theme-cart-button-icon"]')[0];
	var cartButtonText = addcartButton.querySelectorAll('[data-theme-cart-button-text="theme-cart-button-text"]')[0];
	var cartButtonLoading = addcartButton.querySelectorAll('[data-theme-cart-button-loading="theme-cart-button-loading"]')[0];
	if(cartButtonText){
		cartButtonText.style.display = "none";
		addClass(addcartButton,'theme-cart-loading-container');
	}
	if(cartDetailsIconButton){
		cartDetailsIconButton.style.display = "none";
	}
	if(cartButtonLoading){
		cartButtonLoading.style.display = "flex";
	}
}
function updateToCartLoading (e) {
	var updateCartButton = e.detail.target;
	addClass(updateCartButton,'theme-cart-updating');
	updateCartButton.style.display = 'none';
}

function deleteFromCartLoading (e) {
	var deleteButtonElem = e.detail.target;
	addClass(deleteButtonElem,'theme-cart-item-removing');
}

function imageOrder(e){
	var imageIds = e.detail.image_ids;

	prodId = e.detail.productId;
	var thumbanailcontainer = document.querySelectorAll('[data-theme-thumbnail-container="theme-thumbnail-container-'+prodId+'"]')[0];

	if(thumbanailcontainer){
		var allImages = thumbanailcontainer.querySelectorAll("[data-zs-image-id]");
	}

	var first = true;
	var imageIdLength;
	if(imageIds.includes('-1')){
    	 imageIdLength = imageIds.length - 1;
	}
  else{
		imageIdLength = imageIds.length;
  }
	if(imageIdLength == 1){
		if(thumbanailcontainer){
    		thumbanailcontainer.style.display = 'none';
		}
  }
  else{
		if(thumbanailcontainer){
  		thumbanailcontainer.style.display = 'flex';
		}
  }
	if(thumbanailcontainer){
		for (var i = 0; i < allImages.length; i++) {
				var image = allImages[i];
				var imageId = image.getAttribute("data-zs-image-id");
				var previousDisplay = image.style.display;
				if (previousDisplay !== "none") {
						image.setAttribute("data-show-display", image.style.display);
				}
				image.style.display = "none";
				if (imageIds.indexOf(imageId) > -1) {
						image.style.display = image.getAttribute("data-show-display");
						if (first) {
								image.querySelector("img").click();
								first = false;
						}
				}
				if(imageIds.length == 0 || (imageIds.length == 1 && imageIds[0] == "-1")){
					image.style.display = "flex";
				}
		}
	}
}

function selectedVariant(e){
	var currentStock = e.detail.variant_id;
	var allStocks = document.querySelectorAll("[data-variant-id-stock]");
	var stockCartAttribute = document.querySelectorAll('[data-nostock-cart-add="theme-nostock-cart-add"]');
	var noStockQuantity = document.querySelectorAll("[data-nostock-quantity]");
	for(var i=0; i < allStocks.length; i++){
		stocks = allStocks[i];
		stock = stocks.getAttribute("data-variant-id-stock");
		stocks.style.display = 'none';
		if(stock == currentStock){
			var stockAvail = stocks.getAttribute('data-stock-avail');
			if(stockAvail == 'true'){
				stocks.style.display = 'inline-block';
				for (sa=0;sa<stockCartAttribute.length;sa++){
					stockCartAttribute[sa].style.display = 'none';
				}
				for(sq=0;sq<noStockQuantity.length;sq++){
					noStockQuantity[sq].style.display = 'none';
				}
				addClass(stocks,'theme-out-of-stock');
			}
			else{
				stocks.style.display = 'none';
				for (sa=0;sa<stockCartAttribute.length;sa++){
					stockCartAttribute[sa].style.display = 'flex';
				}
				for(sq=0;sq<noStockQuantity.length;sq++){
					noStockQuantity[sq].style.display = 'flex';
				}
				removeClass(stocks,'theme-out-of-stock');
			}
		}
	}
}


document.addEventListener("zp-event-add-to-cart-success", addToCartSuccess, false);
document.addEventListener("zp-event-add-to-cart-failure", addToCartFailure, false);
document.addEventListener("zp-event-update-to-cart-success", updateToCartSuccess, false);
document.addEventListener("zp-event-update-to-cart-failure", updateToCartFailure, false);
document.addEventListener("zp-event-delete-from-cart-success", deleteFromCartSuccess, false);
document.addEventListener("zp-event-delete-from-cart-failure", deleteFromCartFailure, false);
document.addEventListener("zp-event-add-to-cart-invalid-variant", addToCartWithInvalidVariant, false);
document.addEventListener("zp-event-invalid-product-quantity", invalidProductQuantity, false);
document.addEventListener("zp-event-attribute-selected", selectAttribute, false);
document.addEventListener("zp-event-attribute-group-invalid", invalidAttributeGroup, false);

document.addEventListener("zp-event-add-to-cart-loading", addToCartLoading, false);
document.addEventListener("zp-event-update-to-cart-loading", updateToCartLoading, false);
document.addEventListener("zp-event-delete-from-cart-loading", deleteFromCartLoading, false);

document.addEventListener("zp-event-image-ordered", imageOrder, false);
document.addEventListener("zp-event-selected-variant", selectedVariant, false);
