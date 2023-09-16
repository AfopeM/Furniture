"use client";
import { useFetchProducts } from "@/hooks";
import { useReducer, useState, useEffect } from "react";
import type { ProductDetailProp } from "@/utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductCard, ProductCardSkeleton } from "@/components";
import { faFilter, faSortDown } from "@fortawesome/free-solid-svg-icons";
interface FilterOptionsProp {
  name: string;
  list: string[];
}

const filter = {
  type: {
    currentChoices: [] as HTMLInputElement[],
    isSelected: false,
  },
  origin: {
    currentChoices: [] as HTMLInputElement[],
    isSelected: false,
  },
  material: {
    currentChoices: [] as HTMLInputElement[],
    isSelected: false,
  },
};

const FILTER_ACTIONS = {
  SELECT: "select",
  PICK: "pick",
  RESET: "reset",
  FILTER: "filter",
};

type FilterPayload = {
  type: string;
  payload?: {
    option?: string;
    choice?: React.MouseEvent<
      HTMLButtonElement | HTMLInputElement | HTMLLIElement,
      MouseEvent
    >;
  };
};

export default function Filter() {
  const initialProducts = useFetchProducts();
  const [products, setProducts] = useState(initialProducts);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [optionList, setOptionList] = useState<FilterOptionsProp[] | undefined>(
    undefined
  );

  const [filterOptions, dispatch] = useReducer(
    (state: typeof filter, action: FilterPayload) => {
      switch (action.type) {
        case FILTER_ACTIONS.SELECT:
          const opt = action.payload?.option as keyof typeof filter;

          if (state[opt].isSelected)
            return { ...state, [opt]: { ...state[opt], isSelected: false } };

          Object.entries(state).map((item) => {
            item[1].isSelected = false;
          });

          return {
            ...state,
            [opt]: { ...state[opt], isSelected: true },
          };

        case FILTER_ACTIONS.PICK:
          const currentOption = action.payload?.option as keyof typeof filter;
          const currentChoice = (
            action.payload?.choice?.target as HTMLLIElement
          ).firstElementChild as HTMLInputElement;

          currentChoice.checked = !currentChoice.checked;

          if (currentChoice.checked) {
            state[currentOption].currentChoices.push(currentChoice);
          } else {
            const newArr = state[currentOption].currentChoices.filter(
              (choice) => choice !== currentChoice
            );
            state[currentOption].currentChoices = newArr;
          }

          return { ...state };

        case FILTER_ACTIONS.RESET:
          action.payload?.choice?.preventDefault();

          Object.entries(state).map((item) => {
            item[1].currentChoices.map((cur) => {
              cur.checked = false;
            });
            item[1].currentChoices = [] as HTMLInputElement[];
            item[1].isSelected = false;
          });

          setProducts(initialProducts);

          return { ...state };

        case FILTER_ACTIONS.FILTER:
          action.payload?.choice?.preventDefault();

          Object.entries(state).map((item) => {
            item[1].isSelected = false;
          });

          const newProducts = Object.entries(state).reduce(
            (acc, optObj) => {
              const optionK = optObj[0] as keyof ProductDetailProp;
              const options = optObj[1].currentChoices;

              let newAcc: ProductDetailProp[] = [];

              if (options.length > 0) {
                options.forEach((option) => {
                  newAcc.push(...acc.filter((a) => a[optionK] === option.id));
                });
              } else {
                return acc;
              }

              return newAcc;
            },
            [...(initialProducts as ProductDetailProp[])]
          );

          setOpenFilterMenu(false);
          setProducts(newProducts);
          return state;

        default:
          return state;
      }
    },
    filter
  );

  //UPDATE OPTIONLIST AND PRODUCTS
  useEffect(() => {
    const setUp = () => {
      setProducts(initialProducts);

      const list = initialProducts?.reduce((acc, product) => {
        if (acc.length < 1) {
          Object.entries(filter).map((f) => {
            const filterName = f[0];

            const newItems = {
              name: filterName,
              list: [
                [product[filterName as keyof ProductDetailProp]].toString(),
              ],
            };

            acc.push(newItems);
          });
          return acc;
        }

        acc.map((opt) => {
          const val = product[opt.name as keyof ProductDetailProp];
          if (!opt.list.includes(val as keyof ProductDetailProp)) {
            opt.list.push(val as keyof ProductDetailProp);
          }
        });

        return acc;
      }, [] as FilterOptionsProp[]);

      setOptionList(list);
    };
    if (initialProducts !== null) setUp();
  }, [initialProducts]);

  return (
    <>
      <aside className="brand-px sticky top-8 z-20">
        {/* DESKTOP FILTER */}
        <form
          className="brand-ease hidden justify-between rounded-xl bg-brand-dark 
          px-8 py-6 xl:flex"
        >
          {/* FILTER OPTIONS */}
          {optionList
            ? optionList.map((item) => {
                const itemKey = item.name as keyof typeof filter;
                const itemLength = filterOptions[itemKey].currentChoices.length;
                return (
                  <div
                    key={item.name}
                    className="relative w-52 font-fira text-lg font-light 
                    text-brand-light/75"
                  >
                    <div
                      onClick={() =>
                        dispatch({
                          type: FILTER_ACTIONS.SELECT,
                          payload: {
                            option: item.name,
                          },
                        })
                      }
                      className="brand-ease relative flex w-full 
                  cursor-pointer justify-between rounded-lg 
                  bg-brand-light/20 px-4 py-2 hover:bg-brand-gray/40"
                    >
                      <p className="capitalize">
                        {itemLength === 0
                          ? item.name
                          : itemLength < 2
                          ? filterOptions[itemKey].currentChoices[0].id
                          : `${itemLength} selected`}
                      </p>
                      <FontAwesomeIcon
                        icon={faSortDown}
                        className={`${
                          filterOptions[item.name as keyof typeof filter]
                            .isSelected
                            ? "rotate-0"
                            : "rotate-180"
                        } brand-ease pointer-events-none h-auto w-2 pb-1`}
                      />
                    </div>
                    <ul
                      className={`${
                        filterOptions[itemKey].isSelected ? "py-4" : "h-0"
                      } absolute mt-2 w-full space-y-2 overflow-hidden rounded-xl 
                  bg-brand-darkgray px-6 duration-200 ease-in-out`}
                    >
                      {item.list.map((opt) => {
                        const isSelected = filterOptions[
                          itemKey
                        ].currentChoices.find((cur) => cur.id === opt)?.checked;
                        return (
                          <li
                            key={opt}
                            onClick={(e) =>
                              dispatch({
                                type: FILTER_ACTIONS.PICK,
                                payload: { option: item.name, choice: e },
                              })
                            }
                            className="group flex w-full cursor-pointer 
                        items-center gap-2 rounded-md px-2 hover:bg-brand-light/10"
                          >
                            <input
                              id={opt}
                              type="checkbox"
                              name={item.name}
                              className={`${
                                isSelected
                                  ? "border-brand-base bg-brand-base after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:content-['+']"
                                  : "border-brand-light/75 bg-transparent"
                              } brand-ease text-md pointer-events-none relative h-4 w-4
                          cursor-pointer appearance-none rounded-full border-2 border-solid font-bold
                           text-brand-light group-hover:border-brand-base`}
                            />
                            <label
                              htmlFor={opt}
                              className="brand-ease pointer-events-none
                          text-brand-light/75 group-hover:text-brand-base"
                            >
                              {opt}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            : Array(3)
                .fill(1)
                .map((item, i) => {
                  return (
                    <div
                      key={item + i}
                      className="h-10 w-52 animate-pulse rounded bg-brand-gray"
                    />
                  );
                })}

          {/* FILTER BUTTONS */}
          <button
            type="submit"
            onClick={(e) =>
              dispatch({
                type: FILTER_ACTIONS.RESET,
                payload: {
                  choice: e,
                },
              })
            }
            className="brand-ease w-32 rounded-lg  bg-brand-base/50 px-4 
            py-2 font-fira font-bold capitalize tracking-widest hover:bg-brand-base"
          >
            reset
          </button>

          <button
            type="submit"
            onClick={(e) =>
              dispatch({
                type: FILTER_ACTIONS.FILTER,
                payload: {
                  choice: e,
                },
              })
            }
            className="brand-ease w-32 rounded-lg  bg-brand-base/50 px-4 
            py-2 font-fira font-bold capitalize tracking-widest hover:bg-brand-base"
          >
            filter
          </button>
        </form>

        {/* MOBILE FILTER */}
        <div
          className="relative flex justify-center rounded-xl 
          bg-brand-dark px-8 py-6 xl:hidden"
        >
          {/* MOBILE FILTER MENU */}
          <button
            type="button"
            onClick={() => setOpenFilterMenu((prev) => !prev)}
            className={`${
              openFilterMenu
                ? "bg-brand-base"
                : "bg-brand-base/50 hover:bg-brand-base/75"
            } brand-ease flex items-center gap-4 rounded-lg px-8 py-2 
            font-fira text-xl font-medium tracking-wider hover:scale-105`}
          >
            Filter Menu
            <FontAwesomeIcon icon={faFilter} />
          </button>

          <form
            className={`${
              openFilterMenu
                ? "h-auto translate-y-20 px-8 py-6"
                : "h-0 translate-y-12 p-0"
            } brand-ease-x absolute flex w-full max-w-sm flex-col justify-between gap-4
            overflow-hidden rounded-xl bg-brand-dark xl:hidden`}
          >
            {/* FILTER OPTIONS */}
            {optionList?.map((item) => {
              const itemKey = item.name as keyof typeof filter;
              const itemLength = filterOptions[itemKey].currentChoices.length;
              return (
                <div
                  key={item.name}
                  className="relative w-full font-fira text-lg font-light 
                text-brand-light/75"
                >
                  <div
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SELECT,
                        payload: {
                          option: item.name,
                        },
                      })
                    }
                    className="brand-ease relative flex w-full cursor-pointer justify-between rounded-lg 
                    bg-brand-light/20 px-4 py-2 hover:bg-brand-gray/40"
                  >
                    <p className="capitalize">
                      {itemLength === 0
                        ? item.name
                        : itemLength < 2
                        ? filterOptions[itemKey].currentChoices[0].id
                        : `${itemLength} selected`}
                    </p>
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className={`${
                        filterOptions[itemKey].isSelected
                          ? "rotate-0"
                          : "rotate-180"
                      } brand-ease pointer-events-none h-auto w-2 pb-1`}
                    />
                  </div>
                  <ul
                    className={`${
                      filterOptions[itemKey].isSelected ? "py-4" : "h-0"
                    } brand-ease mt-2 w-full space-y-2 overflow-hidden 
                    rounded-xl bg-brand-gray/10 px-6`}
                  >
                    {item.list.map((opt) => {
                      const isSelected = filterOptions[
                        itemKey
                      ].currentChoices.find((cur) => cur.id === opt)?.checked;
                      return (
                        <li
                          key={opt}
                          onClick={(e) =>
                            dispatch({
                              type: FILTER_ACTIONS.PICK,
                              payload: { option: item.name, choice: e },
                            })
                          }
                          className="group flex w-full cursor-pointer items-center gap-2 
                          rounded-md px-2 hover:bg-brand-light/10"
                        >
                          <input
                            id={opt}
                            type="checkbox"
                            name={item.name}
                            className={`${
                              isSelected
                                ? "border-brand-base bg-brand-base after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-brand-light after:content-['+']"
                                : "border-brand-light/75 bg-transparent"
                            } pointer-events-none relative h-4 w-4 appearance-none 
                            rounded-full border-2 border-solid text-[15px] font-bold text-brand-gray 
                            group-hover:border-brand-base`}
                          />
                          <label
                            htmlFor={opt}
                            className="pointer-events-none tracking-wider
                            text-brand-light/75 group-hover:text-brand-base"
                          >
                            {opt}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            {/* FILTER BUTTONS */}
            <button
              type="submit"
              onClick={(e) =>
                dispatch({
                  type: FILTER_ACTIONS.RESET,
                  payload: {
                    choice: e,
                  },
                })
              }
              className="brand-ease w-full rounded-lg bg-brand-base/50 px-4 
              py-2 font-fira font-bold capitalize tracking-widest hover:bg-brand-base"
            >
              reset
            </button>

            <button
              type="submit"
              onClick={(e) =>
                dispatch({
                  type: FILTER_ACTIONS.FILTER,
                  payload: {
                    choice: e,
                  },
                })
              }
              className="brand-ease w-full rounded-lg bg-brand-base/50 px-4 
              py-2 font-fira font-bold capitalize tracking-widest hover:bg-brand-base"
            >
              filter
            </button>
          </form>
        </div>
      </aside>

      {/* PRODUCTS */}
      <section className="brand-px flex min-h-[250px] flex-wrap justify-center gap-x-16 gap-y-12 pb-8">
        {products === null ? (
          Array(8)
            .fill(0)
            .map((item, i) => {
              return <ProductCardSkeleton key={item + i} />;
            })
        ) : products.length > 0 ? (
          products.map((product, i) => {
            return <ProductCard key={i} index={i} {...product} />;
          })
        ) : (
          <p className="pt-12 text-center text-3xl text-brand-darkgray md:text-4xl">
            No Furniture matching this description was found in our inventory
          </p>
        )}
      </section>
    </>
  );
}
