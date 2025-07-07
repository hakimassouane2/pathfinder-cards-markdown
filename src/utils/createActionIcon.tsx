import { ActionIcon } from "@/components/Card/styles";
import { ReactElement } from "react";

export const actionIcons: Record<string, string[]> = {
  "1": ["/a1.png", "one action"],
  "2": ["/a2.png", "two actions"],
  "3": ["/a3.png", "three actions"],
  R: ["/reaction.png", "reaction"],
  "0": ["/no_action.png", "no action"],
  V: ["/variable.png", "variable"],
};

export const createActionIcon = (
  word: string,
  height: number,
  index?: number
): ReactElement | undefined => {
  const key = word.toUpperCase();
  if (key === "V") {
    return (
      <>
        <ActionIcon
          src="/a1.png"
          alt="one action"
          height={height}
          style={{ marginRight: 0, marginLeft: "5px" }}
        />{" "}
        <span
          style={{
            fontFamily: "goodProRegular",
            fontWeight: "100",
            marginRight: "2px",
          }}
        >
          -
        </span>
        <ActionIcon src="/a3.png" alt="three actions" height={height} />
      </>
    );
  }
  const actionIconData = actionIcons[key];
  if (!actionIconData) {
    return undefined;
  }
  return (
    <ActionIcon
      style={{ marginLeft: "5px" }}
      src={actionIconData[0]}
      alt={actionIconData[1]}
      height={height}
      key={index}
    />
  );
};
