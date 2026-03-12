import astonMartinSrc from "../svg/teams/am.svg";
import ferrariSrc from "../svg/teams/ferrari.svg";
import mclarenSrc from "../svg/teams/mclaren.svg";
import mercedesSrc from "../svg/teams/mercedes.svg";
import redbullSrc from "../svg/teams/redbull.svg";

export interface ConstructorMeta {
  constructorId: string;
  primaryColor: string;
  foreground?: string;
  background?: string;
  icon?: string;
}

const CONSTRUCTOR_DATA: ConstructorMeta[] = [
  {
    constructorId: "mercedes",
    primaryColor: "#00827D",
    foreground: "#FFFFFF",
    background: "#000000",
    icon: mercedesSrc,
  },
  {
    constructorId: "red_bull",
    primaryColor: "#001061",
    background: "#0A1248",
    foreground: "#FFFFFF",
    icon: redbullSrc,
  },
  {
    constructorId: "mclaren",
    primaryColor: "#FF9800",
    background: "#FF9800",
    foreground: "#FFFFFF",
    icon: mclarenSrc,
  },
  {
    constructorId: "ferrari",
    primaryColor: "#D8291B",
    foreground: "#FFFFFF",
    background: "#B9000D",
    icon: ferrariSrc,
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
    background: "#00665E",
    foreground: "#FFFFFF",
    icon: astonMartinSrc,
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
