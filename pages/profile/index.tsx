import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProfileCard } from "./components/ProfileCard";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar/TopBar";
import api from "../api/config";
import { IMemberInfo } from "../manager/member";

export default function Profile() {
  const router = useRouter();
  // 로그인 여부 감지
  useEffect(() => {
    if (typeof window !== undefined) {
      const checkToken = localStorage.getItem("surbearToken");
      if (checkToken === null) {
        router.push("/sign-in");
      } else {
        api
          .get("/member", {
            headers: { Authorization: `Bearer ${checkToken}` },
          })
          .then((res) => {
            const info = res.data;
            setMemberInfo(info);
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  const [memberInfo, setMemberInfo] = useState<IMemberInfo>();

  console.log(memberInfo);

  return (
    <>
      <TopBar title={memberInfo?.nickname!} hasSetting />
      <div className="screen px-6 pt-[66px] bg-[#F8F8F8] flex-col gap-3 justify-start">
        <ProfileCard
          title="현재 포인트"
          content={`${
            memberInfo?.point !== undefined
              ? memberInfo.point.toLocaleString()
              : ""
          } pt`}
          onClick={() => {
            router.push("/profile/point-history");
          }}
        />
        <ProfileCard
          title="상품 교환 횟수"
          content={`0 번`}
          onClick={() => {
            console.log("상품 교환 횟수");
          }}
        />
        <ProfileCard
          title="등록한 설문조사 개수"
          content={`0 번`}
          onClick={() => {
            console.log("등설개");
          }}
        />
        <ProfileCard
          title="참여한 설문조사 개수"
          content={`0 개`}
          onClick={() => {
            router.push("/profile/survey-history");
          }}
        />
      </div>
      <TabBar />
    </>
  );
}
