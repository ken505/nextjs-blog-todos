import { createContext, useState } from "react";

export const StateContext = createContext();

export default function StateContextProvider(props) {
  const [selectedTask, setSelectedTask] = useState({ id: 0, title: "" });
  return (
    // Provider で共有したい値を value に指定。
    // 今回は state と 更新用の関数を指定。
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
       {/* Provider を export している。 */}
      {props.children}
    </StateContext.Provider>
  );
}
