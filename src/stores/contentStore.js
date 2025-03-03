import { get, writable } from "svelte/store";
import { currentTabId } from "./uiState.js";
import { fetchContents, fetchMoreContents } from "../utils/apiService.js";

// 콘텐츠 관련 상태 저장소
export const contents = writable([]);

// 콘텐츠 로딩 상태
export const contentLoading = writable(false);

// 콘텐츠 페이지 번호
export const contentPage = writable(1);

export async function fetchContentsByTab( tabId ) {

  contentLoading.set(true);

  try {
    // API 서비스를 통해 데이터 가져오기
    const data = await fetchContents(tabId);

    contents.set(data);
    contentPage.set(1);

    return data;
  } catch ( error ) {
    console.error("콘텐츠 로딩 중 오류 발생:", error);
    return [];
  } finally {
    contentLoading.set(false);
  }
}

// 무한 스크롤 관련 함수
export async function loadMoreContent() {
  // 이미 로딩 중이면 중복 호출 방지
  const isLoading = get(contentLoading);
  if ( isLoading ) return;


  contentLoading.set(true);

  try {

    const tabId = get(currentTabId);
    const page = get(contentPage);


    const newData = await fetchMoreContents(tabId, page);


    if ( newData && newData.length > 0 ) {
      const currentContents = get(contents);

      const existingIds = new Set(currentContents.map(( item ) => item.id));

      const uniqueNewData = newData.filter(( item ) => !existingIds.has(item.id));

      if ( uniqueNewData.length > 0 ) {
        contents.update(( current ) => [ ...current, ...uniqueNewData ]);

        contentPage.update(( p ) => p + 1);

        return uniqueNewData;
      }

      console.warn("중복 ID를 제외한 후 추가할 새 콘텐츠가 없습니다.");
    }

    return [];
  } catch ( error ) {
    console.error("추가 콘텐츠 로딩 중 오류 발생:", error);
    return [];
  } finally {
    contentLoading.set(false);
  }
}
