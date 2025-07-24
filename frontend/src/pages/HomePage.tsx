import { useState } from "react";
import { formatWebsite, isValidWebsiteAddress } from "../utils";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";
import type { Results } from "../types";
import { useNavigate } from "react-router";

export default function HomePage() {
  const [website, setWebsite] = useState("");
  const [isError, setIsError] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  if (isServerError) {
    return (
      <ErrorPage
        errorHeading={serverError}
        errorDescription="Try analyze a website again"
        buttonText="Analyze website"
        buttonURL="/"
      />
    );
  }
  return (
    <div className="home">
      <h1>
        {isLoading ? "Analyzing your website" : "Website health + SEO checker"}
      </h1>
      <p className="tilted subheading">
        {!isLoading
          ? "Enter your domain to get detailed report about a website health"
          : null}
      </p>
      {isLoading ? <Loader /> : null}
      {isError ? <p className="inline-error">Invalid website address</p> : null}
      {!isLoading ? (
        <>
          <input
            type="text"
            placeholder="website.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            onBlur={(e) => isValidWebsiteAddress(e.target.value, setIsError)}
          />
          <button
            onClick={async () => {
              const isValidAddress = isValidWebsiteAddress(website, setIsError);
              if (!isValidAddress) return;

              setIsLoading(true);
              setIsServerError(false);
              setServerError("");

              const formattedWebsite = formatWebsite(website);
              const server = import.meta.env.VITE_SERVER;
              const results: Results = { url: formattedWebsite };

              try {
                const statusRes = await fetch(
                  `${server}/check-status?url=${formattedWebsite}`,
                  {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                  }
                );
                if (!statusRes.ok) {
                  const { error } = await statusRes.json();
                  throw new Error(error || "Failed to fetch website status");
                }
                const { websiteStatus } = await statusRes.json();
                results.websiteStatus = websiteStatus;
                if (!results.websiteStatus!.online) {
                  navigate("/results", { state: results });
                }
                const seoRes = await fetch(
                  `${server}/check-seo?url=${formattedWebsite}`,
                  {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                  }
                );
                if (!seoRes.ok) {
                  const { error } = await seoRes.json();
                  throw new Error(error || "Failed to fetch SEO data");
                }
                const { seo } = await seoRes.json();
                results.seo = seo;
                navigate("/results", { state: results });
              } catch (err: unknown) {
                setIsServerError(true);
                setServerError(
                  err instanceof Error
                    ? err.message
                    : "An unexpected error occurred"
                );
              } finally {
                setIsLoading(false);
              }
            }}
          >
            Analyze
          </button>
        </>
      ) : null}
    </div>
  );
}
