import LaneIcon from "./LaneIcon";
import HeroIcon from "./HeroIcon";

type IconType = {
  LaneIcon: typeof LaneIcon;
  HeroIcon: typeof HeroIcon;
};

const Icon: IconType = {
  LaneIcon,
  HeroIcon,
};

export default Icon;
