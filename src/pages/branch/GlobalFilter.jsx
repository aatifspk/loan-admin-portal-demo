import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
const GlobalFilter = ({ filterText, onFilter }) => {
  // const [value, setValue] = useState(filter);
  // const onChange = (e) => {
  //   setValue(e.target.value);
  //   setFilter(e.target.value || undefined);
  // };
  return (
    <div>
      <Textinput
        value = { filterText }
        onChange = { onFilter }
        placeholder="search..."
      />
    </div>
  );
};

export default GlobalFilter;
