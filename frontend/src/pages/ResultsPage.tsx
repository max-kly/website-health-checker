import { useLocation } from "react-router";
// import { testResults } from "../data/testResults";
import type { Results } from "../types";
import ErrorPage from "./ErrorPage";

export default function ResultsPage() {
  const location = useLocation();
  const results = location.state as Results;
  // const results = testResults as Results;
  if (!results) {
    return (
      <ErrorPage
        errorHeading="Doesn't look like you have provided a website"
        errorDescription="We have no data for you, please provide a website so we can analyze it"
        buttonText="Analyze website"
        buttonURL="/"
      />
    );
  }
  return (
    <div className="results">
      <h1>
        Results for
        <span className="tilted">{results.url}</span>
      </h1>
      <div className="item">
        <div className="row">
          <div className="prop tilted">Page available:</div>
          <div className="value">
            {results.websiteStatus!.online ? "✅" : "❌"}
          </div>
        </div>
        <div className="row">
          <div className="prop tilted">HTTP status:</div>
          <div className="value">{results.websiteStatus!.httpStatus}</div>
        </div>
        <div className="row">
          <div className="prop tilted">Response time, ms:</div>
          <div className="value">{results.websiteStatus!.responseTimeMs}</div>
        </div>
      </div>
      <div className="item">
        <div className="row">
          <div className="prop tilted">Page has title:</div>
          <div className="value">{results.seo!.title.found ? "✅" : "❌"}</div>
        </div>
        {results.seo!.title.found ? (
          <div className="row">
            <div className="prop tilted">Page title:</div>
            <div className="value">{results.seo!.title.value}</div>
          </div>
        ) : null}
      </div>
      <div className="item">
        <div className="row">
          <div className="prop tilted">Page has description:</div>
          <div className="value">
            {results.seo!.metaDescription.found ? "✅" : "❌"}
          </div>
        </div>
        {results.seo!.metaDescription.found ? (
          <div className="row">
            <div className="prop tilted">Page description:</div>
            <div className="value">{results.seo!.metaDescription.value}</div>
          </div>
        ) : null}
      </div>
      <div className="item">
        <div className="row">
          <div className="prop tilted">Page has H1:</div>
          <div className="value">{results.seo!.h1.found ? "✅" : "❌"}</div>
        </div>
        {results.seo!.h1.found ? (
          <div className="row">
            <div className="prop tilted">H1 content:</div>
            <div className="value">{results.seo!.h1.value}</div>
          </div>
        ) : null}
        <div className="row">
          <div className="prop tilted">Viewport tag:</div>
          <div className="value">
            {results.seo!.viewportTag.found ? "✅" : "❌"}
          </div>
        </div>
      </div>
      <div className="item">
        <div className="row">
          <div className="prop tilted">Total amount of images:</div>
          <div className="value">{results.seo!.images.total}</div>
        </div>
        <div className="row">
          <div className="prop tilted">Page has missing alt tags:</div>
          <div className="value">
            {results.seo!.images.missingAlt > 0 ? "✅" : "❌"}
          </div>
        </div>
        <div className="row">
          <div className="prop tilted">Images without alt tag:</div>
          <div className="value">{results.seo!.images.missingAlt}</div>
        </div>
      </div>
    </div>
  );
}
