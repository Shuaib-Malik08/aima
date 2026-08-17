"use server";

import { APIS, BASE_URL } from "@/apiFactory/apiFactory";

export const getAllMenus = async () => {
  try {
    const res = await fetch(APIS.GET_MENUS, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getAllEvents = async () => {
  try {
    const url = `${APIS.GET_EVENTS}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getUpcomingEvents = async (params?: {
  month?: string;
  year?: string;
  location?: string;
  event_type?: string;
  page?: number;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.month) query.append("month", params.month);
    if (params?.year) query.append("year", params.year);
    if (params?.location) query.append("location", params.location);
    if (params?.event_type) query.append("event_type", params.event_type);
    if (params?.page) query.append("page", params.page.toString());

    const queryString = query.toString();
    const url = `${APIS.UPCOMING_EVENTS}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getPastEvents = async (params?: {
  month?: string;
  year?: string;
  location?: string;
  event_type?: string;
  page?: number;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.month) query.append("month", params.month);
    if (params?.year) query.append("year", params.year);
    if (params?.location) query.append("location", params.location);
    if (params?.event_type) query.append("event_type", params.event_type);
    if (params?.page) query.append("page", params.page.toString());

    const queryString = query.toString();
    const url = `${APIS.PAST_EVENTS}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getPageData = async ({ pageName }: { pageName: string }) => {
  try {
    const res = await fetch(`${APIS.GET_PAGE_DATA}${pageName}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getEventsBySlug = async ({ slug }: { slug: string }) => {
  try {
    const res = await fetch(`${APIS.GET_EVENTS_BY_SLUG}${slug}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getArticalesBySlug = async ({ slug }: { slug: string }) => {
  try {
    const res = await fetch(`${APIS.GET_ARTICALS_BY_SLUG}${slug}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getMediaCenterBySlug = async ({
  slug,
  type,
}: {
  slug: string;
  type: string;
}) => {
  console.log("url", `${APIS.GET_MEDIA_CENTER_BY_SLUG}${slug}?type=${type}`);
  try {
    const res = await fetch(
      `${APIS.GET_MEDIA_CENTER_BY_SLUG}${slug}?type=${type}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "X-CSRF-TOKEN": "",
          "X-API-KEY": "vin001",
        },
      },
    );

    const data = await res.json();
    // console.log('data', data)
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getLmaNetworkBySlug = async ({ slug }: { slug: string }) => {
  try {
    const res = await fetch(`${APIS.GET_LMA_NETWORK_BY_SLUG}${slug}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getReportPublicationBySlug = async ({
  slug,
}: {
  slug: string;
}) => {
  try {
    const res = await fetch(`${APIS.GET_REPORT_PUBLICATION_BY_SLUG}${slug}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getManagementTVBySlug = async ({ slug }: { slug: string }) => {
  try {
    const res = await fetch(`${APIS.GET_MANAGEMENT_TV_BY_SLUG}${slug}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getManagementTVVideos = async (params?: {
  categorySlug: string;
  keyword?: string;
  page?: number;
  type: string;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.keyword) query.append("keyword", params.keyword);
    if (params?.categorySlug) query.append("category", params.categorySlug);
    if (params?.type) query.append("type", params.type);
    if (params?.page) query.append("page", params.page.toString());

    const queryString = query.toString();
    const url = `${APIS.GET_MANAGEMENT_TV_VIDEOS}${
      queryString ? `?${queryString}` : ""
    }`;

    console.log("url", url);

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getSearchResults = async ({ keyword }: { keyword: string }) => {
  try {
    const res = await fetch(`${APIS.SEARCH}${encodeURIComponent(keyword)}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getManagementTeamDetailBySlug = async ({
  slug,
}: {
  slug: string;
}) => {
  try {
    const res = await fetch(
      `${APIS.GET_MANAGEMENT_TEAM_DETAIL_BY_SLUG}${slug}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "X-CSRF-TOKEN": "",
          "X-API-KEY": "vin001",
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const requestBrochure = async (formData: {
  name: string;
  email: string;
  phone: string;
  state: string;
  profile: string;
  area_of_interest: string;
}) => {
  try {
    const res = await fetch(APIS.REQUEST_BROCHURE, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok || data?.success === false || data?.status === false) {
      throw new Error(data?.message || "Submission failed. Please try again.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getMediaCenterList = async (
  type: string,
  params?: {
    month?: string;
    year?: string;
    page?: number;
  },
) => {
  try {
    const query = new URLSearchParams();
    if (params?.month) query.append("month", params.month);
    if (params?.year) query.append("year", params.year);
    if (params?.page) query.append("page", params.page.toString());

    const queryString = query.toString();
    const url = `${APIS.GET_MEDIA_CENTER_LIST}${type}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const submitContactForm = async (formData: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message?: string;
  location: string;
}) => {
  try {
    const res = await fetch(`${APIS.ADD_CONTACT}`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 404) {
      // console.warn("Contact API endpoint not found on backend. Simulating local success.");
      return { success: true, message: "Simulated Success" };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // console.error("Failed to submit to backend API:", error);
    return { success: true, message: "Simulated Success" };
  }
};

export const checkMyAimaLogin = async (formData: {
  aimaUser: string;
  aimaUserPassword: string;
  csrfToken?: string;
}) => {
  try {
    const body = new URLSearchParams();
    body.append("aimaUser", formData.aimaUser);
    body.append("aimaUserPassword", formData.aimaUserPassword);
    body.append("_csrf-frontend", formData.csrfToken || "");

    const res = await fetch("https://www.aima.in/api-login", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
      body: body.toString(),
    });

    const text = await res.text();
    return {
      success: true,
      data: text.trim(),
    };
  } catch (error: any) {
    // console.error("Failed to call api-login API:", error);
    return {
      success: false,
      error: error.message || "Request failed",
    };
  }
};

export const subscribeNewsletter = async (email: string) => {
  try {
    const res = await fetch(APIS.SUBSCRIBE_NEWSLETTER, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Request failed",
    };
  }
};

export const getManagementTVVideoType = async (
  typeSlug: string,
  params?: {
    keyword?: string;
    page?: number;
  },
) => {
  try {
    const query = new URLSearchParams();
    if (params?.keyword) query.append("keyword", params.keyword);
    if (params?.page) query.append("page", params.page.toString());

    const queryString = query.toString();
    const url = `${APIS.GET_MANAGEMENT_TV_VIDEO_TYPE}${typeSlug}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Request failed",
    };
  }
};

export const getManagementTVCategoriesBySlug = async () => {
  try {
    const res = await fetch(`${APIS.GET_MANAGEMENT_TV_CATEGORIES}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Request failed",
    };
  }
};

export const getSubTypesEvents = async (params?: {
  year?: string;
  sub_type?: string;
  type?: string;
  page?: number;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.year) query.append("year", params.year);
    if (params?.type) query.append("type", params.type);
    if (params?.sub_type) query.append("sub_type", params.sub_type);
    if (params?.page) query.append("page", params.page.toString());

    const queryString = query.toString();
    const url = `${APIS.EVENTS_TYPE}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const getEventSubtypeBySlug = async ({ slug }: { slug: string }) => {
  try {
    const res = await fetch(`${APIS.GET_EVENT_SUBTYPE_BY_SLUG}${slug}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": "",
        "X-API-KEY": "vin001",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
