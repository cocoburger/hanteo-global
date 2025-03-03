import { writable } from "svelte/store";

// 탭 관련 상태 저장소
export const tabs = writable([
  { id: "chart", name: "차트", isActive: false },
  { id: "whook", name: "Whook", isActive: false },
  { id: "event", name: "이벤트", isActive: true },
  { id: "news", name: "뉴스", isActive: false },
  { id: "store", name: "스토어", isActive: false },
  { id: "charging", name: "충전소", isActive: false },
]);

export const currentTabIndex = writable(2);

export const currentTabId = writable("event");

// 배너 관련 상태 저장소
export const banners = writable([
  {
    id: 1,
    title: "M COUNTDOWN",
    subtitle: "'글로벌 사전 투표'",
    date: "2020.02.08 10:00 ~ 2020.04.08 17:00",
    buttonText: "투표하기",
    badge: "진행 중",
    imageUrl: "/api/placeholder/400/200",
  },
  {
    id: 2,
    title: "NEW RELEASE",
    subtitle: "'인기 가수 컴백'",
    date: "2020.03.01 00:00 ~ 2020.03.31 23:59",
    buttonText: "더보기",
    badge: "신규",
    imageUrl: "/api/placeholder/400/200",
  },
  {
    id: 3,
    title: "M COUNTDOWN",
    subtitle: "'글로벌 사전 투표'",
    date: "2020.02.08 10:00 ~ 2020.04.08 17:00",
    buttonText: "투표하기",
    badge: "진행 중",
    imageUrl: "/api/placeholder/400/200",
  },
  {
    id: 4,
    title: "SPECIAL EVENT",
    subtitle: "'팬미팅 이벤트'",
    date: "2020.04.10 10:00 ~ 2020.04.30 18:0",
    buttonText: "응모하기",
    badge: "마감임박",
    imageUrl: "/api/placeholder/400/200",
  },
  {
    id: 5,
    title: "WEEKLY CHART",
    subtitle: "'주간 인기 차트'",
    date: "2020.03.15 00:00 ~ 2020.03.21 23:59",
    buttonText: "차트보기",
    badge: "업데이트",
    imageUrl: "/api/placeholder/400/200",
  },
]);
