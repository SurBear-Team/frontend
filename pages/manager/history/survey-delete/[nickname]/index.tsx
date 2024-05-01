// 설문조사 강제 삭제 내역
import { useRouter } from "next/router";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
import { useEffect, useState } from "react";
import api from "@/pages/api/config";
import { getTimeAsString } from "@/pages/utils";

interface IDeletedSurvey {
  createdAt: string;
  nickname: string;
  title: string;
}

export default function SurveyDelete() {
  const router = useRouter();
  const { nickname } = router.query;
  const [data, setData] = useState<IDeletedSurvey[]>();
  useEffect(() => {
    if (nickname !== undefined) {
      api
        .get("/deletion/list", { params: { nickname: nickname } })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
  }, [nickname]);
  return (
    <>
      <TopBar title="설문조사 강제 삭제 내역" hasBack noShadow />
      <div className="white-screen flex-col justify-start pt-12">
        {data &&
          data.map((el, index) => (
            <ListCard
              key={index}
              getTime={getTimeAsString(el.createdAt)}
              content={el.title}
              surveyOwner={`삭제 : ${el.nickname}`}
            />
          ))}
      </div>
    </>
  );
}
