export default function ErrorPage({
  errorHeading,
  errorDescription,
  buttonText,
  buttonURL,
}: {
  errorHeading: string;
  errorDescription: string;
  buttonText: string;
  buttonURL: string;
}) {
  return (
    <div className="errorPage">
      <h1>{errorHeading}</h1>
      <p className="subheading tilted">{errorDescription}</p>
      <a href={buttonURL} className="button">
        {buttonText}
      </a>
    </div>
  );
}
