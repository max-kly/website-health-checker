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
            onClick={() => {
              const isValidAddress = isValidWebsiteAddress(website, setIsError);
              if (isValidAddress) {
                setIsLoading(true);
                const formattedWebsite = formatWebsite(website);
                const server = import.meta.env.VITE_SERVER;
                const results: Results = {
                  url: formattedWebsite,
                };
                fetch(`${server}/check-status?url=${formattedWebsite}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((response) => response.json())
                  .then(({ websiteStatus }) => {
                    results.websiteStatus = websiteStatus;
                  })
                  .catch(({ error }) => {
                    setIsServerError(true);
                    setServerError(error);
                    setIsLoading(false);
                  });
                fetch(`${server}/check-seo?url=${formattedWebsite}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((response) => response.json())
                  .then(({ seo }) => {
                    results.seo = seo;
                    navigate("/results", { state: results });
                  })
                  .catch(({ error }) => {
                    setIsServerError(true);
                    setServerError(error);
                    setIsLoading(false);
                  });
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
