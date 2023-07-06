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

          localStorage.setItem("products", JSON.stringify(productsInLocalStorage));
        }
      }}
      className="w-full bg-black text-white font-roboto font-thin py-4 px-8 border border-black hover:bg-white hover:text-black focus:outline-none"
    >
      {props.dictionary.gallery.productDetail.rent}
    </button>
  );
};
