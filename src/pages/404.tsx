// component
import MyNotFound from "@src/components/common/MyNotFound";

const NotFoundedPage = () => {
  return (
    <MyNotFound
      text={`존재하지 않는 페이지입니다.\nURL을 다시 확인해주세요!`}
    />
  );
};

export default NotFoundedPage;
