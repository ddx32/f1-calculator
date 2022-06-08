import { FunctionComponent } from "react";

import { ReactComponent as FerrariIcon } from "../svg/teams/ferrari.svg";
import { ReactComponent as MercedesIcon } from "../svg/teams/mercedes.svg";
import { ReactComponent as RedBullIcon } from "../svg/teams/redbull.svg";

export interface ConstructorMeta {
  constructorId: string;
  primaryColor: string;
  foreground?: string;
  background?: string;
  Icon?: FunctionComponent;
}

const CONSTRUCTOR_DATA: ConstructorMeta[] = [
  {
    constructorId: "mercedes",
    primaryColor: "#00827D",
    foreground: "#FFFFFF",
    background: "#000000",
    Icon: MercedesIcon,
  },
  {
    constructorId: "red_bull",
    primaryColor: "#001061",
    background: "#0A1248",
    foreground: "#FFFFFF",
    Icon: RedBullIcon,
  },
  {
    constructorId: "mclaren",
    primaryColor: "#FF9800",
  },
  {
    constructorId: "ferrari",
    primaryColor: "#D8291B",
    foreground: "#FFFFFF",
    background: "#B9000D",
    Icon: FerrariIcon,
  },
  {
    constructorId: "alphatauri",
    primaryColor: "#1f2e49",
  },
  {
    constructorId: "alpine",
    primaryColor: "#023E9B",
  },
  {
    constructorId: "aston_martin",
    primaryColor: "#00584F",
  },
  {
    constructorId: "williams",
    primaryColor: "#00A0DE",
  },
  {
    constructorId: "alfa",
    primaryColor: "#720700",
  },
  {
    constructorId: "haas",
    primaryColor: "#e3e3e3",
  },
];

export default CONSTRUCTOR_DATA;
