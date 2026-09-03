"use client";

import { useEffect } from "react";

// Inline styles are used here, not Tailwind classes: this boundary replaces the
// entire root layout (including <html>/<body>), so it must not depend on the
// app's own CSS pipeline having loaded correctly.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "sans-serif",
            color: "#0B0B0F",
            backgroundColor: "#EAF1FB",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Something went wrong</h1>
          <p style={{ maxWidth: "60ch", color: "#3A4152" }}>
            The application hit an unexpected error. You can try again below.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              backgroundColor: "#0A3FA8",
              color: "#FFFFFF",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
