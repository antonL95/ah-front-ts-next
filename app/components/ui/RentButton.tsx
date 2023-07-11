"use client";
type props = {
  product: any;
  dictionary: any;
};
export const RentButton = (props: props) => {
  const productsInLocalStorage: any[] =
    localStorage.getItem("products") === null
      ? []
      : JSON.parse(localStorage.getItem("products") as string);
  return (
    <button
      onClick={() => {
        let addItemToLocalStorage = true;
        for (const product of productsInLocalStorage) {
          if (product.id === props.product.id) {
            addItemToLocalStorage = false;

            break;
          }
        }
        if (addItemToLocalStorage) {
          productsInLocalStorage.push({
            id: props.product.id,
            name: props.product.name,
          });

          localStorage.setItem(
            "products",
            JSON.stringify(productsInLocalStorage)
          );
        }
      }}
      className="w-full border border-black bg-black px-8 py-4 font-roboto font-thin text-white hover:bg-white hover:text-black focus:outline-none"
    >
      {props.dictionary.gallery.productDetail.rent}
    </button>
  );
};
