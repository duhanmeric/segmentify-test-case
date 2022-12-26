const selectors = {
  brandList: "#brand-list",
  brandBanner: ".banner-link",
  productArea: ".product-area",
  addedToBasketPopup: ".js-popup",
  closePopupBtn: ".js-popup-close",
};

class Tabs {
  constructor(jsonFile) {
    this.jsonFile = jsonFile;
    this.brandList = $(selectors.brandList)[0];
    this.brandBanner = $(selectors.brandBanner)[0];
    this.productArea = $(selectors.productArea)[0];
    this.basketPopup = $(selectors.addedToBasketPopup)[0];
    this.closePopupBtn = $(selectors.closePopupBtn)[0];
    this.init();
  }

  init() {
    this.createSidebarElement();
    this.onHoverItem();
    this.addToBasket();
    this.closePopup();
  }

  createSidebarElement() {
    this.jsonFile.forEach((brand) => {
      this.brandList.innerHTML += this.getSidebarItemTemplate(brand);
    });
  }

  createProductItemElement(brandName) {
    this.productArea.innerHTML = "";
    this.jsonFile.forEach((brand) => {
      if (brand.brandName === brandName) {
        brand.products.forEach((prd, j) => {
          this.productArea.innerHTML += this.getProductItemTemplate(prd);
        });
      }
    });
  }

  getSidebarItemTemplate(brand) {
    const brandThumbTemplate = `<li data-title="${brand.brandName}" class="brand-list-item">
        <a class="brand-list-item-link" href="${brand.brandUrl}">
            <img loading="lazy" class="brand-list-item-img" src="${brand.brandLogo}" alt="${brand.brandName}" />
        </a>
        <a class="mobile-brand-list-item-link js-mobile-brand-list-item-link">${brand.brandName}</a>
    </li>`;

    return brandThumbTemplate;
  }

  getProductItemTemplate(prd) {
    const productTemplate = `<div class="product-item">
                                <div class="product-item-link">
                                    <div class="product-img-container">
                                    ${
                                      prd.oldPrice
                                        ? `<div class="product-discount">${(
                                            (1 - prd.price / prd.oldPrice) *
                                            100
                                          ).toFixed(0)}%</div>`
                                        : "<div></div>"
                                    }
                                        <img loading="lazy" class="product-img" src="${
                                          prd.image
                                        }" alt="${prd.name}" />
                                    </div>
                                    
                                    <div class="product-info">
                                        <span class="product-title">${
                                          prd.name
                                        }</span>
                                        <span class="price-box">
                                            <div class="regular-price">${
                                              prd.price
                                            } TL</div>
                                        <div class="old-price">${
                                          prd.oldPrice !== undefined
                                            ? prd.oldPrice + " TL"
                                            : ""
                                        } </div>
                                        </span>
                                        <button class="add-to-basket-btn js-add-to-basket-btn">Sepete Ekle</button>
                                    </div>
                                </div>
                            </div>`;

    return productTemplate;
  }

  defaultFillItems() {
    this.brandBanner.setAttribute("href", this.jsonFile[0].brandImage);
    this.brandBanner.firstElementChild.setAttribute(
      "src",
      this.jsonFile[0].brandImage
    );
    this.brandBanner.firstElementChild.setAttribute(
      "alt",
      this.jsonFile[0].brandName
    );
    this.createProductItemElement(this.jsonFile[0].brandName);
  }

  onHoverItem() {
    this.defaultFillItems();

    Array.from(this.brandList.children).forEach((brand, i) => {
      const item = this.jsonFile[i];

      brand.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        const mobileBrandItems = document.querySelectorAll(
          ".js-mobile-brand-list-item-link.active"
        );

        Array.from(mobileBrandItems).forEach((item) => {
          item.classList.remove("active");
        });
        const mobileClickedItem = e.target.querySelector(
          ".js-mobile-brand-list-item-link"
        );
        mobileClickedItem.classList.add("active");

        if (e.target.getAttribute("data-title") === item.brandName) {
          this.brandBanner.setAttribute("href", item.brandImage);
          this.brandBanner.firstElementChild.setAttribute(
            "src",
            item.brandImage
          );
          this.brandBanner.firstElementChild.setAttribute(
            "alt",
            item.brandName
          );
          this.createProductItemElement(item.brandName);
        }
      });
    });
  }

  closePopup() {
    this.closePopupBtn.addEventListener("click", () => {
      this.basketPopup.classList.remove("show");
    });
  }

  addToBasket() {
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".js-add-to-basket-btn");

      if (target) {
        this.basketPopup.classList.add("show");
        setTimeout(() => {
          this.basketPopup.classList.remove("show");
        }, 3000);
      }
    });
  }
}

export default Tabs;
