export interface Results {
  url: string;
  websiteStatus: {
    online: boolean;
    httpStatus: number;
    responseTimeMs: number;
  };
  seo: {
    title: {
      found: boolean;
      value: string;
    };
    metaDescription: {
      found: boolean;
      value: string;
    };
    h1: {
      found: boolean;
      value: string;
    };
    viewportTag: {
      found: boolean;
    };
    images: {
      total: number;
      missingAlt: number;
    };
  };
}
