import Link from "next/link";

// component
import Icon from "@src/components/common/Icon";

type Props = {
  text: string;
};

const MyNotFound = ({ text }: Props) => {
  return (
    <section className="fixed inset-0 -top-[20vh] flex flex-col justify-center items-center">
      <Icon.HeroIcon shape="CircleQuestion" className="w-12 h-12" />

      <h1 className="font-bold text-xl whitespace-pre-wrap">{text}</h1>

      <div className="mt-10" />

      <Icon.HeroIcon
        shape="DoubleArrowBottom"
        className="w-12 h-12 mb-2 animate-bounce"
      />

      <Link href="/">
        <a className="bg-black text-white px-4 py-3 rounded-md transition-colors hover:bg-[#333]">
          홈으로 이동
        </a>
      </Link>
    </section>
  );
};

export default MyNotFound;
