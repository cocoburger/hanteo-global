import { currentTabId } from "../stores/uiState.js";
import { generateDummyMoreContents, getDummyContents, TAB_ID_RANGES, } from "./mockDataService.js";

export async function fetchContents( tabId ) {
  try {
    // 로딩 지연 시뮬레이션 (실제 API 호출 환경 시뮬레이션)
    await new Promise(( resolve ) => setTimeout(resolve, 500));

    const mockDataUrl = `/mock/${ tabId }.json`;

    const response = await fetch(mockDataUrl);

    if ( !response.ok ) {
      throw new Error(`콘텐츠 로딩 실패: ${ response.status }`);
    }

    const data = await response.json();


    const idOffset = TAB_ID_RANGES[tabId] || 0;
    const adjustedData = data.map(( item ) => ({
      ...item,
      id: item.id + idOffset,
    }));


    currentTabId.set(tabId);

    return adjustedData;
  } catch ( error ) {
    console.error("API 호출 중 오류 발생:", error);


    const dummyContents = getDummyContents(tabId);
    currentTabId.set(tabId);

    return dummyContents;
  }
}

// 추가 콘텐츠를 가져오는 API 함수
export async function fetchMoreContents( tabId, page ) {
  try {
    // 로딩 지연 시뮬레이션 (실제 API 호출 환경 시뮬레이션)
    await new Promise(( resolve ) => setTimeout(resolve, 800));

    const mockDataUrl =
        `/mock/${ tabId }.json`;

    const response = await fetch(mockDataUrl);

    if ( !response.ok ) {
      throw new Error(`추가 콘텐츠 로딩 실패: ${ response.status }`);
    }

    const newData = await response.json();

    if ( !newData || newData.length === 0 ) {
      throw new Error("더 이상 불러올 콘텐츠가 없습니다");
    }

    const idOffset = TAB_ID_RANGES[tabId] || 0;
    const pageOffset = page * 100; // 1페이지 후의 ID는 100부터, 2페이지 후의 ID는 200부터...

    const adjustedData = newData.map(( item, index ) => ({
      ...item,
      id: idOffset + pageOffset + index,
    }));

    return adjustedData;
  } catch ( error ) {
    console.error("API 호출 중 오류 발생:", error);


    const startIndex = (page - 1) * 10; // 예상되는 페이지당 아이템 수

    // 에러 발생 시 더미 데이터 생성
    const dummyMoreContents = generateDummyMoreContents(startIndex, tabId);

    const idOffset = TAB_ID_RANGES[tabId] || 0;
    const pageOffset = page * 100;

    return dummyMoreContents.map(( item, index ) => ({
      ...item,
      id: idOffset + pageOffset + index,
    }));
  }
}
