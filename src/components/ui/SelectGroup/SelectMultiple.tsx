import {
  ReactNode,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import IconChevronDown from "@/components/ui/icons/IconChevronDown";
import { arr2obj, deepClone } from "@libs/object-util";
import { highlightText, removeAccents } from "@libs/string-utils";

interface Option {
  value: string;
  label: ReactNode;
  selected?: boolean;
  searchValue?: string;
}

interface DropdownProps {
  label?: string;
  options: Array<Option>;
}

export default function SelectMultiple({
  options: _options = [],
  label,
}: DropdownProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<any>(null);
  const trigger = useRef<any>(null);
  const [search, setSearch] = useState<string>("");

  const selected = useDeferredValue(
    options
      .map((value, index) => (value.selected ? index : -1))
      .filter((value) => value >= 0),
  );
  const searchValue = useDeferredValue(removeAccents(search));

  useEffect(() => {
    setOptions((prevState) => {
      const object = arr2obj(prevState, (value) => value.value);
      const nextState = deepClone(_options);
      nextState.forEach((option) => {
        option.searchValue = removeAccents(option?.searchValue);
        if (object[option.value]?.selected) {
          option.selected = true;
        }
      });
      return nextState;
    });
  }, [_options]);

  const open = () => {
    setShow(true);
  };
  const select = (index: number) => {
    setOptions((prevState) => {
      return [...prevState].map((value, i) =>
        i == index ? { ...value, selected: !value.selected } : value,
      );
    });
  };

  const remove = (index: number) => {
    setOptions((prevState) => {
      return [...prevState].map((value, i) =>
        i == index ? { ...value, selected: false } : value,
      );
    });
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (
        !show ||
        dropdownRef.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setShow(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <div className="relative z-50">
      <label
        className={"mb-1 block text-sm font-medium text-black dark:text-white"}
      >
        {label}
      </label>
      <div className="flex flex-col items-center">
        <input name="values" type="hidden" />
        <div className="relative z-20 inline-block w-full">
          <div className="relative flex flex-col items-center">
            <div ref={trigger} onClick={open} className="w-full">
              <div className="flex rounded-lg border border-stroke px-2 py-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                <div className="flex flex-auto gap-x-2 gap-y-1 overflow-auto whitespace-nowrap">
                  {selected.map((index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2 py-0.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                    >
                      <div className="max-w-full flex-initial">
                        {options[index].label}
                      </div>
                      <div className="flex flex-auto flex-row-reverse">
                        <div
                          onClick={() => remove(index)}
                          className="cursor-pointer pl-2 hover:text-danger"
                        >
                          <svg
                            className="fill-current"
                            role="button"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(selected.length === 0 ||
                    (show && selected.length != options.length)) && (
                    <div
                      className="w-full"
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      <input
                        autoFocus={show}
                        placeholder={
                          !!label
                            ? "Chọn " + label.toLowerCase()
                            : "Select an option"
                        }
                        className="w-full min-w-32 appearance-none bg-transparent py-0.5 text-sm outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="flex w-8 items-center py-1 pl-1 pr-1">
                  <button
                    type="button"
                    onClick={open}
                    className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                  >
                    <IconChevronDown />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full px-4">
              <div
                className={classNames(
                  "max-h-select absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input",
                  {
                    hidden: !show,
                  },
                )}
                ref={dropdownRef}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
              >
                <div className="flex w-full flex-col">
                  {options
                    .filter(
                      (option) =>
                        !searchValue ||
                        !option.searchValue ||
                        option.searchValue.includes(searchValue),
                    )
                    .map((option, index) => (
                      <div key={index}>
                        <div
                          className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                          onClick={() => select(index)}
                        >
                          <div
                            className={`relative flex w-full items-center border-l-2 p-2 pl-2 ${
                              option.selected
                                ? "border-primary"
                                : "border-transparent"
                            }`}
                          >
                            <div className="flex w-full items-center">
                              <div className="mx-2 leading-6">
                                {typeof option.label == "string" && (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: highlightText(
                                        option.label,
                                        searchValue,
                                        (value) =>
                                          `<span style="background-color: yellow">${value}</span>`,
                                      ),
                                    }}
                                  />
                                )}
                                {typeof option.label != "string" &&
                                  option.label}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
