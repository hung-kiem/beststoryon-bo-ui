"use client";
import Dropdowns, { DropdownItem } from "@/components/ui/Dropdowns/Dropdowns";
import { useDeferredValue, useEffect, useState } from "react";
import classNames from "classnames";

export default function TableFilter({
  headers,
  indexes,
  onFilterChange,
}: {
  headers: Array<string>;
  indexes: Array<number>;
  onFilterChange: (selectedIndex: Array<number>) => void;
}) {
  const [selected, setSelected] = useState(
    headers
      .map((_, index) => ({ [index]: true }))
      .reduce((a, b) => ({ ...a, ...b }), {})
  );

  const selectedIndexes = useDeferredValue(
    headers.map((_, index) => index).filter((index) => selected[index])
  );

  useEffect(() => {
    onFilterChange(selectedIndexes);
  }, [onFilterChange, selectedIndexes]);

  if (!headers.length || !indexes.length) return <></>;

  function onChange(index: number) {
    setSelected((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  }

  return (
    <div className={"unselectable flex w-full justify-end"}>
      <Dropdowns>
        {indexes.map((index) => (
          <DropdownItem
            className={classNames({
              "text-primary": selected[index],
            })}
            key={index}
            onClick={() => onChange(index)}
          >
            {headers[index]}
          </DropdownItem>
        ))}
      </Dropdowns>
    </div>
  );
}
