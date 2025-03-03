export const TAB_ID_RANGES = {
  chart: 1000, // 차트 탭은 1000번대부터
  whook: 2000, // Whook 탭은 2000번대부터
  event: 3000, // 이벤트 탭은 3000번대부터
  news: 4000, // 뉴스 탭은 4000번대부터
  store: 5000, // 스토어 탭은 5000번대부터
  charging: 6000, // 충전소 탭은 6000번대부터
};

// 더미 콘텐츠 생성 함수 (개발용)
export function getDummyContents( tabId ) {
  const idOffset = TAB_ID_RANGES[tabId] || 0;

  // 탭별로 다른 더미 데이터 생성
  switch ( tabId ) {
    case "chart":
      return Array.from({ length: 10 }, ( _, i ) => ({
        id: idOffset + i + 1,
        title: `차트 콘텐츠 ${ i + 1 }`,
        thumbUrl: "/api/placeholder",
        subtitle: `인기 차트 ${ i + 1 }위`,
        timestamp: new Date().toISOString(),
      }));

    case "whook":
      return Array.from({ length: 8 }, ( _, i ) => ({
        id: idOffset + i + 1,
        title: `Whook 콘텐츠 ${ i + 1 }`,
        thumbUrl: "/api/placeholder",
        subtitle: `Whook 인기 아이템`,
        timestamp: new Date().toISOString(),
      }));

    case "event":
      return Array.from({ length: 6 }, ( _, i ) => ({
        id: idOffset + i + 1,
        title: `이벤트 콘텐츠 ${ i + 1 }`,
        thumbUrl: "/api/placeholder",
        subtitle: `진행중인 이벤트`,
        timestamp: new Date().toISOString(),
      }));

    case "news":
      return Array.from({ length: 12 }, ( _, i ) => ({
        id: idOffset + i + 1,
        title: `뉴스 콘텐츠 ${ i + 1 }`,
        thumbUrl: "/api/placeholder",
        subtitle: `최신 K-POP 뉴스`,
        timestamp: new Date().toISOString(),
      }));

    case "store":
      return Array.from({ length: 9 }, ( _, i ) => ({
        id: idOffset + i + 1,
        title: `스토어 아이템 ${ i + 1 }`,
        thumbUrl: "/api/placeholder",
        subtitle: `한정판 굿즈`,
        price: (Math.floor(Math.random() * 50) + 10) * 1000,
        timestamp: new Date().toISOString(),
      }));

    case "charging":
      return Array.from({ length: 7 }, ( _, i ) => ({
        id: idOffset + i + 1,
        title: `충전소 콘텐츠 ${ i + 1 }`,
        thumbUrl: "/api/placeholder",
        subtitle: `포인트 충전`,
        point: Math.floor(Math.random() * 5000) + 1000,
        timestamp: new Date().toISOString(),
      }));

    default:
      return Array.from({ length: 5 }, ( _, i ) => ({
        id: idOffset + i + 1,
        title: `기본 콘텐츠 ${ i + 1 }`,
        thumbUrl: "/api/placeholder",
        timestamp: new Date().toISOString(),
      }));
  }
}


export function generateDummyMoreContents( startIndex, tabId ) {

  const idOffset = TAB_ID_RANGES[tabId] || 0;

  // 탭별로 다른 추가 더미 데이터 생성
  switch ( tabId ) {
    case "chart":
      return Array.from({ length: 3 }, ( _, i ) => ({
        id: idOffset + startIndex + i + 1,
        title: `추가 차트 콘텐츠 ${ startIndex + i + 1 }`,
        subtitle: `인기 차트 ${ startIndex + i + 11 }위`,
        thumbUrl: "/api/placeholder",
        timestamp: new Date().toISOString(),
      }));

    case "whook":
      return Array.from({ length: 3 }, ( _, i ) => ({
        id: idOffset + startIndex + i + 1,
        title: `추가 Whook 콘텐츠 ${ startIndex + i + 1 }`,
        subtitle: `신규 Whook 아이템`,
        thumbUrl: "/api/placeholder",
        timestamp: new Date().toISOString(),
      }));

    case "event":
      return Array.from({ length: 3 }, ( _, i ) => ({
        id: idOffset + startIndex + i + 1,
        title: `추가 이벤트 콘텐츠 ${ startIndex + i + 1 }`,
        subtitle: `새로운 이벤트`,
        thumbUrl: "/api/placeholder",
        timestamp: new Date().toISOString(),
      }));

    case "news":
      return Array.from({ length: 3 }, ( _, i ) => ({
        id: idOffset + startIndex + i + 1,
        title: `추가 뉴스 콘텐츠 ${ startIndex + i + 1 }`,
        subtitle: `최신 K-POP 소식`,
        thumbUrl: "/api/placeholder",
        timestamp: new Date().toISOString(),
      }));

    case "store":
      return Array.from({ length: 3 }, ( _, i ) => ({
        id: idOffset + startIndex + i + 1,
        title: `추가 스토어 아이템 ${ startIndex + i + 1 }`,
        subtitle: `신규 상품`,
        price: (Math.floor(Math.random() * 50) + 10) * 1000,
        thumbUrl: "/api/placeholder",
        timestamp: new Date().toISOString(),
      }));

    case "charging":
      return Array.from({ length: 3 }, ( _, i ) => ({
        id: idOffset + startIndex + i + 1,
        title: `추가 충전소 콘텐츠 ${ startIndex + i + 1 }`,
        subtitle: `추가 포인트`,
        point: Math.floor(Math.random() * 5000) + 1000,
        thumbUrl: "/api/placeholder",
        timestamp: new Date().toISOString(),
      }));

    default:
      return Array.from({ length: 3 }, ( _, i ) => ({
        id: idOffset + startIndex + i + 1,
        title: `추가 콘텐츠 ${ startIndex + i + 1 }`,
        thumbUrl: "/api/placeholder",
        timestamp: new Date().toISOString(),
      }));
  }
}
