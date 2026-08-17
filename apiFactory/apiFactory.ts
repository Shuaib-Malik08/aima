export const BASE_URL = "https://aima.sanntra.com/administrator/api/v1/";
interface APIS {
  GET_MENUS: string;
  GET_EVENTS: string;
  UPCOMING_EVENTS: string;
  PAST_EVENTS: string;
  EVENTS_TYPE: string
  GET_PAGE_DATA: string;
  GET_EVENTS_BY_SLUG: string;
  SEARCH: string;
  GET_ARTICALS_BY_SLUG: string;
  GET_MEDIA_CENTER_BY_SLUG: string;
  GET_MANAGEMENT_TV_BY_SLUG: string;
  GET_MANAGEMENT_TV_VIDEOS: string;
  GET_LMA_NETWORK_BY_SLUG: string;
  GET_REPORT_PUBLICATION_BY_SLUG: string;
  GET_MANAGEMENT_TEAM_DETAIL_BY_SLUG: string;
  REQUEST_BROCHURE: string;
  GET_MEDIA_CENTER_LIST: string;
  ADD_CONTACT: string;
  SUBSCRIBE_NEWSLETTER: string;
  GET_MANAGEMENT_TV_VIDEO_TYPE: string;
  GET_MANAGEMENT_TV_CATEGORIES: string;
  GET_EVENT_SUBTYPE_BY_SLUG: string;
}

export const APIS: APIS = {
  GET_MENUS: `${BASE_URL}website/menus`,
  GET_EVENTS: `${BASE_URL}event/filters`,
  UPCOMING_EVENTS: `${BASE_URL}event/upcoming`,
  PAST_EVENTS: `${BASE_URL}event/past`,
  GET_EVENTS_BY_SLUG: `${BASE_URL}event/`,
  GET_PAGE_DATA: `${BASE_URL}page/`,
  SEARCH: `${BASE_URL}search?keyword=`,
  GET_ARTICALS_BY_SLUG: `${BASE_URL}articles/detail/`,
  GET_MEDIA_CENTER_BY_SLUG: `${BASE_URL}media-center/detail/`,
  GET_MANAGEMENT_TV_BY_SLUG: `${BASE_URL}management-tv/video/`,
  GET_MANAGEMENT_TV_VIDEOS: `${BASE_URL}management-tv/videos`,
  GET_LMA_NETWORK_BY_SLUG: `${BASE_URL}lma-network/`,
  GET_REPORT_PUBLICATION_BY_SLUG: `${BASE_URL}report-publications/`,
  GET_MANAGEMENT_TEAM_DETAIL_BY_SLUG: `${BASE_URL}management-team/detail/`,
  REQUEST_BROCHURE: `${BASE_URL}request-brochure`,
  GET_MEDIA_CENTER_LIST: `${BASE_URL}media-center/`,
  ADD_CONTACT: `${BASE_URL}contact-us`,
  SUBSCRIBE_NEWSLETTER: `${BASE_URL}newsletter/subscribe`,
  GET_MANAGEMENT_TV_VIDEO_TYPE: `${BASE_URL}management-tv/video-type/`,
  GET_MANAGEMENT_TV_CATEGORIES: `${BASE_URL}management-tv/categories`,
  EVENTS_TYPE: `${BASE_URL}event/type`,
  GET_EVENT_SUBTYPE_BY_SLUG: `${BASE_URL}event/subtype/`,
};

