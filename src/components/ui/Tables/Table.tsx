"use client";

import TableFilter from "@/components/ui/Tables/TableFilter";
import WhiteBoard from "@/components/ui/WhiteBoard/WhiteBoard";
import {
  Fragment,
  ReactNode,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";

interface TableContent<T> {
  label: string;
  render: (item: T, index: number, array: Array<T>) => ReactNode;
  filter?: boolean;
  position?: "left" | "center" | "right";
}

interface TableProps<T, S> {
  data: Array<T>;
  contents: Array<TableContent<T>>;
  subContent?: {
    selector: (item: T) => Array<S>;
    contents: Array<Omit<TableContent<S>, "filter">>;
  };
}

export default function Table<T, S>({
  data = [],
  contents = [],
  subContent,
}: TableProps<T, S>) {
  const { headers, indexes } = useMemo(() => {
    const headers = (contents || ([] as Array<TableContent<any>>)).map(
      (content, index) => content.label
    );
    const indexes = (contents || ([] as Array<TableContent<any>>))
      .map((item, index) => {
        if (item.filter) return index;
        return -1;
      })
      .filter((value) => value != -1);
    return { headers, indexes };
  }, [contents]);

  const [selected, setSelected] = useState<Array<number>>(
    (contents || []).map((_, index) => index)
  );
  const selectedIndexes = useDeferredValue(selected);
  const hasSubContent = useMemo(
    () => !!subContent && subContent.contents.length,
    [subContent]
  );

  return (
    <WhiteBoard>
      <div className={"h-auto min-h-100 w-full overflow-auto"}>
        {!!data?.length && (
          <TableFilter
            headers={headers}
            indexes={indexes}
            onFilterChange={setSelected}
          />
        )}
        <table className={" relative h-auto w-full table-auto"}>
          {!!selectedIndexes.length && (
            <thead>
              <tr>
                {selectedIndexes.map((selectedIndex) => (
                  <th
                    className={classNames({
                      "text-left":
                        !contents?.[selectedIndex].position ||
                        contents?.[selectedIndex].position == "left",
                      "text-center":
                        contents?.[selectedIndex].position == "center",
                      "text-right":
                        contents?.[selectedIndex].position == "right",
                    })}
                    key={selectedIndex}
                  >
                    {headers[selectedIndex]}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {!!data?.length &&
              data.map((item, index, array) => {
                const subItems = subContent?.selector(item) || ([] as Array<S>);
                const subContents =
                  subContent?.contents ||
                  ([] as Array<Omit<TableContent<S>, "filter">>);
                const subId = `#table_detail_${data.length}_${index}_${subContent?.contents.length}`;
                return (
                  <Fragment key={index}>
                    <tr>
                      {selectedIndexes.map((selectedIndex) => (
                        <td
                          key={selectedIndex}
                          className={classNames({
                            "text-left":
                              !contents?.[selectedIndex].position ||
                              contents?.[selectedIndex].position == "left",
                            "text-center":
                              contents?.[selectedIndex].position == "center",
                            "text-right":
                              contents?.[selectedIndex].position == "right",
                          })}
                        >
                          {hasSubContent && (
                            <label className={"flex"} htmlFor={subId}>
                              {contents?.[selectedIndex].render(
                                item,
                                index,
                                array
                              )}
                            </label>
                          )}
                          {!hasSubContent &&
                            contents?.[selectedIndex].render(
                              item,
                              index,
                              array
                            )}
                        </td>
                      ))}
                    </tr>
                    {hasSubContent && (
                      <Fragment>
                        <input
                          type={"checkbox"}
                          className={"hidden"}
                          id={subId}
                        />
                        <tr
                          className={
                            "table_detail bg-whiten transition-opacity duration-500 ease-in-out dark:bg-black"
                          }
                        >
                          <td
                            colSpan={selectedIndexes.length}
                            className={"p-2"}
                          >
                            <table
                              className={
                                "w-full table-auto border text-sm text-graydark dark:text-gray"
                              }
                            >
                              <thead>
                                <tr>
                                  {subContent?.contents.map((item, index) => (
                                    <th
                                      className={
                                        "border border-stroke bg-whiter text-left !font-semibold dark:border-strokedark dark:bg-auto"
                                      }
                                      key={index}
                                    >
                                      {item.label}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {!subItems.length && (
                                  <tr>
                                    <td
                                      colSpan={subContents.length}
                                      className={
                                        "border border-stroke dark:border-strokedark"
                                      }
                                    >
                                      Không có dữ liệu
                                    </td>
                                  </tr>
                                )}
                                {!!subItems.length &&
                                  subItems.map(
                                    (subItem, subIndex, subArray) => (
                                      <tr key={subIndex}>
                                        {subContents.map(
                                          (subContentItem, subContentIndex) => (
                                            <td
                                              key={subContentIndex}
                                              className={
                                                "border border-stroke  dark:border-strokedark dark:bg-auto"
                                              }
                                            >
                                              {subContentItem.render(
                                                subItem,
                                                subIndex,
                                                subArray
                                              )}
                                            </td>
                                          )
                                        )}
                                      </tr>
                                    )
                                  )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </Fragment>
                    )}
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </WhiteBoard>
  );
}
