import { useState } from "react";
import { isValidWebsiteAddress } from "../utils";
import Loader from "../components/Loader";

export default function HomePage() {
  const [website, setWebsite] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
